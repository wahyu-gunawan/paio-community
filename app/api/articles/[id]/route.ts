import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getSession } from '@/lib/auth';

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let result;
    
    // Check if UUID
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

    if (isUUID) {
      result = await sql`SELECT * FROM articles WHERE id = ${id}`;
    } else {
      result = await sql`SELECT * FROM articles WHERE slug = ${id}`;
    }

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
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
    const { title, excerpt, content, cover_image, category, published } = body;

    let updateFields = [];
    let queryParams: any = [];
    let paramIndex = 1;

    if (title !== undefined) {
      updateFields.push(`title = $${paramIndex++}`);
      queryParams.push(title);
      updateFields.push(`slug = $${paramIndex++}`);
      queryParams.push(generateSlug(title));
    }
    if (excerpt !== undefined) {
      updateFields.push(`excerpt = $${paramIndex++}`);
      queryParams.push(excerpt);
    }
    if (content !== undefined) {
      updateFields.push(`content = $${paramIndex++}`);
      queryParams.push(content);
    }
    if (cover_image !== undefined) {
      updateFields.push(`cover_image = $${paramIndex++}`);
      queryParams.push(cover_image);
    }
    if (category !== undefined) {
      updateFields.push(`category = $${paramIndex++}`);
      queryParams.push(category);
    }
    if (published !== undefined) {
      updateFields.push(`published = $${paramIndex++}`);
      queryParams.push(published);
    }

    if (updateFields.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    updateFields.push(`updated_at = CURRENT_TIMESTAMP`);

    queryParams.push(id);
    const query = `
      UPDATE articles 
      SET ${updateFields.join(', ')} 
      WHERE id = $${paramIndex} 
      RETURNING *
    `;

    // Cannot use sql template literal directly for dynamic updates easily, fallback to query method if needed, but vercel/postgres client provides sql.query
    const { sql: sqlQuery } = await import('@vercel/postgres');
    
    // Safer to use sql`` directly, so let's reconstruct the dynamic approach or just update all provided fields
    // Due to constraints, a direct sql call is better:
    const result = await sqlQuery.query(query, queryParams);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

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
    const result = await sql`DELETE FROM articles WHERE id = ${id} RETURNING id`;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
