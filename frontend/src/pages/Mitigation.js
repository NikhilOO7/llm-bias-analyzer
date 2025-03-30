import React, { useState, useEffect } from 'react';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, Button, Box, CircularProgress } from '@mui/material';
import { triggerFineTune, evaluateFineTuned, fetchModels } from '../services/api';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const Mitigation = () => {
  const [model, setModel] = useState('');
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState(null);

  useEffect(() => {
    fetchModels()
      .then(res => setModels(res.data.models))
      .catch(err => toast.error(err.message));
  }, []);

  const handleFineTune = () => {
    setLoading(true);
    triggerFineTune({ base_model: model, filters: {} })
      .then(() => toast.success("Fine-tuning started!"))
      .catch(err => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  const handleEvaluate = () => {
    setLoading(true);
    evaluateFineTuned(model)
      .then(res => setEvaluation(res.data))
      .catch(err => toast.error(err.response?.data?.detail || "Evaluation failed"))
      .finally(() => setLoading(false));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
  <Typography variant="h4" gutterBottom sx={{ color: '#1976d2' }}>
    Bias Mitigation
  </Typography>
  <motion.div className="fade-in">
    <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
      <FormControl fullWidth>
        <InputLabel sx={{ color: '#0d47a1' }}>Select Model</InputLabel>
        <Select value={model} onChange={(e) => setModel(e.target.value)} sx={{ backgroundColor: '#ffffff' }}>
          {models.map(m => (
            <MenuItem key={m} value={m}>{m}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" onClick={handleFineTune} disabled={!model || loading} sx={{ backgroundColor: '#1976d2', color: '#ffffff' }}>
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Start Fine-Tuning'}
      </Button>
      <Button variant="contained" onClick={handleEvaluate} disabled={!model || loading} sx={{ backgroundColor: '#1976d2', color: '#ffffff' }}>
        Evaluate
      </Button>
    </Box>
    {evaluation && (
      <Box sx={{ backgroundColor: '#ffffff', p: 2 }}>
        <Typography variant="h6" sx={{ color: '#0d47a1' }}>Original Bias:</Typography>
            {evaluation.original_bias.map((bias, idx) => (
              <Typography key={idx}>{bias[0].join(', ')} - Sentiment: {bias[1]}</Typography>
            ))}
            <Typography variant="h6" sx={{ mt: 2 }}>Fine-Tuned Bias:</Typography>
            {evaluation.fine_tuned_bias.map((bias, idx) => (
              <Typography key={idx}>{bias[0].join(', ')} - Sentiment: {bias[1]}</Typography>
            ))}
          </Box>
        )}
      </motion.div>
    </Container>
  );
};

export default Mitigation;