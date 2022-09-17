import { SecurityType } from '@baggers/sdk';

export const mapSecurityType = (type: string): SecurityType => {
  switch (type) {
    case 'cef':
    case 'oef': {
      return SecurityType.MutualFund;
    }

    case 'et': {
      return SecurityType.Etf;
    }

    case 'wt': {
      return SecurityType.Derivative;
    }

    default: {
      return SecurityType.Equity;
    }
  }
};
