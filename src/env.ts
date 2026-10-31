import { defineEnvVars } from '@sveltejs/kit/env';
import { building } from '$app/env';

export const variables = defineEnvVars({
	POSTGRES_USER: { description: 'The database user.', optional: building },
	POSTGRES_PASSWORD: { description: 'The database password.', optional: building },
	POSTGRES_HOST: { description: 'The database host.', optional: building },
	POSTGRES_DB: { description: 'The database name.', optional: building },
	BETTER_AUTH_URL: {
		description: 'The app origin (base URL), e.g. `http://localhost:5173`.',
		optional: building
	},
	BETTER_AUTH_SECRET: {
		description: 'Secret used to sign tokens. For production use 32 characters generated with high entropy. See [Better Auth installation](https://www.better-auth.com/docs/installation).',
		optional: building 
	}
});
