import { AuthenticationError } from 'apollo-server-lambda';

export const authenticate = (condition: boolean, throwError?: Error) => {
  if (!condition) {
    if (throwError) {
      throw throwError;
    }
    throw new AuthenticationError(
      `You do not have permission to access this resource`,
    );
  }
};
