import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'material-design-icons/iconfont/material-icons.css';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { VFC } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import theme from './theme';

const Root: VFC = () => (
  <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </>
);
ReactDOM.render(<Root />, document.getElementById('root'));
