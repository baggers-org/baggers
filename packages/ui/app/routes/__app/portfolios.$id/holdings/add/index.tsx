import { ActionFunction, json } from '@remix-run/server-runtime';
import { validationError } from 'remix-validated-form';
import { AddHoldingWarning } from '~/components/AddHoldingWarning';
import { authenticatedSdk } from '~/graphql/sdk.server';
import { AddHoldingValidator } from '~/validation/portfolios/AddHolding.schema';

export const action: ActionFunction = async ({ request, params }) => {
  const headers = new Headers();
  const sdk = await authenticatedSdk(request, headers);
  const formData = Object.fromEntries(await request.formData());
  const { data, error } = await AddHoldingValidator.validate(formData);

  if (error) return validationError(error);

  const response = sdk.addHolding({
    portfolioId: params.id,
    record: data,
  });

  return json(response, { headers });
};

export default function AddHolding() {
  return (
    <>
      <AddHoldingWarning />
      Test
    </>
  );
}
