import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Grid } from '@mui/material';
import { getDashboardData, getPredictionClusters } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';
import { motion } from 'framer-motion';
import { CSVLink } from 'react-csv';

const COLORS = {
  positive: '#42a5f5', // Light blue
  neutral: '#1976d2',  // Medium blue
  negative: '#0d47a1'  // Dark blue
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{ backgroundColor: '#ffffff', padding: '10px', border: '1px solid #ccc' }}>
        <p><strong>Word:</strong> {data.word}</p>
        <p><strong>Model:</strong> {data.model}</p>
        <p><strong>Sentiment:</strong> {data.sentiment}</p>
        <p><strong>Category:</strong> {data.category}</p>
        <p><strong>Frequency:</strong> {data.size / 5}</p>
        {data.bias_flags.length > 0 && (
          <p><strong>Bias Flags:</strong> {data.bias_flags.join(', ')}</p>
        )}
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [sentimentData, setSentimentData] = useState([]);
  const [clusterData, setClusterData] = useState([]);

  useEffect(() => {
    getDashboardData()
      .then(res => {
        setDashboardData(res.data.dashboard);
        setSentimentData([
          { name: 'Positive', value: res.data.sentiment_distribution.positive },
          { name: 'Neutral', value: res.data.sentiment_distribution.neutral },
          { name: 'Negative', value: res.data.sentiment_distribution.negative },
        ]);
      })
      .catch(err => console.error(err));

    getPredictionClusters()
      .then(res => setClusterData(res.data.clusters))
      .catch(err => {
        console.error(err);
        const mockClusters = [
          { word: 'man', x: 10, y: 20, size: 10, category: 'Gender', sentiment: 'positive', bias_flags: [], model: 'bert-base-uncased' },
          { word: 'woman', x: 15, y: 25, size: 15, category: 'Gender', sentiment: 'neutral', bias_flags: ['Gender bias likely'], model: 'gpt2' },
          { word: 'black', x: 30, y: 10, size: 20, category: 'Race', sentiment: 'negative', bias_flags: ['Race bias likely'], model: 'roberta-base' },
        ];
        setClusterData(mockClusters);
      });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#1976d2' }}>
        Bias Analytics Dashboard
      </Typography>
      <motion.div className="fade-in">
        <Grid container spacing={4}>
          {/* Row 1: BarChart and PieChart */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, backgroundColor: '#ffffff' }}>
              <Typography variant="h6" sx={{ color: '#0d47a1' }}>Bias Percentage by Model</Typography>
              <BarChart width={500} height={300} data={dashboardData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="model" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bias_percentage" fill="#1976d2" name="Bias %" />
              </BarChart>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, backgroundColor: '#ffffff' }}>
              <Typography variant="h6" sx={{ color: '#0d47a1' }}>Sentiment Distribution</Typography>
              <PieChart width={500} height={300}>
                <Pie
                  data={sentimentData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name.toLowerCase()] || '#1976d2'} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Paper>
          </Grid>

          {/* Row 2: Detailed Cluster Visualization */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, backgroundColor: '#ffffff' }}>
              <Typography variant="h6" sx={{ color: '#0d47a1' }}>Prediction & Keyword Clusters</Typography>
              <ScatterChart width={1000} height={400}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name="Word Length" unit="chars" domain={[0, 100]} />
                <YAxis type="number" dataKey="y" name="Sentiment" unit="level" domain={[0, 50]} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Scatter
                  name="Positive"
                  data={clusterData.filter(d => d.sentiment === 'positive')}
                  fill={COLORS.positive}
                  shape="circle"
                  opacity={0.8}
                >
                  {clusterData.filter(d => d.sentiment === 'positive').map((entry, index) => (
                    <Cell key={`cell-${index}`} r={entry.size} />
                  ))}
                </Scatter>
                <Scatter
                  name="Neutral"
                  data={clusterData.filter(d => d.sentiment === 'neutral')}
                  fill={COLORS.neutral}
                  shape="circle"
                  opacity={0.8}
                >
                  {clusterData.filter(d => d.sentiment === 'neutral').map((entry, index) => (
                    <Cell key={`cell-${index}`} r={entry.size} />
                  ))}
                </Scatter>
                <Scatter
                  name="Negative"
                  data={clusterData.filter(d => d.sentiment === 'negative')}
                  fill={COLORS.negative}
                  shape="circle"
                  opacity={0.8}
                >
                  {clusterData.filter(d => d.sentiment === 'negative').map((entry, index) => (
                    <Cell key={`cell-${index}`} r={entry.size} />
                  ))}
                </Scatter>
              </ScatterChart>
            </Paper>
          </Grid>
        </Grid>

        {/* Table */}
        <Paper sx={{ mt: 4, backgroundColor: '#ffffff' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Model</strong></TableCell>
                  <TableCell align="right">Total Responses</TableCell>
                  <TableCell align="right">Biased Responses</TableCell>
                  <TableCell align="right">Bias %</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dashboardData.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{row.model}</TableCell>
                    <TableCell align="right">{row.total_responses}</TableCell>
                    <TableCell align="right">{row.biased_responses}</TableCell>
                    <TableCell align="right">{row.bias_percentage}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Button variant="contained" sx={{ mt: 2, backgroundColor: '#1976d2', color: '#ffffff' }}>
          <CSVLink data={dashboardData} filename="bias_dashboard.csv" style={{ color: '#ffffff', textDecoration: 'none' }}>
            Export as CSV
          </CSVLink>
        </Button>
      </motion.div>
    </Container>
  );
};

export default Dashboard;