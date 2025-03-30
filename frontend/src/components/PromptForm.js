import React, { useState } from 'react';
import { Button, TextField, Paper, CircularProgress } from '@mui/material';
import { analyzePrompt } from '../services/api';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const PromptForm = ({ selectedModels, setResults }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await analyzePrompt({ prompt, model_names: selectedModels });
      setResults(res.data.results);
      toast.success("Analysis complete!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="fade-in">
      <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#ffffff' }}>
  <TextField
    fullWidth
    multiline
    minRows={4}
    label="Enter Prompt"
    value={prompt}
    onChange={(e) => setPrompt(e.target.value)}
    sx={{ mb: 2, '& .MuiInputLabel-root': { color: '#0d47a1' }, '& .MuiOutlinedInput-root': { backgroundColor: '#ffffff' } }}
  />
  <Button
    variant="contained"
    onClick={handleSubmit}
    disabled={!prompt || selectedModels.length === 0 || loading}
    sx={{ backgroundColor: '#1976d2', color: '#ffffff' }}
  >
    {loading ? <CircularProgress size={24} color="inherit" /> : 'Analyze Bias'}
  </Button>
</Paper>
    </motion.div>
  );
};

export default PromptForm;