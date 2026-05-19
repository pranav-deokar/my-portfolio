-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  long_description TEXT,
  technologies TEXT[], -- Array of technology names
  github_url VARCHAR(500),
  live_url VARCHAR(500),
  image_url VARCHAR(500),
  images TEXT[], -- Array of additional image URLs
  status VARCHAR(50) DEFAULT 'completed', -- completed, in-progress, planned
  featured BOOLEAN DEFAULT FALSE,
  categories TEXT[], -- Array of category tags
  tags TEXT[], -- Array of tags
  start_date DATE,
  end_date DATE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Research & Publications Table
CREATE TABLE IF NOT EXISTS research (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  abstract TEXT,
  authors TEXT[], -- Array of author names
  publication_date DATE,
  journal VARCHAR(255),
  conference VARCHAR(255),
  pdf_url VARCHAR(500),
  doi VARCHAR(255),
  tags TEXT[],
  type VARCHAR(50), -- paper, copyright, publication, report
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Certifications Table
CREATE TABLE IF NOT EXISTS certifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  issuer VARCHAR(255) NOT NULL,
  issue_date DATE,
  expiry_date DATE,
  credential_id VARCHAR(255),
  credential_url VARCHAR(500),
  image_url VARCHAR(500),
  description TEXT,
  categories TEXT[],
  skills TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Achievements Table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50), -- hackathon, competition, recognition, milestone
  position VARCHAR(100), -- winner, finalist, runner-up, etc.
  organization VARCHAR(255),
  event_date DATE,
  image_url VARCHAR(500),
  certificate_url VARCHAR(500),
  tags TEXT[],
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Social Links Table
CREATE TABLE IF NOT EXISTS social_links (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  platform VARCHAR(100) NOT NULL,
  url VARCHAR(500) NOT NULL,
  icon VARCHAR(100), -- Icon identifier
  visible BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Resume Files Table
CREATE TABLE IF NOT EXISTS resume_files (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  file_url VARCHAR(500) NOT NULL,
  file_type VARCHAR(50), -- resume, cv
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Homepage Content Table (for dynamic content editing)
CREATE TABLE IF NOT EXISTS homepage_content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  section VARCHAR(100) UNIQUE NOT NULL, -- hero, about, etc.
  content JSONB, -- Flexible JSON content
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- SEO Metadata Table
CREATE TABLE IF NOT EXISTS seo_metadata (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  page VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(255),
  description TEXT,
  keywords TEXT[],
  og_image VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_research_type ON research(type);
CREATE INDEX idx_achievements_type ON achievements(type);
CREATE INDEX idx_social_links_visible ON social_links(visible);
CREATE INDEX idx_resume_active ON resume_files(is_active);

-- Insert default admin user (password: admin123 - CHANGE THIS IMMEDIATELY)
-- Password hash generated with bcrypt rounds=10
INSERT INTO admin_users (email, password_hash) 
VALUES ('admin@example.com', '$2a$10$rBV2KlPRkKdXJGvCW9YL6.fPZKFPjMHuY3eO0p7KQYzVTQlQXqF6G')
ON CONFLICT (email) DO NOTHING;

-- Insert default homepage content
INSERT INTO homepage_content (section, content) VALUES
('hero', '{"name": "PRANAV BALASAHEB DEOKAR", "roles": ["Computer Science Engineering Student", "Full-Stack Developer", "AI/ML Enthusiast", "Research-Oriented Builder"], "tagline": "Building the future through code, creativity, and innovation"}'),
('about', '{"content": "B.Tech CSE student (CGPA: 8.93) with hands-on experience in full-stack development, AI/ML applications, and enterprise software automation. Proficient in Python, JavaScript, SQL, C++, and web technologies with proven ability to build scalable applications."}')
ON CONFLICT (section) DO NOTHING;
