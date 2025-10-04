import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { itineraries, insertItinerarySchema } from '@/lib/db/schema';

// GET /api/itineraries - Liste tous les itinéraires
export async function GET() {
  try {
    const allItineraries = await db.select().from(itineraries).orderBy(itineraries.createdAt);
    return NextResponse.json(allItineraries);
  } catch (error) {
    console.error('Erreur lors de la récupération des itinéraires:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

// POST /api/itineraries - Crée un nouvel itinéraire
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = insertItinerarySchema.parse(body);

    const [newItinerary] = await db
      .insert(itineraries)
      .values(validatedData)
      .returning();

    return NextResponse.json(newItinerary, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création de l\'itinéraire:', error);

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Données invalides', details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
