import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Chip, 
  Button, 
  Card, 
  CardContent, 
  CardActions, 
  Avatar, 
  Divider, 
  CircularProgress, 
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Pagination
} from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import TimerIcon from '@mui/icons-material/Timer';
import VerifiedIcon from '@mui/icons-material/Verified';
import LaunchIcon from '@mui/icons-material/Launch';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Fallback data in case API fails - same as in AirdropList component
const fallbackAirdropData = [
  {
    name: 'Jupiter Protocol',
    description: 'Leading DEX aggregator on Solana',
    requirements: ['Hold SOL', 'Trade on Jupiter', 'Active Wallet'],
    estimatedValue: '$500-$5000',
    endDate: '2024-03-15',
    status: 'Active',
    category: 'DEX'
  },
  {
    name: 'LayerZero',
    description: 'Omnichain interoperability protocol',
    requirements: ['Bridge Assets', 'Multiple Chains Usage', 'Early User'],
    estimatedValue: '$1000-$10000',
    endDate: '2024-03-30',
    status: 'Upcoming',
    category: 'Infrastructure'
  },
  {
    name: 'Pyth Network',
    description: 'Cross-chain oracle network',
    requirements: ['Use Pyth Data', 'Hold PYTH', 'Governance Participation'],
    estimatedValue: '$300-$3000',
    endDate: '2024-03-20',
    status: 'Active',
    category: 'Oracle'
  },
  {
    name: 'Sei Protocol',
    description: 'Layer-1 blockchain for trading',
    requirements: ['Trade on Sei', 'Provide Liquidity', 'Hold SEI'],
    estimatedValue: '$800-$8000',
    endDate: '2024-04-01',
    status: 'Upcoming',
    category: 'Layer 1'
  },
  {
    name: 'Arbitrum',
    description: 'Layer-2 scaling solution for Ethereum',
    requirements: ['Use Arbitrum Bridge', 'Transact on Arbitrum', 'Hold ETH'],
    estimatedValue: '$1200-$12000',
    endDate: '2024-04-15',
    status: 'Active',
    category: 'Layer 2'
  },
  {
    name: 'Uniswap V4',
    description: 'Next generation decentralized exchange',
    requirements: ['Provide Liquidity', 'Trade on Uniswap', 'Hold UNI'],
    estimatedValue: '$2000-$20000',
    endDate: '2024-05-01',
    status: 'Upcoming',
    category: 'DEX'
  },
  {
    name: 'Celestia',
    description: 'Modular blockchain network',
    requirements: ['Run a Light Node', 'Stake TIA', 'Participate in Testnet'],
    estimatedValue: '$700-$7000',
    endDate: '2024-04-10',
    status: 'Active',
    category: 'Infrastructure'
  },
  {
    name: 'Starknet',
    description: 'Layer-2 scaling with zk-rollups',
    requirements: ['Deploy Contract', 'Use StarkEx', 'Early Adopter'],
    estimatedValue: '$900-$9000',
    endDate: '2024-03-25',
    status: 'Upcoming',
    category: 'Layer 2'
  }
];

// Categories for filtering
const categories = [
  'All',
  'DEX',
  'Layer 1',
  'Layer 2',
  'Infrastructure',
  'Oracle',
  'GameFi',
  'DeFi',
  'NFT'
];

// Statuses for filtering
const statuses = ['All', 'Active', 'Upcoming', 'Ended'];

const AirdropPage = () => {
  const [airdropData, setAirdropData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  
  // Filter states
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  
  const location = useLocation();
  
  // Check if we have a specific airdrop to highlight from the URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const airdropName = params.get('name');
    if (airdropName) {
      setSearchQuery(airdropName);
    }
  }, [location]);

  useEffect(() => {
    const fetchAirdropData = async () => {
      try {
        // Using Uniswap API to get top pools and tokens
        const response = await axios.get(
          'https://api.uniswap.org/v1/pools/top', {
            params: {
              chain: 'ethereum',
              limit: 12,
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
          
          // Assign a random category
          const randomCategory = categories[Math.floor(Math.random() * (categories.length - 1)) + 1];
          
          return {
            name: `${token0.symbol}-${token1.symbol} Pool`,
            description: `Uniswap V4 liquidity pool for ${token0.symbol} and ${token1.symbol}`,
            requirements: requirementSets[randomReqIndex],
            estimatedValue: `$${minValue}-$${maxValue}`,
            endDate: formattedEndDate,
            status: Math.random() > 0.5 ? 'Active' : 'Upcoming',
            category: randomCategory
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
                per_page: 12,
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
              
              // Assign a random category
              const randomCategory = categories[Math.floor(Math.random() * (categories.length - 1)) + 1];
              
              return {
                name: coin.name,
                description: `${coin.symbol.toUpperCase()} - Popular cryptocurrency`,
                requirements: requirementSets[randomReqIndex],
                estimatedValue: `$${minValue}-$${maxValue}`,
                endDate: formattedEndDate,
                status: Math.random() > 0.5 ? 'Active' : 'Upcoming',
                category: randomCategory
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

  // Filter airdrops based on category, status, and search query
  useEffect(() => {
    let filtered = [...airdropData];
    
    // Filter by category
    if (categoryFilter !== 'All') {
      filtered = filtered.filter(airdrop => airdrop.category === categoryFilter);
    }
    
    // Filter by status
    if (statusFilter !== 'All') {
      filtered = filtered.filter(airdrop => airdrop.status === statusFilter);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(airdrop => 
        airdrop.name.toLowerCase().includes(query) || 
        airdrop.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredData(filtered);
  }, [airdropData, categoryFilter, statusFilter, searchQuery]);
  
  // Calculate pagination
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  
  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
    setPage(1);
  };
  
  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
    setPage(1);
  };
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

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

  return (
    <>
      <Header />
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 700, mb: 1 }}>
            Browse Crypto Airdrops
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
            Find and filter the latest airdrops, track upcoming token distributions, and never miss a free crypto opportunity
          </Typography>
          
          {error && (
            <Alert severity="warning" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          {/* Filters Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, overflowX: 'auto', py: 1 }}>
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value="All"
                displayEmpty
                sx={{
                  bgcolor: '#1e293b',
                  color: 'white',
                  borderRadius: 50,
                  px: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                  },
                  '&:hover': {
                    bgcolor: '#334155'
                  },
                  '& .MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    py: 1,
                    minWidth: 'auto',
                    whiteSpace: 'nowrap'
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'white'
                  }
                }}
              >
                <MenuItem value="All">KYC?</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={statusFilter}
                onChange={handleStatusChange}
                displayEmpty
                sx={{
                  bgcolor: '#1e293b',
                  color: 'white',
                  borderRadius: 50,
                  px: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                  },
                  '&:hover': {
                    bgcolor: '#334155'
                  },
                  '& .MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    py: 1,
                    minWidth: 'auto',
                    whiteSpace: 'nowrap'
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'white'
                  }
                }}
              >
                {statuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={categoryFilter}
                onChange={handleCategoryChange}
                displayEmpty
                sx={{
                  bgcolor: '#1e293b',
                  color: 'white',
                  borderRadius: 50,
                  px: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                  },
                  '&:hover': {
                    bgcolor: '#334155'
                  },
                  '& .MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    py: 1,
                    minWidth: 'auto',
                    whiteSpace: 'nowrap'
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'white'
                  }
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value="All"
                displayEmpty
                sx={{
                  bgcolor: '#1e293b',
                  color: 'white',
                  borderRadius: 50,
                  px: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                  },
                  '&:hover': {
                    bgcolor: '#334155'
                  },
                  '& .MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    py: 1,
                    minWidth: 'auto',
                    whiteSpace: 'nowrap'
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'white'
                  }
                }}
              >
                <MenuItem value="All">Blockchain</MenuItem>
                <MenuItem value="Ethereum">Ethereum</MenuItem>
                <MenuItem value="Solana">Solana</MenuItem>
                <MenuItem value="Binance">Binance</MenuItem>
                <MenuItem value="Polygon">Polygon</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              sx={{
                bgcolor: '#38bdf8',
                color: 'white',
                borderRadius: 50,
                px: 4,
                '&:hover': {
                  bgcolor: '#0ea5e9'
                },
                minWidth: 'auto',
                whiteSpace: 'nowrap'
              }}
            >
              Search
            </Button>
          </Box>

          {/* Keep the existing filter functionality but hide it */}
          <Box sx={{ display: 'none' }}>
            <Box sx={{ p: 3, mb: 4, borderRadius: 2, bgcolor: 'background.paper', boxShadow: 1 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <FilterListIcon sx={{ mr: 1 }} />
                <Typography variant="h6" component="h2">
                  Filter Airdrops
                </Typography>
              </Box>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    placeholder="Search airdrops..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={categoryFilter}
                      label="Category"
                      onChange={handleCategoryChange}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={statusFilter}
                      label="Status"
                      onChange={handleStatusChange}
                    >
                      {statuses.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Box>
          
          {/* Results Count */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="subtitle1">
              Showing {filteredData.length} airdrops
            </Typography>
            {pageCount > 1 && (
              <Typography variant="body2" color="text.secondary">
                Page {page} of {pageCount}
              </Typography>
            )}
          </Box>
          
          {/* Airdrops Grid */}
          {paginatedData.length > 0 ? (
            <Grid container spacing={3}>
              {paginatedData.map((airdrop) => (
                <Grid item xs={12} sm={6} md={4} key={airdrop.name}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.12)'
                      }
                    }}
                  >
                    <Box 
                      sx={{
                        p: 2, 
                        display: 'flex', 
                        alignItems: 'center',
                        borderBottom: '1px solid',
                        borderColor: 'divider'
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: 'primary.light',
                          width: 48,
                          height: 48,
                          mr: 2,
                          fontSize: '1.2rem',
                          fontWeight: 'bold'
                        }}
                      >
                        {airdrop.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Box display="flex" alignItems="center">
                          <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                            {airdrop.name}
                          </Typography>
                          {airdrop.status === 'Active' && (
                            <VerifiedIcon sx={{ ml: 1, color: 'primary.main', fontSize: 18 }} />
                          )}
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {airdrop.description}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <CardContent sx={{ flexGrow: 1, p: 2 }}>
                      <Box display="flex" justifyContent="space-between" mb={2}>
                        <Chip
                          label={airdrop.status}
                          color={airdrop.status === 'Active' ? 'success' : airdrop.status === 'Upcoming' ? 'warning' : 'default'}
                          size="small"
                          sx={{ fontWeight: 500 }}
                        />
                        <Chip
                          label={airdrop.category}
                          size="small"
                          variant="outlined"
                          sx={{ fontWeight: 500 }}
                        />
                      </Box>
                      
                      <Box display="flex" alignItems="center" mb={2}>
                        <TimerIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                          Ends: {airdrop.endDate}
                        </Typography>
                      </Box>
                      
                      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>
                        Requirements
                      </Typography>
                      <Box display="flex" gap={0.75} flexWrap="wrap" mb={2}>
                        {airdrop.requirements.map((req) => (
                          <Chip
                            key={req}
                            label={req}
                            size="small"
                            variant="outlined"
                            sx={{ 
                              borderRadius: 1,
                              fontSize: '0.7rem',
                              height: 24
                            }}
                          />
                        ))}
                      </Box>
                      
                      <Divider sx={{ my: 1.5 }} />
                      
                      <Box display="flex" alignItems="center" mb={1}>
                        <LocalOfferIcon sx={{ mr: 1, color: 'primary.main', fontSize: 18 }} />
                        <Typography variant="body2" fontWeight={500}>
                          Est. Value: {airdrop.estimatedValue}
                        </Typography>
                      </Box>
                    </CardContent>
                    
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button
                        variant="contained"
                        fullWidth
                        endIcon={<LaunchIcon />}
                        sx={{ 
                          borderRadius: 1.5,
                          py: 1,
                          fontWeight: 600,
                          textTransform: 'none'
                        }}
                        onClick={() => window.open('#', '_blank')}
                      >
                        Participate Now
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box textAlign="center" py={5}>
              <Typography variant="h6" color="text.secondary">
                No airdrops found matching your criteria
              </Typography>
              <Button 
                variant="outlined" 
                sx={{ mt: 2 }}
                onClick={() => {
                  setCategoryFilter('All');
                  setStatusFilter('All');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </Button>
            </Box>
          )}
          
          {/* Pagination */}
          {pageCount > 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination 
                count={pageCount} 
                page={page} 
                onChange={handlePageChange} 
                color="primary" 
                size="large"
                showFirstButton 
                showLastButton
              />
            </Box>
          )}
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default AirdropPage;