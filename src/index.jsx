import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import store from './store/store';
import theme from './styles/theme';
import LoadUser from './components/LoadUser';
const loadFont = () => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css?family=Roboto&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
};
loadFont();

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <LoadUser />
            <App />
        </ThemeProvider>
    </Provider>
);
