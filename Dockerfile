FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# Install Node.js (LTS)
RUN apt-get update && apt-get install -y curl gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean

WORKDIR /app

COPY . .

RUN npm ci && npm run build


