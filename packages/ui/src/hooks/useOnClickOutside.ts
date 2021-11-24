import { MutableRefObject, useEffect } from 'react';

export const useOnClickOutside = (
  ref: MutableRefObject<any>,
  callback: () => any,
) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    // Bind the event listener
    document.addEventListener(`mousedown`, handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener(`mousedown`, handleClickOutside);
    };
  }, [ref]);
};
