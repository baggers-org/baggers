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
  const theme = useTheme();
  const result = useRef<HTMLButtonElement>();

  useEffect(() => {
    if (autoFocus && result.current) {
      result.current?.focus();
    }
  }, [autoFocus, result]);
  return (
    <ListItem>
      <ListItemButton
        ref={result}
        component="button"
        onClick={() => onResultSelect(symbol)}
        onKeyDown={(e) => {
          if (e.key === `Enter`) {
            onResultSelect(symbol);
          }
        }}
      >
        <ListItemAvatar>
          <SymbolLogo symbol={symbol} includeSymbolLink={false} />
        </ListItemAvatar>
        <ListItemText>{symbol.symbol}</ListItemText>
        <ListItemText>{symbol.name}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
};
