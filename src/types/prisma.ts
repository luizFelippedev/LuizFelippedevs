// Types for Prisma models
export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string | null;
  tags: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: Date;
  credentialId?: string | null;
  credentialUrl?: string | null;
  image?: string | null;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  read: boolean;
  createdAt: Date;
}

// Select types for queries
export interface ProjectListItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string | null;
  tags: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
  createdAt: Date;
}

export interface CertificateListItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: Date;
  credentialUrl?: string | null;
  image?: string | null;
}

// Input types for mutations
export interface CreateProjectInput {
  title: string;
  description: string;
  thumbnail?: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  published?: boolean;
}

export interface UpdateProjectInput extends Partial<CreateProjectInput> {
  id: string;
}

export interface CreateCertificateInput {
  title: string;
  issuer: string;
  issueDate: Date;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
  description?: string;
}

export interface CreateContactMessageInput {
  name: string;
  email: string;
  subject?: string;
  message: string;
}