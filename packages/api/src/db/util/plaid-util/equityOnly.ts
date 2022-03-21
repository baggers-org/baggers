export const equityOnly = (transaction) =>
  transaction.security?.type === `equity`;
