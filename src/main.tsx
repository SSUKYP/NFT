import { VFC } from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const Root: VFC = () => (
  <>
    <App />
  </>
);
ReactDOM.render(<Root />, document.getElementById('root'));
