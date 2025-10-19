FROM node:22-alpine as build-stage

RUN mkdir /app

COPY . /app

RUN cd /app && \
    npm install && \
    npm run build

# FROM nginx:alpine

# COPY --from=build-stage /app/dist/ /usr/share/nginx/html

# CMD ["nginx", "-g", "daemon off;"]

