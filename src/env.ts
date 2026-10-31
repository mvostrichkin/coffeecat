import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	POSTGRES_USER: { description: 'The database user.'},
	POSTGRES_PASSWORD: { description: 'The database password.'},
	POSTGRES_HOST: { description: 'The database host.'},
	POSTGRES_DB: { description: 'The database name.'},
	BETTER_AUTH_URL: {
		description: 'The app origin (base URL), e.g. `http://localhost:5173`.'
	},
	BETTER_AUTH_SECRET: {
		description: 'Secret used to sign tokens. For production use 32 characters generated with high entropy. See [Better Auth installation](https://www.better-auth.com/docs/installation).'
	}
});
