import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6f6558',
    },
    secondary: {
      main: '#3c362f',
    },
  },

  typography: {
    button: {
      textTransform: 'none',
    },
  },
});
export default theme;
