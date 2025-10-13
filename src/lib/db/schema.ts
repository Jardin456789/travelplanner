import {
  pgTable,
  text,
  jsonb,
  integer,
  serial,
  timestamp,
  index,
  foreignKey,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

// Itineraries table
export const itineraries = pgTable(
  'itineraries',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description'),
    startDate: text('start_date').notNull(),
    endDate: text('end_date').notNull(),
    totalBudget: integer('total_budget'),
    currency: text('currency'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    datesIdx: index('itineraries_dates_idx').on(table.startDate, table.endDate),
  }),
);

// Destinations table
export const destinations = pgTable(
  'destinations',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    coordinates: jsonb('coordinates').$type<{ lat: number; lng: number }>().notNull(),
    address: text('address'),
    category: text('category'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    nameIdx: index('destinations_name_idx').on(table.name),
  }),
);

// Steps table
export const steps = pgTable(
  'steps',
  {
    id: serial('id').primaryKey(),
    itineraryId: integer('itinerary_id')
      .references(() => itineraries.id, { onDelete: 'cascade' })
      .notNull(),
    date: text('date').notNull(),
    destinationId: integer('destination_id')
      .references(() => destinations.id, { onDelete: 'cascade' })
      .notNull(),
    notes: text('notes'),
    order: integer('order').notNull(),
    activities: jsonb('activities')
      .$type<
        Array<{
          id: string;
          title: string;
          description?: string;
          destinationId: string;
          startTime?: string;
          endTime?: string;
          category?: string;
        }>
      >()
      .notNull()
      .default([]),
    bikeSegment: jsonb('bike_segment').$type<{
      trajet: string;
      distance_km: number;
      route: string;
      difficulte: string;
      points_interet: string[];
      reseau_eau: string;
      coordonnees?: Record<string, number[]>;
    }>(),
    transportToNext: jsonb('transport_to_next').$type<{
      type: string;
      duration?: string;
      distance?: string;
      notes?: string;
      routeType?: string;
      difficulty?: string;
      pointsOfInterest?: string;
      networkAndWater?: string;
    }>(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    itineraryOrderIdx: index('steps_itinerary_order_idx').on(table.itineraryId, table.order),
    destinationDateIdx: index('steps_destination_date_idx').on(table.destinationId, table.date),
  }),
);

export const stepComments = pgTable(
  'step_comments',
  {
    id: serial('id').primaryKey(),
    stepId: integer('step_id')
      .references(() => steps.id, { onDelete: 'cascade' })
      .notNull(),
    parentId: integer('parent_id'),
    author: text('author').notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    stepIdx: index('step_comments_step_idx').on(table.stepId),
    parentIdx: index('step_comments_parent_idx').on(table.parentId),
    parentFk: foreignKey({
      columns: [table.parentId],
      foreignColumns: [table.id],
      name: 'step_comments_parent_fk',
    }).onDelete('cascade'),
  }),
);

// Zod schemas for validation
export const insertItinerarySchema = createInsertSchema(itineraries);
export const selectItinerarySchema = createSelectSchema(itineraries);

export const insertDestinationSchema = createInsertSchema(destinations);
export const selectDestinationSchema = createSelectSchema(destinations);

export const insertStepSchema = createInsertSchema(steps);
export const selectStepSchema = createSelectSchema(steps);
export const insertStepCommentSchema = createInsertSchema(stepComments);
export const selectStepCommentSchema = createSelectSchema(stepComments);

// Types
export type Itinerary = typeof itineraries.$inferSelect;
export type NewItinerary = typeof itineraries.$inferInsert;

export type Destination = typeof destinations.$inferSelect;
export type NewDestination = typeof destinations.$inferInsert;

export type Step = typeof steps.$inferSelect;
export type NewStep = typeof steps.$inferInsert;
export type StepComment = typeof stepComments.$inferSelect;
export type NewStepComment = typeof stepComments.$inferInsert;
