'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import {
  Award,
  ExternalLink,
  FileDown,
  FileText,
  FolderKanban,
  LayoutDashboard,
  Link2,
  Loader2,
  LogOut,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  Trophy,
  UploadCloud,
} from 'lucide-react';
import styles from './dashboard.module.css';

type SectionId =
  | 'overview'
  | 'projects'
  | 'research'
  | 'certifications'
  | 'achievements'
  | 'socials'
  | 'resume';

type FieldType = 'text' | 'textarea' | 'tags' | 'url' | 'select' | 'checkbox' | 'number' | 'date' | 'file';

type ResourceItem = {
  id?: string;
  [key: string]: unknown;
};

type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
  accept?: string;
  helpText?: string;
};

type ResourceConfig = {
  id: Exclude<SectionId, 'overview'>;
  label: string;
  icon: typeof FolderKanban;
  endpoint: string;
  title: string;
  description: string;
  itemName: string;
  emptyRecord: ResourceItem;
  fields: FieldConfig[];
};

const resourceSections: ResourceConfig[] = [
  {
    id: 'projects',
    label: 'Projects',
    icon: FolderKanban,
    endpoint: '/api/projects',
    title: 'Projects Management',
    description: 'Create, update, and organize featured work for the portfolio.',
    itemName: 'project',
    emptyRecord: {
      title: '',
      description: '',
      long_description: '',
      technologies: [],
      github_url: '',
      live_url: '',
      image_url: '',
      images: [],
      status: 'completed',
      featured: false,
      categories: [],
      tags: [],
      start_date: '',
      end_date: '',
      sort_order: 0,
    },
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'SWACHH-AI' },
      {
        name: 'description',
        label: 'Short Description',
        type: 'textarea',
        fullWidth: true,
        placeholder: 'A concise summary that appears on the public card.',
      },
      {
        name: 'long_description',
        label: 'Detailed Description',
        type: 'textarea',
        fullWidth: true,
        placeholder: 'Optional extended write-up for future project detail pages.',
      },
      {
        name: 'technologies',
        label: 'Technologies',
        type: 'tags',
        fullWidth: true,
        placeholder: 'React, Next.js, Supabase',
      },
      { name: 'github_url', label: 'GitHub URL', type: 'url', placeholder: 'https://github.com/...' },
      { name: 'live_url', label: 'Live URL', type: 'url', placeholder: 'https://example.com' },
      {
        name: 'image_url',
        label: 'Cover Image URL',
        type: 'file',
        accept: 'image/*',
        fullWidth: true,
        helpText: 'Paste an image URL or upload an image to Supabase storage.',
      },
      {
        name: 'images',
        label: 'Gallery Image URLs',
        type: 'tags',
        fullWidth: true,
        placeholder: 'https://..., https://...',
      },
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        options: [
          { label: 'Completed', value: 'completed' },
          { label: 'In Progress', value: 'in-progress' },
          { label: 'Planned', value: 'planned' },
        ],
      },
      { name: 'featured', label: 'Featured', type: 'checkbox' },
      {
        name: 'categories',
        label: 'Categories',
        type: 'tags',
        placeholder: 'AI/ML, Full-Stack',
      },
      { name: 'tags', label: 'Tags', type: 'tags', placeholder: 'portfolio, production, hackathon' },
      { name: 'start_date', label: 'Start Date', type: 'date' },
      { name: 'end_date', label: 'End Date', type: 'date' },
      { name: 'sort_order', label: 'Sort Order', type: 'number', placeholder: '0' },
    ],
  },
  {
    id: 'research',
    label: 'Research',
    icon: FileText,
    endpoint: '/api/research',
    title: 'Research Management',
    description: 'Manage publications, papers, reports, and related files.',
    itemName: 'research item',
    emptyRecord: {
      title: '',
      abstract: '',
      authors: [],
      publication_date: '',
      journal: '',
      conference: '',
      pdf_url: '',
      doi: '',
      tags: [],
      type: 'paper',
      featured: false,
    },
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Paper title' },
      {
        name: 'abstract',
        label: 'Abstract',
        type: 'textarea',
        fullWidth: true,
        placeholder: 'Research summary and contribution.',
      },
      {
        name: 'authors',
        label: 'Authors',
        type: 'tags',
        fullWidth: true,
        placeholder: 'Pranav Deokar, Advisor Name',
      },
      { name: 'publication_date', label: 'Publication Date', type: 'date' },
      { name: 'journal', label: 'Journal', type: 'text', placeholder: 'IEEE Access' },
      { name: 'conference', label: 'Conference', type: 'text', placeholder: 'ICML 2026' },
      {
        name: 'pdf_url',
        label: 'PDF URL',
        type: 'file',
        accept: '.pdf,application/pdf',
        fullWidth: true,
        helpText: 'Upload a PDF or paste an external link.',
      },
      { name: 'doi', label: 'DOI', type: 'text', placeholder: '10.1000/xyz123' },
      { name: 'tags', label: 'Tags', type: 'tags', placeholder: 'ML, vision, sustainability' },
      {
        name: 'type',
        label: 'Type',
        type: 'select',
        options: [
          { label: 'Paper', value: 'paper' },
          { label: 'Publication', value: 'publication' },
          { label: 'Report', value: 'report' },
          { label: 'Copyright', value: 'copyright' },
        ],
      },
      { name: 'featured', label: 'Featured', type: 'checkbox' },
    ],
  },
  {
    id: 'certifications',
    label: 'Certifications',
    icon: Award,
    endpoint: '/api/certifications',
    title: 'Certifications Management',
    description: 'Track certificates, credentials, and supporting skills.',
    itemName: 'certification',
    emptyRecord: {
      title: '',
      issuer: '',
      issue_date: '',
      expiry_date: '',
      credential_id: '',
      credential_url: '',
      image_url: '',
      description: '',
      categories: [],
      skills: [],
    },
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'AWS Cloud Practitioner' },
      { name: 'issuer', label: 'Issuer', type: 'text', required: true, placeholder: 'Amazon Web Services' },
      { name: 'issue_date', label: 'Issue Date', type: 'date' },
      { name: 'expiry_date', label: 'Expiry Date', type: 'date' },
      { name: 'credential_id', label: 'Credential ID', type: 'text', placeholder: 'ABC-12345' },
      {
        name: 'credential_url',
        label: 'Credential URL',
        type: 'url',
        fullWidth: true,
        placeholder: 'https://credential.net/...'
      },
      {
        name: 'image_url',
        label: 'Certificate Image URL',
        type: 'file',
        accept: 'image/*',
        fullWidth: true,
        helpText: 'Upload a certificate image or paste its URL.',
      },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        fullWidth: true,
        placeholder: 'What this certification covers.',
      },
      { name: 'categories', label: 'Categories', type: 'tags', placeholder: 'Cloud, DevOps' },
      { name: 'skills', label: 'Skills', type: 'tags', placeholder: 'AWS, Networking, Security' },
    ],
  },
  {
    id: 'achievements',
    label: 'Achievements',
    icon: Trophy,
    endpoint: '/api/achievements',
    title: 'Achievements Management',
    description: 'Highlight hackathons, recognitions, milestones, and awards.',
    itemName: 'achievement',
    emptyRecord: {
      title: '',
      description: '',
      type: 'recognition',
      position: '',
      organization: '',
      event_date: '',
      image_url: '',
      certificate_url: '',
      tags: [],
      featured: false,
    },
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'India Innovates 2026' },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        fullWidth: true,
        placeholder: 'What the recognition was for.',
      },
      {
        name: 'type',
        label: 'Type',
        type: 'select',
        options: [
          { label: 'Hackathon', value: 'hackathon' },
          { label: 'Competition', value: 'competition' },
          { label: 'Recognition', value: 'recognition' },
          { label: 'Milestone', value: 'milestone' },
        ],
      },
      { name: 'position', label: 'Position', type: 'text', placeholder: 'Winner / Finalist / Runner-up' },
      { name: 'organization', label: 'Organization', type: 'text', placeholder: 'Hackathon organizer' },
      { name: 'event_date', label: 'Event Date', type: 'date' },
      {
        name: 'image_url',
        label: 'Achievement Image URL',
        type: 'file',
        accept: 'image/*',
        fullWidth: true,
        helpText: 'Upload a poster, badge, or event image.',
      },
      {
        name: 'certificate_url',
        label: 'Certificate URL',
        type: 'file',
        accept: 'image/*,.pdf,application/pdf',
        fullWidth: true,
        helpText: 'Upload a certificate file or paste a hosted link.',
      },
      { name: 'tags', label: 'Tags', type: 'tags', placeholder: 'AI, innovation, finalist' },
      { name: 'featured', label: 'Featured', type: 'checkbox' },
    ],
  },
  {
    id: 'socials',
    label: 'Social Links',
    icon: Link2,
    endpoint: '/api/socials',
    title: 'Social Links Management',
    description: 'Control which contact links are shown and how they are ordered.',
    itemName: 'social link',
    emptyRecord: {
      platform: '',
      url: '',
      icon: '',
      visible: true,
      sort_order: 0,
    },
    fields: [
      { name: 'platform', label: 'Platform', type: 'text', required: true, placeholder: 'GitHub' },
      { name: 'url', label: 'URL', type: 'url', required: true, fullWidth: true, placeholder: 'https://github.com/...' },
      { name: 'icon', label: 'Icon Key', type: 'text', placeholder: 'github / linkedin / mail' },
      { name: 'visible', label: 'Visible', type: 'checkbox' },
      { name: 'sort_order', label: 'Sort Order', type: 'number', placeholder: '1' },
    ],
  },
  {
    id: 'resume',
    label: 'Resume',
    icon: FileDown,
    endpoint: '/api/resume',
    title: 'Resume Management',
    description: 'Upload or swap resume and CV files without touching the codebase.',
    itemName: 'resume file',
    emptyRecord: {
      title: '',
      file_url: '',
      file_type: 'resume',
      is_active: true,
    },
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Latest Resume' },
      {
        name: 'file_url',
        label: 'File URL',
        type: 'file',
        accept: '.pdf,.doc,.docx,application/pdf',
        required: true,
        fullWidth: true,
        helpText: 'Upload the file or paste a direct public link.',
      },
      {
        name: 'file_type',
        label: 'File Type',
        type: 'select',
        options: [
          { label: 'Resume', value: 'resume' },
          { label: 'CV', value: 'cv' },
        ],
      },
      { name: 'is_active', label: 'Active File', type: 'checkbox' },
    ],
  },
];

const menuItems = [
  { id: 'overview' as const, label: 'Overview', icon: LayoutDashboard },
  ...resourceSections.map(({ id, label, icon }) => ({ id, label, icon })),
];

function createEmptyResourceState<T>(factory: (config: ResourceConfig) => T) {
  return resourceSections.reduce<Record<ResourceConfig['id'], T>>((accumulator, config) => {
    accumulator[config.id] = factory(config);
    return accumulator;
  }, {} as Record<ResourceConfig['id'], T>);
}

function normalizeRecord(config: ResourceConfig, record: ResourceItem = {}) {
  return {
    ...config.emptyRecord,
    ...record,
  };
}

function getToken() {
  return typeof window === 'undefined' ? null : localStorage.getItem('adminToken');
}

function formatList(value: unknown) {
  return Array.isArray(value) ? value.join(', ') : '';
}

function formatDate(value: unknown) {
  if (typeof value !== 'string' || !value) {
    return '';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function getSectionConfig(sectionId: Exclude<SectionId, 'overview'>) {
  return resourceSections.find((section) => section.id === sectionId)!;
}

function getItemTitle(section: ResourceConfig, item: ResourceItem) {
  if (section.id === 'socials') {
    return String(item.platform || 'Untitled social link');
  }

  return String(item.title || `Untitled ${section.itemName}`);
}

function getItemSubtitle(section: ResourceConfig, item: ResourceItem) {
  switch (section.id) {
    case 'projects':
      return String(item.description || item.status || 'No project description yet.');
    case 'research':
      return String(item.abstract || formatList(item.authors) || 'No abstract yet.');
    case 'certifications':
      return String(item.issuer || item.description || 'No issuer provided.');
    case 'achievements':
      return String(item.organization || item.description || 'No achievement details yet.');
    case 'socials':
      return String(item.url || 'No URL added yet.');
    case 'resume':
      return String(item.file_type || 'resume');
    default:
      return '';
  }
}

function getBadges(section: ResourceConfig, item: ResourceItem) {
  const badges: string[] = [];

  if (typeof item.status === 'string' && item.status) {
    badges.push(item.status);
  }

  if (typeof item.type === 'string' && item.type) {
    badges.push(item.type);
  }

  if (item.featured === true) {
    badges.push('featured');
  }

  if (item.visible === true) {
    badges.push('visible');
  }

  if (item.is_active === true) {
    badges.push('active');
  }

  if (typeof item.position === 'string' && item.position) {
    badges.push(item.position);
  }

  if (section.id === 'certifications' && typeof item.issue_date === 'string' && item.issue_date) {
    badges.push(formatDate(item.issue_date));
  }

  return badges.slice(0, 4);
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SectionId>('overview');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [savingSection, setSavingSection] = useState<Exclude<SectionId, 'overview'> | null>(null);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [resourceData, setResourceData] = useState(() => createEmptyResourceState<ResourceItem[]>(() => []));
  const [forms, setForms] = useState(() => createEmptyResourceState<ResourceItem>((config) => ({ ...config.emptyRecord })));
  const [editingIds, setEditingIds] = useState(() => createEmptyResourceState<string | null>(() => null));

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/admin/login');
      return;
    }

    void fetchAllData();
  }, [router]);

  const fetchAllData = async () => {
    setLoading(true);

    try {
      const responses = await Promise.all(resourceSections.map((section) => fetch(section.endpoint)));
      const payloads = await Promise.all(
        responses.map(async (response, index) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch ${resourceSections[index].label.toLowerCase()}`);
          }
          return response.json();
        })
      );

      const nextData = resourceSections.reduce<Record<ResourceConfig['id'], ResourceItem[]>>((accumulator, section, index) => {
        accumulator[section.id] = Array.isArray(payloads[index]) ? payloads[index] : [];
        return accumulator;
      }, {} as Record<ResourceConfig['id'], ResourceItem[]>);

      setResourceData(nextData);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load admin content.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchSectionData = async (sectionId: ResourceConfig['id']) => {
    const section = getSectionConfig(sectionId);
    const response = await fetch(section.endpoint);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${section.label.toLowerCase()}`);
    }

    const data = await response.json();
    setResourceData((previous) => ({
      ...previous,
      [sectionId]: Array.isArray(data) ? data : [],
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAllData();
    toast.success('Dashboard refreshed.');
  };

  const resetForm = (sectionId: ResourceConfig['id']) => {
    const section = getSectionConfig(sectionId);
    setForms((previous) => ({
      ...previous,
      [sectionId]: { ...section.emptyRecord },
    }));
    setEditingIds((previous) => ({
      ...previous,
      [sectionId]: null,
    }));
  };

  const handleInputChange = (sectionId: ResourceConfig['id'], field: FieldConfig, value: unknown) => {
    setForms((previous) => ({
      ...previous,
      [sectionId]: {
        ...previous[sectionId],
        [field.name]: field.type === 'tags'
          ? String(value)
              .split(',')
              .map((entry) => entry.trim())
              .filter(Boolean)
          : value,
      },
    }));
  };

  const handleEdit = (sectionId: ResourceConfig['id'], item: ResourceItem) => {
    const section = getSectionConfig(sectionId);
    setActiveTab(sectionId);
    setEditingIds((previous) => ({
      ...previous,
      [sectionId]: item.id ? String(item.id) : null,
    }));
    setForms((previous) => ({
      ...previous,
      [sectionId]: normalizeRecord(section, item),
    }));
  };

  const authorizedFetch = async (input: RequestInfo | URL, init: RequestInit = {}) => {
    const token = getToken();

    if (!token) {
      router.push('/admin/login');
      throw new Error('Missing admin session');
    }

    const headers = new Headers(init.headers);
    headers.set('Authorization', `Bearer ${token}`);

    return fetch(input, {
      ...init,
      headers,
    });
  };

  const handleSubmit = async (sectionId: ResourceConfig['id']) => {
    const section = getSectionConfig(sectionId);
    const editingId = editingIds[sectionId];
    const payload = forms[sectionId];

    setSavingSection(sectionId);

    try {
      const response = await authorizedFetch(editingId ? `${section.endpoint}/${editingId}` : section.endpoint, {
        method: editingId ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Failed to save ${section.itemName}`);
      }

      await fetchSectionData(sectionId);
      resetForm(sectionId);
      toast.success(`${editingId ? 'Updated' : 'Created'} ${section.itemName} successfully.`);
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : `Failed to save ${section.itemName}.`);
    } finally {
      setSavingSection(null);
    }
  };

  const handleDelete = async (sectionId: ResourceConfig['id'], item: ResourceItem) => {
    const section = getSectionConfig(sectionId);

    if (!item.id || !window.confirm(`Delete this ${section.itemName}? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await authorizedFetch(`${section.endpoint}/${item.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Failed to delete ${section.itemName}`);
      }

      await fetchSectionData(sectionId);

      if (editingIds[sectionId] === item.id) {
        resetForm(sectionId);
      }

      toast.success(`${section.itemName} deleted.`);
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : `Failed to delete ${section.itemName}.`);
    }
  };

  const handleUpload = async (sectionId: ResourceConfig['id'], fieldName: string, file: File | null) => {
    if (!file) {
      return;
    }

    const key = `${sectionId}:${fieldName}`;
    setUploadingKey(key);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', sectionId);

      const response = await authorizedFetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      handleInputChange(sectionId, { name: fieldName, label: fieldName, type: 'url' }, data.url);
      toast.success('File uploaded successfully.');
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : 'Upload failed.');
    } finally {
      setUploadingKey(null);
    }
  };

  const renderField = (section: ResourceConfig, field: FieldConfig) => {
    const value = forms[section.id][field.name];
    const inputId = `${section.id}-${field.name}`;
    const isUploading = uploadingKey === `${section.id}:${field.name}`;

    if (field.type === 'checkbox') {
      return (
        <label key={field.name} className={`${styles.field} ${styles.checkboxField}`}>
          <input
            id={inputId}
            type="checkbox"
            checked={Boolean(value)}
            onChange={(event) => handleInputChange(section.id, field, event.target.checked)}
          />
          <span>{field.label}</span>
        </label>
      );
    }

    return (
      <div
        key={field.name}
        className={`${styles.field} ${field.fullWidth ? styles.fullWidth : ''}`}
      >
        <label htmlFor={inputId} className={styles.label}>
          {field.label}
          {field.required ? <span className={styles.required}>*</span> : null}
        </label>

        {field.type === 'textarea' ? (
          <textarea
            id={inputId}
            className={styles.textarea}
            value={typeof value === 'string' ? value : ''}
            placeholder={field.placeholder}
            onChange={(event) => handleInputChange(section.id, field, event.target.value)}
            rows={4}
          />
        ) : field.type === 'select' ? (
          <select
            id={inputId}
            className={styles.input}
            value={typeof value === 'string' ? value : ''}
            onChange={(event) => handleInputChange(section.id, field, event.target.value)}
          >
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : field.type === 'tags' ? (
          <input
            id={inputId}
            className={styles.input}
            type="text"
            value={formatList(value)}
            placeholder={field.placeholder}
            onChange={(event) => handleInputChange(section.id, field, event.target.value)}
          />
        ) : field.type === 'number' ? (
          <input
            id={inputId}
            className={styles.input}
            type="number"
            value={typeof value === 'number' ? value : value ? String(value) : ''}
            placeholder={field.placeholder}
            onChange={(event) => handleInputChange(section.id, field, event.target.value)}
          />
        ) : field.type === 'date' ? (
          <input
            id={inputId}
            className={styles.input}
            type="date"
            value={typeof value === 'string' ? value : ''}
            onChange={(event) => handleInputChange(section.id, field, event.target.value)}
          />
        ) : field.type === 'file' ? (
          <div className={styles.uploadField}>
            <input
              id={inputId}
              className={styles.input}
              type="url"
              value={typeof value === 'string' ? value : ''}
              placeholder={field.placeholder || 'https://...'}
              onChange={(event) => handleInputChange(section.id, field, event.target.value)}
            />
            <label className={styles.uploadButton}>
              {isUploading ? <Loader2 size={16} className={styles.spinning} /> : <UploadCloud size={16} />}
              <span>{isUploading ? 'Uploading...' : 'Upload File'}</span>
              <input
                type="file"
                accept={field.accept}
                onChange={(event) => handleUpload(section.id, field.name, event.target.files?.[0] || null)}
                hidden
              />
            </label>
          </div>
        ) : (
          <input
            id={inputId}
            className={styles.input}
            type={field.type === 'url' ? 'url' : 'text'}
            value={typeof value === 'string' ? value : ''}
            placeholder={field.placeholder}
            onChange={(event) => handleInputChange(section.id, field, event.target.value)}
          />
        )}

        {field.helpText ? <p className={styles.helpText}>{field.helpText}</p> : null}
        {typeof value === 'string' && value.startsWith('http') ? (
          <a className={styles.previewLink} href={value} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={14} />
            <span>Open uploaded asset</span>
          </a>
        ) : null}
      </div>
    );
  };

  const counts = resourceSections.reduce<Record<ResourceConfig['id'], number>>((accumulator, section) => {
    accumulator[section.id] = resourceData[section.id].length;
    return accumulator;
  }, {} as Record<ResourceConfig['id'], number>);

  const activeResourceSection = activeTab === 'overview' ? null : getSectionConfig(activeTab);

  return (
    <div className={styles.container}>
      <Toaster position="top-right" />

      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.logo}>Admin Panel</h2>
          <p className={styles.sidebarSubtitle}>Portfolio content manager</p>
        </div>

        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`${styles.navItem} ${activeTab === item.id ? styles.active : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
              {'id' in item && item.id !== 'overview' ? (
                <span className={styles.navCount}>{counts[item.id as ResourceConfig['id']] || 0}</span>
              ) : null}
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.secondaryButton} onClick={handleRefresh} disabled={refreshing || loading}>
            <RefreshCw size={18} className={refreshing ? styles.spinning : ''} />
            <span>{refreshing ? 'Refreshing' : 'Refresh'}</span>
          </button>

          <button className={styles.logoutButton} onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>
              {activeResourceSection ? activeResourceSection.title : 'Dashboard Overview'}
            </h1>
            <p className={styles.subtitle}>
              {activeResourceSection
                ? activeResourceSection.description
                : 'Manage every portfolio content type from one place without changing the existing database logic.'}
            </p>
          </div>
        </div>

        {loading ? (
          <div className={styles.loadingState}>
            <Loader2 size={28} className={styles.spinning} />
            <p>Loading admin content...</p>
          </div>
        ) : activeTab === 'overview' ? (
          <div className={styles.content}>
            <div className={styles.statsGrid}>
              {resourceSections.map((section, index) => (
                <motion.div
                  key={section.id}
                  className={styles.statCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className={styles.statIcon}>
                    <section.icon size={22} />
                  </div>
                  <div className={styles.statContent}>
                    <div className={styles.statValue}>{counts[section.id]}</div>
                    <div className={styles.statLabel}>{section.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className={styles.overviewGrid}>
              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <h2>Quick Start</h2>
                </div>
                <div className={styles.panelBody}>
                  <p>Create content from any section, upload images or PDFs directly, and edit records without touching SQL manually.</p>
                  <div className={styles.quickActions}>
                    {resourceSections.map((section) => (
                      <button
                        key={section.id}
                        className={styles.quickAction}
                        onClick={() => setActiveTab(section.id)}
                      >
                        <section.icon size={18} />
                        <span>Add {section.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <h2>Recent Content Snapshot</h2>
                </div>
                <div className={styles.panelBody}>
                  {resourceSections.map((section) => {
                    const latest = resourceData[section.id][0];
                    return (
                      <div key={section.id} className={styles.snapshotRow}>
                        <div>
                          <div className={styles.snapshotLabel}>{section.label}</div>
                          <div className={styles.snapshotValue}>
                            {latest ? getItemTitle(section, latest) : `No ${section.label.toLowerCase()} yet`}
                          </div>
                        </div>
                        <button className={styles.inlineLink} onClick={() => setActiveTab(section.id)}>
                          Open
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : activeResourceSection ? (
          <div className={styles.managementGrid}>
            <section className={styles.panel}>
              <div className={styles.panelHeader}>
                <div>
                  <h2>{editingIds[activeResourceSection.id] ? `Edit ${activeResourceSection.itemName}` : `Create ${activeResourceSection.itemName}`}</h2>
                  <p className={styles.panelDescription}>
                    {editingIds[activeResourceSection.id]
                      ? 'You are editing an existing record. Save to update it.'
                      : `Fill in the fields below to add a new ${activeResourceSection.itemName}.`}
                  </p>
                </div>
              </div>

              <div className={styles.panelBody}>
                <div className={styles.formGrid}>
                  {activeResourceSection.fields.map((field) => renderField(activeResourceSection, field))}
                </div>

                <div className={styles.formActions}>
                  <button
                    className={styles.primaryButton}
                    onClick={() => handleSubmit(activeResourceSection.id)}
                    disabled={savingSection === activeResourceSection.id}
                  >
                    {savingSection === activeResourceSection.id ? (
                      <Loader2 size={18} className={styles.spinning} />
                    ) : editingIds[activeResourceSection.id] ? (
                      <Save size={18} />
                    ) : (
                      <Plus size={18} />
                    )}
                    <span>{editingIds[activeResourceSection.id] ? 'Save Changes' : 'Create Record'}</span>
                  </button>

                  <button
                    className={styles.secondaryButton}
                    onClick={() => resetForm(activeResourceSection.id)}
                  >
                    <RefreshCw size={18} />
                    <span>{editingIds[activeResourceSection.id] ? 'Cancel Edit' : 'Reset Form'}</span>
                  </button>
                </div>
              </div>
            </section>

            <section className={styles.panel}>
              <div className={styles.panelHeader}>
                <div>
                  <h2>Existing {activeResourceSection.label}</h2>
                  <p className={styles.panelDescription}>
                    {resourceData[activeResourceSection.id].length} record(s) available in this section.
                  </p>
                </div>
              </div>

              <div className={styles.recordsList}>
                {resourceData[activeResourceSection.id].length === 0 ? (
                  <div className={styles.emptyState}>
                    <activeResourceSection.icon size={34} />
                    <p>No {activeResourceSection.label.toLowerCase()} added yet.</p>
                  </div>
                ) : (
                  resourceData[activeResourceSection.id].map((item) => (
                    <article key={String(item.id)} className={styles.recordCard}>
                      <div className={styles.recordHeader}>
                        <div>
                          <h3 className={styles.recordTitle}>{getItemTitle(activeResourceSection, item)}</h3>
                          <p className={styles.recordSubtitle}>{getItemSubtitle(activeResourceSection, item)}</p>
                        </div>
                        <div className={styles.recordActions}>
                          <button
                            className={styles.iconButton}
                            onClick={() => handleEdit(activeResourceSection.id, item)}
                            aria-label={`Edit ${activeResourceSection.itemName}`}
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            className={`${styles.iconButton} ${styles.dangerButton}`}
                            onClick={() => handleDelete(activeResourceSection.id, item)}
                            aria-label={`Delete ${activeResourceSection.itemName}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <div className={styles.badges}>
                        {getBadges(activeResourceSection, item).map((badge) => (
                          <span key={badge} className={styles.badge}>
                            {badge}
                          </span>
                        ))}
                      </div>

                      <div className={styles.recordMeta}>
                        {'publication_date' in item ? <span>{formatDate(item.publication_date)}</span> : null}
                        {'event_date' in item ? <span>{formatDate(item.event_date)}</span> : null}
                        {'issue_date' in item ? <span>{formatDate(item.issue_date)}</span> : null}
                        {'sort_order' in item && typeof item.sort_order !== 'undefined' ? (
                          <span>Sort: {String(item.sort_order)}</span>
                        ) : null}
                      </div>

                      {typeof item.image_url === 'string' && item.image_url ? (
                        <a href={item.image_url} target="_blank" rel="noopener noreferrer" className={styles.assetLink}>
                          <ExternalLink size={14} />
                          <span>Open image asset</span>
                        </a>
                      ) : null}

                      {typeof item.pdf_url === 'string' && item.pdf_url ? (
                        <a href={item.pdf_url} target="_blank" rel="noopener noreferrer" className={styles.assetLink}>
                          <ExternalLink size={14} />
                          <span>Open PDF</span>
                        </a>
                      ) : null}

                      {typeof item.file_url === 'string' && item.file_url ? (
                        <a href={item.file_url} target="_blank" rel="noopener noreferrer" className={styles.assetLink}>
                          <ExternalLink size={14} />
                          <span>Open file</span>
                        </a>
                      ) : null}
                    </article>
                  ))
                )}
              </div>
            </section>
          </div>
        ) : null}
      </main>
    </div>
  );
}
