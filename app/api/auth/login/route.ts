import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { Database } from '@/lib/supabase/client';
import { supabaseAdmin } from '@/lib/supabase/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
type AdminUser = Database['public']['Tables']['admin_users']['Row'];
const adminClient = supabaseAdmin as any;

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Fetch admin user
    const { data, error } = await adminClient
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single();

    const adminUser = data as AdminUser | null;

    if (error || !adminUser) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, adminUser.password_hash);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: adminUser.id, email: adminUser.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: adminUser.id,
        email: adminUser.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
