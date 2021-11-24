import { Grid } from '@mui/material';
import { BaggersTextField } from '@/components';

export type ChangePasswordForm = {
  newPasswordLabel?: string;
  confirmPasswordLabel?: string;
  onChangeNewPassword: (newPassword: string) => void;
  onChangeConfirmPassword: (confirmPassword: string) => void;
};
export const ChangePasswordForm: React.FC<ChangePasswordForm> = ({
  newPasswordLabel = `New password`,
  confirmPasswordLabel = `Confirm password`,
  onChangeConfirmPassword,
  onChangeNewPassword,
}) => {
  return (
    <Grid item container spacing={2} direction="column">
      <Grid item>
        <BaggersTextField
          label={newPasswordLabel}
          secret
          onChange={(e) => onChangeNewPassword(e.target.value)}
        />
      </Grid>
      <Grid item>
        <BaggersTextField
          label={confirmPasswordLabel}
          secret
          onChange={(e) => onChangeConfirmPassword(e.target.value)}
        />
      </Grid>
    </Grid>
  );
};
