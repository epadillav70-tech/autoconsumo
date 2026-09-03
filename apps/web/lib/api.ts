import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const fetcher = (url: string) => axios.get(`${API_URL}${url}`).then((r) => r.data);

export default axios.create({ baseURL: API_URL });
