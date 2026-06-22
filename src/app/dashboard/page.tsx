'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: string;
  email: string;
  fullName: string;
}

interface DashboardStats {
  totalJobs: number;
  totalApplied: number;
  appliedToday: number;
  pendingApplications: number;
  acceptedApplications: number;
  recentApplications: any[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('instajob_token');
      const userData = localStorage.getItem('instajob_user');

      if (!token || !userData) {
        router.push('/login');
        return;
      }

      try {
        setUser(JSON.parse(userData));
        
        // Fetch dashboard stats
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';
        const response = await fetch(`${apiBase}/api/dashboard/stats`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          setError('Failed to load dashboard stats');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

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
          <div className="text-lg text-gray-600">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-indigo-600">InstaJob Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome, {user?.fullName}!</p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/jobs"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Browse Jobs
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Total Jobs Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Available Jobs</p>
                  <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalJobs}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.5 1.5H3.75A2.25 2.25 0 001.5 3.75v12.5A2.25 2.25 0 003.75 18.5h12.5a2.25 2.25 0 002.25-2.25V9.5m-12-4h8m-8 3h5m-5 3h8m-8 3h5m6.5-10.5v6m-3-3h6" strokeWidth="1.5" stroke="currentColor" fill="none"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Total Applied Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Applications</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">{stats.totalApplied}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Pending Applications Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Pending Review</p>
                  <p className="text-3xl font-bold text-orange-600 mt-2">{stats.pendingApplications}</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-11.414a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Accepted Applications Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Accepted</p>
                  <p className="text-3xl font-bold text-purple-600 mt-2">{stats.acceptedApplications}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Applied Today Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-pink-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Applied Today</p>
                  <p className="text-3xl font-bold text-pink-600 mt-2">{stats.appliedToday}</p>
                </div>
                <div className="bg-pink-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753 1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H9.5z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* User Email Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Account Email</p>
                  <p className="text-sm font-semibold text-indigo-600 mt-2 truncate">{user?.email}</p>
                </div>
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/jobs"
              className="p-4 bg-indigo-50 border-2 border-indigo-200 rounded-lg hover:bg-indigo-100 transition"
            >
              <p className="font-semibold text-indigo-700">Browse Jobs</p>
              <p className="text-sm text-indigo-600">Find and apply to new opportunities</p>
            </Link>
            <Link
              href="/applications"
              className="p-4 bg-green-50 border-2 border-green-200 rounded-lg hover:bg-green-100 transition"
            >
              <p className="font-semibold text-green-700">My Applications</p>
              <p className="text-sm text-green-600">Track your job applications</p>
            </Link>
            <Link
              href="/profile"
              className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg hover:bg-blue-100 transition"
            >
              <p className="font-semibold text-blue-700">Profile Settings</p>
              <p className="text-sm text-blue-600">Update your profile information</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}