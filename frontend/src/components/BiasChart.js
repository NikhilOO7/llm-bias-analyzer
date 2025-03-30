import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BiasChart = ({ data }) => (
  <BarChart width={600} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="model" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="bias_percentage" fill="#26a69a" name="Bias %" />
  </BarChart>
);

export default BiasChart;