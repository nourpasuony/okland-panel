import axios from 'axios';

const API = axios.create({
  baseURL: 'https://okland.me',
  withCredentials: true 
});

export default API;
