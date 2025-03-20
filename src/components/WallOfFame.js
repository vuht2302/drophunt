import React from 'react';
import { Box, Container, Typography, Avatar, Grid } from '@mui/material';

const WallOfFame = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Didi Taihuttu',
      handle: '@Diditaihuttu | The Bitcoin Family',
      avatar: '/img/avatars/didi.webp',
      text: 'Big kudos to the team for consistently providing such a high-quality resource. What I love most is how they\'ve adapted and grown alongside the crypto industry. From the simple days of straightforward airdrops to now integrating DeFi, NFTs, and community incentives, they\'ve stayed ahead of the curve'
    },
    {
      id: 2,
      name: 'L3yum',
      handle: '@l3yum | NFT & Ordinal Farmer',
      avatar: '/img/avatars/l3yum.webp',
      text: 'There are a lot of scams out there in the world of cryptocurrencies, especially when it comes to farming airdrops. AirdropAlert has been a reliable source for safe and legit airdrop campaigns for me and I can\'t thank them enough for all their hard work. Received plenty of NFT and Ordinal airdrops thanks to them'
    },
    {
      id: 3,
      name: 'RollingRut',
      handle: '@CryptoRut | Meme Coin Farmer',
      avatar: '/img/avatars/rollingrut.webp',
      text: 'I remember when claiming airdrops was as simple as joining a Telegram group. Nowadays there is more to it. Thanks to AirdropAlert I was eligible for a ton of staking airdrops and earlier this year I pivoted to meme coins through the guides they provided'
    },
    {
      id: 4,
      name: 'Fancy',
      handle: '@FancyXBT | Trader & Web3 Chef',
      avatar: '/img/avatars/fancy.webp',
      text: 'AirdropAlert helped me cook up a great Blast airdrop. It\'s my go-to place to search for new trends in airdrops. If you can\'t find a new cook by yourself, scroll their DeFi pages. In short, based team, easy airdrop guides, and good trading content. All you need.'
    }
  ];

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: '#40E0D0',
                mb: 1,
                textTransform: 'uppercase',
                letterSpacing: 1
              }}
            >
              Wall of Fame
            </Typography>
            <Typography 
              variant="h3" 
              sx={{ mb: 4 }}
            >
              Words from our users
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ mb: 4 }}
            >
              Over the last eight years, we have immersed ourselves in the world of airdrops, and we know that the quest for reliable information can be daunting. That's why we've created our user-friendly airdrop guides to make your farming journey smoother and more enjoyable. Our focus is safety and user experience. But don't just take our word for it—discover what our users have to share.
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
          {testimonials.map((testimonial) => (
            <Grid item xs={12} sm={6} key={testimonial.id}>
              <Box
                sx={{
                  p: 3,
                  bgcolor: '#1e293b',
                  borderRadius: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Typography 
                  variant="body1" 
                  sx={{ mb: 4, flex: 1 }}
                >
                  "{testimonial.text}"
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    sx={{ width: 48, height: 48, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.handle}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
                    </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WallOfFame;