# Build stage
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Final stage (served by Caddy)
FROM caddy:2
COPY --from=builder /app/dist /srv/frontend



