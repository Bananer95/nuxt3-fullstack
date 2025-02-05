import { db, Posts, PostsSelect } from "~/server/database";
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    const idParam = getRouterParam(event, 'id');
    if (!idParam) {
        throw createError({ statusCode: 400, statusMessage: "ID is required" });
    }

    const id = Number(idParam);

    const result: PostsSelect[] = await db
        .select()
        .from(Posts)
        .where(eq(Posts.id, id))
        .execute();

    if (result.length === 0) {
        throw createError({ statusCode: 404, statusMessage: "Post not found" });
    }

    return result[0];
});