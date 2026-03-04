import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { getNeonHttpConnectionString } from "./connection";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

const sql = neon(getNeonHttpConnectionString(process.env.DATABASE_URL));
export const index = drizzle(sql);
export const pool: { end: () => Promise<void> } | undefined = undefined;
