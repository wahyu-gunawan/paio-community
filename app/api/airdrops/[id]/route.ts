import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getSession } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await sql`SELECT * FROM airdrops WHERE id = ${id}`;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Airdrop not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    
    // Check if it exists first
    const checkResult = await sql`SELECT id FROM airdrops WHERE id = ${id}`;
    if (checkResult.rows.length === 0) {
      return NextResponse.json({ error: 'Airdrop not found' }, { status: 404 });
    }

    // A simple full update is safer with sql template literals
    const { 
      title, description, project_name, logo_url, reward, 
      status, start_date, end_date, link, steps 
    } = body;

    const stepsJson = steps ? JSON.stringify(steps) : null;

    const result = await sql`
      UPDATE airdrops 
      SET 
        title = COALESCE(${title}, title),
        description = COALESCE(${description}, description),
        project_name = COALESCE(${project_name}, project_name),
        logo_url = COALESCE(${logo_url}, logo_url),
        reward = COALESCE(${reward}, reward),
        status = COALESCE(${status}, status),
        start_date = COALESCE(${start_date}, start_date),
        end_date = COALESCE(${end_date}, end_date),
        link = COALESCE(${link}, link),
        steps = COALESCE(${stepsJson}::jsonb, steps)
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const result = await sql`DELETE FROM airdrops WHERE id = ${id} RETURNING id`;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Airdrop not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
