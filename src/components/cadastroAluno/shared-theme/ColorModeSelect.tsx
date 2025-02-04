import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ColorModeSelect = () => {
  const theme = useTheme();
  const [mode, setMode] = React.useState(theme.palette.mode);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    document.body.style.backgroundColor = mode === 'light' ? '#121212' : '#ffffff';
  };

  return (
    <IconButton onClick={toggleColorMode} color="inherit">
      {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
    </IconButton>
  );
};

export default ColorModeSelect;