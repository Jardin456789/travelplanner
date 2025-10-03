import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { steps } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/steps/[id] - Récupère une étape spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString } = await params;
    const id = parseInt(idString);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID invalide' },
        { status: 400 }
      );
    }

    const [step] = await db
      .select()
      .from(steps)
      .where(eq(steps.id, id));

    if (!step) {
      return NextResponse.json(
        { error: 'Étape non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json(step);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'étape:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

// PUT /api/steps/[id] - Met à jour une étape
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString } = await params;
    const id = parseInt(idString);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID invalide' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const updateData = {
      ...body,
      updatedAt: new Date(),
    };

    const [updatedStep] = await db
      .update(steps)
      .set(updateData)
      .where(eq(steps.id, id))
      .returning();

    if (!updatedStep) {
      return NextResponse.json(
        { error: 'Étape non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedStep);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'étape:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

// DELETE /api/steps/[id] - Supprime une étape
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString } = await params;
    const id = parseInt(idString);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID invalide' },
        { status: 400 }
      );
    }

    const [deletedStep] = await db
      .delete(steps)
      .where(eq(steps.id, id))
      .returning();

    if (!deletedStep) {
      return NextResponse.json(
        { error: 'Étape non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'étape:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
