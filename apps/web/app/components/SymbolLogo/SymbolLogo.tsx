import { Stack, Avatar, Link, AvatarProps, Skeleton } from '@mui/material';
import { Link as RemixLink } from '@remix-run/react';
import React, { useMemo } from 'react';
import { Symbol } from '~/generated/graphql';

export type SymbolLogoProps = {
  symbol: Symbol;
  includeSymbolLink?: boolean;
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
} & AvatarProps;
export const SymbolLogo: React.FC<SymbolLogoProps> = ({
  symbol,
  includeSymbolLink = true,
  size = `sm`,
  loading,
  ...avatarProps
}) => {
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
          {symbol?.symbol?.slice(0, 2)}
        </Avatar>
      ) : (
        <Skeleton variant="circular">
          <Avatar sx={{ width, height }} />
        </Skeleton>
      )}
      {includeSymbolLink ? (
        <Link sx={{ fontWeight: `bold` }}>
          <RemixLink to={`/stock/${symbol?.symbol}`}>
            {symbol?.symbol}
          </RemixLink>
        </Link>
      ) : null}
    </Stack>
  );
};
