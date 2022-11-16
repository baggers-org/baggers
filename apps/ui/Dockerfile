FROM node:16.13.0-alpine AS builder

RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=ui --docker
 
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
RUN yarn build --filter=ui
RUN yarn install --production
 
FROM node:16.13.0-alpine AS runner
WORKDIR /app
 
 
COPY --from=installer /app/apps/ui/package.json .
 
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nestjs:nodejs /app/apps/ui/build/ ./apps/ui/build/
COPY --from=installer --chown=nestjs:nodejs /app/apps/ui/public/ ./apps/ui/public/
COPY --from=installer --chown=nestjs:nodejs /app/packages/ ./packages/
COPY --from=installer --chown=nestjs:nodejs /app/node_modules/ ./node_modules
 
CMD node_modules/.bin/remix-serve ./apps/ui/build