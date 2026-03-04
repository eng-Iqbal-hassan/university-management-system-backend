import "dotenv/config";
import { neonConfig, Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import { getNeonHttpConnectionString } from "./connection";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

neonConfig.webSocketConstructor = ws;

const connectionString = getNeonHttpConnectionString(process.env.DATABASE_URL);
export const pool = new Pool({ connectionString });
export const index = drizzle({ client: pool, ws });
