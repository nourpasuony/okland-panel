import axios from 'axios';

const API = axios.create({
  baseURL: 'http://92.112.181.199:5000',
  withCredentials: true 
});

export default API;
