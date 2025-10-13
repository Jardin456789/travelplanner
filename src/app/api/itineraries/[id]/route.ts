import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { itineraries } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/itineraries/[id] - Récupère un itinéraire spécifique
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const db = getDb();
    const { id: idString } = await params;
    const id = parseInt(idString);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    const [itinerary] = await db.select().from(itineraries).where(eq(itineraries.id, id));

    if (!itinerary) {
      return NextResponse.json({ error: 'Itinéraire non trouvé' }, { status: 404 });
    }

    return NextResponse.json(itinerary);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'itinéraire:", error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}

// PUT /api/itineraries/[id] - Met à jour un itinéraire
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const db = getDb();
    const { id: idString } = await params;
    const id = parseInt(idString);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    const body = await request.json();
    const updateData = {
      ...body,
      updatedAt: new Date(),
    };

    const [updatedItinerary] = await db
      .update(itineraries)
      .set(updateData)
      .where(eq(itineraries.id, id))
      .returning();

    if (!updatedItinerary) {
      return NextResponse.json({ error: 'Itinéraire non trouvé' }, { status: 404 });
    }

    return NextResponse.json(updatedItinerary);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'itinéraire:", error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}

// DELETE /api/itineraries/[id] - Supprime un itinéraire
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const db = getDb();
    const { id: idString } = await params;
    const id = parseInt(idString);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    const [deletedItinerary] = await db
      .delete(itineraries)
      .where(eq(itineraries.id, id))
      .returning();

    if (!deletedItinerary) {
      return NextResponse.json({ error: 'Itinéraire non trouvé' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'itinéraire:", error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
