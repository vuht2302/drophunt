import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 

  Avatar, 
 
  CircularProgress, 
  Alert,
  FormControl,
  
  Select,
  MenuItem,
  Pagination
} from '@mui/material';

import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Categories for filtering
const categories = ['All', 'DEX', 'Layer 1', 'Layer 2', 'Infrastructure', 'Oracle', 'GameFi', 'DeFi', 'NFT'];
const statuses = ['All', 'Active', 'Upcoming', 'Ended'];

const AirdropPage = () => {
  const navigate = useNavigate();
  const [coinData, setCoinData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;


  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: { 
            vs_currency: 'usd', 
            order: 'market_cap_desc', 
            per_page: 20, 
            page: 1, 
            sparkline: false,
            price_change_percentage: '1h,24h,7d',
            ids: 'bitcoin,ethereum,solana,cardano,ripple,polkadot,avalanche-2,chainlink,uniswap,cosmos,near,fantom,aave,maker,compound-governance-token,curve-dao-token,synthetix-network-token,yearn-finance,sushi,1inch,pi-network'
          },
          headers: { 'x-cg-demo-api-key': 'CG-YCwEAW3BGqLh6oZKeZyE4SRH' }
        });

        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Invalid response format from CoinGecko API');
        }

        const transformedData = response.data.map((token, index) => ({
          id: token.id,
          name: token.name,
          symbol: token.symbol.toUpperCase(),
          current_price: token.current_price,
          price_change_1h: token.price_change_percentage_1h_in_currency,
          price_change_24h: token.price_change_percentage_24h,
          price_change_7d: token.price_change_percentage_7d,
          volume_24h: token.total_volume,
          market_cap: token.market_cap,
          image: token.image // Kiểm tra hình ảnh trong dữ liệu nhận được
        }));
      

        setCoinData(transformedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching coin data:', err);
        setError('Failed to fetch coin data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, []);

  const filteredData = coinData.filter(coin => {
    if (categoryFilter !== 'All' && coin.category !== categoryFilter) {
      return false;
    }
    if (statusFilter !== 'All' && coin.status !== statusFilter) {
      return false;
    }
    return true;
  });

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  
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
            Browse Crypto Coins
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
            Find and filter the latest crypto coins, track their prices, and monitor market performance
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
                value={statusFilter}
                onChange={handleStatusChange}
                displayEmpty
                sx={{
                  bgcolor: '#1e293b',
                  color: 'white',
                  borderRadius: 50,
                  px: 2,
                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                  '&:hover': { bgcolor: '#334155' },
                  '& .MuiSelect-select': { display: 'flex', alignItems: 'center', gap: 1, py: 1 },
                  '& .MuiSvgIcon-root': { color: 'white' }
                }}
              >
                {statuses.map((status) => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
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
                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                  '&:hover': { bgcolor: '#334155' },
                  '& .MuiSelect-select': { display: 'flex', alignItems: 'center', gap: 1, py: 1 },
                  '& .MuiSvgIcon-root': { color: 'white' }
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Coin results */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="subtitle1">
              Showing {filteredData.length} coins
            </Typography>
            {pageCount > 1 && (
              <Typography variant="body2" color="text.secondary">
                Page {page} of {pageCount}
              </Typography>
            )}
          </Box>

          {/* Coins Table */}
          {paginatedData.length > 0 ? (
            <Box sx={{ overflowX: 'auto' }}>
            <Box component="table" sx={{
  width: '100%',
  borderCollapse: 'collapse',
  bgcolor: '#1e293b',
  borderRadius: 2,
  overflow: 'hidden',
  '& th, & td': {
    padding: '12px 16px',
    textAlign: 'left',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  }
}}>
  <Box component="thead" sx={{ bgcolor: 'rgba(255,255,255,0.05)' }}>
    <Box component="tr">
      <Box component="th" sx={{ width: '40px' }}>#</Box>
      <Box component="th">Coin</Box>
      <Box component="th">Price</Box>
      <Box component="th">1h Change</Box>
      <Box component="th">24h Change</Box>
      <Box component="th">7d Change</Box>
      <Box component="th">24h Volume</Box>
      <Box component="th">Market Cap</Box>
      <Box component="th">Chart 7 Days</Box>
    </Box>
  </Box>
  <Box component="tbody">
  {paginatedData.map((coin, index) => {
  console.log('Image URL:', coin.image); // Kiểm tra URL hình ảnh cho từng đồng coin

  return (
    <Box component="tr" key={coin.name} onClick={() => navigate(`/coins/${coin.id}`)} sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}>
      <Box component="td">{index + 1}</Box>
      <Box component="td" sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          src={coin.image } 
          alt={coin.name}
          sx={{ width: 40, height: 40, mr: 2 }} 
        />
        <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
          {coin.name} <Typography variant="body2" color="text.secondary">({coin.symbol})</Typography>
        </Typography>
      </Box>
      <Box component="td">${coin.current_price}</Box>
      <Box component="td">{coin.price_change_1h}%</Box>
      <Box component="td">{coin.price_change_24h}%</Box>
      <Box component="td">{coin.price_change_7d}%</Box>
      <Box component="td">{coin.volume_24h}</Box>
      <Box component="td">{coin.market_cap}</Box>
      <img loading="lazy" alt="bitcoin (BTC) 7d chart" src="https://www.coingecko.com/coins/1/sparkline.svg" />
    </Box>
  );
})}
  </Box>
</Box>


            </Box>
          ) : (
            <Box textAlign="center" py={5}>
              <Typography variant="h6" color="text.secondary">
                No coins found matching your criteria
              </Typography>
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
