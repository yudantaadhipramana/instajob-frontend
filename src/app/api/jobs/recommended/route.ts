import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit') || '10';
    const token = request.headers.get('authorization');

    if (!token) {
      return NextResponse.json(
        { message: 'Authorization required' },
        { status: 401 }
      );
    }

    const response = await fetch(
      `https://instajob-backend-production.up.railway.app/api/jobs/recommended?limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Recommendations proxy error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch recommendations', recommendations: [], total: 0 },
      { status: 500 }
    );
  }
}
