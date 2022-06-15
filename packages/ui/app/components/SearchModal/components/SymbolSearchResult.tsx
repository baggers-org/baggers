import {
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListProps,
  useTheme,
} from '@mui/material';
import { useEffect, useRef } from 'react';
import { SymbolLogo } from '~/components/SymbolLogo';
import { Symbol } from '~/generated/graphql';

export interface SymbolSearchResultProps extends ListProps {
  symbol: Symbol;
  autoFocus?: boolean;
  onResultSelect: (symbol: Symbol) => void;
}
export const SymbolSearchResult: React.FC<SymbolSearchResultProps> = ({
  symbol,
  autoFocus,
  onResultSelect,
}) => {
  const result = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (autoFocus && result.current) {
      result.current?.focus();
    }
  }, [autoFocus, result]);
  return (
    <ListItem alignItems="flex-start">
      <ListItemButton
        ref={result}
        component="a"
        onClick={() => onResultSelect(symbol)}
        onKeyDown={(e: any) => {
          if (e.key === `Enter`) {
            onResultSelect(symbol);
          }
        }}
      >
        <ListItemAvatar>
          <SymbolLogo symbol={symbol} includeSymbolLink={false} />
        </ListItemAvatar>
        <ListItemText
          sx={{ minWidth: `100px`, whiteSpace: `nowrap`, flexWrap: `nowrap` }}
        >
          {symbol.symbol}
        </ListItemText>
        <ListItemText sx={{ alignItems: `flex-start ` }}>
          {symbol.name}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};
