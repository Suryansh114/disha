-- ====================================================================
-- SUPABASE SCHEMA & SEED DATA FOR DISHA
-- Copy and paste this script into your Supabase SQL Editor to create 
-- the tables and seed them with the colleges and course prep links.
-- ====================================================================

-- 1. Create the 'colleges' table if it does not exist
CREATE TABLE IF NOT EXISTS public.colleges (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT,
    state TEXT,
    icon TEXT,
    fees TEXT,
    avg_package TEXT,
    exams TEXT[] DEFAULT '{}',
    streams TEXT[] DEFAULT '{}',
    placements TEXT,
    campus_life TEXT,
    research TEXT,
    culture TEXT,
    fees_roi TEXT,
    admission_difficulty TEXT,
    infrastructure TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) on colleges
ALTER TABLE public.colleges ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access on colleges" 
ON public.colleges FOR SELECT 
USING (true);


-- 2. Create the 'prep_courses' table if it does not exist
CREATE TABLE IF NOT EXISTS public.prep_courses (
    id SERIAL PRIMARY KEY,
    exam_id TEXT NOT NULL, -- matching exam ids like 'jee-main', 'jee-adv', 'neet', 'clat', 'cuet', etc.
    title TEXT NOT NULL,
    provider TEXT CHECK (provider IN ('YouTube', 'Udemy')),
    url TEXT NOT NULL,
    instructor TEXT,
    type TEXT DEFAULT 'Free',
    rating NUMERIC(3, 1),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) on prep_courses
ALTER TABLE public.prep_courses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access on prep_courses" 
ON public.prep_courses FOR SELECT 
USING (true);


-- 3. Create the 'exams' table if it does not exist
CREATE TABLE IF NOT EXISTS public.exams (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    exam_date DATE,
    result_date DATE,
    status TEXT DEFAULT 'Upcoming',
    website TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) on exams
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access on exams" 
ON public.exams FOR SELECT 
USING (true);


-- 4. Create the 'consultancy_notifications' table if it does not exist
CREATE TABLE IF NOT EXISTS public.consultancy_notifications (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) on consultancy_notifications
ALTER TABLE public.consultancy_notifications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow insert access
CREATE POLICY "Allow public insert access on consultancy_notifications" 
ON public.consultancy_notifications FOR INSERT 
WITH CHECK (true);


-- 4. Seed 'colleges' table
INSERT INTO public.colleges (id, name, type, state, icon, fees, avg_package, exams, streams, placements, campus_life, research, culture, fees_roi, admission_difficulty, infrastructure)
VALUES
('iit-bombay', 'IIT Bombay', 'Engineering', 'Maharashtra', '⚙️', '~₹2.5L/yr', '₹23.5 LPA', ARRAY['jee-main', 'jee-adv'], ARRAY['science-pcm'], 
 '₹23.5 LPA overall average. Tech-focused recruiters dominate.', 
 '550-acre green campus. Hostels are older but functional.', 
 'Top-tier. High funding from government and MNCs.', 
 'Extremely competitive. Strong startup culture.', 
 'Excellent ROI. Average starting package exceeds cost.', 
 'Extremely High. Top 3,000 in JEE Advanced.', 
 'World-class tech labs, supercomputing center.'),

('bits-pilani', 'BITS Pilani', 'Engineering', 'Rajasthan', '⚡', '~₹5.5L/yr', '₹20.8 LPA', ARRAY['bitsat'], ARRAY['science-pcm'], 
 '₹20.8 LPA average. Top IT recruiters.', 
 '328-acre self-contained desert campus. Zero Attendance Policy.', 
 'High quality. Industry-linked Practice School.', 
 'Collaborative, relaxed. Exceptional alumni network.', 
 'Moderate ROI due to high fees, but excellent placements.', 
 'Very High. Admission purely via BITSAT.', 
 'Outstanding self-contained residential infrastructure.'),

('aiims-delhi', 'AIIMS New Delhi', 'Medical', 'Delhi', '🏥', '<₹1K/yr', '₹12-18 LPA', ARRAY['neet'], ARRAY['science-pcb'], 
 '100% placement into top residencies globally.', 
 'Located in South Delhi. Very affordable hostels.', 
 'World-class clinical research.', 
 'Highly academic and demanding.', 
 'Exceptional ROI. Under ₹6,000 total fees for MBBS.', 
 'Insanely High. Top 50-100 NEET rank.', 
 'Cutting-edge medical labs and hospitals.'),

('srcc', 'SRCC (DU)', 'Commerce', 'Delhi', '📊', '~₹40K/yr', '₹10.5 LPA', ARRAY['cuet'], ARRAY['commerce'], 
 '₹10.5 LPA average. Top consultancies recruit heavily.', 
 'Located in DU North Campus. Premium building.', 
 'Focused on financial policy papers.', 
 'Hyper-competitive. High emphasis on corporate portfolios.', 
 'Stellar ROI. DU fees are very low.', 
 'Exceptionally High. Nearly perfect CUET scores.', 
 'Good campus building, air-conditioned classrooms.'),

('nls-bangalore', 'NLS Bangalore', 'Law', 'Karnataka', '⚖️', '~₹2.5L/yr', '₹16 LPA', ARRAY['clat'], ARRAY['humanities', 'commerce'], 
 '₹16.0 LPA average. Premium law firms recruit directly.', 
 '23-acre campus in Nagarbhavi. Trimester system.', 
 'India''s leading center for legal reforms.', 
 'Intellectually rigorous, argumentative.', 
 'Great ROI. Placements average ₹16 LPA.', 
 'High. Top 100-150 rank in CLAT.', 
 'Beautiful campus, vast law library.'),

('ashoka-univ', 'Ashoka University', 'Liberal Arts & Sciences', 'Haryana', '📚', '~₹10L/yr', '₹8.5 LPA', ARRAY['cuet'], ARRAY['humanities', 'science-pcm', 'commerce'], 
 '₹8.5 LPA average. Consulting, media, social impact.', 
 '25-acre residential campus in Sonepat.', 
 'High emphasis on interdisciplinary studies.', 
 'Open, expressive, and liberal.', 
 'Moderate ROI. Premium fees, but generous financial aid.', 
 'High. Holistic admissions process.', 
 'Ivy-league style campus. State-of-the-art facilities.')
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    type = EXCLUDED.type,
    state = EXCLUDED.state,
    icon = EXCLUDED.icon,
    fees = EXCLUDED.fees,
    avg_package = EXCLUDED.avg_package,
    exams = EXCLUDED.exams,
    streams = EXCLUDED.streams,
    placements = EXCLUDED.placements,
    campus_life = EXCLUDED.campus_life,
    research = EXCLUDED.research,
    culture = EXCLUDED.culture,
    fees_roi = EXCLUDED.fees_roi,
    admission_difficulty = EXCLUDED.admission_difficulty,
    infrastructure = EXCLUDED.infrastructure;


-- 5. Seed 'exams' table
INSERT INTO public.exams (id, name, category, description, exam_date, result_date, status, website)
VALUES
('jee-main', 'JEE Main (Session 2)', 'Engineering', 'National entrance for B.Tech/B.Arch in NITs, IIITs and GFTIs.', '2026-04-06', '2026-04-25', 'Exam Finished', 'https://jeemain.nta.ac.in'),
('jee-adv', 'JEE Advanced', 'Engineering', 'Gateway to the prestigious Indian Institutes of Technology (IITs).', '2026-05-24', '2026-06-08', 'Admit Card Out', 'https://jeeadv.ac.in'),
('neet', 'NEET UG', 'Medical', 'The single gateway to MBBS, BDS, and Ayush seats across India.', '2026-05-03', '2026-06-15', 'Exam Finished', 'https://neet.nta.nic.in'),
('clat', 'CLAT', 'Law', 'Gateway to 5-year integrated Law degrees at 24 National Law Universities.', '2026-05-10', '2026-05-25', 'Exam Finished', 'https://consortiumofnlus.ac.in'),
('cuet', 'CUET UG', 'Arts', 'Central Universities Entrance Test for BA, B.Sc, B.Com, and other UG degrees.', '2026-05-18', '2026-06-28', 'Exam Ongoing', 'https://cuet.samarth.ac.in'),
('cat', 'CAT (Management)', 'Management', 'National level test for postgraduate management programs at IIMs.', '2026-11-29', '2026-12-21', 'Registration Closed', 'https://iimcat.ac.in'),
('uceed', 'UCEED', 'Design', 'Undergraduate Common Entrance Examination for B.Des at IITs and design colleges.', '2026-01-18', '2026-03-05', 'Results Out', 'https://uceed.iitb.ac.in'),
('nift', 'NIFT Entrance', 'Design', 'Gateway to design and technology programs at National Institutes of Fashion Technology.', '2026-02-08', '2026-04-12', 'Results Out', 'https://nift.ac.in'),
('nata', 'NATA', 'Engineering', 'National Aptitude Test in Architecture for B.Arch degree approvals.', '2026-04-11', '2026-04-20', 'Results Out', 'https://nata.in'),
('nda', 'NDA & NA Exam I', 'Engineering', 'National Defence Academy entry for Army, Navy, and Air Force officers.', '2026-04-19', '2026-05-30', 'Exam Finished', 'https://upsc.gov.in'),
('ipmat', 'IPMAT (IIM Indore)', 'Commerce', 'Integrated Program in Management Aptitude Test for 5-year BBA+MBA.', '2026-05-22', '2026-06-12', 'Admit Card Out', 'https://www.iimidr.ac.in')
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    category = EXCLUDED.category,
    description = EXCLUDED.description,
    exam_date = EXCLUDED.exam_date,
    result_date = EXCLUDED.result_date,
    status = EXCLUDED.status,
    website = EXCLUDED.website;


-- 6. Seed 'prep_courses' table with YouTube and Udemy links for exams
INSERT INTO public.prep_courses (exam_id, title, provider, url, instructor, type, rating)
VALUES
-- JEE Main / Advanced Prep
('jee-main', 'Physics Galaxy JEE Main Lectures', 'YouTube', 'https://www.youtube.com/@physicsgalaxyworld', 'Ashish Arora', 'Free', 4.9),
('jee-main', 'Complete Mathematics for JEE Mains', 'YouTube', 'https://www.youtube.com/@MathematicallyInclined', 'Neha Agrawal', 'Free', 4.8),
('jee-main', 'JEE Mains Chemistry Crash Course', 'YouTube', 'https://www.youtube.com/@UnacademyJEE', 'Unacademy Team', 'Free', 4.7),
('jee-main', 'Chemistry Masterclass for JEE Advanced', 'Udemy', 'https://www.udemy.com/course/organic-chemistry-jee-advanced/', 'Dr. R. Singh', 'Paid', 4.8),
('jee-main', 'Mathematics JEE Main Exam Prep Course', 'Udemy', 'https://www.udemy.com/course/jee-main-maths-algebra/', 'LearnTech India', 'Paid', 4.5),

-- NEET Prep
('neet', 'NCERT Biology Line by Line Series', 'YouTube', 'https://www.youtube.com/@GarimaGoelBiology', 'Garima Goel', 'Free', 4.9),
('neet', 'NEET Physics One-Shot Crash Course', 'YouTube', 'https://www.youtube.com/@PhysicsWallah', 'Alakh Pandey', 'Free', 4.9),
('neet', 'Complete Organic Chemistry for NEET', 'YouTube', 'https://www.youtube.com/@PankajsirChemistry', 'Pankaj Sir', 'Free', 4.8),
('neet', 'Mastering Biology for Medical Entrance Exams', 'Udemy', 'https://www.udemy.com/course/neet-biology-physiology/', 'Dr. Shalini', 'Paid', 4.6),

-- CLAT Prep
('clat', 'Daily Current Affairs & Legal Reasoning for CLAT', 'YouTube', 'https://www.youtube.com/@LegalEdgeCLATPreparation', 'LegalEdge Team', 'Free', 4.8),
('clat', 'CLAT English Language & Logical Reasoning', 'YouTube', 'https://www.youtube.com/@ClatPossible', 'CLAT Possible', 'Free', 4.6),
('clat', 'Crack CLAT: Step-by-Step Law Preparation', 'Udemy', 'https://www.udemy.com/course/clat-legal-reasoning-bootcamp/', 'Legal Academy', 'Paid', 4.7),

-- CUET Prep
('cuet', 'CUET UG General Test & Domain Subjects Prep', 'YouTube', 'https://www.youtube.com/@Adda247Official', 'Adda247 Team', 'Free', 4.7),
('cuet', 'CUET Commerce Domain Core Classes', 'YouTube', 'https://www.youtube.com/@CommerceAdda247', 'Commerce Adda', 'Free', 4.8),
('cuet', 'CUET Section III Preparation Course', 'Udemy', 'https://www.udemy.com/course/cuet-general-test-quantitative-aptitude/', 'PrepOnline', 'Paid', 4.4);
