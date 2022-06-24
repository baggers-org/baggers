import {
  Deselect,
  HighlightAlt,
  HighlightOff,
  SelectAll,
} from '@mui/icons-material';
import {
  alpha,
  IconButton,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BaggersSelect } from '../BaggersSelect';
import { SelectModeButtons } from './components/SelectModeButtons';

export type PortfolioToolbarActions = 'DELETE_SELECTED';
export type PortfolioCardToolbarProps = {
  onToggleSelectMode: () => void;
  isSelectMode: boolean;
  disableSelectMode?: boolean;
  selectedIds: string[];
  onSelectAll: () => void;
  onDeselectAll: () => void;
};
export const PortfolioCardToolbar: React.FC<PortfolioCardToolbarProps> = ({
  onToggleSelectMode,
  isSelectMode,
  selectedIds,
  disableSelectMode,
  onSelectAll,
  onDeselectAll,
}) => {
  const { t } = useTranslation(`portfolios`);

  const theme = useTheme();
  const [showDeselect, setShowDeselect] = useState<boolean>(false);

  return (
    <Stack
      direction="row"
      display="flex"
      spacing={2}
      alignItems="center"
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: isSelectMode ? alpha(theme.palette.primary.light, 0.16) : null,
        transition: `background 0.2s ease-out`,
      }}
    >
      {isSelectMode ? (
        <Stack
          direction="row"
          mr="auto"
          alignItems="center"
          spacing={4}
          width="100%"
        >
          {!showDeselect ? (
            <IconButton
              aria-label={t(`select_all_portfolios`, `Select all portfolios`)}
              onClick={() => {
                onSelectAll();
                setShowDeselect(true);
              }}
            >
              <SelectAll />
            </IconButton>
          ) : (
            <IconButton
              aria-label={t(
                `deselect_all_portfolios`,
                `Deselect all portfolios`,
              )}
              onClick={() => {
                onDeselectAll();
                setShowDeselect(false);
              }}
            >
              <Deselect />
            </IconButton>
          )}
          <Typography>
            {selectedIds?.length} {t(`selected`, `selected.`)}
          </Typography>
        </Stack>
      ) : null}

      {isSelectMode && <SelectModeButtons enabled={!!selectedIds.length} />}
      <Stack
        spacing={2}
        direction="row"
        ml="auto"
        sx={{ width: { xs: `100%`, md: `200px` } }}
      >
        {!isSelectMode ? (
          <BaggersSelect
            label={t(`show`, `Show`)}
            id="show-portfolios-filter"
            value="all"
            size="small"
          >
            <MenuItem value="all">{t(`all`, `All`)}</MenuItem>
            <MenuItem value="public">{t(`public`, `Public`)}</MenuItem>
            <MenuItem value="private">{t(`private`, `Private`)}</MenuItem>
          </BaggersSelect>
        ) : null}
        <Tooltip
          sx={{ ml: `auto` }}
          title={t(
            `selecting_tooltip`,
            `Toggles select mode, which allows you to edit multiple portfolios at once.`,
          )}
        >
          <IconButton
            onClick={() => onToggleSelectMode()}
            disabled={disableSelectMode}
            aria-label={
              isSelectMode
                ? t(`turn_off_select_mode`, `Turn off select mode`)
                : t(`turn_on_edit`, `Turn on select mode`)
            }
          >
            {isSelectMode ? <HighlightOff /> : <HighlightAlt />}
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
};
