import { Grid } from '@material-ui/core';
import { useState } from 'react';
import BaggersTextField from '../BaggersTextField/BaggersTextField';

type Props = {
  newPasswordLabel?: string;
  confirmPasswordLabel?: string;
  onChangeNewPassword: (newPassword: string) => void;
  onChangeConfirmPassword: (confirmPassword: string) => void;
};
const ChangePasswordForm: React.FC<Props> = ({
  newPasswordLabel,
  confirmPasswordLabel,
  onChangeConfirmPassword,
  onChangeNewPassword,
}) => {
  const [newPassword, setNewPassword] = useState<string | undefined>();
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>();

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
ChangePasswordForm.defaultProps = {
  newPasswordLabel: `New password`,
  confirmPasswordLabel: `Confirm password`,
};
export default ChangePasswordForm;
