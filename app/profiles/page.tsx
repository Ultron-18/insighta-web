'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';

export default function ProfilesPage() {
  const router = useRouter();
  const [profiles, setProfiles] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const params: any = { page, limit: 10 };
      if (gender) params.gender = gender;

      const res = await api.get('/api/profiles', { params });
      setProfiles(res.data.data);
      setTotal(res.data.total);
      setTotalPages(res.data.total_pages);
    } catch {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProfiles(); }, [page, gender]);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Profiles</h1>
        <button onClick={() => router.push('/dashboard')} className="text-gray-400 hover:text-white">
          ← Back
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          value={gender}
          onChange={(e) => { setGender(e.target.value); setPage(1); }}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg"
        >
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Gender</th>
                <th className="p-4">Age</th>
                <th className="p-4">Country</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((p: any) => (
                <tr key={p.id} className="border-t border-gray-800 hover:bg-gray-900">
                  <td className="p-4">{p.name}</td>
                  <td className="p-4 capitalize">{p.gender || '-'}</td>
                  <td className="p-4">{p.age || '-'}</td>
                  <td className="p-4">{p.country_id || '-'}</td>
                  <td className="p-4">
                    <button
                      onClick={() => router.push(`/profiles/${p.id}`)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex gap-4 mt-6 items-center">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="bg-gray-800 px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-400">Page {page} of {totalPages} | Total: {total}</span>
        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="bg-gray-800 px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}