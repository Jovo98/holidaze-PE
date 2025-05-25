import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: `'Roboto', 'Verdana', 'sans-serif'`, //''Arial', 'Helvetica', 'Georgia', 'Times New Roman', 'Courier New', 'Verdana', etc.
        button: {
            textTransform: 'none'
        }
    },
    palette: {
        primary: {
            main: '#b75d5d',
        },
        secondary: {
            main: '#c091f8',
        },
        threedary: {
            main: '#ffffff',
        },

    },
});

export default theme;
