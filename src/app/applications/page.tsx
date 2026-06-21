'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Application {
  id: string;
  jobId: string;
  status: string;
  notes?: string;
  appliedAt: string;
  createdAt: string;
  jobTitle?: string;
  company?: string;
  location?: string;
}

export default function ApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem('instajob_token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';
        const response = await fetch(`${apiBase}/api/applications`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setApplications(data.applications || []);
        } else {
          setError('Failed to load applications');
        }
      } catch (err) {
        setError('Error loading applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [router]);

  const filteredApps = applications.filter(app => {
    const matchesFilter = filter === 'all' || app.status === filter;
    const matchesSearch = !searchQuery ||
      app.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.company?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
          <div className="text-lg text-gray-600">Loading applications...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-md z-50 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-600">InstaJob</h1>
          <p className="text-sm text-gray-500 mt-1">AI Job Hunting</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/dashboard" className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-lg transition">
            📊 Dashboard
          </Link>
          <Link href="/jobs" className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-lg transition">
            💼 Jobs
          </Link>
          <Link href="/applications" className="block px-4 py-3 bg-indigo-50 text-indigo-700 font-semibold rounded-lg">
            📝 Applications
          </Link>
          <Link href="/profile" className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-lg transition">
            👤 Profile
          </Link>
          <Link href="/settings" className="block px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-lg transition">
            ⚙️ Settings
          </Link>
        </nav>
        <div className="p-4 border-t">
          <button onClick={handleLogout} className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Applications</h1>
        <p className="text-gray-600 mb-6">Track your job applications and their status</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Search & Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search applications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex gap-2">
            {['all', 'pending', 'accepted', 'rejected'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === f
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Applications List */}
        {filteredApps.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">No applications yet</h2>
            <p className="text-gray-600 mb-6">Start applying to jobs to see them here</p>
            <Link
              href="/jobs"
              className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold transition"
            >
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApps.map((app) => (
              <div key={app.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{app.jobTitle || 'Unknown Position'}</h3>
                    <p className="text-indigo-600 font-semibold text-sm">{app.company || 'Unknown Company'}</p>
                    {app.location && (
                      <p className="text-gray-500 text-sm mt-1">📍 {app.location}</p>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(app.status)}`}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                  <span>Applied: {new Date(app.appliedAt || app.createdAt).toLocaleDateString()}</span>
                  {app.notes && <span className="text-gray-400 italic">"{app.notes}"</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h3 className="font-bold text-gray-800 mb-3">Summary</h3>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-800">{applications.length}</div>
              <div className="text-sm text-gray-500">Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {applications.filter(a => a.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-500">Pending</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {applications.filter(a => a.status === 'accepted').length}
              </div>
              <div className="text-sm text-gray-500">Accepted</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {applications.filter(a => a.status === 'rejected').length}
              </div>
              <div className="text-sm text-gray-500">Rejected</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
