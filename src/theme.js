import { createTheme } from '@mui/material/styles';

// Define the light and dark palette configurations
const lightPalette = {
  mode: 'light',
  primary: {
    main: '#2563eb', // Blue color similar to AirdropAlert
    light: '#60a5fa',
    dark: '#1d4ed8',
  },
  secondary: {
    main: '#f59e0b', // Amber color for secondary actions
    light: '#fbbf24',
    dark: '#d97706',
  },
  background: {
    default: '#f8fafc',
    paper: '#ffffff',
  },
  text: {
    primary: '#0f172a',
    secondary: '#64748b',
  },
};

const darkPalette = {
  mode: 'dark',
  primary: {
    main: '#3b82f6', // Slightly lighter blue for dark mode
    light: '#60a5fa',
    dark: '#1d4ed8',
  },
  secondary: {
    main: '#f59e0b', // Keep amber color for secondary actions
    light: '#fbbf24',
    dark: '#d97706',
  },
  background: {
    default: '#0f172a', // Dark blue background
    paper: '#1e293b', // Slightly lighter than background
  },
  text: {
    primary: '#f1f5f9',
    secondary: '#94a3b8',
  },
};

// Create theme with shared configurations
const getTheme = (mode) => {
  return createTheme({
    palette: mode === 'dark' ? darkPalette : lightPalette,
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 600,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 500,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 500,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
  });
};

export default getTheme;