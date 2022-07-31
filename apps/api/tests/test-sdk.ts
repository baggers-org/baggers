import { SdkBuilder } from '@baggers/sdk';
import { getAppUrl } from './jest/setup';

export const TestSdk = () => {
  return new SdkBuilder().setUrl(getAppUrl());
};
