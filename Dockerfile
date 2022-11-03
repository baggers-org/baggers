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

RUN npm ci
CMD ["node", "main.js"]


# Build the web application
FROM base-deps as web-build
ADD apps/ui ./apps/ui
RUN npm run build web --configuration=production

FROM base as web

WORKDIR /baggers-web
COPY --from=web-build /baggers/dist/apps/ui  /baggers-web/

# TODO: we are installing all dependencies in the UI container
COPY --from=base-deps /baggers/package.json /baggers/package-lock.json  /baggers-web/

RUN npm ci
CMD ["npx", "remix-serve", "build"]

# Build the Scheduler
FROM base-deps as scheduler-build
ADD apps/scheduler ./apps/scheduler

RUN npm run build scheduler --configuration=production

FROM base as scheduler

WORKDIR /baggers-scheduler
COPY --from=scheduler-build /baggers/dist/apps/scheduler  /baggers-scheduler/
COPY --from=base-deps /baggers/package-lock.json  /baggers-scheduler/

RUN npm ci
RUN npm i tslib
CMD ["node", "main.js"]