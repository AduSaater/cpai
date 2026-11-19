import React, { useEffect } from 'react';
import {
  Breadcrumbs,
  Link as MuiLink,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = 'Privacy Policy | Secret Place by CPAI';
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 3, sm: 4 },
        maxWidth: 680,
        mx: 'auto',
      }}
    >
      <Breadcrumbs aria-label="Breadcrumb" sx={{ mb: 2 }}>
        <MuiLink component={RouterLink} underline="hover" color="inherit" to="/">
          Home
        </MuiLink>
        <Typography color="text.primary">Privacy Policy</Typography>
      </Breadcrumbs>

      <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
        Privacy Policy for Secret Place by CPAI
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Last updated: 15.11.2023
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        We at CPAI are committed to protecting the privacy of our users. This Privacy
        Policy outlines how we collect, use, disclose, and safeguard your personal
        information when you use our platform, Secret Place. By accessing or using Secret
        Place, you agree to the terms and conditions outlined in this Privacy Policy.
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom fontWeight={600}>
        Information We Collect:
      </Typography>
      <List sx={{ mb: 2 }}>
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemText>
            <strong>Personal Information: </strong>When you register for an account on
            Secret Place, we collect your name, email address, and any other information
            you provide during the registration process.
          </ListItemText>
        </ListItem>
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemText>
            <strong>Devotional Usage Data: </strong>such as the devotionals you read,
            bookmark, and the frequency of your visits.
          </ListItemText>
        </ListItem>
        <ListItem disablePadding>
          <ListItemText>
            <strong>Feedback System: </strong>We provide a feedback system for users to
            communicate with us regarding their experiences with the application. The
            information you provide in your feedback is treated with confidentiality.
          </ListItemText>
        </ListItem>
      </List>

      <Typography variant="h6" component="h2" gutterBottom fontWeight={600}>
        How We Use Your Information:
      </Typography>
      <List sx={{ mb: 2 }}>
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemText>
            <strong>Personalization: </strong>We use your personal information to
            personalize your experience on Secret Place, providing you with relevant
            devotionals and content.
          </ListItemText>
        </ListItem>
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemText>
            <strong>Improvements and Analytics: </strong>We analyze aggregated data to
            improve the functionality and content of Secret Place continually. This helps
            us enhance the platform and provide you with a better user experience.
          </ListItemText>
        </ListItem>
        <ListItem disablePadding>
          <ListItemText>
            <strong>Communication: </strong>Your contact information may be used to send
            you important updates, newsletters, or information about new features on
            Secret Place.
          </ListItemText>
        </ListItem>
      </List>

      <Typography variant="h6" component="h2" gutterBottom fontWeight={600}>
        Sharing Your Information:
      </Typography>
      <List sx={{ mb: 2 }}>
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemText>
            <strong>Third-Party Service Providers: </strong>We may share your information
            with third-party service providers who assist us in delivering and improving
            Secret Place. These providers are obligated to protect your information and
            use it solely for the purpose of providing services to us.
          </ListItemText>
        </ListItem>
        <ListItem disablePadding>
          <ListItemText>
            <strong>Legal Compliance: </strong>We may disclose your information if
            required by law or in response to a valid legal request.
          </ListItemText>
        </ListItem>
      </List>

      <Typography variant="h6" component="h2" gutterBottom fontWeight={600}>
        Security:
      </Typography>
      <Typography variant="body1" sx={{ mb: 2.5 }}>
        We implement security measures to protect your personal information from
        unauthorized access, alteration, disclosure, or destruction. However, no online
        platform can guarantee absolute security, and you are responsible for maintaining
        the confidentiality of your account credentials.
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom fontWeight={600}>
        Your Choices:
      </Typography>
      <Typography variant="body1" sx={{ mb: 2.5 }}>
        You have the option to update your account information, manage preferences, and
        unsubscribe from communications. You can also reach out to us with any
        privacy-related concerns at{' '}
        <MuiLink href="mailto:eghrudjemiracle24@gmail.com">
          eghrudjemiracle24@gmail.com
        </MuiLink>{' '}
        or via our{' '}
        <MuiLink component={RouterLink} to="/contact">
          Contact Us page
        </MuiLink>
        .
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom fontWeight={600}>
        Changes to This Privacy Policy:
      </Typography>
      <Typography variant="body1" sx={{ mb: 2.5 }}>
        This Privacy Policy may be updated periodically to reflect changes in our
        practices. We will notify you of significant changes through the platform or via
        email.
      </Typography>

      <Typography variant="body1" fontWeight={500}>
        Thank you for entrusting Secret Place by CPAI for your daily devotions. We value
        your privacy and strive to provide you with a secure and enriching experience.
      </Typography>
    </Paper>
  );
};

export default PrivacyPolicy;
