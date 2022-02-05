import { Symbol } from '@/graphql/Queries.document.gql';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Divider, IconButton, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

export const DrawerHeader = ({
  addingSymbol,
  onBack,
}: {
  addingSymbol?: Symbol;
  onBack: () => void;
}) => {
  const { t } = useTranslation(`view_portfolio`);
  return (
    <Box
      alignItems="center"
      pt={1}
      position="fixed"
      top={0}
      zIndex={2}
      width="100%"
    >
      <Stack direction="row" mb={1}>
        {addingSymbol && (
          <IconButton color="inherit" onClick={onBack} size="small">
            <ChevronLeft />
          </IconButton>
        )}
        <Typography variant="h6" ml={!addingSymbol ? 3 : 0}>
          {!addingSymbol
            ? t(`add_position`, `Add position`)
            : `${t(`adding`, `Adding`)}  ${addingSymbol?.symbol}`}
        </Typography>
      </Stack>

      <Box display="block">
        <Divider />
      </Box>
    </Box>
  );
};
