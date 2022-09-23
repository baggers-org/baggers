import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { HoldingDirection } from '@baggers/graphql-types';

export const AddHoldingSchema = zfd.formData({
  averagePrice: zfd.numeric(),
  direction: zfd
    .text(z.enum([HoldingDirection.Long, HoldingDirection.Short]))
    .optional()

    .default(HoldingDirection.Long),
  quantity: zfd.numeric(),
  currency: z.string().default('USD'),
  transactionDate: z.string(),
  brokerFees: zfd.numeric().optional(),
});

export const AddHoldingValidator = withZod(AddHoldingSchema);
