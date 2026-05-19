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

  return updateResource('achievements', params.id, request);
}

export async function DELETE(request: Request, { params }: RouteContext) {
  const auth = verifyAdminRequest(request);
  if (!auth.authorized) {
    return auth.response;
  }

  return deleteResource('achievements', params.id);
}
