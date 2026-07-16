import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit') || '10';
    const page = searchParams.get('page') || '1';
    
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'https://instajob-backend-production.up.railway.app'}/api/jobs?limit=${limit}&page=${page}`,
      { method: 'GET' }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Jobs proxy error:', error);
    return NextResponse.json(
      { message: 'Proxy error', jobs: [], pagination: {} },
      { status: 500 }
    );
  }
}
