# Stage 1 — build
FROM node:18 AS builder
WORKDIR /app

# copy config files and package files first to leverage Docker layer caching
COPY vite.config.js web/postcss.config.js web/tailwind.config.js* ./
COPY web/package.json web/package-lock.json* ./
RUN npm install

# copy the rest of the frontend sources and build
COPY web/ .
RUN npm run build

# Stage 2 — serve static files
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]