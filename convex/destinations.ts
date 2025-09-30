import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const list = query({
  handler: async ({ db }) => {
    return await db.query('destinations').collect();
  }
});

export const searchByName = query({
  args: { name: v.string() },
  handler: async ({ db }, { name }) => {
    return await db
      .query('destinations')
      .withIndex('by_name', (q) => q.eq('name', name))
      .unique();
  }
});

export const upsert = mutation({
  args: {
    id: v.optional(v.id('destinations')),
    name: v.string(),
    description: v.optional(v.string()),
    coordinates: v.object({ lat: v.number(), lng: v.number() }),
    address: v.optional(v.string()),
    category: v.optional(v.string())
  },
  handler: async ({ db }, args) => {
    if (args.id) {
      await db.patch(args.id, {
        name: args.name,
        description: args.description,
        coordinates: args.coordinates,
        address: args.address,
        category: args.category
      });
      return args.id;
    }

    return await db.insert('destinations', {
      name: args.name,
      description: args.description,
      coordinates: args.coordinates,
      address: args.address,
      category: args.category
    });
  }
});

export const remove = mutation({
  args: { id: v.id('destinations') },
  handler: async ({ db }, { id }) => {
    await db.delete(id);
  }
});
