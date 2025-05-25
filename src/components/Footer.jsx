import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                py: 3,
                width: '100%',
                mt: 'auto',
            }}
        >
            <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 3 }}>
                <Typography variant="body1" align="center">
                    © {new Date().getFullYear()} Holidaze. All rights reserved.
                </Typography>
                <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                    <Link color="inherit" href="/">
                        About
                    </Link>{' '}
                    |{' '}
                    <Link color="inherit" href="/">
                        Contact
                    </Link>{' '}
                    |{' '}
                    <Link color="inherit" href="/">
                        Privacy Policy
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;