import { Alert, List, ModalProps } from '@mui/material';
import { Symbol } from '~/generated/graphql';
import {
  BaseSearchModal,
  BaseSearchModalProps,
} from './components/BaseSearchModal';
import { SymbolSearchResult } from './components/SymbolSearchResult';

export type SymbolSearchModalProps = Omit<
  ModalProps &
    Pick<BaseSearchModalProps<Symbol>, 'modalTitle' | 'onResultSelect'>,
  'children'
>;
export const SymbolSearchModal: React.FC<SymbolSearchModalProps> = ({
  ...baseProps
}) => {
  return (
    <BaseSearchModal<Symbol>
      getSearchHref={(term) => `/symbols/${term}?index`}
      renderResults={(results: Symbol[], onResultSelect) => {
        return (
          <List component="ul">
            {results.map((symb, index) => (
              <SymbolSearchResult
                symbol={symb}
                autoFocus={index === 0}
                onResultSelect={onResultSelect}
              />
            ))}
          </List>
        );
      }}
      renderNoResults={() => <Alert>no data lol</Alert>}
      capitalise
      {...baseProps}
    />
  );
};
