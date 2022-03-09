import { isToday, format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useFetcher } from 'remix';

export const useOpenPrice = (openDate: Date, symbol: string) => {
  const openPriceFetcher = useFetcher();

  const [openPrice, setOpenPrice] = useState();

  useEffect(() => {
    if (isToday(openDate)) return;
    const dateForAPI = format(openDate, `yyyyMMdd`);
    openPriceFetcher.load(
      `/api/symbols/${symbol}/chart/date/${dateForAPI}?chartByDay=true`,
    );
  }, [openDate, symbol]);

  useEffect(() => {
    if (openPriceFetcher.state === `idle`) {
      if (openPriceFetcher.data) {
        setOpenPrice(openPriceFetcher.data[0]?.close);
      }
    }
  }, [openPriceFetcher.state, openPriceFetcher.data]);

  return { openPrice, loading: openPriceFetcher.state === `loading` };
};
