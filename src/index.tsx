import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import { NotFoundPage } from './shared/NotFoundPage';
import { useRoutes } from 'hookrouter';
import { appRoutes } from './App/router';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const lightTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#02a1fd',
            dark: '#028EDE',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});

const rootElement = document.getElementById('root');

const Root: FC<{}> = () => {
    const routeResult = useRoutes(appRoutes);
    return <ThemeProvider theme={lightTheme}>{routeResult || <NotFoundPage />}</ThemeProvider>;
};

ReactDOM.render(<Root />, rootElement);
