import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { HoldingDirection, HoldingType } from '~/generated/graphql';

export const AddHoldingSchema = zfd.formData({
  averagePrice: zfd.numeric(),
  direction: zfd
    .text(z.enum([HoldingDirection.Long, HoldingDirection.Short]))
    .optional()

    .default(HoldingDirection.Long),
  quantity: zfd.numeric(),
  type: zfd
    .text(z.enum([HoldingType.Shares, HoldingType.Calls, HoldingType.Puts]))
    .optional()
    .default(HoldingType.Shares),
});

export const AddHoldingValidator = withZod(AddHoldingSchema);
