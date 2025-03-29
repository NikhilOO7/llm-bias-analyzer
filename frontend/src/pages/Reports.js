import React from 'react';
import { Container, Typography, Button, Paper, Box } from '@mui/material';
import { getReportPDF } from '../services/api';

const Reports = () => {
  const handleDownload = async () => {
    try {
      const response = await getReportPDF();
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'llm_bias_report.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Download Analysis Report
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          The PDF report contains:
          <ul>
            <li>Recent prompts and their model responses</li>
            <li>Bias flags (gender, race, religion)</li>
            <li>Sentiment analysis</li>
            <li>Top predictions for each model</li>
          </ul>
        </Typography>
        <Box>
          <Button variant="contained" onClick={handleDownload}>
            Download Report
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Reports;