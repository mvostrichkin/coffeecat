import { defineEnvVars } from '@sveltejs/kit/env';
import { building } from '$app/env';

// Функция-валидатор: если переменной нет при сборке — пропускаем,
// но если её нет при запуске (runtime) — выбрасываем ошибку.
const requiredAtRuntime = (value: string | undefined, name: string) => {
  if (value === undefined) {
    if (building) return ''; // Во время сборки возвращаем пустышку
    throw new Error(`${name} is missing at runtime`);
  }
  return value;
};

export const variables = defineEnvVars({
	POSTGRES_USER: { description: 'The database user.', schema: (v) => requiredAtRuntime(v, 'POSTGRES_USER') },
	POSTGRES_PASSWORD: { description: 'The database password.', schema: (v) => requiredAtRuntime(v, 'POSTGRES_PASSWORD') },
	POSTGRES_HOST: { description: 'The database host.', schema: (v) => requiredAtRuntime(v, 'POSTGRES_HOST') },
	POSTGRES_DB: { description: 'The database name.', schema: (v) => requiredAtRuntime(v, 'POSTGRES_DB') },
	BETTER_AUTH_URL: {
		description: 'The app origin (base URL), e.g. `http://localhost:5173`.',
		schema: (v) => requiredAtRuntime(v, 'BETTER_AUTH_URL')
	},
	BETTER_AUTH_SECRET: {
		description: 'Secret used to sign tokens. For production use 32 characters generated with high entropy. See [Better Auth installation](https://www.better-auth.com/docs/installation).',
		schema: (v) => requiredAtRuntime(v, 'BETTER_AUTH_SECRET')
	}
});
