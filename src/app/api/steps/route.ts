import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { steps, insertStepSchema } from '@/lib/db/schema';
import { eq, asc } from 'drizzle-orm';

// GET /api/steps?itineraryId=X - Liste les étapes d'un itinéraire
export async function GET(request: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const itineraryId = searchParams.get('itineraryId');

    if (!itineraryId) {
      return NextResponse.json({ error: 'itineraryId est requis' }, { status: 400 });
    }

    const itineraryIdNum = parseInt(itineraryId);
    if (isNaN(itineraryIdNum)) {
      return NextResponse.json({ error: 'itineraryId invalide' }, { status: 400 });
    }

    const allSteps = await db
      .select()
      .from(steps)
      .where(eq(steps.itineraryId, itineraryIdNum))
      .orderBy(asc(steps.order));

    return NextResponse.json(allSteps);
  } catch (error) {
    console.error('Erreur lors de la récupération des étapes:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}

// POST /api/steps - Crée une nouvelle étape
export async function POST(request: NextRequest) {
  try {
    const db = getDb();
    const body = await request.json();
    const validatedData = insertStepSchema.parse(body);

    const [newStep] = await db.insert(steps).values(validatedData).returning();

    return NextResponse.json(newStep, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création de l'étape:", error);

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Données invalides', details: error.message },
        { status: 400 },
      );
    }

    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}

// PUT /api/steps/reorder - Réordonne les étapes
export async function PUT(request: NextRequest) {
  try {
    const db = getDb();
    const body = await request.json();
    const { steps: stepsToReorder } = body;

    if (!stepsToReorder || !Array.isArray(stepsToReorder)) {
      return NextResponse.json({ error: 'steps array est requis' }, { status: 400 });
    }

    // Validation des données
    for (const step of stepsToReorder) {
      if (!step.id || typeof step.order !== 'number') {
        return NextResponse.json(
          { error: 'Chaque étape doit avoir un id et un order' },
          { status: 400 },
        );
      }
    }

    // Mise à jour de l'ordre pour chaque étape
    await Promise.all(
      stepsToReorder.map(({ id, order }: { id: number; order: number }) =>
        db.update(steps).set({ order, updatedAt: new Date() }).where(eq(steps.id, id)),
      ),
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors du réordonnancement des étapes:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
