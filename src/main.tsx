import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'material-design-icons/iconfont/material-icons.css';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { VFC } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';

import App from './App';
import theme from './theme';

const Root: VFC = () => (
  <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RecoilRoot>
        <Router>
          <SnackbarProvider maxSnack={3} autoHideDuration={1000}>
            <App />
          </SnackbarProvider>
        </Router>
      </RecoilRoot>
    </ThemeProvider>
  </>
);
ReactDOM.render(<Root />, document.getElementById('root'));
