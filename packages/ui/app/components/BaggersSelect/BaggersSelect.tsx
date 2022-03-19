import { FormControl, InputLabel, Select, SelectProps } from '@mui/material';

export type BaggersSelectProps = {
} & SelectProps;
export const BaggersSelect: React.FC<BaggersSelectProps> = ({
  id,
  children,
  ...props
}) => {
  const labelId = `${id}_label`;
  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>{props.label}</InputLabel>
      <Select labelId={labelId} {...props}>
        {children}
      </Select>
    </FormControl>
  );
};
