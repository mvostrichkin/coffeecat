# === Этап 1: Сборка приложения ===
FROM node:24-alpine AS builder

WORKDIR /app

# Копируем списки зависимостей
COPY package*.json ./

# Устанавливаем все пакеты для сборки
RUN npm ci

# Копируем исходный код (включая vite.config.ts и src/)
COPY . .

# Компилируем SvelteKit (Vite создаст папку build/)
RUN npm run build

# Удаляем devDependencies (оставляем только mongodb/mongoose и т.д.)
RUN npm prune --production


# === Этап 2: Финальный продакшн-образ ===
FROM node:24-alpine

WORKDIR /app

# Переносим только скомпилированный код и production-зависимости
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Запуск чистого Node.js сервера SvelteKit
CMD ["node", "build/index.js"]
