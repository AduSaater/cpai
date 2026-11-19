import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid2 as Grid,
  Paper,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import heroQuietTimeImg from '../assets/hero-quiet-time.jpg';
import journalPrayerImg from '../assets/journal-prayer.jpg';
import outdoorDevotionImg from '../assets/outdoor-devotion.jpg';

const devotionalMoments = [
  {
    title: 'Prayer & Journaling',
    description:
      'Set aside unhurried moments to pray, record what God speaks to your heart, and revisit your reflections.',
    image: journalPrayerImg,
    alt: 'A Black African man praying with clasped hands at a sunlit wooden table beside an open Bible, journal, and cup of tea.',
  },
  {
    title: 'Stillness in Creation',
    description:
      'Carry your daily devotionals anywhere—whether in a quiet room at dawn or outdoors in peaceful reflection.',
    image: outdoorDevotionImg,
    alt: 'A Black African woman sitting on a wooden bench in a sunlit garden with an open Bible in her lap and eyes closed in prayer.',
  },
];

const Home = () => {
  useEffect(() => {
    document.title = 'Home | Secret Place by CPAI';
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {/* Hero Section */}
      <Paper
        elevation={3}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 3,
          minHeight: { xs: 360, sm: 420 },
          display: 'flex',
          alignItems: 'flex-end',
          bgcolor: '#0f172a',
        }}
      >
        <Box
          component="img"
          src={heroQuietTimeImg}
          alt="A Black African woman sitting by a sunlit window reading an open Bible beside a warm mug during morning quiet time."
          fetchPriority="high"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.78) 65%, rgba(15, 23, 42, 0.92) 100%)',
          }}
        />

        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            p: { xs: 3, sm: 5 },
            color: '#ffffff',
            maxWidth: 640,
          }}
        >
          <Typography
            variant="overline"
            sx={{
              letterSpacing: 1.5,
              color: '#fcd34d',
              fontWeight: 700,
              display: 'block',
              mb: 1,
            }}
          >
            Secret Place by CPAI
          </Typography>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.875rem', sm: '2.5rem' },
              lineHeight: 1.2,
            }}
          >
            Daily Quiet Time with God
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: { xs: '0.975rem', sm: '1.05rem' },
            }}
          >
            A calm, distraction-free companion for daily devotionals, scripture
            bookmarks, and personal reflection.
          </Typography>
        </Box>
      </Paper>

      {/* Scripture Callout */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3.5 },
          textAlign: 'center',
          bgcolor: '#fef3c7',
          border: '1px solid #fde68a',
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h6"
          component="blockquote"
          sx={{
            m: 0,
            fontStyle: 'italic',
            fontWeight: 500,
            color: '#78350f',
          }}
        >
          &ldquo;Be still, and know that I am God.&rdquo;
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.75, color: '#92400e', fontWeight: 600 }}>
          Psalm 46:10
        </Typography>
      </Paper>

      {/* Quiet Time Moments Gallery */}
      <Box component="section" aria-labelledby="quiet-time-heading">
        <Typography
          id="quiet-time-heading"
          variant="h5"
          component="h2"
          gutterBottom
          fontWeight={700}
        >
          Moments in the Secret Place
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Build a steady rhythm of prayer, scripture reading, and reflection every day.
        </Typography>

        <Grid container spacing={3}>
          {devotionalMoments.map((moment) => (
            <Grid key={moment.title} size={{ xs: 12, sm: 6 }}>
              <Card
                elevation={2}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                <CardMedia
                  component="img"
                  image={moment.image}
                  alt={moment.alt}
                  loading="lazy"
                  sx={{
                    aspectRatio: '4 / 3',
                    objectFit: 'cover',
                  }}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                    {moment.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {moment.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Privacy & Support Cards */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6" component="h2" gutterBottom fontWeight={600}>
                Your Privacy Matters
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Learn what personal and devotional usage information we collect, how we
                protect it, and how you can manage your preferences.
              </Typography>
            </CardContent>
            <CardActions sx={{ px: 2, pb: 2 }}>
              <Button component={RouterLink} to="/privacy-policy" size="small">
                View Privacy Policy
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6" component="h2" gutterBottom fontWeight={600}>
                Contact &amp; Support
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Have questions, devotional feedback, or privacy requests? Send us a
                message through our contact form or email us directly.
              </Typography>
            </CardContent>
            <CardActions sx={{ px: 2, pb: 2 }}>
              <Button component={RouterLink} to="/contact" size="small">
                Go to Contact Us
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
