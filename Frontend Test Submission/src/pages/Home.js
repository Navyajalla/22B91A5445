// src/pages/Home.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { logger } from '../components/Logger';
import { generateShortCode, isValidURL } from '../utils/shortener';

const Home = () => {
  const [inputs, setInputs] = useState([{ longUrl: '', validity: '', shortcode: '' }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const copy = [...inputs];
    copy[index][field] = value;
    setInputs(copy);
  };

  const handleShorten = () => {
    const shortened = [];

    for (let input of inputs) {
      const { longUrl, validity, shortcode } = input;

      if (!isValidURL(longUrl)) {
        alert('Invalid URL');
        logger("Error", { issue: "Invalid URL" });
        return;
      }

      const code = shortcode || generateShortCode();
      const storage = JSON.parse(localStorage.getItem("shortLinks") || "{}");

      if (storage[code]) {
        alert("Shortcode already exists!");
        logger("Error", { issue: "Shortcode collision" });
        return;
      }

      const expiry = new Date();
      expiry.setMinutes(expiry.getMinutes() + (parseInt(validity) || 30));

      storage[code] = {
        longUrl,
        createdAt: new Date().toISOString(),
        expiresAt: expiry.toISOString(),
        clicks: [],
      };

      localStorage.setItem("shortLinks", JSON.stringify(storage));
      logger("Shorten URL", { code, longUrl });

      shortened.push({ shortUrl: `${window.location.origin}/${code}`, expiry: expiry.toISOString() });
    }

    setResults(shortened);
  };

  return (
    <Box p={4}>
      <Typography variant="h4">URL Shortener</Typography>
      {inputs.map((input, idx) => (
        <Box key={idx} mt={2}>
          <TextField label="Long URL" fullWidth margin="dense" value={input.longUrl}
            onChange={(e) => handleChange(idx, 'longUrl', e.target.value)} />
          <TextField label="Validity (mins)" type="number" margin="dense" value={input.validity}
            onChange={(e) => handleChange(idx, 'validity', e.target.value)} />
          <TextField label="Custom Shortcode (optional)" margin="dense" value={input.shortcode}
            onChange={(e) => handleChange(idx, 'shortcode', e.target.value)} />
        </Box>
      ))}
      <Button variant="contained" onClick={handleShorten} sx={{ mt: 2 }}>Shorten</Button>

      {results.map((r, idx) => (
        <Typography key={idx} mt={2}>Shortened URL: <a href={r.shortUrl}>{r.shortUrl}</a> (expires at {r.expiry})</Typography>
      ))}
    </Box>
  );
};

export default Home;
