import React from 'react';
import { Card, CardContent, Typography, Chip, Stack } from '@mui/material';
import { motion } from 'framer-motion';

const ResponseCard = ({ result }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
      <Card variant="outlined" sx={{ marginTop: 3, backgroundColor: '#ffffff' }}>
  <CardContent>
    <Typography variant="h6" sx={{ color: '#1976d2' }}>{result.model}</Typography>
    <Typography variant="subtitle2" gutterBottom sx={{ color: '#0d47a1' }}>Type: {result.type}</Typography>
    <Typography variant="body2" gutterBottom sx={{ color: '#0d47a1' }}>
      <strong>Top Predictions:</strong> {result.top_predictions.join(', ')}
    </Typography>
    <Stack direction="row" spacing={1} my={1} flexWrap="wrap">
      {result.bias_flags.map((flag, index) => (
        <Chip key={index} label={flag} color="warning" variant="outlined" sx={{ mb: 1, borderColor: '#1976d2', color: '#0d47a1' }} />
      ))}
    </Stack>
    <Typography variant="body2" sx={{ color: '#0d47a1' }}>
      <strong>Sentiment:</strong> {result.sentiment}
    </Typography>
  </CardContent>
</Card>
    </motion.div>
  );
};

export default ResponseCard;