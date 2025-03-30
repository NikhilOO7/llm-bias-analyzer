import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { getDashboardData } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { motion } from 'framer-motion';
import { CSVLink } from 'react-csv';

const COLORS = ['#1976d2', '#42a5f5', '#bbdefb'];

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [sentimentData, setSentimentData] = useState([]);
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    getDashboardData()
      .then(res => {
        setDashboardData(res.data.dashboard);
        setSentimentData([
          { name: 'Positive', value: res.data.sentiment_distribution.positive },
          { name: 'Neutral', value: res.data.sentiment_distribution.neutral },
          { name: 'Negative', value: res.data.sentiment_distribution.negative },
        ]);
        // Simulate trend data (assuming logs have timestamps)
        const logs = res.data.dashboard.map(d => ({
          date: new Date().toISOString().split('T')[0], // Placeholder; use real timestamps if available
          bias_percentage: d.bias_percentage,
        }));
        setTrendData(logs);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
  <Typography variant="h4" gutterBottom sx={{ color: '#1976d2' }}>
    Bias Analytics Dashboard
  </Typography>
  <motion.div className="fade-in">
    <Paper sx={{ p: 2, mb: 4, backgroundColor: '#ffffff' }}>
      <Typography variant="h6" sx={{ color: '#0d47a1' }}>Bias Percentage by Model</Typography>
      <BarChart width={600} height={300} data={dashboardData}>
        <Bar dataKey="bias_percentage" fill="#1976d2" name="Bias %" />
        {/* Rest of BarChart unchanged */}
      </BarChart>
    </Paper>
    <Paper sx={{ p: 2, mb: 4, backgroundColor: '#ffffff' }}>
      <Typography variant="h6" sx={{ color: '#0d47a1' }}>Sentiment Distribution</Typography>
      {/* PieChart unchanged, COLORS already use blue shades */}
    </Paper>
    <Paper sx={{ p: 2, mb: 4, backgroundColor: '#ffffff' }}>
      <Typography variant="h6" sx={{ color: '#0d47a1' }}>Bias Trend Over Time</Typography>
      <LineChart width={600} height={300} data={trendData}>
        <Line type="monotone" dataKey="bias_percentage" stroke="#1976d2" name="Bias %" />
        {/* Rest of LineChart unchanged */}
      </LineChart>
    </Paper>

        <Paper sx={{ mt: 4 }}>
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