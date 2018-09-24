/* eslint-disable no-underscore-dangle */

import { SheetsRegistry } from 'jss';
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import primary from '@material-ui/core/colors/blue';
import secondary from '@material-ui/core/colors/pink';

// A theme with custom primary and secondary color.
// It's optional.
//
//
const mobileBreak = '@media (max-width: 600px)';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: primary[300],
      main: primary[500],
      dark: primary[700],
    },
    secondary: {
      light: secondary[300],
      main: secondary[500],
      dark: secondary[700],
    },
  },
  typography: {
    display1: {
      [mobileBreak]: {
        fontSize: 25,
      },
    },
    display2: {
      [mobileBreak]: {
        fontSize: 30,
      },
    },
    display3: {
      [mobileBreak]: {
        fontSize: 35,
      },
    },
    display4: {
      [mobileBreak]: {
        fontSize: 40,
      },
    },
    headline: {
      [mobileBreak]: {
        fontSize: 20,
      },
    },
    title: {},
    subheading: {},
    body2: {},
    body1: {},
  },

});

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  };
}

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
}
