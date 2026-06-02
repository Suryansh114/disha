import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, ThumbsUp, AlertTriangle, Briefcase, Calendar, Award, Sparkles, Check, X } from 'lucide-react';
import './StreamDetail.css';

// Rich Mock Data tailored for Indian Students
const streamDetailData = {
  'science-pcm': {
    name: 'Science PCM',
    tagline: 'Physics, Chemistry, & Mathematics',
    icon: '⚙️',
    description: 'The foundation for engineering, technology, design, and physical science careers in India.',
    stats: {
      subjects: 'Physics, Chemistry, Maths, English, CS/PE',
      careers: '45+ career pathways',
      salary: '₹6 LPA - ₹35+ LPA',
      demand: 'Very High (Tech & Data)'
    },
    study: {
      overview: 'Science PCM focuses on understanding physical laws, chemical behaviors, and advanced mathematical structures. In Class 11 & 12, the syllabus undergoes a massive jump from Class 10. You will transition from basic sciences to advanced calculus, mechanics, and organic chemistry mechanisms.',
      syllabus: [
        { topic: 'Physics', detail: 'Mechanics, Electromagnetism, Optics, Thermodynamics, Modern Physics.' },
        { topic: 'Chemistry', detail: 'Organic Reactions, Inorganic Compounds, Physical Chemistry (Equilibrium, Kinetics).' },
        { topic: 'Mathematics', detail: 'Calculus (Differentiation & Integration), Coordinate Geometry, Vectors, Algebra.' }
      ]
    },
    honestTake: {
      great: [
        'Versatility: You can switch to commerce, arts, or design easily later if you change your mind.',
        'High Financial Upside: Tech, software engineering, and finance roles offer some of the highest entry-level packages (LPA) in India.',
        'Logical Development: Builds excellent analytical, coding, and problem-solving skills.'
      ],
      hard: [
        'Insane Competition: Over 12-14 lakh students write JEE Main every year for limited seats in IITs/NITs.',
        'Massive Syllabus Jump: The depth of physics and calculus in 11th is often shocking for students scoring 95%+ in 10th.',
        'Burnout Risk: Balancing school board prep with JEE/coaching centers often leaves zero free time.'
      ],
      tips: [
        'Do not memorize Physics formulas; focus on deriving them and understanding core concepts.',
        'Start coding early (Python/C++) to see if software engineering actually interests you.',
        'Have a backup plan. Look beyond IITs – State universities and private institutes also offer great careers.'
      ]
    },
    careers: {
      common: [
        {
          title: 'Software Engineer',
          salary: '₹8 LPA - ₹40 LPA',
          demand: 'High',
          effort: 4,
          opportunity: 5,
          path: 'B.Tech CS / BCA + MCA → Internships → Tech hiring'
        },
        {
          title: 'Data Scientist',
          salary: '₹7 LPA - ₹25 LPA',
          demand: 'Emerging',
          effort: 5,
          opportunity: 5,
          path: 'B.Tech/B.Sc Statistics/Math → Analytics Certifications → Data roles'
        },
        {
          title: 'Defense Services Officer (via NDA)',
          salary: '₹10 LPA - ₹18 LPA',
          demand: 'Steady',
          effort: 5,
          opportunity: 4,
          path: 'Class 12 PCM → Written NDA Exam → SSB Interview → Military Training'
        }
      ],
      lesserKnown: [
        {
          title: 'Actuarial Scientist',
          salary: '₹9 LPA - ₹30 LPA',
          demand: 'High',
          effort: 5,
          opportunity: 4,
          path: 'B.Sc Math/Actuarial Science → Pass Actuarial Exams (IAI) → Risk assessment'
        },
        {
          title: 'Aerospace Systems Engineer',
          salary: '₹6 LPA - ₹18 LPA',
          demand: 'Steady',
          effort: 5,
          opportunity: 3,
          path: 'B.Tech Aerospace Engineering → ISRO/DRDO/Private Aviation companies'
        },
        {
          title: 'Industrial Product Designer',
          salary: '₹5 LPA - ₹15 LPA',
          demand: 'Emerging',
          effort: 3,
          opportunity: 4,
          path: 'Class 12 → UCEED exam → B.Des (IIT/NID) → Product Design firms'
        }
      ]
    },
    exams: [
      { name: 'JEE Main', date: 'Session 1: Jan | Session 2: April', description: 'Gateway to NITs, IIITs, CFTIs and eligibility for JEE Advanced.', link: 'https://jeemain.nta.ac.in' },
      { name: 'JEE Advanced', date: 'Late May / Early June', description: 'Gateway to the prestigious Indian Institutes of Technology (IITs). Only top 2.5L qualifiers of JEE Main can sit.', link: 'https://jeeadv.ac.in' },
      { name: 'NDA Exam', date: 'April & September (twice a year)', description: 'National Defence Academy entrance exam for Army, Navy, and Air Force officer entries.', link: 'https://upsc.gov.in' },
      { name: 'BITSAT', date: 'May - June', description: 'Entrance exam for admissions into Birla Institute of Technology and Science (Pilani, Goa, Hyderabad campuses).', link: 'https://bitsadmission.com' }
    ],
    courses: [
      { degree: 'B.Tech / B.E.', duration: '4 Years', requirements: 'Class 12 (PCM) + JEE or state entrance exams.', scope: 'Computer Science, Electronics, Mechanical, Civil, Biotech, Chemical.' },
      { degree: 'B.Arch (Architecture)', duration: '5 Years', requirements: 'Class 12 (PCM) + NATA or JEE Paper 2.', scope: 'Building design, urban planning, landscape architecture.' },
      { degree: 'B.Sc (Hons) in Math / Physics / Statistics', duration: '3-4 Years', requirements: 'Class 12 (PCM) + CUET score.', scope: 'Research, academia, analytics, actuarial careers.' }
    ]
  },
  'science-pcb': {
    name: 'Science PCB',
    tagline: 'Physics, Chemistry, & Biology',
    icon: '🏥',
    description: 'The standard route for medical, life sciences, dental, and chemical studies in India.',
    stats: {
      subjects: 'Physics, Chemistry, Biology, English, Biotech/Psychology',
      careers: '30+ career pathways',
      salary: '₹4 LPA - ₹25+ LPA',
      demand: 'High (Healthcare & Pharma)'
    },
    study: {
      overview: 'Science PCB trades Mathematics for Biology. You will study botany (plant life), zoology (animal life), genetics, human physiology, along with the physical principles and chemical interactions of matter. Memorization capacity is heavily tested here alongside conceptual clarity.',
      syllabus: [
        { topic: 'Biology', detail: 'Plant Physiology, Human Anatomy, Cell Biology, Genetics, Evolution, Ecology.' },
        { topic: 'Physics', detail: 'Biophysics concepts, Thermodynamics, Fluids, Waves, Electrostatics (critical for NEET).' },
        { topic: 'Chemistry', detail: 'Biochemistry, Organic synthesis, Solutions, Chemical structure.' }
      ]
    },
    honestTake: {
      great: [
        'Noble & Fulfilling: Directly impacts human health, life saving, and healthcare services.',
        'Recession-Proof: Medical careers enjoy stable demand regardless of economic cycles.',
        'Diverse Alternatives: Emerging biotech, genetics, and bioinformatics fields are growing fast.'
      ],
      hard: [
        'Extreme Exam Stress: 24+ lakh students compete in NEET for ~1 lakh MBBS seats.',
        'Very Long Gestation: Becoming a settled doctor takes 8-10 years (MBBS + MD/MS + residency).',
        'Expensive Private Seats: If you miss a government NEET seat, private college fees can exceed ₹60L - ₹1Cr.'
      ],
      tips: [
        'For NEET, read NCERT Biology cover-to-cover; almost 95% of biology questions come directly from NCERT lines.',
        'Do not ignore Physics. NEET ranks are decided by your Physics scores because most bio students find it hard.',
        'Keep an open mind about allied medical careers (BPT, BAMS, Veterinary) and research fields early on.'
      ]
    },
    careers: {
      common: [
        {
          title: 'Doctor (MBBS / Specialist)',
          salary: '₹9 LPA - ₹30+ LPA',
          demand: 'High',
          effort: 5,
          opportunity: 5,
          path: 'NEET Exam → MBBS (5.5y) → NEET PG → MD/MS Specialist (3y)'
        },
        {
          title: 'Dentist (BDS)',
          salary: '₹4 LPA - ₹12 LPA',
          demand: 'Steady',
          effort: 4,
          opportunity: 3,
          path: 'NEET Exam → BDS (5y) → MDS Specialist / Private Dental Practice'
        },
        {
          title: 'Pharmacist',
          salary: '₹3 LPA - ₹8 LPA',
          demand: 'Steady',
          effort: 3,
          opportunity: 3,
          path: 'B.Pharm → Quality Control or Sales in Pharmaceutical MNCs'
        }
      ],
      lesserKnown: [
        {
          title: 'Clinical Research Director',
          salary: '₹6 LPA - ₹18 LPA',
          demand: 'Emerging',
          effort: 4,
          opportunity: 4,
          path: 'B.Sc/M.Sc Biotech or MBBS → Clinical Research Diploma → Trial Management'
        },
        {
          title: 'Genetic Counselor',
          salary: '₹5 LPA - ₹14 LPA',
          demand: 'Emerging',
          effort: 4,
          opportunity: 4,
          path: 'B.Sc Genetics/Biotech → M.Sc Genetic Counseling → Hospital diagnostics'
        },
        {
          title: 'Veterinary Doctor',
          salary: '₹5 LPA - ₹15 LPA',
          demand: 'High',
          effort: 4,
          opportunity: 4,
          path: 'NEET/State Exam → BVSc & AH (5.5y) → Animal Hospitals or Feed Industry'
        }
      ]
    },
    exams: [
      { name: 'NEET UG', date: 'First Sunday of May', description: 'The absolute single entrance exam for all medical (MBBS, BDS, Ayush, Veterinary) seats in India.', link: 'https://neet.nta.nic.in' },
      { name: 'CUET UG (Biology focus)', date: 'May', description: 'Central Universities Entrance Test for B.Sc Honors in Botany, Zoology, Genetics, and Biochemistry.', link: 'https://cuet.samarth.ac.in' },
      { name: 'IISER Aptitude Test (IAT)', date: 'June', description: 'Entrance exam for BS-MS dual degree programs at Indian Institutes of Science Education and Research.', link: 'https://iiseradmission.in' }
    ],
    courses: [
      { degree: 'MBBS (Bachelor of Medicine & Surgery)', duration: '5.5 Years', requirements: 'Class 12 (PCB) + NEET UG score.', scope: 'General practice, hospital medicine, pathway to surgical or physician specialization.' },
      { degree: 'B.Sc Biotech / Biotechnology', duration: '3-4 Years', requirements: 'Class 12 (PCB) + CUET or college exam.', scope: 'Bio-pharma research, agricultural tech, clinical labs.' },
      { degree: 'BPT (Physiotherapy)', duration: '4.5 Years', requirements: 'Class 12 (PCB) + NEET or university test.', scope: 'Physical rehabilitation, sports coaching, orthopedic clinics.' }
    ]
  },
  'commerce': {
    name: 'Commerce',
    tagline: 'Finance, Business, & Accounting',
    icon: '📊',
    description: 'The standard route for business, financial systems, wealth management, and corporate leadership.',
    stats: {
      subjects: 'Accountancy, Business Studies, Economics, Math/IP',
      careers: '35+ career pathways',
      salary: '₹5 LPA - ₹28+ LPA',
      demand: 'High (Corporate Finance)'
    },
    study: {
      overview: 'Commerce deals with financial systems, organizational theory, wealth allocation, and commerce laws. In Class 11 & 12, you will learn how to read balance sheets, compute ledger accounts, understand macro/micro economic factors, and master business trade theories.',
      syllabus: [
        { topic: 'Accountancy', detail: 'Double Entry Bookkeeping, Partnership Accounts, Company Shares, Cash Flow Statements.' },
        { topic: 'Economics', detail: 'Microeconomics, Macroeconomics, Indian Economic Development, Statistics.' },
        { topic: 'Business Studies', detail: 'Principles of Management, Marketing, Finance Markets, Consumer Protection.' }
      ]
    },
    honestTake: {
      great: [
        'Direct Business Insights: You read concepts that directly apply to running companies, investments, and personal wealth.',
        'High Professional Return: Qualifications like CA/CFA/MBA from top tier institutes command massive salaries in India.',
        'Flexible Options: Math-commerce students can easily switch into tech roles like Data Science or Product Management.'
      ],
      hard: [
        'Hard Accounting Rote: Accountancy involves strict rule formatting, lengthy computations, and tallying ledgers which can feel tedious.',
        'Rigid CA Exam Pass Rates: Chartered Accountancy exams (Foundation/Intermediate/Final) have low pass rates (typically 10-15%).',
        'Tier-1 College Filter: Top consultancy firms and investment banks heavily restrict recruiting to tier-1 colleges (SRCC, IIMs).'
      ],
      tips: [
        'If possible, choose Commerce with Mathematics (Core/Applied). It opens analytical career doors like Actuarial Science and Investment Banking.',
        'Take internships early (even virtual ones) to learn accounting software (Tally, MS Excel). Excel is the absolute lifeblood of commerce.',
        'Look beyond CA. Explore CFA (US), CMA, FRM, and Corporate Law paths early on.'
      ]
    },
    careers: {
      common: [
        {
          title: 'Chartered Accountant (CA)',
          salary: '₹8 LPA - ₹25 LPA',
          demand: 'High',
          effort: 5,
          opportunity: 4,
          path: 'Class 12 → CA Foundation → CA Intermediate + Articleship (2y) → CA Final'
        },
        {
          title: 'Investment Banker',
          salary: '₹12 LPA - ₹35 LPA',
          demand: 'High',
          effort: 5,
          opportunity: 5,
          path: 'B.Com/BBA (Tier 1) or MBA Finance → Investment Analyst → Associate'
        },
        {
          title: 'Corporate Lawyer',
          salary: '₹7 LPA - ₹20 LPA',
          demand: 'Steady',
          effort: 4,
          opportunity: 4,
          path: 'CLAT Exam → Integrated B.Com LLB (5y) → Law Firm corporate desk'
        }
      ],
      lesserKnown: [
        {
          title: 'Financial Analyst (CFA route)',
          salary: '₹6 LPA - ₹18 LPA',
          demand: 'High',
          effort: 4,
          opportunity: 4,
          path: 'B.Com / BBA → Pass CFA Levels 1 & 2 → Portfolio / Equity analyst'
        },
        {
          title: 'Management Consultant',
          salary: '₹10 LPA - ₹28 LPA',
          demand: 'High',
          effort: 4,
          opportunity: 5,
          path: 'Tier-1 Degree + Excellent Case Interview Skills → McKinsey/BCG/Bain'
        },
        {
          title: 'Stock Market Trader/Portfolio Manager',
          salary: '₹5 LPA - Unlimited (Performance based)',
          demand: 'Steady',
          effort: 4,
          opportunity: 4,
          path: 'Commerce degree → NISM certifications → Broking house or proprietary trading'
        }
      ]
    },
    exams: [
      { name: 'CA Foundation', date: 'June & December (twice a year)', description: 'First entry-level test to qualify for Chartered Accountancy course under ICAI.', link: 'https://icai.org' },
      { name: 'CUET UG (Commerce subjects)', date: 'May', description: 'Entrance exam for top central commerce colleges like SRCC, LSR, Hindu College (DU).', link: 'https://cuet.samarth.ac.in' },
      { name: 'IPMAT', date: 'May', description: 'Integrated Program in Management Aptitude Test. Gateway to direct 5-year BBA+MBA program at IIM Indore, IIM Rohtak.', link: 'https://iimidr.ac.in' }
    ],
    courses: [
      { degree: 'B.Com (Hons)', duration: '3-4 Years', requirements: 'Class 12 + CUET score.', scope: 'Advanced accounting, taxation, company auditing, corporate economics.' },
      { degree: 'BBA / BMS (Management)', duration: '3-4 Years', requirements: 'Class 12 + university entrance (CUET, IPMAT).', scope: 'Business operations, human resource theory, corporate marketing, startup strategy.' },
      { degree: 'CA / CS Program (Professional)', duration: '4-5 Years', requirements: 'Registration with ICAI / ICSI + clearing scheduled stages.', scope: 'Audit reporting, corporate governance compliance, taxation law filings.' }
    ]
  },
  'humanities': {
    name: 'Arts & Humanities',
    tagline: 'Social Sciences, Psychology, & Law',
    icon: '🎭',
    description: 'The foundation for civil services, legal practice, psychology, media, and academic research.',
    stats: {
      subjects: 'History, Political Science, Psychology, Sociology, Languages',
      careers: '40+ career pathways',
      salary: '₹4 LPA - ₹18+ LPA',
      demand: 'Steady (Expanding in Policy/Mental Health)'
    },
    study: {
      overview: 'Humanities focuses on studying human societies, structures, history, behavior, and language. Unlike popular belief, it is not a "simple" stream; it involves critical reading, analyzing primary historical texts, debating socio-political structures, and understanding complex human psychology.',
      syllabus: [
        { topic: 'Political Science', detail: 'Indian Constitution, International Relations, Political Theory, Cold War Era.' },
        { topic: 'Psychology', detail: 'Human Development, Therapeutic Approaches, Social Psychology, Cognitive Processes.' },
        { topic: 'History', detail: 'Ancient Harappan Civilisation, Medieval Mughals, Indian Independence Movement, World Wars.' }
      ]
    },
    honestTake: {
      great: [
        'Intellectual Rigor: Builds stellar writing, speaking, and argumentative skills – highly valued in advocacy and media.',
        'Civil Services Edge: The UPSC CSE syllabus overlaps heavily (~60-70%) with History, Geography, and Political Science.',
        'Exploding Psychology Scope: Rapidly rising awareness has created massive demand for clinical and school counselors in India.'
      ],
      hard: [
        'Subjective Grading: Board exams require writing long, detailed essays where scoring 99+ is harder than in Math.',
        'Higher Degree Required: Direct jobs after BA are often low paying; a Master\'s or professional degree (LLB/MBA) is typically needed.',
        'Social Bias: Indian society still outdatedly views Humanities as the stream for students who scored low in 10th.'
      ],
      tips: [
        'Develop a reading habit early. Read newspapers (The Hindu/Indian Express) daily for socio-political context.',
        'Pair your BA degree with internships in NGOs, think-tanks, content writing, or digital marketing to build a job profile.',
        'Consider integrated 5-year Law programs (BA LLB) directly after Class 12 – it is a highly structured professional path.'
      ]
    },
    careers: {
      common: [
        {
          title: 'Civil Servant (IAS / IPS / IFS)',
          salary: '₹8 LPA - ₹15 LPA (Plus house, car & power)',
          demand: 'Steady',
          effort: 5,
          opportunity: 3,
          path: 'Graduate in any stream → Clear UPSC Civil Services Exam (Prelims, Mains, Interview)'
        },
        {
          title: 'Clinical Psychologist',
          salary: '₹4 LPA - ₹12 LPA',
          demand: 'High',
          effort: 4,
          opportunity: 4,
          path: 'BA Psychology → MA/M.Sc Clinical Psychology → M.Phil (RCI license) → Hospital practice'
        },
        {
          title: 'Journalist / Media Correspondent',
          salary: '₹3 LPA - ₹10 LPA',
          demand: 'Steady',
          effort: 3,
          opportunity: 3,
          path: 'BA Journalism or English → Media house internship → Reporting / Editorial roles'
        }
      ],
      lesserKnown: [
        {
          title: 'Public Policy Consultant',
          salary: '₹6 LPA - ₹18 LPA',
          demand: 'Emerging',
          effort: 4,
          opportunity: 4,
          path: 'BA PoliSci/Economics → MA Public Policy (NLUs/Ashoka) → Policy consulting firms'
        },
        {
          title: 'Human Rights Advocate',
          salary: '₹4 LPA - ₹15 LPA',
          demand: 'Steady',
          effort: 4,
          opportunity: 3,
          path: 'CLAT Exam → BA LLB (5y) → Specialized practice / NGO legal desks'
        },
        {
          title: 'UX Researcher',
          salary: '₹7 LPA - ₹20 LPA',
          demand: 'High',
          effort: 3,
          opportunity: 4,
          path: 'BA Psychology/Sociology → Certification in UX/HCI → Product Design Teams'
        }
      ]
    },
    exams: [
      { name: 'CLAT (Common Law Admission Test)', date: 'First Sunday of December', description: 'National exam for admission to 5-year integrated BA LLB programs across 24 National Law Universities (NLUs).', link: 'https://consortiumofnlus.ac.in' },
      { name: 'CUET UG (Humanities)', date: 'May', description: 'Entrance exam for top BA (Hons) programs at Delhi University, BHU, and JNU.', link: 'https://cuet.samarth.ac.in' },
      { name: 'NIFT Entrance Exam', date: 'February', description: 'Entrance exam for National Institute of Fashion Technology programs (Design & Communication).', link: 'https://nift.ac.in' }
    ],
    courses: [
      { degree: 'BA LLB (Integrated Law)', duration: '5 Years', requirements: 'Class 12 + CLAT or AILET rank.', scope: 'Civil law, criminal law, corporate law, cyber security law, advocacy.' },
      { degree: 'BA (Hons) in Psychology / Economics / Sociology', duration: '3-4 Years', requirements: 'Class 12 + CUET score.', scope: 'Counseling, public relation management, data research, academia.' },
      { degree: 'Bachelor of Journalism & Mass Comm (BJMC)', duration: '3 Years', requirements: 'Class 12 + college entrance exam.', scope: 'Broadcast journalism, digital media production, PR coordination.' }
    ]
  },
  'vocational': {
    name: 'Vocational & Emerging',
    tagline: 'Applied Arts, Design, & Media',
    icon: '🎨',
    description: 'Practical, skill-heavy pathways focusing on design, media production, culinary arts, and hospitality.',
    stats: {
      subjects: 'Design, Mass Media, Web Tech, Tourism, Fine Arts',
      careers: '25+ career pathways',
      salary: '₹4 LPA - ₹20+ LPA',
      demand: 'High (Creative & Digital Industry)'
    },
    study: {
      overview: 'Vocational streams prioritize project-based, hand-on learning over traditional textbook rote memorization. You will build portfolios, record digital media, draft design layouts, learn kitchen operations, or run mock hospitality drills.',
      syllabus: [
        { topic: 'Creative Design', detail: 'Sketching, Color Theory, Typography, User Interface (UI), Material Studies.' },
        { topic: 'Digital Media', detail: 'Photography, Video Editing, Writing for Web, Social Media Marketing.' },
        { topic: 'Applied Technology', detail: 'Basic Web Development, Graphic Tools (Photoshop, Illustrator), IT Fundamentals.' }
      ]
    },
    honestTake: {
      great: [
        'Skills over Rote: Grading is based on physical portfolios and practical projects, not 3-hour theoretical essays.',
        'Fast Industry Entry: Freelance markets and design studios value your actual portfolio more than your board marks.',
        'High Creative Freedom: Permits turning hobbies (painting, filmmaking, cooking) into high-paying modern careers.'
      ],
      hard: [
        'Portfolio Pressure: Building a good portfolio takes hours of manual revision, which can get physically exhausting.',
        'Initial Client Grind: Early freelance careers suffer from unstable monthly earnings before you build a solid client base.',
        'Limited Government Options: Traditional public sector units (PSUs) rarely have direct vacancies for design or media graduates.'
      ],
      tips: [
        'Start posting your work online (Behance, Dribbble, GitHub) in Class 11. An online presence is your real resume.',
        'Learn the tools of the trade. If you are in design, master Figma and Adobe suite early on.',
        'Do not skip business communication. Freelancers need strong speaking skills to pitch clients and quote pricing.'
      ]
    },
    careers: {
      common: [
        {
          title: 'Graphic / UI Designer',
          salary: '₹5 LPA - ₹18 LPA',
          demand: 'High',
          effort: 3,
          opportunity: 4,
          path: 'Class 12 → Portfolio building or B.Des (NID/NIFT) → Graphic/UI Intern → Studio hire'
        },
        {
          title: 'Hotel / Restaurant Manager',
          salary: '₹4 LPA - ₹12 LPA',
          demand: 'Steady',
          effort: 4,
          opportunity: 3,
          path: 'NCHM JEE Exam → B.Sc Hospitality & Hotel Administration (3y) → Hotel Management Trainee'
        },
        {
          title: 'Digital Content Creator / Video Editor',
          salary: '₹3 LPA - ₹12 LPA (Highly variable)',
          demand: 'High',
          effort: 3,
          opportunity: 4,
          path: 'Self-taught editing software → Freelance client building or media agency hire'
        }
      ],
      lesserKnown: [
        {
          title: 'Interaction / UX Designer',
          salary: '₹8 LPA - ₹25 LPA',
          demand: 'High',
          effort: 4,
          opportunity: 5,
          path: 'B.Des (Interaction Design) at NID/IITs → UX Portfolio → Tech MNC hiring'
        },
        {
          title: 'Professional Chef / Culinary Artist',
          salary: '₹4 LPA - ₹16 LPA',
          demand: 'Steady',
          effort: 5,
          opportunity: 4,
          path: 'Diploma / Degree in Culinary Arts → Kitchen training (Commi chef) → Sous Chef → Head Chef'
        },
        {
          title: 'Digital Marketing Strategist',
          salary: '₹5 LPA - ₹15 LPA',
          demand: 'High',
          effort: 3,
          opportunity: 4,
          path: 'B.Voc in Media / Business → Digital Marketing Certifications → Brand campaigns'
        }
      ]
    },
    exams: [
      { name: 'UCEED', date: 'January', description: 'Undergraduate Common Entrance Examination for Design. Gateway to B.Des program at IIT Bombay, IIT Guwahati, IIT Hyderabad, and IIITDM Jabalpur.', link: 'https://uceed.iitb.ac.in' },
      { name: 'NID DAT', date: 'December (Prelims) | April (Mains)', description: 'Design Aptitude Test for entry into the National Institute of Design (Ahmedabad, Bangalore, Kurukshetra, Vijayawada, Jorhat, Bhopal).', link: 'https://admissions.nid.edu' },
      { name: 'NCHM JEE', date: 'May', description: 'National Council for Hotel Management Joint Entrance Exam. Gateway to top central Institutes of Hotel Management (IHMs) in India.', link: 'https://nchmjee.nta.nic.in' }
    ],
    courses: [
      { degree: 'B.Des (Bachelor of Design)', duration: '4 Years', requirements: 'Class 12 (Any stream) + UCEED or NID DAT rank.', scope: 'Communication Design, Product Design, Fashion Design, Interaction Design.' },
      { degree: 'B.Sc Hospitality & Hotel Administration', duration: '3 Years', requirements: 'Class 12 + NCHM JEE score.', scope: 'Front office management, kitchen operations, food & beverage sales, housekeeping operations.' },
      { degree: 'B.Voc (Bachelor of Vocational Studies)', duration: '3 Years', requirements: 'Class 12 (Any stream) + CUET or college merit.', scope: 'Digital Media, Web Technologies, Software Development, Travel & Tourism.' }
    ]
  }
};

function StreamDetail() {
  const { streamId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('study');

  const stream = streamDetailData[streamId];

  // Fallback if stream doesn't exist
  if (!stream) {
    return (
      <div className="stream-detail-page section-container error-state">
        <h2>Stream Not Found</h2>
        <p>The stream route you accessed does not exist in our system.</p>
        <button className="btn btn-primary" onClick={() => navigate('/explore-streams')}>
          Back to All Streams
        </button>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'study':
        return (
          <div className="tab-pane animate-fade-in">
            <h3 className="tab-section-title">What you'll actually study</h3>
            <p className="tab-overview">{stream.study.overview}</p>
            <div className="syllabus-grid">
              {stream.study.syllabus.map((item, idx) => (
                <div key={idx} className="syllabus-card glass-card">
                  <h4>{item.topic}</h4>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'honest':
        return (
          <div className="tab-pane animate-fade-in">
            <h3 className="tab-section-title">The Honest Take</h3>
            <p className="tab-overview">Brutally honest insights from students who have been in your shoes. No sugarcoating.</p>
            
            <div className="honest-two-col">
              <div className="honest-col great-col glass-card">
                <h4 className="col-header text-teal"><ThumbsUp size={16} /> What's Great ✓</h4>
                <ul>
                  {stream.honestTake.great.map((item, idx) => (
                    <li key={idx}>
                      <span className="bullet"><Check size={14} /></span>
                      <p>{item}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="honest-col hard-col glass-card">
                <h4 className="col-header text-rose"><AlertTriangle size={16} /> What's Hard ✗</h4>
                <ul>
                  {stream.honestTake.hard.map((item, idx) => (
                    <li key={idx}>
                      <span className="bullet"><X size={14} /></span>
                      <p>{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="tips-box glass-card">
              <h4 className="tips-box-header">💡 Insider tips to make the most of it:</h4>
              <ul>
                {stream.honestTake.tips.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'careers':
        return (
          <div className="tab-pane animate-fade-in">
            <h3 className="tab-section-title">Career Pathways</h3>
            <p className="tab-overview">Salary numbers represent typical entry to mid-career ranges in lakhs per annum (LPA) in India.</p>

            <div className="career-group-section">
              <h4 className="career-group-header">🎯 Common & Popular Paths</h4>
              <div className="career-grid">
                {stream.careers.common.map((job, idx) => (
                  <div key={idx} className="career-card glass-card">
                    <div className="career-card-top">
                      <h5>{job.title}</h5>
                      <span className={`demand-badge ${job.demand.toLowerCase()}`}>{job.demand} Demand</span>
                    </div>
                    
                    <div className="career-salary">💰 {job.salary}</div>
                    
                    <div className="effort-bars">
                      <div className="bar-wrapper">
                        <span className="bar-label">Effort Required</span>
                        <div className="bar-track">
                          <div className="bar-fill effort-fill" style={{ width: `${(job.effort / 5) * 100}%` }}></div>
                        </div>
                      </div>
                      <div className="bar-wrapper">
                        <span className="bar-label">Opportunity Rating</span>
                        <div className="bar-track">
                          <div className="bar-fill opportunity-fill" style={{ width: `${(job.opportunity / 5) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="career-path">
                      <strong>How to get here:</strong>
                      <p>{job.path}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="career-group-section">
              <h4 className="career-group-header">💎 Lesser-Known Gems</h4>
              <div className="career-grid">
                {stream.careers.lesserKnown.map((job, idx) => (
                  <div key={idx} className="career-card glass-card">
                    <div className="career-card-top">
                      <h5>{job.title}</h5>
                      <span className={`demand-badge ${job.demand.toLowerCase()}`}>{job.demand} Demand</span>
                    </div>
                    
                    <div className="career-salary">💰 {job.salary}</div>
                    
                    <div className="effort-bars">
                      <div className="bar-wrapper">
                        <span className="bar-label">Effort Required</span>
                        <div className="bar-track">
                          <div className="bar-fill effort-fill" style={{ width: `${(job.effort / 5) * 100}%` }}></div>
                        </div>
                      </div>
                      <div className="bar-wrapper">
                        <span className="bar-label">Opportunity Rating</span>
                        <div className="bar-track">
                          <div className="bar-fill opportunity-fill" style={{ width: `${(job.opportunity / 5) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="career-path">
                      <strong>How to get here:</strong>
                      <p>{job.path}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'exams':
        return (
          <div className="tab-pane animate-fade-in">
            <h3 className="tab-section-title">Critical Entrance Exams</h3>
            <p className="tab-overview">These are the major competitive tests required for admissions after Class 12 in India.</p>
            
            <div className="exams-list-detail">
              {stream.exams.map((exam, idx) => (
                <div key={idx} className="exam-detail-card glass-card">
                  <div className="exam-card-header">
                    <h4>{exam.name}</h4>
                    <span className="exam-date-chip"><Calendar size={12} /> {exam.date}</span>
                  </div>
                  <p className="exam-desc">{exam.description}</p>
                  <a href={exam.link} target="_blank" rel="noopener noreferrer" className="exam-web-link">
                    Official Website →
                  </a>
                </div>
              ))}
            </div>
          </div>
        );
      case 'courses':
        return (
          <div className="tab-pane animate-fade-in">
            <h3 className="tab-section-title">Common Undergraduate Degrees</h3>
            <p className="tab-overview">Major degree programs available at Indian Universities for this stream.</p>

            <div className="courses-table-wrapper glass-card">
              <table className="courses-table">
                <thead>
                  <tr>
                    <th>Degree Name</th>
                    <th>Duration</th>
                    <th>Entry Requirements</th>
                    <th>Key Areas of Study</th>
                  </tr>
                </thead>
                <tbody>
                  {stream.courses.map((course, idx) => (
                    <tr key={idx}>
                      <td className="course-degree">{course.degree}</td>
                      <td>{course.duration}</td>
                      <td>{course.requirements}</td>
                      <td className="course-scope">{course.scope}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="stream-detail-page-wrapper animate-fade-in">
      <div className="detail-hero-section">
        <div className="detail-hero-glow"></div>
        <div className="section-container detail-hero-container">
          <button className="back-btn-selection" onClick={() => navigate('/explore-streams')}>
            <ArrowLeft size={16} />
            <span>All Streams</span>
          </button>
          
          <div className="detail-header-info">
            <div className="detail-icon-large">{stream.icon}</div>
            <div>
              <span className="badge-pill detail-badge">
                <Sparkles size={12} className="badge-icon" />
                {stream.tagline}
              </span>
              <h1>{stream.name} Stream</h1>
              <p className="detail-description">{stream.description}</p>
            </div>
          </div>

          {/* Quick Stat Chips */}
          <div className="quick-stats-chips-container">
            <div className="stat-chip glass-card">
              <span className="stat-label">Core Subjects</span>
              <span className="stat-value">{stream.stats.subjects}</span>
            </div>
            <div className="stat-chip glass-card">
              <span className="stat-label">Career Fields</span>
              <span className="stat-value">{stream.stats.careers}</span>
            </div>
            <div className="stat-chip glass-card">
              <span className="stat-label">Entry Salaries</span>
              <span className="stat-value">{stream.stats.salary}</span>
            </div>
            <div className="stat-chip glass-card">
              <span className="stat-label">National Demand</span>
              <span className="stat-value">{stream.stats.demand}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <section className="tabs-navigation-section">
        <div className="section-container tabs-container">
          <div className="tabs-bar glass-card">
            <button 
              className={`tab-btn ${activeTab === 'study' ? 'active' : ''}`}
              onClick={() => setActiveTab('study')}
            >
              <BookOpen size={16} />
              <span>Study</span>
            </button>
            
            <button 
              className={`tab-btn ${activeTab === 'honest' ? 'active' : ''}`}
              onClick={() => setActiveTab('honest')}
            >
              <ThumbsUp size={16} />
              <span>Honest Take</span>
            </button>
            
            <button 
              className={`tab-btn ${activeTab === 'careers' ? 'active' : ''}`}
              onClick={() => setActiveTab('careers')}
            >
              <Briefcase size={16} />
              <span>Careers</span>
            </button>
            
            <button 
              className={`tab-btn ${activeTab === 'exams' ? 'active' : ''}`}
              onClick={() => setActiveTab('exams')}
            >
              <Calendar size={16} />
              <span>Exams</span>
            </button>
            
            <button 
              className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              <Award size={16} />
              <span>Courses</span>
            </button>
          </div>

          {/* Active Tab Pane */}
          <div className="tab-content-panel">
            {renderTabContent()}
          </div>
        </div>
      </section>
    </div>
  );
}

export default StreamDetail;
