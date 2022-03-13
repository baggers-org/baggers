import {
  alpha,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
  styled,
} from '@mui/material';

export type BaggersToggleButtonGroupProps = ToggleButtonGroupProps;
const StyledButtonGroup = styled(ToggleButtonGroup)<ToggleButtonGroupProps>(
  ({ theme }) => ({
    '.MuiToggleButton-root': { border: `none` },
    'button:not(:last-child)': {
      borderRight: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
    },
  }),
);

export const BaggersToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({
  children,
  ...props
}) => {
  const onChange: ToggleButtonGroupProps['onChange'] = (event, value) => {
    if (value === null) return;

    props?.onChange?.(event, value);
  };
  return (
    <StyledButtonGroup exclusive {...props} onChange={onChange}>
      {children}
    </StyledButtonGroup>
  );
};
