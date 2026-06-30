'use client';

import { useEffect, useState } from 'react';
import { Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface QuotaStatus {
  appliedToday: number;
  remainingToday: number;
  canApply: boolean;
  dailyLimit: number;
  totalApplied: number;
}

interface QueueStats {
  pending: number;
  sent: number;
  failed: number;
  total: number;
}

export default function QuotaWidget() {
  const [quota, setQuota] = useState<QuotaStatus | null>(null);
  const [queueStats, setQueueStats] = useState<QueueStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const token = sessionStorage.getItem('instajob_token');
      if (!token) return;

      const [quotaRes, queueRes] = await Promise.all([
        fetch('/api/auto-apply/quota', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch('/api/auto-apply/queue', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      if (quotaRes.ok) {
        const data = await quotaRes.json();
        setQuota(data);
      }

      if (queueRes.ok) {
        const data = await queueRes.json();
        setQueueStats(data.stats);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !quota) return null;

  const quotaPercentage = (quota.appliedToday / quota.dailyLimit) * 100;
  const progressColor = quota.canApply ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200 shadow-sm p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-600" />
            Auto-Apply Daily Quota
          </h3>
          <p className="text-sm text-gray-600 mt-1">Track your automated applications</p>
        </div>
        <Link
          href="/applications?tab=queue"
          className="text-sm px-3 py-1.5 bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-lg font-semibold transition"
        >
          View Queue
        </Link>
      </div>

      {/* Quota Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-900">
            {quota.appliedToday} / {quota.dailyLimit}
          </span>
          <span className={`text-sm font-semibold ${quota.canApply ? 'text-green-600' : 'text-red-600'}`}>
            {quota.remainingToday} remaining
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className={`${progressColor} h-full transition-all duration-300`}
            style={{ width: `${Math.min(quotaPercentage, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-lg p-3 border border-gray-100">
          <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Total Applied</p>
          <p className="text-2xl font-bold text-gray-900">{quota.totalApplied}</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-100">
          <p className="text-xs text-gray-600 uppercase font-semibold mb-1">This Month</p>
          <p className="text-2xl font-bold text-gray-900">{Math.floor(quota.totalApplied / 7)}</p>
        </div>
      </div>

      {/* Queue Status */}
      {queueStats && (
        <div className="bg-white rounded-lg p-4 border border-gray-100">
          <p className="text-xs text-gray-600 uppercase font-semibold mb-3">Queue Status</p>
          <div className="flex gap-2">
            {queueStats.pending > 0 && (
              <div className="flex-1">
                <p className="text-xs text-yellow-600 font-semibold">Pending</p>
                <p className="text-lg font-bold text-yellow-600">{queueStats.pending}</p>
              </div>
            )}
            {queueStats.sent > 0 && (
              <div className="flex-1">
                <p className="text-xs text-green-600 font-semibold">Sent</p>
                <p className="text-lg font-bold text-green-600">{queueStats.sent}</p>
              </div>
            )}
            {queueStats.failed > 0 && (
              <div className="flex-1">
                <p className="text-xs text-red-600 font-semibold">Failed</p>
                <p className="text-lg font-bold text-red-600">{queueStats.failed}</p>
              </div>
            )}
            {queueStats.total === 0 && (
              <p className="text-sm text-gray-500">No pending items</p>
            )}
          </div>
        </div>
      )}

      {!quota.canApply && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700 font-semibold">
            Daily limit reached. Try again tomorrow.
          </p>
        </div>
      )}
    </div>
  );
}
