import { db, Posts } from "~/server/database";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    console.log(id)
    if (!id) {
        return createError({
            statusCode: 403,
            message: "ID is required",
        });
    }

    const result = await db.delete(Posts).where(eq(Posts.id, id)).execute();

    return { message: result.length > 0 ? 'Post deleted successfully' : 'Post not found' };
});