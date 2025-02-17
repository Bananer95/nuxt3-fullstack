import { db, UserSchema, UserSchemaSelect, UserPreferences } from '~/server/database';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    interface IUpdateUser {
        title: string,
        value: string,
        id: string,
    }
    type ITheme = 'Fire' | 'Water' | 'Earth' | 'Air' | 'Light' | 'Shadow' | 'Ice' | 'Metal' | 'Spirit'
    const body: IUpdateUser = await readBody(event);

    if (!body.id) {
        return createError({ statusCode: 401, message: "User not found." });
    }

    const user: UserSchemaSelect = await db
        .select()
        .from(UserSchema)
        .where(eq(UserSchema.id, body.id))
        .limit(1)
        .execute()
        .then((res) => res[0]);

    if (!user) {
        return createError({ statusCode: 404, message: "User not found." });
    }

    const userField = body.title as keyof UserSchemaSelect;


    if (body.title !== 'theme') {
        const existingUser = await db
            .select()
            .from(UserSchema)
            .where(eq(UserSchema[userField], body.value))
            .limit(1)
            .execute()
            .then((res) => res[0]);

        if (existingUser) {
            return createError({
                statusCode: 400,
                message: "Can't change to this value",
            });
        }

        await db
            .update(UserSchema)
            .set({ [userField]: body.value })
            .where(eq(UserSchema.id, user.id))
            .execute();
    } else {
        const existingUser = await db
            .select()
            .from(UserPreferences)
            .where(eq(UserPreferences[userField], body.value))
            .limit(1)
            .execute()
            .then((res) => res[0]);

        if (existingUser) {
            return createError({
                statusCode: 400,
                message: "Can't change to this theme",
            });
        }

        await db
            .update(UserPreferences)
            .set({ theme: body.value as ITheme, updatedAt: new Date() })
            .where(eq(UserPreferences.userId, user.id))
            .execute();
    }

    const updatedUser = (await db
        .select({
            id: UserSchema.id,
            username: UserSchema.username,
            name: UserSchema.name,
            email: UserSchema.email,
            theme: UserPreferences.theme,
            isAdmin: UserSchema.isAdmin,
        })
        .from(UserSchema)
        .leftJoin(UserPreferences, eq(UserPreferences.userId, UserSchema.id))
        .where(eq(UserSchema.email, user.email))
        .limit(1)
        .execute())[0];

    const session = await replaceUserSession(event, { user: { ...updatedUser } })

    return { statusCode: 200 }

})