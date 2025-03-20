import React from 'react';
import { Box, Paper, Typography, Grid, Chip, Button, Avatar } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';

const newsData = [
  {
    title: 'Jupiter Protocol Announces Major Airdrop Campaign',
    author: 'Crypto News Team',
    date: '2024-02-15',
    summary: 'Jupiter Protocol, the leading DEX aggregator on Solana, has announced a significant airdrop for early users and active traders. The protocol aims to reward community members who have contributed to its growth.',
    tags: ['Solana', 'DEX', 'Airdrop'],
    readTime: '5 min',
    imageUrl: 'https://picsum.photos/400/200'
  },
  {
    title: 'LayerZero: Cross-Chain Innovation Meets Community Rewards',
    author: 'DeFi Insider',
    date: '2024-02-14',
    summary: 'LayerZero\'s upcoming airdrop is set to revolutionize cross-chain incentives. Early adopters and bridge users are positioned for substantial rewards as the protocol expands its ecosystem.',
    tags: ['Cross-chain', 'DeFi', 'Innovation'],
    readTime: '4 min',
    imageUrl: 'https://picsum.photos/400/200'
  },
  {
    title: 'Pyth Network Expands Oracle Services with Token Launch',
    author: 'Blockchain Weekly',
    date: '2024-02-13',
    summary: 'Pyth Networks oracle services continue to grow as they prepare for a major token launch. The team discusses how the airdrop will strengthen decentralized price feeds across multiple chains.',
    tags: ['Oracle', 'Token Launch', 'Multi-chain'],
    readTime: '6 min',
    imageUrl: 'https://picsum.photos/400/200'
  }
];

const NewsArticle = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        {newsData.map((article, index) => (
          <Grid item xs={12} key={index}>
            <Paper
              sx={{
                p: 3,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                }
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box
                    component="img"
                    src={article.imageUrl}
                    alt={article.title}
                    sx={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                      borderRadius: 1
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography variant="h5" gutterBottom>
                    {article.title}
                  </Typography>
                  
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Box display="flex" alignItems="center">
                      <PersonIcon sx={{ mr: 1, fontSize: 20 }} />
                      <Typography variant="body2" color="text.secondary">
                        {article.author}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <CalendarTodayIcon sx={{ mr: 1, fontSize: 20 }} />
                      <Typography variant="body2" color="text.secondary">
                        {article.date}
                      </Typography>
                    </Box>
                    <Chip
                      label={`${article.readTime} read`}
                      size="small"
                      sx={{ ml: 'auto' }}
                    />
                  </Box>

                  <Typography variant="body1" paragraph>
                    {article.summary}
                  </Typography>

                  <Box display="flex" gap={1} mb={2}>
                    {article.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        variant="outlined"
                        sx={{ borderRadius: 1 }}
                      />
                    ))}
                  </Box>

                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mt: 1 }}
                    onClick={() => window.open('#', '_blank')}
                  >
                    Read More
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewsArticle;