import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const list = query({
  handler: async ({ db }) => {
    return await db.query('itineraries').collect();
  }
});

export const get = query({
  args: { id: v.id('itineraries') },
  handler: async ({ db }, { id }) => {
    return await db.get(id);
  }
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    startDate: v.string(),
    endDate: v.string(),
    totalBudget: v.optional(v.number()),
    currency: v.optional(v.string())
  },
  handler: async ({ db }, args) => {
    return await db.insert('itineraries', args);
  }
});

export const update = mutation({
  args: {
    id: v.id('itineraries'),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
    totalBudget: v.optional(v.number()),
    currency: v.optional(v.string())
  },
  handler: async ({ db }, { id, ...partial }) => {
    await db.patch(id, partial);
    return id;
  }
});

export const remove = mutation({
  args: { id: v.id('itineraries') },
  handler: async ({ db }, { id }) => {
    await db.delete(id);
  }
});
