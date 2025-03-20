import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,

  Button
} from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookIcon from '@mui/icons-material/Facebook';
import Header from '../components/Header';
import Footer from '../components/Footer';

const blogPosts = [
  {
    id: 1,
    title: 'Delta Neutral Yield Farming: Guide to Decreasing Risks',
    image: '/img/Delta-neutral-airdrop-farming.webp',
    date: 'Mar 2025',
    category: 'Trading'
  },
  {
    id: 2,
    title: 'Bitcoin Whale and the Stop-Hunting Battle: Will the $332 Million Short Position Survive?',
    image: '/img/Trading-Break-out-Patterns.webp',
    date: 'Mar 2025',
    category: 'Trading'
  },
  {
    id: 3,
    title: 'The Ultimate Guide to Airdrop Farming 2025 with Strategy Tips',
    image: '/img/Airdrop-Farming-2025.webp',
    date: 'Mar 2025',
    category: 'Airdrops'
  },
  {
    id: 4,
    title: 'Solana Ad Controversy: The Big Bitcoin Short & More Updates',
    image: '/img/Solana-AD-backfire.webp',
    date: 'Mar 2025',
    category: 'News'
  },
  {
    id: 5,
    title: 'How to Create Your Own Crypto Token: A Step-by-Step Beginner\'s Guide',
    image: '/img/Biggest-airdrops-2024.webp',
    date: 'Mar 2025',
    category: 'Learn'
  },
  {
    id: 6,
    title: 'Paying Taxes on Crypto Airdrops: What You Need to Know',
    image: '/img/Paying-Taxes-on-Airdrops.webp',
    date: 'Mar 2025',
    category: 'Learn'
  }
];

const BlogPage = () => {
  const featuredPost = blogPosts[0];
  const remainingPosts = blogPosts.slice(1);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        {/* Hero Section */}
        <Box sx={{ mb: 6 }}>
          <Card sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
            <CardMedia
              component="img"
              height="500"
              image={featuredPost.image}
              alt={featuredPost.title}
              sx={{
                filter: 'brightness(0.7)'
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                p: 4,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)'
              }}
            >
              <Typography
                variant="overline"
                sx={{ color: 'primary.main', fontWeight: 600, mb: 1, display: 'block' }}
              >
                Featured Post
              </Typography>
              <Typography variant="h3" component="h1" sx={{ color: 'white', mb: 2, fontWeight: 700 }}>
                {featuredPost.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body1" sx={{ color: 'grey.300' }}>
                  {featuredPost.date}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton size="small" sx={{ color: 'white', '&:hover': { color: 'primary.main' } }}>
                    <TwitterIcon />
                  </IconButton>
                  <IconButton size="small" sx={{ color: 'white', '&:hover': { color: 'primary.main' } }}>
                    <TelegramIcon />
                  </IconButton>
                  <IconButton size="small" sx={{ color: 'white', '&:hover': { color: 'primary.main' } }}>
                    <FacebookIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Card>
        </Box>

        {/* Blog Posts Grid */}
        <Grid container spacing={4}>
          {remainingPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={post.image}
                  alt={post.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="overline"
                    sx={{ color: 'primary.main', fontWeight: 600, mb: 1, display: 'block' }}
                  >
                    {post.category}
                  </Typography>
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
                    {post.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      {post.date}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small" sx={{ '&:hover': { color: 'primary.main' } }}>
                        <TwitterIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" sx={{ '&:hover': { color: 'primary.main' } }}>
                        <TelegramIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Load More Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1,
              borderWidth: 2,
              '&:hover': { borderWidth: 2 }
            }}
          >
            Load More Articles
          </Button>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default BlogPage;