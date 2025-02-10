import React, { useState, MouseEvent } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Switch,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';

interface HeaderProps {
  themeMode: "light" | "dark";
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ themeMode, toggleTheme }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="default" sx={{ padding: 2 }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" component="div">
            Bem-vindo ao SeletivoPD
          </Typography>
        </Box>
        <IconButton color="inherit" onClick={handleMenuOpen}>
          <Avatar />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <MenuItem onClick={handleMenuClose}>Conta</MenuItem>
          <MenuItem onClick={() => navigate('/login')}>Sair</MenuItem>
          <MenuItem
            onClick={() => {
              toggleTheme();
              handleMenuClose();
            }}
          >
            <ListItemIcon>
              <Switch edge="start" checked={themeMode === "dark"} />
            </ListItemIcon>
            <ListItemText primary="Dark Mode" />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;