export const getIexEnv = () => {
  const { IEX_TOKEN, IEX_BASE_URL } = process.env;

  if (!IEX_TOKEN) throw new Error(`IEX_TOKEN not set`);
  if (!IEX_BASE_URL) throw new Error(`IEX_BASE_URL not set`);

  return {
    IEX_TOKEN,
    IEX_BASE_URL,
  };
};
