import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Alert,
  Link,
  Card,
  CardContent,
  IconButton
} from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import RedditIcon from '@mui/icons-material/Reddit';
import GitHubIcon from '@mui/icons-material/GitHub';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CoinDetailPage = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}`,
          {
            params: {
                localization: false,
                market_data: true,
                community_data: true,
                developer_data: true,
            },
            headers: {
              'x-cg-demo-api-key': 'CG-YCwEAW3BGqLh6oZKeZyE4SRH'
            }
          }
        );

        setCoinData(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching coin data:', err);
        setError('Failed to fetch coin data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
            <CircularProgress />
          </Box>
        </Container>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        </Container>
        <Footer />
      </>
    );
  }

  if (!coinData) return null;

  const formatPrice = (price) => {
    if (typeof price !== 'number') return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 8
    }).format(price);
  };

  const formatPercent = (percent) => {
    if (typeof percent !== 'number') return 'N/A';
    return `${percent.toFixed(2)}%`;
  };

  const formatNumber = (num) => {
    if (typeof num !== 'number') return 'N/A';
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <>
      <Header />
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Coin Header */}
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <img
                  src={coinData.image?.large}
                  alt={coinData.name}
                  style={{ width: 64, height: 64 }}
                />
              </Grid>
              <Grid item xs>
                <Typography variant="h4" component="h1" gutterBottom>
                  {coinData.name} ({coinData.symbol?.toUpperCase()})
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {coinData.links?.homepage[0] && (
                    <Link href={coinData.links.homepage[0]} target="_blank" rel="noopener">
                      Website
                    </Link>
                  )}
                  {coinData.links?.blockchain_site[0] && (
                    <Link href={coinData.links.blockchain_site[0]} target="_blank" rel="noopener">
                      Explorer
                    </Link>
                  )}
                </Box>
              </Grid>
              <Grid item>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {coinData.links?.twitter_screen_name && (
                    <IconButton href={`https://twitter.com/${coinData.links.twitter_screen_name}`} target="_blank">
                      <TwitterIcon />
                    </IconButton>
                  )}
                  {coinData.links?.telegram_channel_identifier && (
                    <IconButton href={`https://t.me/${coinData.links.telegram_channel_identifier}`} target="_blank">
                      <TelegramIcon />
                    </IconButton>
                  )}
                  {coinData.links?.subreddit_url && (
                    <IconButton href={coinData.links.subreddit_url} target="_blank">
                      <RedditIcon />
                    </IconButton>
                  )}
                  {coinData.links?.repos_url?.github[0] && (
                    <IconButton href={coinData.links.repos_url.github[0]} target="_blank">
                      <GitHubIcon />
                    </IconButton>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Price and Market Data */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Price Statistics
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ mb: 2 }}>
                      <Typography color="text.secondary" gutterBottom>
                        Current Price
                      </Typography>
                      <Typography variant="h5">
                        {formatPrice(coinData.market_data?.current_price?.usd)}
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography color="text.secondary" gutterBottom>
                        24h Change
                      </Typography>
                      <Typography
                        variant="h6"
                        color={coinData.market_data?.price_change_percentage_24h >= 0 ? 'success.main' : 'error.main'}
                      >
                        {formatPercent(coinData.market_data?.price_change_percentage_24h)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ mb: 2 }}>
                      <Typography color="text.secondary" gutterBottom>
                        Market Cap
                      </Typography>
                      <Typography variant="h6">
                        {formatPrice(coinData.market_data?.market_cap?.usd)}
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography color="text.secondary" gutterBottom>
                        24h Volume
                      </Typography>
                      <Typography variant="h6">
                        {formatPrice(coinData.market_data?.total_volume?.usd)}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Market Stats
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography color="text.secondary" gutterBottom>
                    Market Cap Rank
                  </Typography>
                  <Typography variant="h6">
                    #{coinData.market_cap_rank || 'N/A'}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography color="text.secondary" gutterBottom>
                    Circulating Supply
                  </Typography>
                  <Typography variant="h6">
                    {formatNumber(coinData.market_data?.circulating_supply)}
                  </Typography>
                </Box>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Total Supply
                  </Typography>
                  <Typography variant="h6">
                    {formatNumber(coinData.market_data?.total_supply)}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Description */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              About {coinData.name}
            </Typography>
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: coinData.description?.en || 'No description available.' }}
            />
          </Paper>

          {/* Additional Information */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Community Data
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                      <Typography color="text.secondary" gutterBottom>
                        Twitter Followers
                      </Typography>
                      <Typography variant="h6">
                        {formatNumber(coinData.community_data?.twitter_followers)}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography color="text.secondary" gutterBottom>
                        Reddit Subscribers
                      </Typography>
                      <Typography variant="h6">
                        {formatNumber(coinData.community_data?.reddit_subscribers)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Developer Data
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                      <Typography color="text.secondary" gutterBottom>
                        GitHub Stars
                      </Typography>
                      <Typography variant="h6">
                        {formatNumber(coinData.developer_data?.stars)}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography color="text.secondary" gutterBottom>
                        Total Issues
                      </Typography>
                      <Typography variant="h6">
                        {formatNumber(coinData.developer_data?.total_issues)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default CoinDetailPage;