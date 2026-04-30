const API_URL = 'https://web-production-5347.up.railway.app';

export const refreshAccessToken = async () => {
  try {
    await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
  } catch {
    window.location.href = '/login';
  }
};