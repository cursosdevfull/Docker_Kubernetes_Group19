ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-alpine AS stage-base
WORKDIR /app

FROM stage-base AS stage-dependencies
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    npm ci --omit=dev

FROM stage-base AS stage-build
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    npm ci
COPY . .
RUN npm run build

FROM stage-base AS stage-production
COPY --from=stage-dependencies /app/node_modules ./node_modules
COPY --from=stage-build /app/dist ./dist
COPY package.json .

CMD ["npm", "run", "start:prod"]
