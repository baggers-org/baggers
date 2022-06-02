export const cronFetch = async (
  endpoint: string,
  options: RequestInit = {},
) => {
  const {
    AUTH0_DOMAIN,
    AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET,
    API_URI,
  } = process.env;

  if (!AUTH0_DOMAIN) throw new Error(`AUTH0_DOMAIN not set`);
  if (!AUTH0_CLIENT_ID) throw new Error(`AUTH0_CLIENT_ID not set`);
  if (!AUTH0_CLIENT_SECRET) throw new Error(`AUTH0_CLIENT_SECRET not set`);
  if (!API_URI) throw new Error(`API_URI not set`);

  const res = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
    method: `post`,
    headers: { 'content-type': `application/json` },
    body: JSON.stringify({
      client_id: AUTH0_CLIENT_ID,
      client_secret: AUTH0_CLIENT_SECRET,
      audience: `${API_URI}/cron`,
      grant_type: `client_credentials`,
    }),
  });

  if (res.ok) {
    const { access_token: accessToken } = (await res.json()) as any;

    return fetch(`${API_URI}/cron${endpoint}`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
        ...(options?.headers || {}),
      },
      ...options,
    });
  }

  console.error(res);
  throw new Error(`There was an error with the cron request`);
};
