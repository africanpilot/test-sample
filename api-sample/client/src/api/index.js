import axios from 'axios';

const url = process.env.API_URL +`token`||`http://localhost:5000/token`;

export const fetchToken = () => axios.get(url,{params: {_limit: 3}});