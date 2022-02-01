import { BaggersTextField, BaggersTextFieldProps } from '@/components';
import { useIsMobile } from '@/hooks';
import { TextFieldProps } from '@mui/material';

export const SignupPageTextField: React.FC<
  BaggersTextFieldProps & TextFieldProps
> = (props) => {
  const isMobile = useIsMobile();
  return (
    <BaggersTextField
      {...props}
      sx={
        isMobile
          ? {
              '.MuiFilledInput-root': {
                color: `white`,
              },
            }
          : undefined
      }
    />
  );
};
