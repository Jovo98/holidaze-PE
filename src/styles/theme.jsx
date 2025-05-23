import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: `'Verdana', 'sans-serif'`, //''Arial', 'Helvetica', 'Georgia', 'Times New Roman', 'Courier New', 'Verdana', etc.
        button: {
            textTransform: 'none'
        }
    },
    palette: {
        primary: {
            main: '#1976d2', // your primary color
        },
        secondary: {
            main: '#994cda', // your secondary color
        },
        threedary: {
            main: '#ffffff', // your secondary color
        },

    },
});

export default theme;