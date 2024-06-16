import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2E2E2E', // Customize primary color
        },
        secondary: {
            main: '#000000', // Customize secondary color
            contrastText: '#ffffff',
        },
        darkButton: {
            main: '#212121',
            contrastText: '#ffffff',
        },
        greyText:{
            main: '#A9A9A9',
            contrastText: '#ffffff',
        }
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        button: {
            fontSize: '0.9rem',
        },
    },
    components: {
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    backgroundColor: '#424242',
                    color: 'white',
                    borderColor: '#424242',
                    '&.Mui-selected': {
                        backgroundColor: '#212121',
                        color: 'white',
                        borderColor: '#424242',
                    },
                    '&:hover': {
                        backgroundColor: 'white',
                        borderColor: '#424242',
                        color: 'black',
                    },
                },
            },
        },
    },
});

export default theme;
