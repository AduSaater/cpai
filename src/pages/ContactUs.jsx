import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Divider,
  Grid2 as Grid,
  Link as MuiLink,
  Paper,
  Typography,
} from '@mui/material';
import MailOutlineIcon from '../components/icons/MailOutlineIcon';
import SendIcon from '../components/icons/SendIcon';
import { Link as RouterLink } from 'react-router-dom';

const CONTACT_EMAIL = 'eghrudjemiracle24@gmail.com';

const INITIAL_VALUES = {
  name: '',
  email: '',
  topic: 'general',
  message: '',
};

const ContactUs = () => {
  const formRef = useRef(null);
  const announceTimerRef = useRef(null);
  const announcedFieldRef = useRef(null);
  const flaggedRef = useRef(new WeakSet());
  const announcedRef = useRef(new WeakSet());

  const [values, setValues] = useState(INITIAL_VALUES);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = submittedData
      ? 'Thank you for contacting us! | Secret Place by CPAI'
      : 'Contact Us | Secret Place by CPAI';
  }, [submittedData]);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const controls = form.querySelectorAll('input, select, textarea');
    controls.forEach((el) => {
      if (!el.hasAttribute('aria-invalid')) {
        el.setAttribute('aria-invalid', 'false');
      }
    });

    return () => {
      clearTimeout(announceTimerRef.current);
    };
  }, [submittedData]);

  const linkError = (el, shown) => {
    const errorId = el.dataset.error;
    if (!errorId) return;
    const ids = (el.getAttribute('aria-describedby') || '')
      .split(/\s+/)
      .filter((id) => id && id !== errorId);
    if (shown) ids.push(errorId);
    if (ids.length) {
      el.setAttribute('aria-describedby', ids.join(' '));
    } else {
      el.removeAttribute('aria-describedby');
    }
  };

  const announceError = (el) => {
    const errorEl = document.getElementById(el.dataset.error);
    if (!errorEl) return;
    const labelEl = el.labels?.[0];
    const labelText = labelEl ? `${labelEl.textContent.replace('*', '').trim()}: ` : '';
    const errorText = errorEl.textContent.replace(/\s+/g, ' ').trim();

    clearTimeout(announceTimerRef.current);
    setLiveAnnouncement('');
    announcedFieldRef.current = el;
    announceTimerRef.current = setTimeout(() => {
      setLiveAnnouncement(`${labelText}${errorText}`);
    }, 500);
  };

  const syncAria = (el, shouldAnnounce = false) => {
    if (!el || !el.matches?.('input, select, textarea')) return;

    const supportsUserInvalid = CSS.supports('selector(:user-invalid)');
    const isInvalid = supportsUserInvalid
      ? el.matches(':user-invalid')
      : el.classList.contains('user-invalid-fallback');

    if (isInvalid) {
      if (shouldAnnounce && !announcedRef.current.has(el)) {
        announceError(el);
        announcedRef.current.add(el);
      }
      el.setAttribute('aria-invalid', 'true');
      linkError(el, true);
      flaggedRef.current.add(el);
    } else if (flaggedRef.current.has(el) || el.getAttribute('aria-invalid') !== 'true') {
      el.setAttribute('aria-invalid', 'false');
      linkError(el, false);
      flaggedRef.current.delete(el);
      announcedRef.current.delete(el);
      if (announcedFieldRef.current === el) {
        clearTimeout(announceTimerRef.current);
        setLiveAnnouncement('');
      }
    }
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    if (!CSS.supports('selector(:user-invalid)') && event.target.classList.contains('user-invalid-fallback')) {
      const valid = event.target.validity.valid;
      event.target.classList.toggle('user-invalid-fallback', !valid);
    }
    if (event.target.getAttribute('aria-invalid') === 'true') {
      syncAria(event.target, false);
    }
  };

  const handleFieldBlur = (event) => {
    const el = event.target;
    if (!CSS.supports('selector(:user-invalid)') && el.value !== '') {
      el.classList.toggle('user-invalid-fallback', !el.validity.valid);
    }
    syncAria(el, true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = formRef.current;
    if (!form) return;

    if (!form.checkValidity()) {
      const controls = Array.from(form.querySelectorAll('input, select, textarea'));
      let firstInvalid = null;

      controls.forEach((el) => {
        if (!el.validity.valid) {
          el.classList.add('user-invalid-fallback');
          announcedRef.current.add(el);
          el.setAttribute('aria-invalid', 'true');
          linkError(el, true);
          flaggedRef.current.add(el);
          if (!firstInvalid) firstInvalid = el;
        }
      });

      if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setSubmittedData({ ...values });
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setValues(INITIAL_VALUES);
    setSubmittedData(null);
    setLiveAnnouncement('');
  };

  const buildMailtoHref = (data) => {
    const topicLabels = {
      general: 'General Inquiry',
      privacy: 'Privacy & Data Request',
      feedback: 'Devotional Feedback',
      support: 'Technical Support',
    };
    const subject = encodeURIComponent(
      `[Secret Place] ${topicLabels[data.topic] || 'Contact'} from ${data.name}`
    );
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\nTopic: ${topicLabels[data.topic] || data.topic}\n\nMessage:\n${data.message}`
    );
    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <Box sx={{ maxWidth: 820, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: { xs: 3, sm: 4 } }}>
        <Breadcrumbs aria-label="Breadcrumb" sx={{ mb: 2 }}>
          <MuiLink component={RouterLink} underline="hover" color="inherit" to="/">
            Home
          </MuiLink>
          <Typography color="text.primary">Contact Us</Typography>
        </Breadcrumbs>

        <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
          Contact Us
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          We would love to hear from you. Whether you have questions about Secret Place by
          CPAI, devotional feedback, or privacy concerns, reach out below.
        </Typography>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 7 }}>
            {submittedData ? (
              <Box role="status" aria-live="polite">
                <Alert severity="success" sx={{ mb: 3 }}>
                  Thank you, {submittedData.name}! Your message has been prepared.
                </Alert>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Since this web app runs directly in your browser without a mail server,
                  click below to send your message via your email app, or email us
                  directly at{' '}
                  <MuiLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</MuiLink>.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    component="a"
                    href={buildMailtoHref(submittedData)}
                    variant="contained"
                    startIcon={<MailOutlineIcon />}
                  >
                    Open in Email App
                  </Button>
                  <Button type="button" variant="outlined" onClick={handleReset}>
                    Send Another Message
                  </Button>
                </Box>
              </Box>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                aria-labelledby="contact-form-heading"
              >
                <Typography
                  id="contact-form-heading"
                  variant="h6"
                  component="h2"
                  gutterBottom
                  fontWeight={600}
                >
                  Send a Message
                </Typography>

                <div className="sp-field">
                  <label className="sp-label" htmlFor="contact-name">
                    Full name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    className="sp-control"
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    enterKeyHint="next"
                    required
                    value={values.name}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    data-error="contact-name-error"
                  />
                  <div id="contact-name-error" className="sp-error-msg">
                    <span role="img" aria-label="Error">
                      ❌
                    </span>{' '}
                    Please enter your full name.
                  </div>
                </div>

                <div className="sp-field">
                  <label className="sp-label" htmlFor="contact-email">
                    Email address <span aria-hidden="true">*</span>
                  </label>
                  <span id="contact-email-hint" className="sp-hint">
                    Format: you@example.com
                  </span>
                  <input
                    className="sp-control"
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    enterKeyHint="next"
                    required
                    aria-describedby="contact-email-hint"
                    value={values.email}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    data-error="contact-email-error"
                  />
                  <div id="contact-email-error" className="sp-error-msg">
                    <span role="img" aria-label="Error">
                      ❌
                    </span>{' '}
                    Enter an email address in the format you@example.com.
                  </div>
                </div>

                <div className="sp-field">
                  <label className="sp-label" htmlFor="contact-topic">
                    Topic
                  </label>
                  <select
                    className="sp-control"
                    id="contact-topic"
                    name="topic"
                    value={values.topic}
                    onChange={handleFieldChange}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="privacy">Privacy &amp; Data Request</option>
                    <option value="feedback">Devotional Feedback</option>
                    <option value="support">Technical Support</option>
                  </select>
                </div>

                <div className="sp-field">
                  <label className="sp-label" htmlFor="contact-message">
                    Message <span aria-hidden="true">*</span>
                  </label>
                  <span id="contact-message-hint" className="sp-hint">
                    Please include at least 10 characters.
                  </span>
                  <textarea
                    className="sp-control"
                    id="contact-message"
                    name="message"
                    required
                    minLength={10}
                    rows={5}
                    aria-describedby="contact-message-hint"
                    value={values.message}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    data-error="contact-message-error"
                  />
                  <div id="contact-message-error" className="sp-error-msg">
                    <span role="img" aria-label="Error">
                      ❌
                    </span>{' '}
                    Please enter a message of at least 10 characters.
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  startIcon={<SendIcon />}
                  sx={{ minHeight: 48, px: 3 }}
                >
                  Send Message
                </Button>
              </form>
            )}
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: '#f8fafc',
                border: '1px solid',
                borderColor: 'divider',
                height: '100%',
              }}
            >
              <Typography variant="h6" component="h2" gutterBottom fontWeight={600}>
                Direct Contact
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Prefer to email us directly? Reach our support and privacy team at:
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
                <MailOutlineIcon color="primary" fontSize="small" aria-hidden="true" />
                <MuiLink
                  href={`mailto:${CONTACT_EMAIL}`}
                  underline="hover"
                  sx={{ wordBreak: 'break-all', fontWeight: 500 }}
                >
                  {CONTACT_EMAIL}
                </MuiLink>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                Privacy Inquiries
              </Typography>
              <Typography variant="body2" color="text.secondary">
                For account data updates, unsubscribe requests, or questions about how we
                handle your information, please review our{' '}
                <MuiLink component={RouterLink} to="/privacy-policy" underline="hover">
                  Privacy Policy
                </MuiLink>
                .
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <div aria-live="polite" className="visually-hidden">
          {liveAnnouncement}
        </div>
      </Paper>
    </Box>
  );
};

export default ContactUs;
