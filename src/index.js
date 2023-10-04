import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { persistor, store } from 'Redux/store';
import { App } from 'components/App';
import { PersistGate } from 'redux-persist/integration/react';

const theme = {
  mainColor: '#042825',
  accentGreen: '#A6C1BF',
  lightText: '#E6EDED',
  khakiGreen: '#0A433E',
  buttonColor: '#E5F7F7',
  trans: '300ms cubic-bezier(.02,.26,1,.54)',
};


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
