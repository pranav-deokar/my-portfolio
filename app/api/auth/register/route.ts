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

    // Check if admin already exists
    const { data: existingAdmin } = await adminClient
      .from('admin_users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin user already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create admin user
    const { data, error } = await adminClient
      .from('admin_users')
      .insert([{ email, password_hash: passwordHash }])
      .select()
      .single();

    const newAdmin = data as AdminUser | null;

    if (error || !newAdmin) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to create admin user' },
        { status: 500 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: newAdmin.id, email: newAdmin.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: newAdmin.id,
        email: newAdmin.email,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
