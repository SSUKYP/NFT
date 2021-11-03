import { createTheme } from '@mui/material';
import NotoSans from './assets/fonts/NotoSansKR-Regular.otf';
import CookieRun from './assets/fonts/CookieRun_Regular.ttf';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6f6558',
    },
    secondary: {
      main: '#3c362f',
    },
    background: {
      default: '#F0F8FF',
    },
  },
  typography: {
    fontFamily: ['CookieRun', 'NotoSans'].join(','),
    body2: {
      fontFamily: 'NotoSans',
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'CookieRun';
          src: url(${CookieRun}) format('truetype');
        }
    
        @font-face {
            font-family: 'NotoSans';
            src: url(${NotoSans}) format('truetype');
        }
      `,
    },
  },
});
export default theme;
