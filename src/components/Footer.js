import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider
} from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';
import RedditIcon from '@mui/icons-material/Reddit';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="primary" gutterBottom>
              DropHunt
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your AI-Powered Crypto Airdrop Hunter. Stay updated with the latest opportunities
              in the crypto space.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="primary" href="#" target="_blank">
                <TwitterIcon />
              </IconButton>
              <IconButton color="primary" href="#" target="_blank">
                <TelegramIcon />
              </IconButton>
              <IconButton color="primary" href="#" target="_blank">
                <GitHubIcon />
              </IconButton>
              <IconButton color="primary" href="#" target="_blank">
                <RedditIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1 }}>
              About Us
            </Link>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1 }}>
              How It Works
            </Link>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1 }}>
              FAQ
            </Link>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1 }}>
              Contact
            </Link>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Resources
            </Typography>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1 }}>
              Airdrop Guide
            </Link>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1 }}>
              Security Tips
            </Link>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1 }}>
              Blog
            </Link>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1 }}>
              Newsletter
            </Link>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 6, mb: 3 }} />

        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} DropHunt. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;