import React, { useEffect, useState } from 'react';
import { Link, Typography } from '@mui/material';
import { formatInTimeZone } from 'date-fns-tz';

export const Clock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date());
    }, 6000);
  }, []);
  return (
    <Typography fontWeight="light" fontSize="14px" textAlign="center">
      {formatInTimeZone(currentTime, `America/New_York`, `eeee p`)} in{` `}
      <Link>New York</Link>
    </Typography>
  );
};
