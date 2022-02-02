import axios from 'axios';

const url = `http://localhost:5000/token`;

export const fetchToken = () => axios.get(url);