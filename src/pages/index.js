import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import React from 'react';
import App from '../components/App';

const IndexPage = () => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default IndexPage;