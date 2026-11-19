import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e293b',
    },
    secondary: {
      main: '#b45309',
    },
    background: {
      default: '#faf8f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
