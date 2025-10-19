ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-alpine AS stage-base
RUN apk add curl
WORKDIR /app

FROM stage-base AS stage-dependencies
COPY package*.json ./
RUN npm ci --omit=dev

FROM stage-base AS stage-production
USER node
COPY --from=stage-dependencies /app/node_modules ./node_modules
COPY . .
CMD ["npm", "start"]