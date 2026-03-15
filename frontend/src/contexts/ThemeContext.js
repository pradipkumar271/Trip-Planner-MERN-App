import React, { createContext, useContext, useMemo, useState } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

export const useThemeMode = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [mode, setMode] = useState('light');

    const toggleMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === 'light'
                        ? {
                            background: { default: '#f5f7ff', paper: '#ffffff' },
                            primary: { main: '#1e88e5' },
                            secondary: { main: '#ff6f61' },
                        }
                        : {
                            background: { default: '#0f172a', paper: '#1e293b' },
                            primary: { main: '#90caf9' },
                            secondary: { main: '#f48fb1' },
                        }),
                },
                typography: {
                    fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
                },
            }),
        [mode]
    );

    return (
        <ThemeContext.Provider value={{ mode, toggleMode }}>
            <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
        </ThemeContext.Provider>
    );
};
