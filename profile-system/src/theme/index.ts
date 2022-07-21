import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#319bd5',
        },
        secondary: {
            main: '#319bd5',
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true,
                variant: 'contained',
            },
        },
        MuiTextField: {
            defaultProps: {
                size: 'small',
            },
        },
    },
});

export default theme;
