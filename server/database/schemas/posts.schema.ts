import { pgTable, varchar, timestamp, uuid, serial } from 'drizzle-orm/pg-core';
import { UserSchema } from './user.schema';

export const Posts = pgTable('posts', {
    id: serial('id').primaryKey().notNull(),
    userId: uuid('userId').notNull().references(() => UserSchema.id, { onDelete: 'cascade' }),
    title: varchar('title').notNull(),
    content: varchar('content').notNull(),
    imgUrl: varchar('imageUrl'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
});

export type PostsSelect = typeof Posts.$inferSelect
export type PostsInsert = typeof Posts.$inferInsert