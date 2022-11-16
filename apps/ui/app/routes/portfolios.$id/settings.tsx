import { type ActionFunction, redirect, json } from '@remix-run/node';
import { authenticatedSdk } from '~/server/sdk.server';

export const action: ActionFunction = async ({ request, params }) => {
  const headers = new Headers();
  const sdk = await authenticatedSdk(request);

  // const formData = await request.formData();

  // const subaction = formData.get('subaction');

  // if (subaction === 'privacy') {
  //   const { data, error } = await PortfolioPrivacyValidator.validate(formData);

  //   if (error) return validationError(error);

  //   return await sdk.portfoliosUpdateOne({
  //     _id: params.id,
  //     input: {
  //       private: data.private,
  //     },
  //   });
  // }

  if (request.method === `DELETE`) {
    await sdk.portfoliosRemoveOne({ _id: params.id });

    return redirect(`/portfolios/created`, { headers });
  }

  return json({ error: `not support` }, { status: 405 });
};
export default function PortfolioSettings() {
  return <div>Settings</div>;
}
