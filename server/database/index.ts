import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const queryClient = postgres(process.env.DATABASE_URL as string);
export const db = drizzle({ client: queryClient });

export * from './schemas/user.schema';
export * from './schemas/posts.schema';