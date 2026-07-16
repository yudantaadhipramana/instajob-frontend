'use client';

import { useState } from 'react';
import { Zap, AlertCircle } from 'lucide-react';

interface AutoApplyButtonProps {
  jobId: string;
  jobTitle: string;
  company: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function AutoApplyButton({
  jobId,
  jobTitle,
  company,
  onSuccess,
  onError
}: AutoApplyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [quota, setQuota] = useState<any>(null);

  const handleClick = async () => {
    try {
      const token = localStorage.getItem('instajob_token');
      if (!token) {
        setError('Please login first');
        return;
      }

      // Check quota first
      const quotaRes = await fetch('/api/auto-apply/quota', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!quotaRes.ok) {
        setError('Failed to check quota');
        return;
      }

      const quotaData = await quotaRes.json();
      setQuota(quotaData);

      if (!quotaData.canApply) {
        setError(`Daily limit reached (${quotaData.appliedToday}/${quotaData.dailyLimit})`);
        setShowModal(true);
        return;
      }

      setShowModal(true);
    } catch (err) {
      setError('Error checking quota');
      console.error(err);
    }
  };

  const handleConfirm = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('instajob_token');
      if (!token) {
        setError('Authentication failed');
        return;
      }

      const res = await fetch('/api/auto-apply/queue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ jobId })
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || 'Failed to add to queue');
        return;
      }

      setShowModal(false);
      onSuccess?.();
    } catch (err) {
      setError('Network error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition"
      >
        <Zap className="w-4 h-4" />
        {loading ? 'Adding...' : 'Auto-Apply'}
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Add to Auto-Apply Queue?</h3>

            <div className="bg-blue-50 p-3 rounded-lg mb-4">
              <p className="text-sm text-gray-700">
                <strong>{jobTitle}</strong> at <strong>{company}</strong>
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Your application will be sent automatically.
              </p>
            </div>

            {quota && (
              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <p className="text-sm text-gray-600">
                  Applications today: <span className="font-bold">{quota.appliedToday} / {quota.dailyLimit}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {quota.remainingToday} remaining today
                </p>
              </div>
            )}

            {error && (
              <div className="flex gap-2 p-3 bg-red-50 rounded-lg mb-4">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                disabled={loading}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-300 rounded-lg font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition"
              >
                {loading ? 'Adding...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
