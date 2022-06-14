import { Close } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Modal,
  ModalProps,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useFetcher } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { useDebouncedCallback } from 'use-debounce';
import { SearchInput } from '../../SearchInput';

export type BaseSearchModalProps<T extends Record<string, unknown>> = {
  modalTitle?: string;
  capitalise?: boolean;
  getSearchHref: (term: string) => string;
  debounceMs?: number;
  onResultSelect: (res: T) => void;
  renderResults: (
    results: T[],
    onResultSelect: (res: T) => void,
  ) => JSX.Element | JSX.Element[];
  renderNoResults: () => JSX.Element | JSX.Element[];
} & Omit<ModalProps, 'children'>;

export function BaseSearchModal<TResult extends Record<string, unknown>>({
  modalTitle,
  capitalise,
  getSearchHref,
  onResultSelect,
  debounceMs = 500,
  renderResults,
  renderNoResults,
  ...modalProps
}: BaseSearchModalProps<TResult>) {
  const { t } = useTranslation(`holdings`);
  const title = modalTitle || t(`search_tickers`, `Search tickers`);

  const fetcher = useFetcher();

  const search = useDebouncedCallback(async (term) => {
    if (term) {
      const href = getSearchHref(term);
      fetcher.load(href);
    }
  }, debounceMs);

  return (
    <Modal {...modalProps}>
      <Box
        position="absolute"
        textAlign="center"
        mt={{ xs: 0, md: 12 }}
        height="70vh"
        width={{ xs: `100%`, sm: `100%`, md: `50%`, lg: `40%` }}
        left="50%"
        sx={{
          transform: `translate(-50%, 0%)`,
          outline: `none`,
        }}
      >
        <Paper sx={{ px: 2, pt: 2, pb: 7 }}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            mb={2}
          >
            <Typography
              variant="h5"
              mb={2}
              justifySelf="center"
              marginBottom={0}
              marginLeft={{ xs: `auto`, md: `0` }}
            >
              {title}
            </Typography>
            <IconButton
              sx={{
                display: { xs: `flex`, md: `none` },
                justifySelf: `end`,
                marginLeft: `auto`,
              }}
            >
              <Close />
            </IconButton>
          </Stack>

          <fetcher.Form>
            <SearchInput
              variant="filled"
              size="medium"
              loading={fetcher.state === `loading`}
              autoComplete="off"
              disabled={fetcher.state === `loading`}
              fullWidth
              autoFocus
              onChange={(e) => {
                search(e.target.value);
              }}
              sx={{
                input: {
                  textTransform: capitalise ? `uppercase` : `none`,
                },
              }}
            />
          </fetcher.Form>

          <Box height="30%" maxHeight={600} overflow="scroll">
            {fetcher.data && fetcher.state === `idle` ? (
              <Typography textAlign="left" mt={3}>
                {fetcher.data?.length} results.
              </Typography>
            ) : null}
            {fetcher.data?.length && fetcher.state !== `loading`
              ? renderResults(fetcher.data, onResultSelect)
              : null}
            {fetcher.data?.length === 0 && fetcher.state !== `loading`
              ? renderNoResults()
              : null}
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
}
