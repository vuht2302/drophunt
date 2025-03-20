import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import ParachuteIcon from '@mui/icons-material/Paragliding';

const AirdropCategories = () => {
  const categories = [
    {
      title: 'Featured Airdrops',
      description: 'Handpicked for their value and potential, don\'t miss out on these quality airdrops'
    },
    {
      title: 'DeFi Airdrops',
      description: 'Stay ahead of the pack and farm the latest DeFi airdrop opportunities of the week'
    },
    {
      title: 'Solana Airdrops',
      description: 'Explore the most exciting airdrops within the Solana ecosystem'
    }
  ];

  return (
    <Box sx={{ py: 8, bgcolor: '#1a1f2c' }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h4" 
          align="center" 
          sx={{ 
            color: 'white',
            mb: 6,
            fontWeight: 600
          }}
        >
          Browse airdrops effortlessly with easy search & filter options
        </Typography>
        <Grid container spacing={4}>
          {categories.map((category, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  bgcolor: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)'
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <ParachuteIcon sx={{ fontSize: 48, color: '#40E0D0' }} />
                  </Box>
                  <Typography 
                    variant="h6" 
                    align="center"
                    sx={{ 
                      color: 'white',
                      mb: 2,
                      fontWeight: 600
                    }}
                  >
                    {category.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    align="center"
                    sx={{ 
                      color: 'rgba(255,255,255,0.7)'
                    }}
                  >
                    {category.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AirdropCategories;