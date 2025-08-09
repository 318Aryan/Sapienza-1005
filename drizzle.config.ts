import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql", // <-- add this line
  // Remove or update driver according to docs; you can remove it if unsure
  // driver: "pg", // <-- remove this line

  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
