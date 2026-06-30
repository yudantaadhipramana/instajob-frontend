'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AppNavigation from '@/components/shared/AppNavigation';

interface AnalyticsMetric {
  id: number;
  applicationsToday: number;
  applicationsThisMonth: number;
  applicationsTotal: number;
  successRate: number;
  responseCount: number;
  interviewCount: number;
  rejectionCount: number;
  dailyLimitUsed: number;
  maxDailyLimit: number;
  date: string;
}

interface AnalyticsSummary {
  period: string;
  totalApplied: number;
  totalResponses: number;
  totalInterviews: number;
  totalRejections: number;
  avgSuccessRate: number;
  dailyMetrics: AnalyticsMetric[];
  recentApplications: any[];
}

interface SuccessRateByTitle {
  jobTitle: string;
  total: number;
  responses: number;
  rate: number;
}

export default function AnalyticsPage() {
  const router = useRouter();
  const [metric, setMetric] = useState<AnalyticsMetric | null>(null);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [successByTitle, setSuccessByTitle] = useState<SuccessRateByTitle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const token = sessionStorage.getItem('instajob_token');
      if (!token) {
        router.push('/login');
        return;
      }

      await fetchAnalytics();
    };

    checkAuth();
  }, [router]);

  const fetchAnalytics = async () => {
    const token = sessionStorage.getItem('instajob_token');
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';

    try {
      const [metricRes, summaryRes, successRateRes] = await Promise.all([
        fetch(`${apiBase}/api/analytics`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch(`${apiBase}/api/analytics/summary`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch(`${apiBase}/api/analytics/success-rate`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
      ]);

      if (metricRes.ok) {
        const data = await metricRes.json();
        setMetric(data);
      }

      if (summaryRes.ok) {
        const data = await summaryRes.json();
        setSummary(data);
      }

      if (successRateRes.ok) {
        const data = await successRateRes.json();
        setSuccessByTitle(data.byJobTitle || []);
      }
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
      setError('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppNavigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Application Analytics</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {metric && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Today</div>
              <div className="text-3xl font-bold text-blue-600">{metric.applicationsToday}</div>
              <div className="text-xs text-gray-500 mt-1">
                {metric.dailyLimitUsed} / {metric.maxDailyLimit} limit used
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">This Month</div>
              <div className="text-3xl font-bold text-purple-600">{metric.applicationsThisMonth}</div>
              <div className="text-xs text-gray-500 mt-1">applications sent</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Total Applications</div>
              <div className="text-3xl font-bold text-gray-900">{metric.applicationsTotal}</div>
              <div className="text-xs text-gray-500 mt-1">all time</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Success Rate</div>
              <div className="text-3xl font-bold text-green-600">{metric.successRate.toFixed(1)}%</div>
              <div className="text-xs text-gray-500 mt-1">response rate</div>
            </div>
          </div>
        )}

        {summary && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Last 30 Days Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Applied</span>
                  <span className="font-semibold text-lg">{summary.totalApplied}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Responses</span>
                  <span className="font-semibold text-lg text-blue-600">{summary.totalResponses}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Interviews</span>
                  <span className="font-semibold text-lg text-green-600">{summary.totalInterviews}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rejections</span>
                  <span className="font-semibold text-lg text-red-600">{summary.totalRejections}</span>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Avg Success Rate</span>
                    <span className="font-bold text-xl text-green-600">
                      {summary.avgSuccessRate.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Response Breakdown</h2>

              {metric && (
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-32 text-sm text-gray-600">Responses</div>
                    <div className="flex-1">
                      <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div
                          className="bg-blue-500 h-full"
                          style={{
                            width: `${metric.applicationsTotal > 0 ? (metric.responseCount / metric.applicationsTotal) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-16 text-right text-sm font-semibold">{metric.responseCount}</div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-32 text-sm text-gray-600">Interviews</div>
                    <div className="flex-1">
                      <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div
                          className="bg-green-500 h-full"
                          style={{
                            width: `${metric.applicationsTotal > 0 ? (metric.interviewCount / metric.applicationsTotal) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-16 text-right text-sm font-semibold">{metric.interviewCount}</div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-32 text-sm text-gray-600">Rejections</div>
                    <div className="flex-1">
                      <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div
                          className="bg-red-500 h-full"
                          style={{
                            width: `${metric.applicationsTotal > 0 ? (metric.rejectionCount / metric.applicationsTotal) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-16 text-right text-sm font-semibold">{metric.rejectionCount}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {successByTitle.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Success Rate by Job Title</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Job Title</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Applied</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Responses</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {successByTitle.slice(0, 10).map((item) => (
                    <tr key={item.jobTitle} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm">{item.jobTitle}</td>
                      <td className="py-3 px-4 text-sm text-right">{item.total}</td>
                      <td className="py-3 px-4 text-sm text-right">{item.responses}</td>
                      <td className="py-3 px-4 text-sm text-right">
                        <span className={`font-semibold ${item.rate > 10 ? 'text-green-600' : 'text-gray-600'}`}>
                          {item.rate.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!metric && !summary && !error && (
          <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-200 text-center">
            <p className="text-gray-500">No analytics data available yet.</p>
            <p className="text-sm text-gray-400 mt-2">Start applying to jobs to see your metrics here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
