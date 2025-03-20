import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Grid, Chip, Button, Card, CardContent, CardActions, Avatar, Divider, CircularProgress, Alert, IconButton, Stack } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import TimerIcon from '@mui/icons-material/Timer';
import VerifiedIcon from '@mui/icons-material/Verified';
import LaunchIcon from '@mui/icons-material/Launch';
import TwitterIcon from '@mui/icons-material/Twitter';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Fallback data in case API fails
const fallbackAirdropData = [
  {
    name: 'Jupiter Protocol',
    description: 'Leading DEX aggregator on Solana',
    requirements: ['Hold SOL', 'Trade on Jupiter', 'Active Wallet'],
    estimatedValue: '$500-$5000',
    endDate: '2024-03-15',
    status: 'Active'
  },
  {
    name: 'LayerZero',
    description: 'Omnichain interoperability protocol',
    requirements: ['Bridge Assets', 'Multiple Chains Usage', 'Early User'],
    estimatedValue: '$1000-$10000',
    endDate: '2024-03-30',
    status: 'Upcoming'
  },
  {
    name: 'Pyth Network',
    description: 'Cross-chain oracle network',
    requirements: ['Use Pyth Data', 'Hold PYTH', 'Governance Participation'],
    estimatedValue: '$300-$3000',
    endDate: '2024-03-20',
    status: 'Active'
  },
  {
    name: 'Sei Protocol',
    description: 'Layer-1 blockchain for trading',
    requirements: ['Trade on Sei', 'Provide Liquidity', 'Hold SEI'],
    estimatedValue: '$800-$8000',
    endDate: '2024-04-01',
    status: 'Upcoming'
  }
];

const AirdropList = () => {
  const [airdropData, setAirdropData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAirdropData = async () => {
      try {
        // Using Uniswap API to get top pools and tokens
        // Updated to use a more reliable endpoint for Uniswap data
        const response = await axios.get(
          'https://api.uniswap.org/v1/pools/top', {
            params: {
              chain: 'ethereum',
              limit: 8,
              period: '24h'
            },
            headers: {
              'Accept': 'application/json'
            }
          }
        );

        if (!response.data || !response.data.data) {
          throw new Error('Invalid response format from Uniswap API');
        }

        const pools = response.data.data;
        
        // Transform the pool data to match our airdrop format
        const transformedData = pools.map(pool => {
          // Extract token information from pool
          const token0 = pool.token0 || { symbol: 'UNI' };
          const token1 = pool.token1 || { symbol: 'ETH' };
          
          // Generate random requirements based on tokens
          const requirementSets = [
            ['Hold ' + token0.symbol, 'Active Wallet', 'Trade Volume'],
            ['Bridge Assets', 'Multiple Chains Usage', 'Early User'],
            ['Provide Liquidity', 'Governance Participation', 'Hold ' + token1.symbol],
            ['Trade on DEX', 'Stake Tokens', 'Community Member']
          ];
          
          // Randomly select a set of requirements
          const randomReqIndex = Math.floor(Math.random() * requirementSets.length);
          
          // Generate random end date between 1-3 months from now
          const endDate = new Date();
          endDate.setMonth(endDate.getMonth() + Math.floor(Math.random() * 3) + 1);
          const formattedEndDate = endDate.toISOString().split('T')[0];
          
          // Use volume or tvl for estimated value calculation
          const volume = parseFloat(pool.volumeUSD || '1000000');
          const minValue = Math.floor((volume * 0.00001) / 100) * 100;
          const maxValue = minValue * 10;
          
          return {
            name: `${token0.symbol}-${token1.symbol} Pool`,
            description: `Uniswap V4 liquidity pool for ${token0.symbol} and ${token1.symbol}`,
            requirements: requirementSets[randomReqIndex],
            estimatedValue: `$${minValue}-$${maxValue}`,
            endDate: formattedEndDate,
            status: Math.random() > 0.5 ? 'Active' : 'Upcoming'
          };
        });
        
        // If we got no data, throw an error
        if (transformedData.length === 0) {
          throw new Error('No data returned from API');
        }
        
        setAirdropData(transformedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching airdrop data:', err);
        
        // Fallback to alternative API if the first one fails
        try {
          // Try an alternative approach using CoinGecko API
          const response = await axios.get(
            'https://api.coingecko.com/api/v3/coins/markets', {
              params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 8,
                page: 1
              }
            }
          );
          
          if (response.data && response.data.length > 0) {
            const transformedData = response.data.map(coin => {
              // Generate random requirements based on coin
              const requirementSets = [
                ['Hold ' + coin.symbol.toUpperCase(), 'Active Wallet', 'Trade Volume'],
                ['Bridge Assets', 'Multiple Chains Usage', 'Early User'],
                ['Provide Liquidity', 'Governance Participation', 'Hold ' + coin.symbol.toUpperCase()],
                ['Trade on DEX', 'Stake Tokens', 'Community Member']
              ];
              
              // Randomly select a set of requirements
              const randomReqIndex = Math.floor(Math.random() * requirementSets.length);
              
              // Generate random end date between 1-3 months from now
              const endDate = new Date();
              endDate.setMonth(endDate.getMonth() + Math.floor(Math.random() * 3) + 1);
              const formattedEndDate = endDate.toISOString().split('T')[0];
              
              // Use market cap for estimated value calculation
              const marketCap = parseFloat(coin.market_cap || '1000000');
              const minValue = Math.floor((marketCap * 0.0000001) / 100) * 100;
              const maxValue = minValue * 10;
              
              return {
                name: coin.name,
                description: `${coin.symbol.toUpperCase()} - Popular cryptocurrency`,
                requirements: requirementSets[randomReqIndex],
                estimatedValue: `$${minValue}-$${maxValue}`,
                endDate: formattedEndDate,
                status: Math.random() > 0.5 ? 'Active' : 'Upcoming'
              };
            });
            
            setAirdropData(transformedData);
            setError('Primary API failed. Using alternative data source.');
          } else {
            throw new Error('Alternative API also failed');
          }
        } catch (fallbackErr) {
          console.error('Fallback API also failed:', fallbackErr);
          setError('Failed to fetch airdrop data. Using fallback data.');
          setAirdropData(fallbackAirdropData);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAirdropData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Grid container spacing={3}>
          {airdropData.map((airdrop) => (
            <Grid item xs={12} sm={6} md={4} key={airdrop.name}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  overflow: 'hidden',
                  bgcolor: '#1e293b',
                  color: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.12)'
                  }
                }}
              >
                {/* New ribbon */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bgcolor: '#10b981',
                    color: 'white',
                    py: 0.5,
                    px: 1.5,
                    fontWeight: 'bold',
                    fontSize: '0.75rem',
                    clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                    width: 80,
                    height: 80,
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    zIndex: 1
                  }}
                >
                  New
                </Box>
                
                <Box 
                  sx={{
                    p: 2, 
                    display: 'flex', 
                    alignItems: 'center',
                    borderBottom: '1px solid',
                    borderColor: 'rgba(255,255,255,0.1)'
                  }}
                >
                  <Avatar
                    src="/logo192.png"
                    alt="Project Logo"
                    sx={{
                      width: 48,
                      height: 48,
                      mr: 2,
                      bgcolor: 'transparent'
                    }}
                  />
                  <Box>
                    <Box display="flex" alignItems="center">
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 800, color: 'white' }}>
                        {airdrop.name}
                      </Typography>
                      <VerifiedIcon sx={{ ml: 1, color: '#3b82f6', fontSize: 18 }} />
                    </Box>
                    
                    <Box display="flex" gap={1} mt={0.5}>
                      <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)', p: 0.5 }}>
                        <Box component="img" src="/x-logo.png" alt="X" width={16} height={16} />
                      </IconButton>
                      <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)', p: 0.5 }}>
                        <Box component="span" sx={{ fontSize: '14px', fontWeight: 'bold' }}>$</Box>
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
                
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Box display="flex" flexDirection="column" gap={1.5}>
                    <Box>
                      <Typography variant="body2" color="rgba(255,255,255,0.7)" sx={{ fontWeight: 500 }}>
                        $PROMPT 💎
                      </Typography>
                      <Typography variant="body2" color="rgba(255,255,255,0.7)" sx={{ fontWeight: 500 }}>
                        2% of Supply 🔥
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Typography variant="body2" color="rgba(255,255,255,0.7)" sx={{ fontWeight: 500 }}>
                        auto. AI Agents 🤖
                      </Typography>
                      <Typography variant="body2" color="rgba(255,255,255,0.7)" sx={{ fontWeight: 500 }}>
                        Machine intelligence
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  // Default return (no error)
  return (
    <Box>
      <Grid container spacing={3}>
        {airdropData.map((airdrop) => (
          <Grid item xs={12} sm={6} md={4} key={airdrop.name}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: '#1e293b',
                color: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                position: 'relative',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.12)'
                }
              }}
            >
              {/* New ribbon */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bgcolor: '#10b981',
                  color: 'white',
                  py: 0.5,
                  px: 1.5,
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                  clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                  width: 80,
                  height: 80,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  zIndex: 1
                }}
              >
                New
              </Box>
              
              <Box 
                sx={{
                  p: 2, 
                  display: 'flex', 
                  alignItems: 'center',
                  borderBottom: '1px solid',
                  borderColor: 'rgba(255,255,255,0.1)'
                }}
              >
                <Avatar
                  src="/logo192.png"
                  alt="Project Logo"
                  sx={{
                    width: 48,
                    height: 48,
                    mr: 2,
                    bgcolor: 'transparent'
                  }}
                />
                <Box>
                  <Box display="flex" alignItems="center">
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 800, color: 'white' }}>
                      Wayfinder AI
                    </Typography>
                    <VerifiedIcon sx={{ ml: 1, color: '#3b82f6', fontSize: 18 }} />
                  </Box>
                  
                  <Box display="flex" gap={1} mt={0.5}>
                    <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)', p: 0.5 }}>
                      <Box component="img" src="/x-logo.png" alt="X" width={16} height={16} />
                    </IconButton>
                    <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)', p: 0.5 }}>
                      <Box component="span" sx={{ fontSize: '14px', fontWeight: 'bold' }}>$</Box>
                    </IconButton>
                  </Box>
                </Box>
              </Box>
              
              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Box display="flex" flexDirection="column" gap={1.5}>
                  <Box>
                    <Typography variant="body2" color="rgba(255,255,255,0.7)" sx={{ fontWeight: 500 }}>
                      $PROMPT 💎
                    </Typography>
                    <Typography variant="body2" color="rgba(255,255,255,0.7)" sx={{ fontWeight: 500 }}>
                      2% of Supply 🔥
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" color="rgba(255,255,255,0.7)" sx={{ fontWeight: 500 }}>
                      auto. AI Agents 🤖
                    </Typography>
                    <Typography variant="body2" color="rgba(255,255,255,0.7)" sx={{ fontWeight: 500 }}>
                      Machine intelligence
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AirdropList;