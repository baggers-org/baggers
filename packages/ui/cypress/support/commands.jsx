import theme from '@/styles/theme';
import { mount } from '@cypress/react';
import '@testing-library/cypress/add-commands';

import { CssBaseline, ThemeProvider } from '@mui/material';

Cypress.Commands.add(`mount`, (Component) => {
  mount(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {Component}
    </ThemeProvider>,
  );
});
