import { Stack, Avatar, Link } from '@mui/material';
import { Link as RemixLink } from '@remix-run/react';
import React from 'react';
import { Symbol } from '~/generated/graphql';

export type SymbolLogoProps = {
  symbol: Symbol;
  includeSymbolLink?: boolean;
};
export const SymbolLogo: React.FC<SymbolLogoProps> = ({
  symbol,
  includeSymbolLink = true,
}) => {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar
        sx={{
          width: 30,
          height: 30,
          fontSize: 14,
        }}
      >
        {symbol?.symbol?.slice(0, 2)}
      </Avatar>
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
