import { Button } from '@mui/material';
import React from 'react';
import { useFormContext } from 'remix-validated-form';

export type ActionButtonsProps = {};
export const ActionButtons: React.FC<ActionButtonsProps> = () => {
  const { isValid, touchedFields } = useFormContext();
  return (
    <>
      <Button
        disabled={!isValid || !Object.keys(touchedFields).length}
        type="submit"
        variant="contained"
      >
        Save
      </Button>
    </>
  );
};
