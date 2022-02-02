import axios from 'axios';

const url = `http://localhost:5000/data/BPS65O4WYLBWWBR`;

export const fetchData = () => axios.get(url,{
    params: {
      _limit: 3
     }
  });