import type { Config } from "drizzle-kit";

let DURL = process.env.POSTGRES_URL as string | undefined;
// sslmode=require が必要
if (!DURL) {
  throw new Error(`POSTGRES_URL is not defined: URL=${DURL}`);
}
if (!DURL.includes("sslmode") && !process.env.NEXTAUTH_URL?.includes("localhost")) {
  DURL = DURL + "?sslmode=require";
}

export default {
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: DURL,
    ssl: true,
  },
  verbose: true,
  strict: false, // pushする前に承認を求めない
} satisfies Config;
