import React, { createContext, useMemo, useState, ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import getTheme from '../../../styles/theme';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function AppTheme({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', newMode);
          return newMode;
        });
      },
    }),
    []
  );

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}