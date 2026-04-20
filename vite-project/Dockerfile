FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build        

FROM caddy:latest
# 1. Copy the Caddyfile from your main repo root into the container
COPY Caddyfile /etc/caddy/Caddyfile

# 2. Copy the built React files into the location Caddy expects
COPY --from=builder /app/dist /srv/frontend

EXPOSE 80