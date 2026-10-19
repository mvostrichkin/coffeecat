FROM node:24-alpine
WORKDIR /app
RUN npm init -y && npm install mongoose
COPY index.js .
EXPOSE 3000
CMD ["node", "index.js"]
