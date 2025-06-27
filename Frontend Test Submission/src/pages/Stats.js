// src/pages/Stats.js
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const Stats = () => {
  const [links, setLinks] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("shortLinks") || "{}");
    setLinks(data);
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h4">Statistics</Typography>
      {Object.entries(links).map(([code, data]) => (
        <Box key={code} mt={2}>
          <Typography>🔗 Short URL: {window.location.origin}/{code}</Typography>
          <Typography>➡️ Original: {data.longUrl}</Typography>
          <Typography>⏱️ Expiry: {data.expiresAt}</Typography>
          <Typography>👁️‍🗨️ Clicks: {data.clicks.length}</Typography>
          {data.clicks.map((click, idx) => (
            <Typography key={idx} fontSize="small">• {click.timestamp}, Source: {click.source}, Location: {click.geo}</Typography>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default Stats;
