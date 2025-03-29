import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000'
});

export const fetchModels = () => API.get('/models');
export const analyzePrompt = (data) => API.post('/analyze', data);
export const getDashboardData = () => API.get('/dashboard');
export const getReportPDF = () => API.get('/report', { responseType: 'blob' });
