import axios from 'axios'

const url = process.env.REACT_APP_API_URL +`/data/`||`http://localhost:5000/data/`;

export const fetchData = (trackingId) => axios.get(url+trackingId,{params: {_limit: 3}});