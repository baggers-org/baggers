import { NextApiResponse } from 'next';

const redirect = (res: NextApiResponse, to: string) => {
  // Do not cache redirects, or else the user may never be able to use the app lol
  res.setHeader(`Cache-Control`, `no-cache`);
  return {
    redirect: {
      destination: to,
      permanent: true,
    },
  };
};

export default redirect;
