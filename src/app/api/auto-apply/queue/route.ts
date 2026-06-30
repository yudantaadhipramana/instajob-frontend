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
        { error: 'Failed to fetch queue' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Map backend response fields to frontend component expectations
    const queueArray = data.queue || [];
    const mappedQueue = queueArray.map((item: any) => ({
      id: item.applicationId,
      jobId: item.jobId,
      // Map 'queued' to 'pending', 'applied' to 'sent'
      status: item.status === 'queued' ? 'pending' : (item.status === 'applied' ? 'sent' : item.status),
      createdAt: item.appliedAt || new Date().toISOString(),
      sentAt: item.status === 'applied' ? item.appliedAt : undefined,
      errorMessage: item.status === 'failed' ? item.autoApplyLogs : undefined,
      job: {
        id: item.jobId,
        title: item.title,
        company: item.company
      }
    }));

    const stats = {
      pending: mappedQueue.filter((q: any) => q.status === 'pending').length,
      sent: mappedQueue.filter((q: any) => q.status === 'sent').length,
      failed: mappedQueue.filter((q: any) => q.status === 'failed').length,
      total: mappedQueue.length
    };

    return NextResponse.json({ queue: mappedQueue, stats });
  } catch (error) {
    console.error('Queue GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    const response = await fetch(`${API_BASE}/api/auto-apply/enqueue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || 'Failed to add to queue' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Queue POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
