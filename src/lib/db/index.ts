import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from './schema';

declare global {
  var __drizzleDb__: NeonHttpDatabase<typeof schema> | undefined;
}

function createDb(): NeonHttpDatabase<typeof schema> {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined. Set it to connect to the database.');
  }

  const client = neon(connectionString);
  return drizzle(client, { schema });
}

export function getDb(): NeonHttpDatabase<typeof schema> {
  if (!globalThis.__drizzleDb__) {
    globalThis.__drizzleDb__ = createDb();
  }

  return globalThis.__drizzleDb__;
}
