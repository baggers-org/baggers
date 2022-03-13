import { json, LoaderFunction } from '@remix-run/server-runtime';

export const loader: LoaderFunction = async ({ params, request }) => {
  const { symbol } = params;

  const requestParams = new URL(request.url).searchParams;

  const url = new URL(
    `${process.env.IEX_BASE_URL}stock/${symbol}/chart/${params[`*`]}?${
      requestParams?.toString() || ``
    }`,
  );

  if (!process.env.IEX_TOKEN) {
    return json(
      {
        message: `IEX TOKEN not found in env. `,
      },
      { status: 403 },
    );
  }
  url.searchParams.append(`token`, process.env.IEX_TOKEN);

  const res = await fetch(url.toString());

  if (res.ok) {
    return res.json();
  }

  console.error(res);
  return json({
    message: `There was an error fetching the chart for ${symbol}`,
  });
};
