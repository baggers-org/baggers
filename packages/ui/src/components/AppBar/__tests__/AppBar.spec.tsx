import React from 'react';

import { Box } from '@mui/system';
import { AppBar } from '..';

describe(`<AppBar />`, () => {
  beforeEach(() => {
    cy.viewport(`macbook-16`);
  });
  describe(`Rendering`, () => {
    it(`should render an AppBar to the left of the passed in children`, () => {
      cy.mount(
        <AppBar>
          <Box bgcolor="tomato" width="100%" height="800px">
            Main content
          </Box>
        </AppBar>,
      );
    });
  });
});
