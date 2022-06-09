import { withZod } from '@remix-validated-form/with-zod';
import { zfd } from 'zod-form-data';

export const AddHoldingSchema = zfd.formData({
  averagePrice: zfd.numeric(),
  direction: zfd.text(),
  quantity: zfd.numeric(),
  symbol: zfd.text(),
  holdingType: zfd.text(),
  brokerFees: zfd.numeric(),
});

export const AddHoldingValidator = withZod(AddHoldingSchema);
