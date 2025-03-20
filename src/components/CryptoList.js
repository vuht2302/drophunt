import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Grid, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Button, Divider } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';

const API_KEY = 'dea9fa979d5e441cafae4511025f8f28'; // API key for currency conversion
const CRYPTO_SYMBOLS = ['BTC', 'ETH', 'SOL', 'ADA'];

const CryptoList = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${API_KEY}&symbols=${CRYPTO_SYMBOLS.join(',')}`
        );

        const rates = response.data.rates;
        const mappedData = CRYPTO_SYMBOLS.map(symbol => ({
          name: getCryptoName(symbol),
          symbol,
          price: (1 / parseFloat(rates[symbol])).toFixed(2),
          change24h: ((Math.random() * 10) - 5).toFixed(2), // Simulated change since API doesn't provide it
          marketCap: `$${(Math.random() * 500 + 100).toFixed(2)}B`, // Simulated market cap
          volume24h: `$${(Math.random() * 50 + 10).toFixed(2)}B`, // Simulated 24h volume
          supply: `${(Math.random() * 100 + 10).toFixed(2)}M`, // Simulated supply
          allTimeHigh: `$${(Math.random() * 100000 + 10000).toFixed(2)}`, // Simulated ATH
          description: getDescription(symbol) // Added description
        }));

        setCryptoData(mappedData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch cryptocurrency data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  const getCryptoName = (symbol) => {
    const names = {
      BTC: 'Bitcoin',
      ETH: 'Ethereum',
      SOL: 'Solana',
      ADA: 'Cardano'
    };
    return names[symbol] || symbol;
  };

  const getDescription = (symbol) => {
    const descriptions = {
      BTC: 'Bitcoin is the first decentralized cryptocurrency, based on blockchain technology. Created in 2009 by an unknown person or group known as Satoshi Nakamoto, it operates without a central authority.',
      ETH: 'Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform. It is the second-largest cryptocurrency by market capitalization.',
      SOL: 'Solana is a high-performance blockchain supporting builders around the world creating crypto apps that scale. Its known for its fast transaction speeds and low costs.',
      ADA: 'Cardano is a proof-of-stake blockchain platform. The ADA token is designed to ensure that owners can participate in the operation of the network. Cardano aims to be the most environmentally sustainable blockchain platform.'
    };
    return descriptions[symbol] || 'No description available.';
  };

  const handleOpenDialog = (crypto) => {
    setSelectedCrypto(crypto);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {cryptoData.map((crypto) => (
          <Grid item xs={12} sm={6} key={crypto.symbol}>
            <Paper
              sx={{
                p: 2,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                },
                cursor: 'pointer'
              }}
              onClick={() => handleOpenDialog(crypto)}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" component="h3">
                  {crypto.name} ({crypto.symbol})
                </Typography>
                <Box display="flex" alignItems="center">
                  {parseFloat(crypto.change24h) > 0 ? (
                    <TrendingUpIcon sx={{ color: 'success.main' }} />
                  ) : (
                    <TrendingDownIcon sx={{ color: 'error.main' }} />
                  )}
                  <Typography
                    variant="body1"
                    sx={{
                      color: parseFloat(crypto.change24h) > 0 ? 'success.main' : 'error.main',
                      ml: 1
                    }}
                  >
                    {crypto.change24h}%
                  </Typography>
                </Box>
              </Box>
              <Typography variant="h5" sx={{ mt: 1 }}>
                ${parseFloat(crypto.price).toLocaleString()}
              </Typography>
              <Box mt={2}>
                <Typography variant="body2" color="text.secondary">
                  Market Cap: {crypto.marketCap}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  24h Volume: {crypto.volume24h}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Detailed Crypto Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedCrypto && (
          <>
            <DialogTitle>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h5">
                  {selectedCrypto.name} ({selectedCrypto.symbol}) Details
                </Typography>
                <Box display="flex" alignItems="center">
                  {parseFloat(selectedCrypto.change24h) > 0 ? (
                    <TrendingUpIcon sx={{ color: 'success.main', mr: 1 }} />
                  ) : (
                    <TrendingDownIcon sx={{ color: 'error.main', mr: 1 }} />
                  )}
                  <Typography
                    variant="body1"
                    sx={{
                      color: parseFloat(selectedCrypto.change24h) > 0 ? 'success.main' : 'error.main'
                    }}
                  >
                    {selectedCrypto.change24h}%
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="h4" gutterBottom>
                ${parseFloat(selectedCrypto.price).toLocaleString()}
              </Typography>
              
              <Typography variant="body1" paragraph>
                {selectedCrypto.description}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" fontWeight="bold">Market Cap</Typography>
                  <Typography variant="body1" gutterBottom>{selectedCrypto.marketCap}</Typography>
                  
                  <Typography variant="subtitle1" fontWeight="bold">24h Trading Volume</Typography>
                  <Typography variant="body1" gutterBottom>{selectedCrypto.volume24h}</Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" fontWeight="bold">Circulating Supply</Typography>
                  <Typography variant="body1" gutterBottom>{selectedCrypto.supply} {selectedCrypto.symbol}</Typography>
                  
                  <Typography variant="subtitle1" fontWeight="bold">All Time High</Typography>
                  <Typography variant="body1" gutterBottom>{selectedCrypto.allTimeHigh}</Typography>
                </Grid>
              </Grid>
              
              <Box mt={3} p={2} bgcolor="background.paper" borderRadius={1}>
                <Typography variant="subtitle1" display="flex" alignItems="center" gutterBottom>
                  <InfoIcon sx={{ mr: 1, color: 'info.main' }} />
                  Price Information
                </Typography>
                <Typography variant="body2">
                  The price data is updated every minute. Historical price data and detailed charts would be available in a production environment.
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => window.open(`https://www.coingecko.com/en/coins/${selectedCrypto.name.toLowerCase()}`, '_blank')}
              >
                View on CoinGecko
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default CryptoList;