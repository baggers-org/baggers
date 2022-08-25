## API BUILD
FROM danbaggers/baggers-deps:latest as api-build
ADD apps/api ./apps/api
RUN npm run build api --configuration=production

## API runnable
FROM danbaggers/baggers-base:latest as api
WORKDIR /baggers-api
COPY --from=api-build /baggers/dist/apps/api  /baggers-api/
COPY --from=base-deps /baggers/package-lock.json  /baggers-api/
RUN npm ci
CMD ["node", "main.js"]


## Web build
FROM danbaggers/baggers-deps:latest as web-build
ADD apps/web ./apps/web
RUN npm run build web --configuration=production

## Web runnable
FROM danbaggers/baggers-base:latest as web
WORKDIR /baggers-web
COPY --from=web-build /baggers/dist/apps/web  /baggers-web/
# TODO: we are installing all dependencies in the UI container
COPY --from=base-deps /baggers/package.json /baggers/package-lock.json  /baggers-web/
RUN npm ci
CMD ["npx", "remix-serve", "build"]