import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  itineraries: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    startDate: v.string(),
    endDate: v.string(),
    totalBudget: v.optional(v.number()),
    currency: v.optional(v.string())
  }).index('by_dates', ['startDate', 'endDate']),

  destinations: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    coordinates: v.object({
      lat: v.number(),
      lng: v.number()
    }),
    address: v.optional(v.string()),
    category: v.optional(v.string())
  }).index('by_name', ['name']),

  steps: defineTable({
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
        coordonnees: v.optional(
          v.record(v.string(), v.array(v.number()))
        )
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
  })
    .index('by_itinerary_order', ['itineraryId', 'order'])
    .index('by_destination_date', ['destinationId', 'date'])
});
