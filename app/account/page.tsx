'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    api.get('/auth/me')
      .then(res => setUser(res.data.user))
      .catch(() => router.push('/login'));
  }, [router]);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      await api.post('/auth/logout', { refresh_token: refreshToken });
    } catch {}
    
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    router.push('/login');
  };

  if (!user) return <div className="min-h-screen bg-gray-950 text-white p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Account</h1>
        <button onClick={() => router.push('/dashboard')} className="text-gray-400 hover:text-white">
          ← Back
        </button>
      </div>

      <div className="bg-gray-900 rounded-2xl p-8 max-w-lg">
        {user.avatar_url && (
          <img src={user.avatar_url} className="w-20 h-20 rounded-full mb-6" alt="avatar" />
        )}
        <div className="space-y-4">
          {[
            ['Username', `@${user.username}`],
            ['Email', user.email || '-'],
            ['Role', user.role],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400">{label}</span>
              <span className="capitalize">{value}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
}