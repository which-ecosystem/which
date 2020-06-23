import axios from 'axios';

const requests = axios.create({
  baseURL: 'http://localhost:3030',
  headers: {
    'Authorization': localStorage.getItem('token')
  }
});

export const { get, post, put } = requests;
export default requests;

