import dynamic from 'next/dynamic';

export const LineChart = dynamic(() => import(`./LineChart`), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});

export const AreaChart = dynamic(() => import(`./AreaChart`), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});
