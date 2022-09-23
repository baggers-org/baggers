import { withZod } from '@remix-validated-form/with-zod';
import { zfd } from 'zod-form-data';

export const PortfolioPrivacy = zfd.formData({
  private: zfd.text().transform((t) => t === 'true'),
});

export const PortfolioPrivacyValidator = withZod(PortfolioPrivacy);
