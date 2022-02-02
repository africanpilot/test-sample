import axios from 'axios';

const url = process.env.REACT_APP_API_URL +`/token`||`http://localhost:5000/token`;

export const fetchToken = () => axios.get(url);