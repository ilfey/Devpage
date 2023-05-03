import ReactDOM from 'react-dom/client';

import "./fonts/Nunito-Bold.ttf";
import "./fonts/Nunito-Regular.ttf";

import './index.css';
import './fonts/fonts.css';

import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <App />
);
