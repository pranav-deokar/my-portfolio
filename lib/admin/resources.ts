import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

type ResourceKey =
  | 'projects'
  | 'research'
  | 'certifications'
  | 'achievements'
  | 'socials'
  | 'resume';

type FieldType = 'string' | 'nullableString' | 'stringArray' | 'boolean' | 'number' | 'date';

type FieldConfig = {
  type: FieldType;
  required?: boolean;
  defaultValue?: boolean | number | string | string[] | null;
};

type ResourceConfig = {
  table: string;
  orders: Array<{ column: string; ascending: boolean }>;
  fields: Record<string, FieldConfig>;
};

const resourceConfigs: Record<ResourceKey, ResourceConfig> = {
  projects: {
    table: 'projects',
    orders: [
      { column: 'sort_order', ascending: true },
      { column: 'created_at', ascending: false },
    ],
    fields: {
      title: { type: 'string', required: true },
      description: { type: 'nullableString' },
      long_description: { type: 'nullableString' },
      technologies: { type: 'stringArray', defaultValue: [] },
      github_url: { type: 'nullableString' },
      live_url: { type: 'nullableString' },
      image_url: { type: 'nullableString' },
      images: { type: 'stringArray', defaultValue: [] },
      status: { type: 'nullableString', defaultValue: 'completed' },
      featured: { type: 'boolean', defaultValue: false },
      categories: { type: 'stringArray', defaultValue: [] },
      tags: { type: 'stringArray', defaultValue: [] },
      start_date: { type: 'date' },
      end_date: { type: 'date' },
      sort_order: { type: 'number', defaultValue: 0 },
    },
  },
  research: {
    table: 'research',
    orders: [
      { column: 'publication_date', ascending: false },
      { column: 'created_at', ascending: false },
    ],
    fields: {
      title: { type: 'string', required: true },
      abstract: { type: 'nullableString' },
      authors: { type: 'stringArray', defaultValue: [] },
      publication_date: { type: 'date' },
      journal: { type: 'nullableString' },
      conference: { type: 'nullableString' },
      pdf_url: { type: 'nullableString' },
      doi: { type: 'nullableString' },
      tags: { type: 'stringArray', defaultValue: [] },
      type: { type: 'nullableString', defaultValue: 'paper' },
      featured: { type: 'boolean', defaultValue: false },
    },
  },
  certifications: {
    table: 'certifications',
    orders: [
      { column: 'issue_date', ascending: false },
      { column: 'created_at', ascending: false },
    ],
    fields: {
      title: { type: 'string', required: true },
      issuer: { type: 'string', required: true },
      issue_date: { type: 'date' },
      expiry_date: { type: 'date' },
      credential_id: { type: 'nullableString' },
      credential_url: { type: 'nullableString' },
      image_url: { type: 'nullableString' },
      description: { type: 'nullableString' },
      categories: { type: 'stringArray', defaultValue: [] },
      skills: { type: 'stringArray', defaultValue: [] },
    },
  },
  achievements: {
    table: 'achievements',
    orders: [
      { column: 'event_date', ascending: false },
      { column: 'created_at', ascending: false },
    ],
    fields: {
      title: { type: 'string', required: true },
      description: { type: 'nullableString' },
      type: { type: 'nullableString', defaultValue: 'recognition' },
      position: { type: 'nullableString' },
      organization: { type: 'nullableString' },
      event_date: { type: 'date' },
      image_url: { type: 'nullableString' },
      certificate_url: { type: 'nullableString' },
      tags: { type: 'stringArray', defaultValue: [] },
      featured: { type: 'boolean', defaultValue: false },
    },
  },
  socials: {
    table: 'social_links',
    orders: [{ column: 'sort_order', ascending: true }],
    fields: {
      platform: { type: 'string', required: true },
      url: { type: 'string', required: true },
      icon: { type: 'nullableString' },
      visible: { type: 'boolean', defaultValue: true },
      sort_order: { type: 'number', defaultValue: 0 },
    },
  },
  resume: {
    table: 'resume_files',
    orders: [
      { column: 'is_active', ascending: false },
      { column: 'created_at', ascending: false },
    ],
    fields: {
      title: { type: 'string', required: true },
      file_url: { type: 'string', required: true },
      file_type: { type: 'nullableString', defaultValue: 'resume' },
      is_active: { type: 'boolean', defaultValue: true },
    },
  },
};

const adminClient = supabaseAdmin as any;

function normalizeString(value: unknown, required = false) {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed) {
      return trimmed;
    }
  }

  return required ? '' : null;
}

function normalizeArray(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeBoolean(value: unknown, defaultValue = false) {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    if (value === 'true') return true;
    if (value === 'false') return false;
  }

  return defaultValue;
}

function normalizeNumber(value: unknown, defaultValue = 0) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return defaultValue;
}

function normalizeDate(value: unknown) {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed || null;
  }

  return null;
}

function sanitizePayload(resource: ResourceKey, payload: Record<string, unknown>) {
  const config = resourceConfigs[resource];
  const sanitized: Record<string, unknown> = {};

  for (const [fieldName, fieldConfig] of Object.entries(config.fields)) {
    const value = payload[fieldName];

    if (value === undefined) {
      if (fieldConfig.defaultValue !== undefined) {
        sanitized[fieldName] = fieldConfig.defaultValue;
      }
      continue;
    }

    switch (fieldConfig.type) {
      case 'string':
        sanitized[fieldName] = normalizeString(value, true);
        break;
      case 'nullableString':
        sanitized[fieldName] = normalizeString(value);
        break;
      case 'stringArray':
        sanitized[fieldName] = normalizeArray(value);
        break;
      case 'boolean':
        sanitized[fieldName] = normalizeBoolean(
          value,
          typeof fieldConfig.defaultValue === 'boolean' ? fieldConfig.defaultValue : false
        );
        break;
      case 'number':
        sanitized[fieldName] = normalizeNumber(
          value,
          typeof fieldConfig.defaultValue === 'number' ? fieldConfig.defaultValue : 0
        );
        break;
      case 'date':
        sanitized[fieldName] = normalizeDate(value);
        break;
      default:
        break;
    }
  }

  return sanitized;
}

function validateRequiredFields(resource: ResourceKey, payload: Record<string, unknown>) {
  const config = resourceConfigs[resource];
  const missingFields = Object.entries(config.fields)
    .filter(([, fieldConfig]) => fieldConfig.required)
    .filter(([fieldName]) => {
      const value = payload[fieldName];
      return typeof value !== 'string' || !value.trim();
    })
    .map(([fieldName]) => fieldName);

  return missingFields;
}

export async function listResource(resource: ResourceKey) {
  const config = resourceConfigs[resource];
  let query = adminClient.from(config.table).select('*');

  for (const order of config.orders) {
    query = query.order(order.column, { ascending: order.ascending });
  }

  const { data, error } = await query;

  if (error) {
    console.error(`Error fetching ${resource}:`, error);
    return NextResponse.json([], { status: 500 });
  }

  return NextResponse.json(data || []);
}

export async function createResource(resource: ResourceKey, request: Request) {
  try {
    const payload = await request.json();
    const sanitized = sanitizePayload(resource, payload);
    const missingFields = validateRequiredFields(resource, sanitized);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required field(s): ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    const { data, error } = await adminClient
      .from(resourceConfigs[resource].table)
      .insert([sanitized])
      .select()
      .single();

    if (error) {
      console.error(`Error creating ${resource}:`, error);
      return NextResponse.json({ error: `Failed to create ${resource}` }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error parsing ${resource} payload:`, error);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

export async function updateResource(resource: ResourceKey, id: string, request: Request) {
  try {
    const payload = await request.json();
    const sanitized = sanitizePayload(resource, payload);
    const missingFields = validateRequiredFields(resource, sanitized);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required field(s): ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    const { data, error } = await adminClient
      .from(resourceConfigs[resource].table)
      .update({
        ...sanitized,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating ${resource}:`, error);
      return NextResponse.json({ error: `Failed to update ${resource}` }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error parsing ${resource} payload:`, error);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

export async function deleteResource(resource: ResourceKey, id: string) {
  const { error } = await adminClient
    .from(resourceConfigs[resource].table)
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting ${resource}:`, error);
    return NextResponse.json({ error: `Failed to delete ${resource}` }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
