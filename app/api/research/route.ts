import { verifyAdminRequest } from '@/lib/admin/auth';
import { createResource, listResource } from '@/lib/admin/resources';

export async function GET() {
  return listResource('research');
}

export async function POST(request: Request) {
  const auth = verifyAdminRequest(request);
  if (!auth.authorized) {
    return auth.response;
  }

  return createResource('research', request);
}
