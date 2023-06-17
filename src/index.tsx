import { createRoot } from 'react-dom/client';

import "./index.css";
import "./fonts/fonts.css";


import App from "./App";

import { store } from "./store/store";
import { Provider } from 'react-redux'


const root = createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
