import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Container, Typography, Grid, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import getTheme from './theme';
import Header from './components/Header';
import Footer from './components/Footer';
import AirdropPage from './pages/AirdropPage';
import BlogPage from './pages/BlogPage';
import HeroSection from './components/HeroSection';
import TrustedBrands from './components/TrustedBrands';
import AirdropCategories from './components/AirdropCategories';
import WallOfFame from './components/WallOfFame'; 
function App() {
  // State for theme mode (light/dark)
  const [mode, setMode] = useState('light');
  
  // Load saved theme preference from localStorage on initial render
  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  // Toggle theme function to be passed to Header component
  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  // Create theme based on current mode
  const theme = useMemo(() => getTheme(mode), [mode]);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            minHeight: '100vh',
            bgcolor: 'background.default',
            color: 'text.primary',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Routes>
            <Route path="/airdrops" element={<AirdropPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/" element={
              <>
                <Header mode={mode} toggleTheme={toggleTheme} />
                <HeroSection />
                <TrustedBrands />
                <AirdropCategories />
                <Box sx={{ py: 8, bgcolor: 'background.default' }}>
                  <Container maxWidth="lg">
                    <Typography 
                      variant="h3" 
                      align="center" 
                      sx={{ mb: 4 }}
                    >
                      DropHunt users claimed <Typography 
                        component="span" 
                        sx={{ 
                          color: '#40E0D0',
                          display: 'inline', 
                          fontSize: { xs: '1.5rem', md: '1.5rem' }
                        }}
                      >
                        millions of dollars
                      </Typography> in value
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                      <Grid item xs={12} md={4}>
                        <Typography variant="h2" align="center" sx={{ fontWeight: 700, color: '#40E0D0' }}>
                          5K+
                        </Typography>
                        <Typography variant="subtitle1" align="center" sx={{ color: 'text.secondary', textTransform: 'uppercase' }}>
                          Airdrops Listed
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="h2" align="center" sx={{ fontWeight: 700, color: '#40E0D0' }}>
                          180
                        </Typography>
                        <Typography variant="subtitle1" align="center" sx={{ color: 'text.secondary', textTransform: 'uppercase' }}>
                          Countries
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="h2" align="center" sx={{ fontWeight: 700, color: '#40E0D0' }}>
                          15
                        </Typography>
                        <Typography variant="subtitle1" align="center" sx={{ color: 'text.secondary', textTransform: 'uppercase' }}>
                          Supported Languages
                        </Typography>
                      </Grid>
                    </Grid>
                  </Container>
                </Box>
                <WallOfFame />
                <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
                  <Container maxWidth="lg">
                    <Typography 
                      variant="subtitle1" 
                      align="center" 
                      sx={{ 
                        color: '#40E0D0',
                        mb: 1,
                        textTransform: 'uppercase',
                        letterSpacing: 1
                      }}
                    >
                      Benefits of DropHunt
                    </Typography>
                    <Typography 
                      variant="h3" 
                      align="center" 
                      sx={{ mb: 8 }}
                    >
                      Why use DropHunt?
                    </Typography>
                    <Grid container spacing={4}>
                      <Grid item xs={12} md={4}>
                        <Box sx={{ p: 4, height: '100%', bgcolor: 'background.default', borderRadius: 2 }}>
                          <Box
                            component="img"
                            src="/img/sticker/verified-airdrops.webp"
                            alt="Trust"
                            sx={{ width: 48, height: 48, mb: 2, p: 1.5, bgcolor: '#40E0D0', }}
                          />
                          <Typography variant="h5" gutterBottom>
                            Most trusted library
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            Join over millions of satisfied airdrop hunters who rely on our real-time crypto airdrop alerts and user-friendly interface to stay updated. AirdropAlert was the first ever airdrop aggregator and is still recognized as the most trust library for finding safe crypto airdrops across web3. We're the home of airdrop farmers.
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Box sx={{ p: 4, height: '100%', bgcolor: 'background.default', borderRadius: 2 }}>
                          <Box
                            component="img"
                            src="/img/sticker/phone.webp"
                            alt="Mobile App"
                            sx={{ width: 48, height: 48, mb: 2, p: 1.5, bgcolor: '#40E0D0', }}
                          />
                          <Typography variant="h5" gutterBottom>
                            The latest airdrops at your finger tips
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            Download the AirdropAlert mobile app (coming soon) to instantly access the latest cryptocurrency airdrops, play-to-earn games, trading competitions and giveaways on the go. The world of airdrops at your fingertips, any time, any blockchain or layer 2, any place.
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Box sx={{ p: 4, height: '100%', bgcolor: 'background.default', borderRadius: 2 }}>
                          <Box
                            component="img"
                            src="/img/sticker/lib.webp"
                            alt="Community"
                            sx={{ width: 48, height: 48, mb: 2, p: 1.5, bgcolor: '#40E0D0',  }}
                          />
                          <Typography variant="h5" gutterBottom>
                            More than just airdrops
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            AirdropAlert is more than just a library of free airdrops. Dive into in-depth blogs, meme coins, NFTs, trading analysis, step-by-step guides and the latest updates from the crypto industry. Stay informed and ahead of the curve with our expertly curated content. Evolve yourself from airdrop farmer to an all-round crypto bro.
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Container>
                </Box>
                <Footer />
              </>
            } />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;