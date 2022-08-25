FROM node:18-bullseye-slim as base

RUN apt-get update && apt-get install git -y

RUN mkdir /baggers
WORKDIR /baggers

FROM base as deps
ADD . .
RUN npm ci

# Build the API 
FROM deps as api-build
ADD apps/api ./apps/api

RUN npm run build api --configuration=production

FROM base as api

WORKDIR /baggers-api
COPY --from=api-build /baggers/dist/apps/api  /baggers-api/
COPY --from=deps /baggers/package-lock.json  /baggers-api/

RUN npm ci
CMD ["node", "main.js"]


# Build the web application
FROM base as web-build
ADD apps/web ./apps/web
RUN npm run build web --configuration=production

FROM base as web

WORKDIR /baggers-web
COPY --from=web-build /baggers/dist/apps/web  /baggers-web/

# TODO: we are installing all dependencies in the UI container
COPY --from=deps /baggers/package.json /baggers/package-lock.json  /baggers-web/

RUN npm ci
CMD ["npx", "remix-serve", "build"]