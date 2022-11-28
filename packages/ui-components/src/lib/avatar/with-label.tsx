import React from 'react';
import { AvatarProps } from './types';

export function withLabel(Comp: any) {
  return (avatarProps: AvatarProps) => {
    return (
      <div className="grid place-items-center gap-1">
        <Comp {...avatarProps} />
        {avatarProps?.label ? (
          <span className="text-[10px] line-clamp-2 text-center">
            {avatarProps.label}
          </span>
        ) : null}
      </div>
    );
  };
}
