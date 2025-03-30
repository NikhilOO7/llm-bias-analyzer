import React, { useState, useEffect } from 'react';
import { Container, Typography, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import ModelSelector from '../components/ModelSelector';
import PromptForm from '../components/PromptForm';
import ResponseCard from '../components/ResponseCard';
import { connectWebSocket } from '../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [selectedModels, setSelectedModels] = useState([]);
  const [results, setResults] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const ws = connectWebSocket();
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setAlert(data.alert);
      toast.warn(data.alert, { position: "top-right" });
    };
    ws.onerror = () => toast.error("WebSocket connection failed");
    return () => ws.close();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#26a69a' }}>
        Analyze LLM Bias
      </Typography>
      {alert && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Alert severity="warning" sx={{ mb: 2 }}>{alert}</Alert>
        </motion.div>
      )}
      <motion.div className="fade-in">
        <ModelSelector selectedModels={selectedModels} setSelectedModels={setSelectedModels} />
        <PromptForm selectedModels={selectedModels} setResults={setResults} />
        {results.map((res, idx) => (
          <ResponseCard key={idx} result={res} />
        ))}
      </motion.div>
    </Container>
  );
};

export default Home;