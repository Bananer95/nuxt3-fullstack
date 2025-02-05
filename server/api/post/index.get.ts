import { db, Posts, PostsSelect } from "~/server/database";
export default defineEventHandler(async (event) => {
    console.log('mimi')
    const result: PostsSelect[] = await db.select().from(Posts).execute();
    return result;
});