import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import React from 'react';
import App from '../components/App';
import { theme } from '../constants/theme';
import '../styles/index.scss'

const IndexPage = () => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default IndexPage;