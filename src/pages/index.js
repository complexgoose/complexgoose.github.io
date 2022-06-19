import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet';
import App from '../components/App';
import { theme } from '../constants/theme';
import favicon from '../images/favicon.png'
import '../styles/index.scss'

const IndexPage = () => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Helmet>
                    <title>Jack Strosahl</title>
                    <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
                </Helmet>
                <App />
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default IndexPage;