FROM node:16.13.0-alpine as base

RUN apk update && apk add git

RUN mkdir /baggers
WORKDIR /baggers

FROM base as base-deps
ADD package.json package-lock.json ./
RUN npm ci
ADD . .

FROM base-deps as build
ADD apps/cron-init-tickers ./apps/cron-init-tickers
RUN npm run build cron-init-tickers --configuration=production

FROM base as cron-init-tickers

WORKDIR /baggers-cron-init-tickers
COPY --from=build /baggers/dist/apps/cron-init-tickers  /baggers-cron-init-tickers/
COPY --from=base-deps /baggers/package-lock.json  /baggers-cron-init-tickers/

RUN npm ci --only=production

CMD [ "node", "main.js"]