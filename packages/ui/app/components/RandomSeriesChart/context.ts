import React from 'react';

export const RandomSeriesContext = React.createContext<{
  size?: { width: number; height: number };
}>({
  size: { width: 0, height: 0 },
});
