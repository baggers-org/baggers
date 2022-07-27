
FROM node:18-bullseye-slim as base

RUN apt-get update && apt-get install git -y
# Install all node_modules, including dev dependencies
FROM base as deps

RUN mkdir /app
WORKDIR /app

# This is all a massive hack to utilise yarn2 in this package
# Its the only way to get the dependencies to be immutable on the CI
RUN corepack enable
RUN yarn init -2

ADD package.json ./
ADD yarn.lock-workspace ./yarn.lock
RUN echo "nodeLinker: node-modules" >> .yarnrc.yml
RUN yarn install --immutable

# Setup production node_modules
FROM base as production-deps

RUN mkdir /app
WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
ADD package.json ./
ADD yarn.lock-workspace ./yarn.lock
RUN npm prune --production

# Build the app
FROM base as build

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules

# If we're using Prisma, uncomment to cache the prisma schema
# ADD prisma .
# RUN npx prisma generate

ADD . .
RUN yarn build

# Finally, build the production image with minimal footprint
FROM base

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY --from=production-deps /app/node_modules /app/node_modules

COPY --from=build /app/build /app/build
ADD . .

CMD ["yarn", "start"]
