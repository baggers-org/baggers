import { ImportedSecurity, Security, SecurityType } from '@baggers/sdk';
import {
  Stack,
  Avatar,
  Link,
  AvatarProps,
  Skeleton,
  useTheme,
} from '@mui/material';
import { Link as RemixLink } from '@remix-run/react';
import React, { useMemo } from 'react';
import { isImportedSecurity } from '@baggers/type-util';
import {
  AttachMoneyOutlined,
  AttachMoneyTwoTone,
  SavingsOutlined,
} from '@mui/icons-material';

export type SecurityLogoProps = {
  security: Security | ImportedSecurity;
  includeSecurityLink?: boolean;
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
} & Omit<AvatarProps, 'security'>;

export const SecurityLogo: React.FC<SecurityLogoProps> = ({
  security,
  includeSecurityLink = true,
  size = `sm`,
  loading,
  ...avatarProps
}) => {
  const theme = useTheme();
  const { width, height } = useMemo(() => {
    if (size === `md`)
      return {
        width: 64,
        height: 64,
      };
    if (size === `lg`)
      return {
        width: 128,
        height: 128,
      };
    return {
      width: 32,
      height: 32,
    };
  }, [size]);

  let symbol;
  if (isImportedSecurity(security)) {
    symbol = security.ticker_symbol;
  } else {
    symbol = security.symbol;
  }

  if (security.type === SecurityType.Cash) {
    return (
      <>
        <SavingsOutlined />
        {security.name}
      </>
    );
  }
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      {!loading ? (
        <Avatar
          sx={{
            width,
            height,
            fontSize: 14,
          }}
          {...avatarProps}
        >
          {symbol?.slice(0, 2)}
        </Avatar>
      ) : (
        <Skeleton variant="circular">
          <Avatar sx={{ width, height }} />
        </Skeleton>
      )}
      {includeSecurityLink ? (
        <Link sx={{ fontWeight: `bold` }}>
          <RemixLink to={`/stock/${symbol}`}>{symbol}</RemixLink>
        </Link>
      ) : null}
    </Stack>
  );
};
