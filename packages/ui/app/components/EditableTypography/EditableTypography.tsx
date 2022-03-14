import React, { useEffect, useState } from 'react';
import { Check, Edit, RemoveCircle } from '@mui/icons-material';
import { Typography, IconButton, Stack, Box } from '@mui/material';
import { TypographyTextField, TypographyTextFieldProps } from '~/components';

export type EditableTypographyProps = TypographyTextFieldProps & {
  onFinishEdit: (newValue: string) => void;
  value?: string;
  isSubmitting?: boolean;
};
export const EditableTypography: React.FC<EditableTypographyProps> = ({
  variant,
  value,
  onFinishEdit,
  isSubmitting,
  ...typographyProps
}) => {
  const [isEditting, setIsEditting] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const cancelEdit = () => {
    setIsEditting(false);
    setTempValue(value);
  };

  useEffect(() => {
    setTempValue(value);
    if (!value) {
      setIsEditting(true);
    }
  }, [value]);

  return (
    <Box display="flex" maxWidth="100%">
      {isEditting && (
        <TypographyTextField
          {...typographyProps}
          variant={variant}
          value={tempValue}
          autoFocus
          sx={{ opacity: isSubmitting ? 0.2 : 1 }}
          onKeyDown={(e) => {
            if (e.key === `Escape`) {
              cancelEdit();
            }
          }}
          onChange={(e) => {
            setTempValue(e.target.value);
          }}
        />
      )}
      {!isEditting && (
        <Typography
          maxWidth="100%"
          variant={variant as any}
          sx={{
            wordBreak: `break-all`,
            opacity: isSubmitting ? 0.2 : 1,
          }}
        >
          {value}
        </Typography>
      )}
      {isEditting ? (
        <Stack direction="row">
          <IconButton
            size="small"
            type="submit"
            onClick={() => {
              if (tempValue) {
                onFinishEdit(tempValue);
              }
              setIsEditting(false);
            }}
          >
            <Check fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              cancelEdit();
            }}
          >
            <RemoveCircle fontSize="small" />
          </IconButton>
        </Stack>
      ) : (
        <IconButton size="small" onClick={() => setIsEditting(true)}>
          <Edit fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};
