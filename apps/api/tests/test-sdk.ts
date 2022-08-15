import { User1, User2 } from '~/users';
import { SdkBuilder } from '@baggers/sdk';
import { getAppUrl } from './jest/setup';

export const TestSdk = () => {
  return new SdkBuilder().setUrl(getAppUrl());
};

export const User1Sdk = () => TestSdk().setAuthHeader(User1._id).build();
export const User2Sdk = () => TestSdk().setAuthHeader(User2._id).build();
