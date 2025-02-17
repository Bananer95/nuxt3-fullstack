import { db, Posts, PostsSelect } from "~/server/database";
export default defineEventHandler(async (event) => {
    const result: PostsSelect[] = await db.select().from(Posts).execute();
    return result;
});