import axios from 'axios';

const API_URL = 'https://web-production-5347.up.railway.app';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'X-API-Version': '1' },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        await axios.post(`${API_URL}/auth/refresh`, {}, {
          withCredentials: true,
        });
        return api(original);
      } catch {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;