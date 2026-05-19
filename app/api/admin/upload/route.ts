import { NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/admin/auth';
import { supabaseAdmin } from '@/lib/supabase/server';

const DEFAULT_BUCKET = 'portfolio-assets';

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, '-');
}

async function ensureBucketExists(bucketName: string) {
  const { data: bucket } = await supabaseAdmin.storage.getBucket(bucketName);

  if (bucket) {
    return;
  }

  const { error } = await supabaseAdmin.storage.createBucket(bucketName, {
    public: true,
    fileSizeLimit: 10 * 1024 * 1024,
  });

  if (error && !error.message.toLowerCase().includes('already exists')) {
    throw error;
  }
}

export async function POST(request: Request) {
  const auth = verifyAdminRequest(request);
  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const folder = String(formData.get('folder') || 'general').trim() || 'general';
    const bucket = String(formData.get('bucket') || DEFAULT_BUCKET).trim() || DEFAULT_BUCKET;

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file received' }, { status: 400 });
    }

    await ensureBucketExists(bucket);

    const safeFileName = sanitizeFileName(file.name);
    const filePath = `${folder}/${Date.now()}-${safeFileName}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        contentType: file.type || undefined,
        upsert: false,
      });

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }

    const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(filePath);

    return NextResponse.json({
      fileName: file.name,
      path: filePath,
      url: data.publicUrl,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
