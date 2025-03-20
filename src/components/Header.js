import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  InputBase,
  Box,
  Container,
  useTheme,
  alpha,
  Chip,
  Tooltip
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';

const Header = ({ mode, toggleTheme }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'background.paper', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: 70 }}>
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 3,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 800,
              color: 'primary.main',
              textDecoration: 'none',
              letterSpacing: '-0.5px'
            }}
          >
            DropHunt
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button 
              component={RouterLink} 
              to="/" 
              sx={{ color: 'text.primary', mx: 0.5, fontWeight: 500, fontSize: '0.95rem' }}
            >
              Home
            </Button>
            <Button 
              component={RouterLink} 
              to="/airdrops" 
              sx={{ color: 'text.primary', mx: 0.5, fontWeight: 500, fontSize: '0.95rem' }}
            >
              Airdrops
              <Chip 
                label="New" 
                size="small" 
                color="secondary" 
                sx={{ ml: 1, height: 20, fontSize: '0.7rem', fontWeight: 'bold' }} 
              />
            </Button>
            <Button 
              component={RouterLink} 
              to="/blog" 
              sx={{ color: 'text.primary', mx: 0.5, fontWeight: 500, fontSize: '0.95rem' }}
            >
              Blog
            </Button>
            <Button sx={{ color: 'text.primary', mx: 0.5, fontWeight: 500, fontSize: '0.95rem' }}>Learn</Button>
          </Box>

          <Box sx={{
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            '&:hover': {
              backgroundColor: alpha(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: 'auto',
          }}>
            <Box sx={{
              padding: theme.spacing(0, 2),
              height: '100%',
              position: 'absolute',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <SearchIcon />
            </Box>
            <InputBase
              placeholder="Search airdrops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                color: 'inherit',
                padding: theme.spacing(1, 1, 1, 0),
                paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                transition: theme.transitions.create('width'),
                width: '100%',
                [theme.breakpoints.up('md')]: {
                  width: '20ch',
                },
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title={mode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}>
              <IconButton 
                onClick={toggleTheme} 
                color="primary" 
                size="small" 
                sx={{ bgcolor: 'rgba(37, 99, 235, 0.1)' }}
              >
                {mode === 'light' ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
            <IconButton color="primary" size="small" sx={{ bgcolor: 'rgba(37, 99, 235, 0.1)' }}>
              <TwitterIcon fontSize="small" />
            </IconButton>
            <IconButton color="primary" size="small" sx={{ bgcolor: 'rgba(37, 99, 235, 0.1)' }}>
              <TelegramIcon fontSize="small" />
            </IconButton>
            <Button 
              variant="contained" 
              size="small"
              sx={{ 
                ml: 1, 
                borderRadius: 1.5, 
                px: 2,
                py: 0.8,
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '0.85rem'
              }}
            >
              Connect Wallet
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;