-- Sample Data for Engineering Platform
-- Run this AFTER running schema.sql to populate with example content

-- Insert Sample Projects
INSERT INTO projects (title, description, technologies, github_url, status, featured, categories) VALUES
('SWACHH-AI', 'AI-powered waste management and classification system using computer vision and deep learning to identify and sort different types of waste materials automatically.', 
 ARRAY['Python', 'TensorFlow', 'OpenCV', 'React', 'Flask'], 
 'https://github.com/pranav/swachh-ai', 
 'completed', true, ARRAY['AI/ML', 'Computer Vision']),

('Smart Resume Analyzer', 'Intelligent resume analysis tool that provides feedback, skill gap analysis, and recommendations using NLP and machine learning algorithms.', 
 ARRAY['Python', 'NLP', 'Scikit-learn', 'Streamlit'], 
 'https://github.com/pranav/resume-analyzer', 
 'completed', true, ARRAY['AI/ML', 'NLP']),

('Blogster', 'Full-stack blogging platform with rich text editing, user authentication, and real-time comments built with modern web technologies.', 
 ARRAY['Next.js', 'TypeScript', 'PostgreSQL', 'TailwindCSS'], 
 'https://github.com/pranav/blogster', 
 'completed', false, ARRAY['Web Development', 'Full-Stack']);

-- Insert Sample Research (optional - can be empty initially)
INSERT INTO research (title, abstract, authors, publication_date, type, featured) VALUES
('Machine Learning Approaches to Waste Classification', 
 'This paper explores various machine learning techniques for automated waste classification, comparing CNN architectures and their effectiveness in real-world scenarios.',
 ARRAY['Pranav Deokar', 'Dr. Research Advisor'],
 '2026-03-15',
 'paper',
 true);

-- Insert Sample Achievements
INSERT INTO achievements (title, description, type, position, organization, event_date, featured) VALUES
('India Innovates 2026', 'National-level innovation competition focusing on sustainable technology solutions for environmental challenges.',
 'hackathon', 'Finalist', 'India Innovates', '2026-02-20', true),

('eVIHack 1.0', 'Inter-college hackathon with focus on healthcare and education technology solutions.',
 'hackathon', '2nd Runner-Up', 'College Tech Fest', '2025-11-15', true);

-- Insert Sample Social Links
INSERT INTO social_links (platform, url, icon, visible, sort_order) VALUES
('GitHub', 'https://github.com/pranav', 'github', true, 1),
('LinkedIn', 'https://linkedin.com/in/pranav-deokar', 'linkedin', true, 2),
('Email', 'mailto:pranav@example.com', 'mail', true, 3),
('LeetCode', 'https://leetcode.com/pranav', 'code', true, 4);

-- Update Homepage Content with better details
UPDATE homepage_content 
SET content = jsonb_set(
  content,
  '{tagline}',
  '"Building the future through code, creativity, and innovation"'
)
WHERE section = 'hero';

-- Verify data was inserted
SELECT 'Projects: ' || COUNT(*)::text FROM projects;
SELECT 'Research: ' || COUNT(*)::text FROM research;
SELECT 'Achievements: ' || COUNT(*)::text FROM achievements;
SELECT 'Social Links: ' || COUNT(*)::text FROM social_links;
