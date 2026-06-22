'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: string;
  createdAt: string;
}

export default function JobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLocation, setFilterLocation] = useState('all');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuthAndFetchJobs = async () => {
      const token = localStorage.getItem('instajob_token');
      const userData = localStorage.getItem('instajob_user');

      if (!token || !userData) {
        router.push('/login');
        return;
      }

      setUser(JSON.parse(userData));

      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';
        const response = await fetch(`${apiBase}/api/jobs`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          const jobsList = data.jobs || data;
          setJobs(jobsList);
          setFilteredJobs(jobsList);
        } else {
          setError('Failed to load jobs');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchJobs();
  }, [router]);

  // Apply filters
  useEffect(() => {
    let filtered = jobs;

    if (searchQuery.trim()) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterLocation !== 'all') {
      filtered = filtered.filter(job => job.location === filterLocation);
    }

    setFilteredJobs(filtered);
  }, [searchQuery, filterLocation, jobs]);

  const handleApply = async (jobId: string) => {
    console.log('[DEBUG] handleApply called with jobId:', jobId, 'type:', typeof jobId);
    const token = localStorage.getItem('instajob_token');
    const userData = localStorage.getItem('instajob_user');
    
    if (!token || !userData) {
      router.push('/login');
      return;
    }

    const user = JSON.parse(userData);

    try {
      console.log('[DEBUG] Sending application:', { userId: user.id, jobId });
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';
      const response = await fetch(`${apiBase}/api/applications`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          jobId: jobId,
          status: 'pending',
        }),
      });

      const responseText = await response.text();
      console.log('[DEBUG] Response status:', response.status, 'body:', responseText);

      if (response.ok) {
        alert('Application submitted successfully!');
      } else {
        alert('Failed to submit application: ' + responseText);
      }
    } catch (err) {
      console.error('[DEBUG] Error:', err);
      alert('Error submitting application');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('instajob_token');
    localStorage.removeItem('instajob_user');
    router.push('/');
  };

  const uniqueLocations = Array.from(new Set(jobs.map(job => job.location)));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold text-indigo-600 mb-4">InstaJob</div>
          <div className="text-lg text-gray-600">Loading jobs...</div>
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
            <h1 className="text-3xl font-bold text-indigo-600">Browse Jobs</h1>
            <p className="text-gray-600 text-sm mt-1">Found {filteredJobs.length} opportunities</p>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Search & Filter</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Box */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Jobs</label>
              <input
                type="text"
                placeholder="Job title, company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Locations</option>
                {uniqueLocations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Results</label>
              <div className="px-4 py-2 bg-indigo-50 rounded-lg text-indigo-700 font-semibold">
                {filteredJobs.length} / {jobs.length} jobs
              </div>
            </div>
          </div>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-xl text-gray-600 mb-4">No jobs found matching your criteria.</p>
            <button
              onClick={() => { setSearchQuery(''); setFilterLocation('all'); }}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
                <div className="p-6">
                  {/* Job Header */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h3>
                    <p className="text-indigo-600 font-semibold text-sm">{job.company}</p>
                  </div>

                  {/* Job Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                      {job.location}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753 1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H8.5z"/>
                      </svg>
                      {job.salary}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>

                  {/* Action Button */}
                  <button
                    onClick={() => handleApply(job.id)}
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold transition"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}