'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  bio?: string;
  skills?: string;
  experience?: string;
  portfolio?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    bio: '',
    skills: '',
    experience: '',
    portfolio: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const checkAuthAndFetchProfile = async () => {
      const token = localStorage.getItem('instajob_token');
      const userData = localStorage.getItem('instajob_user');

      if (!token || !userData) {
        router.push('/login');
        return;
      }

      const user = JSON.parse(userData);
      setProfile(user);
      setFormData({
        fullName: user.fullName || '',
        bio: user.bio || '',
        skills: user.skills || '',
        experience: user.experience || '',
        portfolio: user.portfolio || '',
      });
      setLoading(false);
    };

    checkAuthAndFetchProfile();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    const token = localStorage.getItem('instajob_token');
    if (!token || !profile) {
      setError('Not authenticated');
      return;
    }

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';
      const response = await fetch(`${apiBase}/api/user/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          bio: formData.bio,
          skills: formData.skills,
          experience: formData.experience,
          portfolio: formData.portfolio,
        }),
      });

      if (response.ok) {
        const updated = await response.json();
        setProfile(updated);
        localStorage.setItem('instajob_user', JSON.stringify(updated));
        setSuccess('Profile updated successfully!');
        setEditing(false);
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Failed to update profile');
      }
    } catch (err) {
      setError('Error updating profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('instajob_token');
    localStorage.removeItem('instajob_user');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold text-indigo-600 mb-4">InstaJob</div>
          <div className="text-lg text-gray-600">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-indigo-600">Your Profile</h1>
            <p className="text-gray-600 text-sm mt-1">Manage your career information</p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            {success}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {profile?.fullName?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{profile?.fullName}</h2>
              <p className="text-gray-600">{profile?.email}</p>
            </div>
          </div>

          {!editing ? (
            // View Mode
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <p className="text-gray-600">{profile?.bio || 'No bio added yet'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                <p className="text-gray-600">{profile?.skills || 'No skills added yet'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                <p className="text-gray-600">{profile?.experience || 'No experience added yet'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio</label>
                <p className="text-gray-600">{profile?.portfolio || 'No portfolio link added yet'}</p>
              </div>

              <button
                onClick={() => setEditing(true)}
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold transition"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            // Edit Mode
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="e.g., JavaScript, React, Node.js"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="e.g., 3 years as Senior Developer at Company X"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio URL</label>
                <input
                  type="url"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleInputChange}
                  placeholder="https://yourportfolio.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="flex-1 px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
