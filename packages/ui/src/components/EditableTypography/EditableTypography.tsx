import React, { useEffect, useState } from 'react';
import { TypographyTextField, TypographyTextFieldProps } from '@/components';
import { Check, Edit, RemoveCircle } from '@mui/icons-material';
import { Typography, IconButton, Stack, Skeleton } from '@mui/material';
import { Box } from '@mui/material/node_modules/@mui/system';
import { Maybe } from '@/graphql/Mutations.document.gql';

export type EditableTypographyProps = TypographyTextFieldProps & {
  onFinishEdit: (newValue: string) => void;
  value?: Maybe<string>;
  loading?: boolean;
};
export const EditableTypography: React.FC<EditableTypographyProps> = ({
  variant,
  value,
  onFinishEdit,
  loading,
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
    if (!value && !loading) {
      setIsEditting(true);
    }
  }, [value, loading]);

  if (loading) {
    return <Skeleton />;
  }
  return (
    <Box display="flex" maxWidth="100%">
      {isEditting && (
        <TypographyTextField
          {...typographyProps}
          variant={variant}
          value={tempValue}
          autoFocus
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
          variant={variant}
          sx={{
            wordBreak: `break-all`,
          }}
        >
          {value}
        </Typography>
      )}
      {isEditting ? (
        <Stack direction="row">
          <IconButton
            size="small"
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
