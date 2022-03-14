import { ApolloError } from 'apollo-server-express';

export class NotFoundError extends ApolloError {
  constructor(msg: string) {
    super(msg, `NOT_FOUND`);
    Object.defineProperty(this, `name`, { value: `NotFoundError` });
  }
}
