import "dotenv/config";
import { neonConfig, Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { migrate } from "drizzle-orm/neon-serverless/migrator";
import ws from "ws";
import { getNeonHttpConnectionString } from "./db/connection";

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
}

neonConfig.webSocketConstructor = ws;

const connectionString = getNeonHttpConnectionString(process.env.DATABASE_URL);
const pool = new Pool({ connectionString });
const db = drizzle({ client: pool, ws });

await migrate(db, {
    migrationsFolder: "./drizzle",
    migrationsSchema: "public",
    migrationsTable: "__drizzle_migrations",
});
await pool.end();
console.log("✅ Migrations applied successfully!");
process.exit(0);
