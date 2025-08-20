import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

// Context for cart and theme
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

// Redux setup
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Provider store={store}> {/* Redux store provider */}
      <ThemeProvider> {/* Theme (dark mode) context provider */}
        <CartProvider> {/* Cart context provider */}
          <App />
        </CartProvider>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);


