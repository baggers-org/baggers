import { Delete } from '@mui/icons-material';
import { IconButton, IconButtonProps, Stack, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

export interface SelectModeButtonsProps {
  enabled: boolean;
}
export const SelectModeButtons: React.FC<SelectModeButtonsProps> = ({
  enabled,
}) => {
  const { t } = useTranslation(`portfolios`);
  const actions: (IconButtonProps & {
    tooltip: string;
    icon: any;
    intent: string;
  })[] = [
    {
      'aria-label': t(`delete_tooltip`, `Delete selected portfolios`),
      tooltip: t(`delete_tooltip`, `Delete selected portfolios.`),
      icon: <Delete />,
      intent: `delete`,
    },
  ];
  return (
    <Stack direction="row" spacing={1}>
      {actions.map((action) => (
        <Tooltip title={action.tooltip} enterDelay={1000}>
          <IconButton
            name="intent"
            value={action.intent}
            type="submit"
            color={action.color}
            disabled={!enabled}
            {...action}
          >
            {action.icon}
          </IconButton>
        </Tooltip>
      ))}
    </Stack>
  );
};
