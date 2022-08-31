import {
  Stack,
  Avatar,
  Link,
  AvatarProps,
  Skeleton,
  useTheme,
  Tooltip,
} from '@mui/material';
import { Link as RemixLink } from '@remix-run/react';
import React, { useMemo } from 'react';
import { Help } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

export type SecurityLogoProps = {
  symbol: string;
  existsInDatabase?: boolean;
  includeSecurityLink?: boolean;
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
} & Omit<AvatarProps, 'security'>;

export const SecurityLogo: React.FC<SecurityLogoProps> = ({
  symbol,
  existsInDatabase = true,
  includeSecurityLink = true,
  size = `sm`,
  loading,
  ...avatarProps
}) => {
  const theme = useTheme();
  const { t } = useTranslation('common');
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

  const securityLink = useMemo(() => {
    if (existsInDatabase) {
      return (
        <RemixLink to={`/stock/${symbol}`}>
          <Link>{symbol}</Link>
        </RemixLink>
      );
    }
    return (
      <Tooltip
        title={t(
          'We could not find this security in our database. Market data will be read from your broker, and may be out of date.'
        )}
      >
        <Link
          sx={{
            color: theme.palette.text.disabled,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            cursor: 'help',
          }}
        >
          {symbol}
          <Help sx={{ fontSize: 12, ml: 1 }} />
        </Link>
      </Tooltip>
    );
  }, [symbol, existsInDatabase]);

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

      {includeSecurityLink ? securityLink : null}
    </Stack>
  );
};
