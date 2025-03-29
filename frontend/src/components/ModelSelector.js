import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput, Chip, Box } from '@mui/material';
import { fetchModels } from '../services/api';

const ModelSelector = ({ selectedModels, setSelectedModels }) => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetchModels().then(res => setModels(res.data.models));
  }, []);

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>Select Model(s)</InputLabel>
      <Select
        multiple
        value={selectedModels}
        onChange={(e) => setSelectedModels(e.target.value)}
        input={<OutlinedInput label="Select Model(s)" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {models.map((model) => (
          <MenuItem key={model} value={model}>
            {model}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ModelSelector;
