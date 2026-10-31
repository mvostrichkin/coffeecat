import { defineConfig } from 'drizzle-kit';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_DB } = process.env;
const connectionString = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}/${POSTGRES_DB}`;

export default defineConfig({
	out: './drizzle',
	schema: './src/lib/server/db/schema.ts',
	dialect: 'postgresql',
	dbCredentials: { url: connectionString },
	verbose: true,
	strict: true
});
