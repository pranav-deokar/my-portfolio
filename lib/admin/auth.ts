import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

type AdminTokenPayload = {
  userId: string;
  email: string;
};

export function verifyAdminRequest(request: Request): {
  authorized: true;
  user: AdminTokenPayload;
} | {
  authorized: false;
  response: NextResponse;
} {
  const authorizationHeader = request.headers.get('authorization');

  if (!authorizationHeader?.startsWith('Bearer ')) {
    return {
      authorized: false,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }

  const token = authorizationHeader.slice('Bearer '.length).trim();

  try {
    const user = jwt.verify(token, JWT_SECRET) as AdminTokenPayload;
    return { authorized: true, user };
  } catch {
    return {
      authorized: false,
      response: NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 }),
    };
  }
}
