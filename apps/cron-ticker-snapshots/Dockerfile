FROM node:16.13.0-alpine as base

RUN apk update && apk add git

RUN mkdir /baggers
WORKDIR /baggers

FROM base as base-deps
ADD package.json package-lock.json ./
RUN npm ci
ADD . .

FROM base-deps as build
ADD apps/cron-ticker-snapshots ./apps/cron-ticker-snapshots
RUN npm run build cron-ticker-snapshots --configuration=production

FROM base as cron-ticker-snapshots

WORKDIR /baggers-cron-ticker-snapshots
COPY --from=build /baggers/dist/apps/cron-ticker-snapshots  /baggers-cron-ticker-snapshots/
COPY --from=base-deps /baggers/package-lock.json  /baggers-cron-ticker-snapshots/

RUN npm ci --only=production

CMD [ "node", "main.js"]