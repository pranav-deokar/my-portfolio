import { verifyAdminRequest } from '@/lib/admin/auth';
import { deleteResource, updateResource } from '@/lib/admin/resources';

type RouteContext = {
  params: {
    id: string;
  };
};

export async function PATCH(request: Request, { params }: RouteContext) {
  const auth = verifyAdminRequest(request);
  if (!auth.authorized) {
    return auth.response;
  }

  return updateResource('socials', params.id, request);
}

export async function DELETE(request: Request, { params }: RouteContext) {
  const auth = verifyAdminRequest(request);
  if (!auth.authorized) {
    return auth.response;
  }

  return deleteResource('socials', params.id);
}
