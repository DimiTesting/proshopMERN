import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../src/assets/index.css'
import {Provider} from 'react-redux'
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import store from './store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <App />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);