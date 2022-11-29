import { LoaderFunction, redirect } from '@remix-run/node';

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const imgUrl = url.searchParams.get('url');

  if (!imgUrl) {
    throw redirect('/', { status: 404, statusText: 'URL invalid' });
  }
  return fetch(imgUrl);
};
