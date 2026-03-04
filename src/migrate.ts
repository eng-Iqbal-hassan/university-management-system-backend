import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { getNeonHttpConnectionString } from "./db/connection";

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
}

const sql = neon(getNeonHttpConnectionString(process.env.DATABASE_URL));
const db = drizzle(sql);

await migrate(db, {
    migrationsFolder: "./drizzle",
    migrationsSchema: "public",
    migrationsTable: "__drizzle_migrations",
});
console.log("✅ Migrations applied successfully!");
process.exit(0);
