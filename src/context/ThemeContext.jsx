import { createContext, useContext, useMemo } from 'react';
import { CssBaseline, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const ThemeModeContext = createContext(null);

const basePalette = {
  primary: {
    main: '#6c63ff',
  },
  secondary: {
    main: '#18c7ff',
  },
  success: {
    main: '#38d597',
  },
  warning: {
    main: '#ffb74d',
  },
  error: {
    main: '#ff6b6b',
  },
  info: {
    main: '#4dabf5',
  },
};

export const ThemeModeProvider = ({ children }) => {
  const prefersDarkScheme = useMediaQuery('(prefers-color-scheme: dark)');
  const [storedMode, setStoredMode] = useLocalStorage('mui-theme-mode', 'system');

  const resolvedMode = storedMode === 'system' ? (prefersDarkScheme ? 'dark' : 'light') : storedMode;

  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode: resolvedMode, ...basePalette },
        typography: {
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
        },
        components: {
          MuiCard: {
            defaultProps: {
              elevation: 3,
            },
          },
        },
      }),
    [resolvedMode],
  );

  const value = useMemo(
    () => ({
      themeMode: storedMode,
      resolvedMode,
      setThemeMode: setStoredMode,
    }),
    [resolvedMode, setStoredMode, storedMode],
  );

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error('useThemeMode должен использоваться внутри ThemeModeProvider');
  }
  return context;
};

