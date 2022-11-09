FROM node:16.13.0-alpine as base

RUN apk update && apk add git

RUN mkdir /baggers
WORKDIR /baggers

FROM base as base-deps
ADD package.json package-lock.json ./
RUN npm ci
ADD . .

FROM base-deps as build
ADD apps/cron-ticker-info ./apps/cron-ticker-info
RUN npm run build cron-ticker-info --configuration=production

FROM base as cron-ticker-info

WORKDIR /baggers-cron-ticker-info
COPY --from=build /baggers/dist/apps/cron-ticker-info  /baggers-cron-ticker-info/
COPY --from=base-deps /baggers/package-lock.json  /baggers-cron-ticker-info/

RUN npm ci --only=production

CMD [ "node", "main.js"]