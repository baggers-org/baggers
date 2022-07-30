FROM node:18-bullseye-slim as base

RUN apt-get update && apt-get install git -y

RUN mkdir /baggers
WORKDIR /baggers

FROM base as deps
ADD package.json package-lock.json nx.json workspace.json tsconfig.base.json ./
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
