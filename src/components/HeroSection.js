import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';

const HeroSection = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(45deg, #1a1f2c 30%, #2c1f3d 90%)',
        color: 'white',
        py: 8,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' }
              }}
            >
              Bringing you new airdrops <Typography 
                component="span" 
                sx={{ 
                  color: '#40E0D0',
                  display: 'inline',
                  fontWeight: 700,
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                every day
              </Typography> since 2017
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255,255,255,0.8)',
                mb: 4,
                maxWidth: 600
              }}
            >
              DropHunt is the most trusted place in web3 to find the latest airdrop campaigns. 
              Discover new crypto airdrops and learn how to join them with easy-to-follow guides.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="contained" 
                size="large"
                sx={{ 
                  bgcolor: '#40E0D0',
                  '&:hover': {
                    bgcolor: '#2ec4b6'
                  }
                }}
              >
                View all airdrops
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                sx={{ 
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: '#40E0D0',
                    color: '#40E0D0'
                  }
                }}
              >
                List Airdrop
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                '& img': {
                  width: '100%',
                  maxWidth: '300px',
                  maxHeight: '600px',
                  height: 'auto',
                  display: 'block',
                  margin: '0 auto',
                  py: 2
                }
              }}
            >
              <img 
                src="/img/AirdropAlert-app-1.webp" 
                alt="DropHunt App Preview"
                style={{
                  filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.25))'
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;