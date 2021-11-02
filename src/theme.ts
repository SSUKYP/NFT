import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6f6558',
    },
    secondary: {
      main: '#3c362f',
    },
    background: {
      default: 'AliceBlue',
    },
  },
  typography: {
    fontFamily: ['CookieRun', 'NotoSans'].join(','),
    body2: {
      fontFamily: 'NotoSans',
    },
  },
});
export default theme;
