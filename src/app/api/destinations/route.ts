import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { destinations, insertDestinationSchema } from '@/lib/db/schema';
import { like } from 'drizzle-orm';

// GET /api/destinations - Liste toutes les destinations ou recherche par nom
export async function GET(request: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');

    if (name) {
      // Recherche par nom
      const searchDestinations = await db
        .select()
        .from(destinations)
        .where(like(destinations.name, `%${name}%`))
        .orderBy(destinations.createdAt);
      return NextResponse.json(searchDestinations);
    }

    const allDestinations = await db.select().from(destinations).orderBy(destinations.createdAt);
    return NextResponse.json(allDestinations);
  } catch (error) {
    console.error('Erreur lors de la récupération des destinations:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}

// POST /api/destinations - Crée une nouvelle destination
export async function POST(request: NextRequest) {
  try {
    const db = getDb();
    const body = await request.json();
    const validatedData = insertDestinationSchema.parse(body);

    const [newDestination] = await db.insert(destinations).values(validatedData).returning();

    return NextResponse.json(newDestination, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création de la destination:', error);

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Données invalides', details: error.message },
        { status: 400 },
      );
    }

    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
