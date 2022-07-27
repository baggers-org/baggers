There is a bizarre bug with `@nestjs/graphql` plugin that causes `mongoose` to not be resolved
correctly.

So if your file ends with `.entity.ts` - you cannot import `mongoose`
