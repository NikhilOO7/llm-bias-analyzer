import React, { useState } from 'react';
import { Button, TextField, Paper, Box } from '@mui/material';
import { analyzePrompt } from '../services/api';

const PromptForm = ({ selectedModels, setResults }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = async () => {
    const res = await analyzePrompt({ prompt, model_names: selectedModels });
    setResults(res.data.results);
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <TextField
        fullWidth
        multiline
        minRows={4}
        label="Enter Prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Box mt={2}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!prompt || selectedModels.length === 0}
        >
          Analyze Bias
        </Button>
      </Box>
    </Paper>
  );
};

export default PromptForm;
