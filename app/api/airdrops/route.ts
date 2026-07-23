import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');

    let result;
    if (status && ['upcoming', 'active', 'ended'].includes(status)) {
      result = await sql`
        SELECT * FROM airdrops 
        WHERE status = ${status}
        ORDER BY start_date DESC NULLS LAST, created_at DESC
      `;
    } else {
      result = await sql`
        SELECT * FROM airdrops 
        ORDER BY created_at DESC
      `;
    }

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { 
      title, description, project_name, logo_url, reward, 
      status = 'upcoming', start_date, end_date, link, steps 
    } = body;

    if (!title || !project_name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const stepsJson = steps ? JSON.stringify(steps) : null;

    const result = await sql`
      INSERT INTO airdrops (
        title, description, project_name, logo_url, reward, 
        status, start_date, end_date, link, steps
      )
      VALUES (
        ${title}, ${description}, ${project_name}, ${logo_url}, ${reward}, 
        ${status}, ${start_date || null}, ${end_date || null}, ${link}, ${stepsJson}
      )
      RETURNING *
    `;

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
