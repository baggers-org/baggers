FROM node:16.13.0-alpine AS builder

RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=cron-init-tickers --docker
 
# Add lockfile and package.json's of isolated subworkspace
FROM node:16.13.0-alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
 
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install
 
# # # Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN yarn build --filter=cron-init-tickers
RUN yarn install --production
 
FROM node:16.13.0-alpine AS runner
WORKDIR /app
 
 
COPY --from=installer /app/apps/cron-init-tickers/package.json .
 
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nestjs:nodejs /app/apps/cron-init-tickers/build/ ./apps/cron-init-tickers/build/
COPY --from=installer --chown=nestjs:nodejs /app/packages/ ./packages/
COPY --from=installer --chown=nestjs:nodejs /app/node_modules/ ./node_modules
 
CMD node ./apps/cron-init-tickers/build/main.js