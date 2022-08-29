import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/health`,
  timeout: 5000,
  headers: { 'Access-Control-Allow-Origin': '*' },
  withCredentials: true,
});

const getSymptomsList = () =>
  instance.get('/symptoms').then(({ data }) => data);

const getDiagnosisListFromSymptoms = (symptoms) =>
  instance.post('/diagnosis', symptoms).then(({ data }) => data);

const getDiagnosisHistory = (id) =>
  instance.get(`/diagnosis`, { params: { id } }).then(({ data }) => data);

const setDiagnosisValidity = ({ id, isValid }) =>
  instance.put(`/diagnosis/${id}`, { isValid }).then(({ data }) => data);

export default {
  getSymptomsList,
  getDiagnosisListFromSymptoms,
  getDiagnosisHistory,
  setDiagnosisValidity,
};
