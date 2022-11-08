import { Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { MobileMenu } from '../Sidebar/components/MobileMenu';
import Logo from '../../../public/svg/logo.svg';

export const MobileProfileBar = () => {
  const theme = useTheme();

  return (
    <>
      <motion.div
        style={{
          width: '100%',
          top: 0,
          display: 'flex',
          justifyContent: 'space-between',
          zIndex: 1000,
          padding: 8,
          paddingLeft: 16,
          paddingRight: 16,
          alignItems: 'center',
          boxShadow: 'rgb(0 0 0 / 10%) -10px 3px 6px',
          background:
            theme.palette.mode === 'light'
              ? theme.palette.background.paper
              : '#1e1e1e',
        }}
      >
        <Logo />
        <Typography style={{ fontFamily: 'Archivo Black', fontSize: '18px' }}>
          BAGGERS
        </Typography>
        <MobileMenu />
      </motion.div>
    </>
  );
};
