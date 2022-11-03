import { useTransition } from '@remix-run/react';
import React, { useEffect } from 'react';
import { useFormContext } from 'remix-validated-form';
import { BaggersButton } from 'apps/ui/app/components/BaggersButton';

export const ActionButtons: React.FC = () => {
  const { isValid, touchedFields, reset, subaction } = useFormContext();

  const { state, type, submission } = useTransition();
  const subAction = submission?.formData.get('subaction');

  useEffect(() => {
    if (type === 'actionReload') {
      reset();
    }
  }, [type]);

  return (
    <>
      <BaggersButton
        disabled={!isValid || !Object.keys(touchedFields).length}
        loading={subAction === subaction && state === 'loading'}
        type="submit"
        variant="contained"
      >
        Save
      </BaggersButton>
    </>
  );
};
