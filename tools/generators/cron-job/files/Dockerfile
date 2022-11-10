FROM node:16.13.0-alpine as base

RUN apk update && apk add git

RUN mkdir /baggers
WORKDIR /baggers

FROM base as base-deps
ADD package.json package-lock.json ./
RUN npm ci
ADD . .

FROM base-deps as build
ADD apps/<%= name %> ./apps/<%= name %>
RUN npm run build <%= name %> --configuration=production

FROM base as <%= name %>

WORKDIR /baggers-<%= name %>
COPY --from=build /baggers/dist/apps/<%= name %>  /baggers-<%= name %>/
COPY --from=base-deps /baggers/package-lock.json  /baggers-<%= name %>/

RUN npm ci --only=production

CMD [ "node", "main.js"]