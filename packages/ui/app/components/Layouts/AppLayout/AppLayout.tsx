import { Box } from '@mui/system';
import { AppBar } from '~/components/AppBar';
import { Footer } from '~/components/Footer';

export const AppLayout: React.FC = ({ children }) => {
  return (
    <>
      <AppBar />
      <Box
        sx={{
          mt: 12,
          minHeight: `100vh`,
          mb: 32,
        }}
      >
        <main>{children}</main>
      </Box>
      <Footer />
    </>
  );
};
