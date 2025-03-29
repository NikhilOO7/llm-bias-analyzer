import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import ModelSelector from '../components/ModelSelector';
import PromptForm from '../components/PromptForm';
import ResponseCard from '../components/ResponseCard';

const Home = () => {
  const [selectedModels, setSelectedModels] = useState([]);
  const [results, setResults] = useState([]);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom mt={3}>
        LLM Bias Analyzer
      </Typography>

      <ModelSelector
        selectedModels={selectedModels}
        setSelectedModels={setSelectedModels}
      />

      <PromptForm
        selectedModels={selectedModels}
        setResults={setResults}
      />

      {results.map((res, idx) => (
        <ResponseCard key={idx} result={res} />
      ))}
    </Container>
  );
};

export default Home;