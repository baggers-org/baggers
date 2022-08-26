import {
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListProps,
} from '@mui/material';
import { useEffect, useRef } from 'react';
import { SecurityLogo } from '~/components/SecurityLogo';
import { Security } from '@baggers/sdk';

export interface SecuritySearchResultProps extends ListProps {
  inputSecurity: Security;
  autoFocus?: boolean;
  onResultSelect: (security: Security) => void;
}
export const SecuritySearchResult: React.FC<SecuritySearchResultProps> = ({
  inputSecurity,
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
        onClick={() => onResultSelect(inputSecurity)}
        onKeyDown={(e: any) => {
          if (e.key === `Enter`) {
            onResultSelect(inputSecurity);
          }
        }}
      >
        <ListItemAvatar>
          <SecurityLogo security={inputSecurity} includeSecurityLink={false} />
        </ListItemAvatar>
        <ListItemText
          sx={{ minWidth: `100px`, whiteSpace: `nowrap`, flexWrap: `nowrap` }}
        >
          {inputSecurity.symbol}
        </ListItemText>
        <ListItemText sx={{ alignItems: `flex-start ` }}>
          {inputSecurity.name}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};
