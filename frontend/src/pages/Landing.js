import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Landing = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8 }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <Typography variant="h2" sx={{ color: '#1976d2', mb: 2 }}>
            Welcome to LLM Bias Analyzer
            </Typography>
            <Typography variant="h5" sx={{ color: '#0d47a1', mb: 4 }}>
            A tool to detect, monitor, and mitigate biases in Large Language Models
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: '#0d47a1' }}>
            Analyze prompts, visualize bias trends, and fine-tune models to reduce ethical risks in AI-generated content.
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/home" sx={{ backgroundColor: '#1976d2', color: '#ffffff' }}>
            Get Started
            </Button>
        </motion.div>
    </Container>
  );
};

export default Landing;