import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app';

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(`${API_BASE}/api/auto-apply/queue`, {
      headers: { Authorization: token }
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch quota from queue' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const quota = data.quota || { used: 0, limit: 5, remaining: 5 };
    const queue = data.queue || [];

    // Map backend production fields to frontend component expectations:
    // appliedToday -> quota.used
    // remainingToday -> quota.remaining
    // canApply -> quota.remaining > 0
    // dailyLimit -> quota.limit
    // totalApplied -> count of sent/applied items in queue
    const totalApplied = queue.filter((item: any) => item.status === 'applied' || item.status === 'sent').length;

    return NextResponse.json({
      appliedToday: quota.used,
      remainingToday: quota.remaining,
      canApply: quota.remaining > 0,
      dailyLimit: quota.limit,
      totalApplied: totalApplied
    });
  } catch (error) {
    console.error('Quota API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
