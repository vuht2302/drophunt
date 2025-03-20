import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const TrustedBrands = () => {
  const brands = [
    { name: 'Bybit', logo: '/img/brands/bybit.webp' },
    { name: 'Kelp', logo: '/img/brands/kelp.webp' },
    { name: 'SwissBorg', logo: '/img/brands/swissborg.webp' },
    { name: 'Nexo', logo: '/img/brands/nexo.webp' },
    { name: 'CEX.IO', logo: '/img/brands/cex.webp' }
  ];

  return (
    <Box sx={{ py: 4, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography 
          variant="subtitle1" 
          align="center" 
          sx={{ 
            color: '#40E0D0',
            mb: 3,
            textTransform: 'uppercase',
            letterSpacing: 1
          }}
        >
          Trusted by well-known crypto brands
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 3, md: 6 },
            flexWrap: 'wrap'
          }}
        >
          {brands.map((brand) => (
            <Box
              key={brand.name}
              component="img"
              src={brand.logo}
              alt={brand.name}
              sx={{
                height: 60,
                filter: 'brightness(0.8)',
                transition: 'filter 0.3s ease',
                '&:hover': {
                  filter: 'brightness(1)'
                }
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default TrustedBrands;