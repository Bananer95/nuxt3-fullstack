import { relations } from 'drizzle-orm';
import { pgTable, varchar, boolean, timestamp, uuid, pgEnum } from 'drizzle-orm/pg-core';

export const UserSchema = pgTable('user', {
    id: uuid('id').primaryKey().defaultRandom(),
    username: varchar('username', { length: 100 }).unique().notNull(),
    name: varchar('name', { length: 50 }).notNull(),
    email: varchar('email', { length: 100 }).unique().notNull(),
    passwordHash: varchar('password_hash'),
    isAdmin: boolean('is_admin').default(false),
    createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type UserSchemaSelect = typeof UserSchema.$inferSelect
export type UserSchemaInsert = typeof UserSchema.$inferInsert

export const UserTheme = pgEnum('userTheme', ['Fire', 'Water', 'Earth', 'Air', 'Light', 'Shadow', 'Ice', 'Metal', 'Spirit'])

export const UserPreferences  = pgTable('userPreferences ', {
    id: uuid('id').primaryKey().defaultRandom(),
    emailUpdates: boolean('emailUpdates').notNull().default(false),
    userId: uuid('userId').references(() => UserSchema.id, { onDelete: 'cascade' }),
    theme: UserTheme('theme').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
})

export type UserPreferencesSelect = typeof UserPreferences.$inferSelect
export type UserPreferencesInsert = typeof UserPreferences.$inferInsert

// Relations

export const UserTableRelations = relations(UserSchema, ({ one, many }) => {
    return {
        preferences: one(UserPreferences, {
            fields: [UserSchema.id],
            references: [UserPreferences.userId]
        })
    }
})