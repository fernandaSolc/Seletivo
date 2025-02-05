import React from 'react';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const ColorModeSelect: React.FC = () => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <IconButton onClick={toggleMode} color="inherit">
      {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
    </IconButton>
  );
};

export default ColorModeSelect;
