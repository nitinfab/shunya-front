import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {store} from './redux/store';
import {persistor} from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import ContextWrapper from './Components/BranchPages/CalendarPage/context/ContextWrapper';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <ContextWrapper>
      <App />
    </ContextWrapper>
  </PersistGate>
</Provider>,
);

