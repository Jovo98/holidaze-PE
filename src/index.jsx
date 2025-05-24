import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import store from './store/store'; // your redux store
import theme from './styles/theme';
import LoadUser from './components/LoadUser';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <LoadUser />   {/* This loads user data on app start */}
            <App />
        </ThemeProvider>
    </Provider>
);