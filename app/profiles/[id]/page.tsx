'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../lib/api';

export default function ProfileDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    api.get(`/api/profiles/${params.id}`)
      .then(res => setProfile(res.data.data))
      .catch(() => router.push('/profiles'));
  }, []);

  if (!profile) return <div className="min-h-screen bg-gray-950 text-white p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <button onClick={() => router.push('/profiles')} className="text-gray-400 hover:text-white mb-6 block">
        ← Back to Profiles
      </button>

      <div className="bg-gray-900 rounded-2xl p-8 max-w-lg">
        <h1 className="text-3xl font-bold mb-6">{profile.name}</h1>
        <div className="space-y-4">
          {[
            ['Gender', profile.gender],
            ['Age', profile.age],
            ['Age Group', profile.age_group],
            ['Country', profile.country_id],
            ['Country Probability', profile.country_probability],
            ['Created At', new Date(profile.created_at).toLocaleDateString()],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400">{label}</span>
              <span>{value || '-'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}