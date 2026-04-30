'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await api.get('/api/profiles/search', { params: { q: query } });
      setResults(res.data.data);
      setTotal(res.data.total);
    } catch {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Search Profiles</h1>
        <button onClick={() => router.push('/dashboard')} className="text-gray-400 hover:text-white">
          ← Back
        </button>
      </div>

      <div className="flex gap-4 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="e.g. young males from nigeria"
          className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-xl outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-gray-400">Searching...</p>}

      {results.length > 0 && (
        <>
          <p className="text-gray-400 mb-4">Found {total} results</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-800">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Gender</th>
                  <th className="p-4">Age</th>
                  <th className="p-4">Country</th>
                </tr>
              </thead>
              <tbody>
                {results.map((p: any) => (
                  <tr key={p.id} className="border-t border-gray-800 hover:bg-gray-900 cursor-pointer"
                    onClick={() => router.push(`/profiles/${p.id}`)}>
                    <td className="p-4">{p.name}</td>
                    <td className="p-4 capitalize">{p.gender || '-'}</td>
                    <td className="p-4">{p.age || '-'}</td>
                    <td className="p-4">{p.country_id || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}