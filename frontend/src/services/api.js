import axios from 'axios';

const API = axios.create({
  baseURL: 'https://e9b1-34-58-64-164.ngrok-free.app', // Update with your ngrok URL
  headers: {
    'ngrok-skip-browser-warning': 'true',
  },
});

export const fetchModels = () => API.get('/models').catch(err => { throw new Error('Failed to fetch models'); });
export const analyzePrompt = (data) => API.post('/analyze', data).catch(err => { throw new Error('Analysis failed'); });
export const getDashboardData = () => API.get('/dashboard').catch(err => { throw new Error('Dashboard data fetch failed'); });
export const triggerFineTune = (data) => API.post('/fine-tune', data).catch(err => { throw new Error('Fine-tuning failed'); });
export const evaluateFineTuned = (model) => API.get(`/evaluate-fine-tuned/${model}`).catch(err => { throw new Error('Evaluation failed'); });
export const getPredictionClusters = () => API.get('/predictions-clusters').catch(err => { throw new Error('Failed to fetch clusters'); });

export const connectWebSocket = () => {
  return new WebSocket('wss://701a-34-142-143-91.ngrok-free.app/ws/alerts');
};