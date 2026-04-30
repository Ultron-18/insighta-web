'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState({ total: 0, male: 0, female: 0 });
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profilesRes, userRes] = await Promise.all([
          api.get('/api/profiles'),
          api.get('/auth/me'),
        ]);

        const profiles = profilesRes.data;
        setStats({ total: profiles.total, male: 0, female: 0 });
        setUser(userRes.data.user);
      } catch {
        router.push('/login');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-400 mb-8">Welcome back, {user?.username}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 p-6 rounded-xl">
          <p className="text-gray-400 text-sm">Total Profiles</p>
          <p className="text-4xl font-bold mt-2">{stats.total}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl">
          <p className="text-gray-400 text-sm">Your Role</p>
          <p className="text-4xl font-bold mt-2 capitalize">{user?.role}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl">
          <p className="text-gray-400 text-sm">Status</p>
          <p className="text-4xl font-bold mt-2 text-green-400">Active</p>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => router.push('/profiles')}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
        >
          View Profiles
        </button>
        <button
          onClick={() => router.push('/search')}
          className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-xl font-semibold"
        >
          Search
        </button>
      </div>
    </div>
  );
}