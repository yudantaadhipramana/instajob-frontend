'use client';

import { useEffect, useState } from 'react';
import { Clock, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';

interface QueueItem {
  id: string;
  jobId: string;
  status: 'pending' | 'sent' | 'failed' | 'completed';
  createdAt: string;
  sentAt?: string;
  job: {
    id: string;
    title: string;
    company: string;
  };
  errorMessage?: string;
}

interface QueueStats {
  pending: number;
  sent: number;
  failed: number;
  total: number;
}

interface QuotaStatus {
  appliedToday: number;
  remainingToday: number;
  canApply: boolean;
  dailyLimit: number;
  totalApplied: number;
}

export default function AutoApplyQueuePanel() {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [stats, setStats] = useState<QueueStats | null>(null);
  const [quota, setQuota] = useState<QuotaStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch queue and quota on mount
  useEffect(() => {
    fetchQueueAndQuota();
    const interval = setInterval(fetchQueueAndQuota, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, []);

  const fetchQueueAndQuota = async () => {
    try {
      const token = sessionStorage.getItem('instajob_token');
      if (!token) return;

      const [queueRes, quotaRes] = await Promise.all([
        fetch('/api/auto-apply/queue', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch('/api/auto-apply/quota', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      if (queueRes.ok) {
        const data = await queueRes.json();
        setQueue(data.queue || []);
        setStats(data.stats);
      }

      if (quotaRes.ok) {
        const data = await quotaRes.json();
        setQuota(data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'sent':
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'Waiting',
      sent: 'Sent',
      failed: 'Failed',
      completed: 'Completed'
    };
    return labels[status] || status;
  };

  if (loading) {
    return <div className="p-4 text-center">Loading queue...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Auto-Apply Queue</h2>

      {/* Quota Status */}
      {quota && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Daily Limit</p>
              <p className="text-lg font-bold text-gray-900">
                {quota.appliedToday} / {quota.dailyLimit}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Remaining Today</p>
              <p className={`text-lg font-bold ${quota.canApply ? 'text-green-600' : 'text-red-600'}`}>
                {quota.remainingToday}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Applied</p>
              <p className="text-lg font-bold text-gray-900">{quota.totalApplied}</p>
            </div>
          </div>
          {!quota.canApply && (
            <p className="text-sm text-red-600 mt-3">
              Daily limit reached. Try again tomorrow.
            </p>
          )}
        </div>
      )}

      {/* Queue Stats */}
      {stats && (
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-xs text-gray-600 uppercase">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-xs text-gray-600 uppercase">Sent</p>
            <p className="text-2xl font-bold text-green-600">{stats.sent}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-xs text-gray-600 uppercase">Failed</p>
            <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-xs text-gray-600 uppercase">Total</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
        </div>
      )}

      {/* Queue List */}
      {queue.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No items in queue</p>
      ) : (
        <div className="space-y-3">
          {queue.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
            >
              <div className="flex items-center gap-3 flex-1">
                {getStatusIcon(item.status)}
                <div>
                  <p className="font-semibold text-gray-900">{item.job.title}</p>
                  <p className="text-sm text-gray-600">{item.job.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  item.status === 'sent' ? 'bg-green-100 text-green-800' :
                  item.status === 'failed' ? 'bg-red-100 text-red-800' :
                  'bg-gray-200 text-gray-800'
                }`}>
                  {getStatusLabel(item.status)}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
