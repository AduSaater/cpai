import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Link as MuiLink,
  Toolbar,
  Typography,
} from '@mui/material';
import logoImg from '../assets/logo.jpg';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Contact Us', to: '/contact' },
];

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <AppBar position="static" color="primary" elevation={1} component="header">
        <Container maxWidth="md">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', gap: 2, flexWrap: 'wrap', py: 0.5 }}>
            <MuiLink
              component={RouterLink}
              to="/"
              underline="none"
              color="inherit"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                fontWeight: 700,
                fontSize: '1.125rem',
                minHeight: 44,
              }}
            >
              <Box
                component="img"
                src={logoImg}
                alt=""
                width={34}
                height={34}
                sx={{
                  borderRadius: '6px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <span>Secret Place by CPAI</span>
            </MuiLink>

            <Box component="nav" aria-label="Primary" sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {navItems.map((item) => {
                const isActive = pathname === item.to;
                return (
                  <Button
                    key={item.to}
                    component={RouterLink}
                    to={item.to}
                    color="inherit"
                    aria-current={isActive ? 'page' : undefined}
                    sx={{
                      minHeight: 44,
                      px: 1.75,
                      fontWeight: isActive ? 700 : 500,
                      bgcolor: isActive ? 'rgba(255, 255, 255, 0.14)' : 'transparent',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container
        component="main"
        id="main-content"
        tabIndex={-1}
        maxWidth="md"
        sx={{ flex: 1, py: { xs: 3, sm: 5 }, outline: 'none' }}
      >
        {children}
      </Container>

      <Box
        component="footer"
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          py: 3,
          mt: 'auto',
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: 1.5,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Secret Place by CPAI. All rights reserved.
            </Typography>
            <Box component="nav" aria-label="Footer" sx={{ display: 'flex', gap: 2.5 }}>
              <MuiLink component={RouterLink} to="/privacy-policy" variant="body2" underline="hover">
                Privacy Policy
              </MuiLink>
              <MuiLink component={RouterLink} to="/contact" variant="body2" underline="hover">
                Contact Us
              </MuiLink>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
