FROM node:16.13.0-bullseye-slim as base

RUN apt-get update && apt-get install git -y

RUN mkdir /baggers
WORKDIR /baggers

FROM base as base-deps
ADD package.json package-lock.json ./
RUN npm ci
ADD . .

# Build the API 
FROM base-deps as api-build
ADD apps/api ./apps/api

RUN npm run build api --configuration=production

FROM base as api

WORKDIR /baggers-api
COPY --from=api-build /baggers/dist/apps/api  /baggers-api/
COPY --from=base-deps /baggers/package-lock.json  /baggers-api/
COPY --from=base-deps /baggers/node_modules  /baggers-api/node_modules


RUN npm prune --production
CMD ["node", "main.js"]