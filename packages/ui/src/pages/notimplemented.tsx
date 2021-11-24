import { Box, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default () => {
  const { back } = useRouter();
  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        height="100vh"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Typography variant="h1" style={{ fontFamily: `Archivo Black` }}>
          BAGGERS
        </Typography>

        <Typography>Uh-oh</Typography>
        <Typography variant="h1" style={{ fontFamily: `Archivo Black` }}>
          THIS FEATURE IS NOT READY YET. COME BACK SOON
        </Typography>
        <br />
        <Button onClick={() => back()} color="primary" variant="contained">
          Return to whence ye came
        </Button>
      </Box>
    </Container>
  );
};
