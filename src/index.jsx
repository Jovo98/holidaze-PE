import React from 'react';
import ReactDOM from 'react-dom/client'; // or from 'react-dom'
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import store from './store/store'
import theme from './styles/theme'; // your theme


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App />

        </ThemeProvider>
    </Provider>
);