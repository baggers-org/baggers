import { Alert, AlertTitle, List, ModalProps } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Security } from '@baggers/sdk';
import {
  BaseSearchModal,
  BaseSearchModalProps,
} from './components/BaseSearchModal';
import { SecuritySearchResult } from './components/SecuritySearchResult';

export type SecuritySearchModalProps = Omit<
  ModalProps &
    Pick<BaseSearchModalProps<Security>, 'modalTitle' | 'onResultSelect'>,
  'children'
>;
export const SecuritySearchModal: React.FC<SecuritySearchModalProps> = ({
  ...baseProps
}) => {
  const { t } = useTranslation(`search_securitys`);
  return (
    <BaseSearchModal<Security>
      getSearchHref={(term) => `/symbols/${term}?index`}
      searchInputProps={{
        placeholder: t(`search_securities`, `Search securities`),
      }}
      renderResults={(results: Security[], onResultSelect) => {
        return (
          <List component="ul">
            {results.map((symb, index) => (
              <SecuritySearchResult
                inputSecurity={symb}
                autoFocus={index === 0}
                onResultSelect={onResultSelect}
              />
            ))}
          </List>
        );
      }}
      renderNoResults={() => (
        <Alert color="warning">
          <AlertTitle>
            No results - we could not find a security matching this search term.
          </AlertTitle>
        </Alert>
      )}
      capitalise
      {...baseProps}
    />
  );
};
