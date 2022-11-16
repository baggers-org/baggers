FROM node:16.13.0-alpine AS builder

RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=api --docker
 
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
RUN yarn global add @nestjs/cli
 
# # # Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN yarn build --filter=api
RUN yarn install --production
 
FROM node:16.13.0-alpine AS runner
WORKDIR /app
 
 
COPY --from=installer /app/apps/api/package.json .
 
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nestjs:nodejs /app/apps/api/build ./apps/api/build
COPY --from=installer --chown=nestjs:nodejs /app/packages/ ./packages/
COPY --from=installer --chown=nestjs:nodejs /app/node_modules/ ./node_modules
 
CMD node apps/api/build/main.js