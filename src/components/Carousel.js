import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Paper,
  Button,
  MobileStepper
} from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const carouselItems = [
  {
    id: 1,
    title: 'Trade Early Meme Coins and Farm a Stimmy!',
    description: 'Get ready for the next big meme coin opportunity',
    image: '/img/Delta-neutral-airdrop-farming.webp',
    link: '/airdrops'
  },
  {
    id: 2,
    title: 'Earn Rewards by Running a Daigram Node',
    description: 'Become a node operator and earn $DGRAM daily',
    image: '/img/Trading-Break-out-Patterns.webp',
    link: '/airdrops'
  },
  {
    id: 3,
    title: 'AI-powered launchpad for seamless token launches',
    description: 'Win a share of 223,026,400 LOX on SOLANA!',
    image: '/img/Solana-AD-backfire.webp',
    link: '/airdrops'
  },
  {
    id: 4,
    title: 'Earn from 40M $NEF tokens valued at $2M at TGE',
    description: 'Infrastructure rewards decentralized AI',
    image: '/img/Biggest-airdrops-2024.webp',
    link: '/airdrops'
  }
];

const Carousel = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = carouselItems.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => 
      prevActiveStep === 0 ? maxSteps - 1 : prevActiveStep - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mb: 6 }}>
      <Paper
        elevation={0}
        sx={{
          position: 'relative',
          backgroundColor: 'background.paper',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            height: 400,
            width: '100%',
            position: 'relative',
            backgroundImage: `url(${carouselItems[activeStep].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: 4,
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)'
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              sx={{ color: 'white', mb: 2, fontWeight: 700 }}
            >
              {carouselItems[activeStep].title}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: 'grey.300', mb: 3 }}
            >
              {carouselItems[activeStep].description}
            </Typography>
            <Button
              variant="contained"
              size="large"
              href={carouselItems[activeStep].link}
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1,
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem'
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>

        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{
            backgroundColor: 'transparent',
            position: 'absolute',
            bottom: 0,
            width: '100%',
            '& .MuiMobileStepper-dot': {
              backgroundColor: 'rgba(255, 255, 255, 0.5)'
            },
            '& .MuiMobileStepper-dotActive': {
              backgroundColor: 'white'
            }
          }}
          nextButton={
            <IconButton
              size="small"
              onClick={handleNext}
              sx={{ color: 'white', mr: 1 }}
            >
              <KeyboardArrowRight />
            </IconButton>
          }
          backButton={
            <IconButton
              size="small"
              onClick={handleBack}
              sx={{ color: 'white', ml: 1 }}
            >
              <KeyboardArrowLeft />
            </IconButton>
          }
        />
      </Paper>
    </Container>
  );
};

export default Carousel;