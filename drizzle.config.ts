import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: ["./server/database/schemas/*.schema.ts"],
    out: './server/database/migrations',
    dialect: "postgresql",
    dbCredentials: {
        url: 'postgress://root:root@localhost:5432/nuxt-fullstack'
    },
    verbose: true,
    strict: true,
})