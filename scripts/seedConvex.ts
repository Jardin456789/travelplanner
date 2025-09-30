import { config as loadEnv } from 'dotenv';
import path from 'path';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../convex/_generated/api.js';
import type { Id } from '../convex/_generated/dataModel';

loadEnv({ path: path.resolve(process.cwd(), '.env.local') });

const deploymentUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!deploymentUrl) {
  console.error('NEXT_PUBLIC_CONVEX_URL is not set. Run `npx convex dev` to configure it.');
  process.exit(1);
}

const convex = new ConvexHttpClient(deploymentUrl);

async function ensureDestinations() {
  const { destinations } = await import('../src/data/destinations');
  const idMap = new Map<string, Id<'destinations'>>();

  for (const destination of destinations) {
    const existing = await convex.query(api.destinations.searchByName, {
      name: destination.name,
    });

    if (existing?._id) {
      idMap.set(destination.id, existing._id as Id<'destinations'>);
      continue;
    }

    const inserted = await convex.mutation(api.destinations.upsert, {
      name: destination.name,
      description: destination.description ?? undefined,
      coordinates: {
        lat: destination.coordinates.lat,
        lng: destination.coordinates.lng,
      },
      address: destination.address ?? undefined,
      category: destination.category ?? undefined,
    });

    idMap.set(destination.id, inserted as Id<'destinations'>);
  }

  return idMap;
}

async function ensureItinerary() {
  const { itinerary } = await import('../src/data/itinerary');
  const itineraries = await convex.query(api.itineraries.list, {});
  const existing = itineraries.find((item) => item.title === itinerary.title);

  if (existing?._id) {
    return existing._id as Id<'itineraries'>;
  }

  const created = await convex.mutation(api.itineraries.create, {
    title: itinerary.title,
    description: itinerary.description ?? undefined,
    startDate: itinerary.startDate,
    endDate: itinerary.endDate,
    totalBudget: itinerary.totalBudget ?? undefined,
    currency: itinerary.currency ?? undefined,
  });

  return created as Id<'itineraries'>;
}

async function resetSteps(itineraryId: Id<'itineraries'>) {
  const steps = await convex.query(api.steps.listByItinerary, { itineraryId });

  for (const step of steps) {
    await convex.mutation(api.steps.deleteStep, { id: step._id });
  }
}

async function seedSteps(itineraryId: Id<'itineraries'>, destinationMap: Map<string, Id<'destinations'>>) {
  const { dayItineraries } = await import('../src/data/itinerary');

  for (const day of dayItineraries) {
    const destId = destinationMap.get(day.destination.id);
    if (!destId) {
      console.warn(`Destination ${day.destination.id} missing in Convex, skipping step ${day.order}`);
      continue;
    }

    await convex.mutation(api.steps.upsertStep, {
      itineraryId,
      date: day.date,
      destinationId: destId,
      notes: day.notes ?? undefined,
      order: day.order,
      activities: day.activities.map((activity) => ({
        id: activity.id,
        title: activity.title,
        description: activity.description ?? undefined,
        destinationId: activity.destinationId,
        startTime: activity.startTime ?? undefined,
        endTime: activity.endTime ?? undefined,
        category: activity.category ?? undefined,
      })),
      bikeSegment: day.bikeSegment
        ? {
            trajet: day.bikeSegment.trajet,
            distance_km: day.bikeSegment.distance_km,
            route: day.bikeSegment.route,
            difficulte: day.bikeSegment.difficulte,
            points_interet: day.bikeSegment.points_interet,
            reseau_eau: day.bikeSegment.reseau_eau,
            coordonnees: day.bikeSegment.coordonnees ?? undefined,
          }
        : undefined,
      transportToNext: day.transportToNext
        ? {
            type: day.transportToNext.type,
            duration: day.transportToNext.duration ?? undefined,
            distance: day.transportToNext.distance ?? undefined,
            notes: day.transportToNext.notes ?? undefined,
            routeType: day.transportToNext.routeType ?? undefined,
            difficulty: day.transportToNext.difficulty ?? undefined,
            pointsOfInterest: day.transportToNext.pointsOfInterest ?? undefined,
            networkAndWater: day.transportToNext.networkAndWater ?? undefined,
          }
        : undefined,
    });
  }
}

async function main() {
  console.log('Seeding Convex data...');
  const destMap = await ensureDestinations();
  console.log(`Destinations ready (${destMap.size}).`);
  const itineraryId = await ensureItinerary();
  console.log(`Itinerary ready (${itineraryId}).`);
  await resetSteps(itineraryId);
  console.log('Existing steps cleared.');
  await seedSteps(itineraryId, destMap);
  console.log('Steps inserted.');
  console.log('Convex database seeded successfully.');
  process.exit(0);
}

main().catch((error) => {
  console.error('Failed to seed Convex data');
  console.error(error);
  process.exit(1);
});
