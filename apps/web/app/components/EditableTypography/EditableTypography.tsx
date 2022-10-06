import React, { useEffect, useState } from 'react';
import { Check, Edit, RemoveCircle } from '@mui/icons-material';
import { Typography, IconButton, Stack, Box } from '@mui/material';
import { TypographyTextField, TypographyTextFieldProps } from '~/components';

export type EditableTypographyProps = TypographyTextFieldProps & {
  onFinishEdit: (newValue: string) => void;
  value?: string;
  isSubmitting?: boolean;
  confirmButtonAriaLabel?: string;
  cancelButtonAriaLabel?: string;
  isEditMode?: boolean;
  hideEditControls?: boolean;
};
export const EditableTypography: React.FC<EditableTypographyProps> = ({
  variant,
  value,
  onFinishEdit,
  isSubmitting,
  isEditMode,
  hideEditControls,
  confirmButtonAriaLabel = `confirm edit`,
  cancelButtonAriaLabel = `cancel edit`,
  ...typographyProps
}) => {
  const [isEditting, setIsEditting] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const isControlled = typeof isEditMode !== 'undefined';

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

  useEffect(() => {
    if (isControlled) {
      setIsEditting(isEditMode || false);
    }
  }, [isEditMode, isControlled]);

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
            whiteSpace: 'break-spaces',
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
            aria-label={confirmButtonAriaLabel}
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
            aria-label={cancelButtonAriaLabel}
            onClick={() => {
              cancelEdit();
            }}
          >
            <RemoveCircle fontSize="small" />
          </IconButton>
        </Stack>
      ) : (
        !hideEditControls && (
          <IconButton size="small" onClick={() => setIsEditting(true)}>
            <Edit fontSize="small" />
          </IconButton>
        )
      )}
    </Box>
  );
};
