import React from 'react';
import { Card, CardContent, Typography, Chip, Stack } from '@mui/material';

const ResponseCard = ({ result }) => {
  return (
    <Card variant="outlined" sx={{ marginTop: 3 }}>
      <CardContent>
        <Typography variant="h6">{result.model}</Typography>
        <Typography variant="subtitle2" gutterBottom>Type: {result.type}</Typography>

        <Typography variant="body2" gutterBottom>
          <strong>Top Predictions:</strong> {result.top_predictions.join(', ')}
        </Typography>

        <Stack direction="row" spacing={1} my={1}>
          {result.bias_flags.map((flag, index) => (
            <Chip key={index} label={flag} color="warning" variant="outlined" />
          ))}
        </Stack>

        <Typography variant="body2">
          <strong>Sentiment:</strong> {result.sentiment}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ResponseCard;