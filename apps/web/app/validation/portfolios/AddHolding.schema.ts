import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { HoldingDirection } from '@baggers/sdk';

export const AddHoldingSchema = zfd.formData({
  averagePrice: zfd.numeric(),
  direction: zfd
    .text(z.enum([HoldingDirection.Long, HoldingDirection.Short]))
    .optional()

    .default(HoldingDirection.Long),
  quantity: zfd.numeric(),
  currency: z.string().default('USD'),
});

export const AddHoldingValidator = withZod(AddHoldingSchema);
