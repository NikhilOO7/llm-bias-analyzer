import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { getDashboardData } from '../services/api';
import BiasChart from '../components/BiasChart';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    getDashboardData().then(res => setDashboardData(res.data.dashboard));
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" mt={4} gutterBottom>
        Bias Analytics Dashboard
      </Typography>

      <BiasChart data={dashboardData} />

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
    </Container>
  );
};

export default Dashboard;
