import React from 'react';

/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Custom mount wrapper to add ThemeProvider etc.
     */
    mount: (jsx: React.ReactElement) => void;
  }
}
