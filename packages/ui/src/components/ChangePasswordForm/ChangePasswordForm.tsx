import { Stack } from '@mui/material';
import { BaggersTextField } from '@/components';
import { CheckOutlined, LockOutlined } from '@mui/icons-material';
import { SignupPageTextField } from '@/views/SignupPage/components';

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
    <form>
      <Stack spacing={1} my={4}>
        <SignupPageTextField
          placeholder={newPasswordLabel}
          variant="filled"
          autoComplete="blah-password"
          InputProps={{
            startAdornment: <LockOutlined />,
          }}
          secret
          onChange={(e) => onChangeNewPassword(e.target.value)}
        />
        <SignupPageTextField
          placeholder={confirmPasswordLabel}
          secret
          autoComplete="confirm-password"
          variant="filled"
          InputProps={{
            startAdornment: <CheckOutlined />,
          }}
          onChange={(e) => onChangeConfirmPassword(e.target.value)}
        />
      </Stack>
    </form>
  );
};
