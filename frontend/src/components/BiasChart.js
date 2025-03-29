import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Paper, Typography } from '@mui/material';

const BiasChart = ({ data }) => {
  return (
    <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
      <Typography variant="h6" gutterBottom>
        Bias Percentage by Model
      </Typography>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="model" />
          <YAxis unit="%" />
          <Tooltip />
          <Legend />
          <Bar dataKey="bias_percentage" fill="#f50057" name="Bias %" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default BiasChart;
