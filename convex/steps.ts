import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const listByItinerary = query({
  args: { itineraryId: v.id('itineraries') },
  handler: async ({ db }, { itineraryId }) => {
    return await db
      .query('steps')
      .withIndex('by_itinerary_order', (q) => q.eq('itineraryId', itineraryId))
      .order('asc')
      .collect();
  }
});

export const getStep = query({
  args: { id: v.id('steps') },
  handler: async ({ db }, { id }) => {
    return await db.get(id);
  }
});

export const upsertStep = mutation({
  args: {
    id: v.optional(v.id('steps')),
    itineraryId: v.id('itineraries'),
    date: v.string(),
    destinationId: v.id('destinations'),
    notes: v.optional(v.string()),
    order: v.number(),
    activities: v.array(
      v.object({
        id: v.string(),
        title: v.string(),
        description: v.optional(v.string()),
        destinationId: v.string(),
        startTime: v.optional(v.string()),
        endTime: v.optional(v.string()),
        category: v.optional(v.string())
      })
    ),
    bikeSegment: v.optional(
      v.object({
        trajet: v.string(),
        distance_km: v.number(),
        route: v.string(),
        difficulte: v.string(),
        points_interet: v.array(v.string()),
        reseau_eau: v.string(),
        coordonnees: v.optional(v.record(v.string(), v.array(v.number())))
      })
    ),
    transportToNext: v.optional(
      v.object({
        type: v.string(),
        duration: v.optional(v.string()),
        distance: v.optional(v.string()),
        notes: v.optional(v.string()),
        routeType: v.optional(v.string()),
        difficulty: v.optional(v.string()),
        pointsOfInterest: v.optional(v.string()),
        networkAndWater: v.optional(v.string())
      })
    )
  },
  handler: async ({ db }, args) => {
    if (args.id) {
      await db.patch(args.id, {
        itineraryId: args.itineraryId,
        date: args.date,
        destinationId: args.destinationId,
        notes: args.notes,
        order: args.order,
        activities: args.activities,
        bikeSegment: args.bikeSegment,
        transportToNext: args.transportToNext
      });
      return args.id;
    }

    return await db.insert('steps', {
      itineraryId: args.itineraryId,
      date: args.date,
      destinationId: args.destinationId,
      notes: args.notes,
      order: args.order,
      activities: args.activities,
      bikeSegment: args.bikeSegment,
      transportToNext: args.transportToNext
    });
  }
});

export const deleteStep = mutation({
  args: { id: v.id('steps') },
  handler: async ({ db }, { id }) => {
    await db.delete(id);
  }
});
