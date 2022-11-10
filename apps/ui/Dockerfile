FROM node:16.13.0-bullseye-slim as base

RUN apt-get update && apt-get install git -y

RUN mkdir /baggers
WORKDIR /baggers

FROM base as base-deps
ADD package.json package-lock.json ./
RUN npm ci
ADD . .

# Build the ui application
FROM base-deps as ui-build
ADD apps/ui ./apps/ui
RUN npm run build ui --configuration=production

FROM base as ui

WORKDIR /baggers-ui
COPY --from=ui-build /baggers/dist/apps/ui  /baggers-ui/

# TODO: we are installing all dependencies in the UI container
# TODO: generate package.json for remix projects, i think i can update
# Nrwl/remix and get this functionality
COPY --from=base-deps baggers/package.json /baggers/package-lock.json  /baggers-ui/
RUN npm ci --only=production

# TODO: prune dependencies here, its far too slow at the moment as its installing all dependenices again for some reason
CMD ["node_modules/.bin/remix-serve", "build"]