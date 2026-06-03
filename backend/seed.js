const mongoose = require('mongoose');
require('dotenv').config();

const Stream = require('./models/Stream');
const Course = require('./models/Course');
const College = require('./models/College');
const Exam = require('./models/Exam');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB for seeding');

    await Promise.all([
      Stream.deleteMany({}),
      Course.deleteMany({}),
      College.deleteMany({}),
      Exam.deleteMany({}),
    ]);

    const streams = await Stream.create([
      { name: 'Engineering', description: 'Engineering fields like CS, Mechanical, Civil.' },
      { name: 'Medical', description: 'Medical and healthcare related programs.' },
      { name: 'Commerce', description: 'Commerce, finance, and business programs.' },
      { name: 'Arts', description: 'Liberal arts, humanities, and design programs.' },
    ]);

    const colleges = await College.create([
      {
        name: 'Disha Institute of Technology',
        city: 'Mumbai',
        state: 'Maharashtra',
        type: 'Private',
        website: 'https://disha-tech.edu',
        establishedYear: 2008,
        feesROI: 'Moderate ROI. Tuition fees of ₹1.8-2.0 LPA. Placements average around ₹5.5 LPA, with tech recruiters leading.',
        admissionDifficulty: 'Moderate. Admission via state entrance test MHT-CET or JEE Main scores.',
        infrastructure: 'Decent facilities including modern computer labs, high-speed Wi-Fi, seminar halls, library, and on-campus hostel accommodation.'
      },
      {
        name: 'Disha Medical College',
        city: 'Delhi',
        state: 'Delhi',
        type: 'Government',
        website: 'https://disha-med.edu',
        establishedYear: 2012,
        feesROI: 'Excellent ROI. Government subsidised tuition fees of ₹50,000 per year. Post-graduation starting salaries average ₹8-12 LPA.',
        admissionDifficulty: 'High. Requires securing a high score in NEET UG entrance exam.',
        infrastructure: 'Equipped with anatomical museums, physiology labs, functional clinical training clinics, library, and doctor hostel rooms.'
      },
    ]);

    const courseData = [
      {
        name: 'Computer Science and Engineering',
        code: 'B.Tech CSE',
        description: 'Undergraduate engineering program focused on computing and software.',
        stream: streams.find(s => s.name === 'Engineering')._id,
        college: colleges[0]._id,
        duration: '4 years',
        eligibility: '10+2 with PCM',
        fees: '₹2,00,000 per year',
        degree: 'B.Tech',
      },
      {
        name: 'Mechanical Engineering',
        code: 'B.Tech ME',
        description: 'Undergraduate mechanical engineering program.',
        stream: streams.find(s => s.name === 'Engineering')._id,
        college: colleges[0]._id,
        duration: '4 years',
        eligibility: '10+2 with PCM',
        fees: '₹1,80,000 per year',
        degree: 'B.Tech',
      },
      {
        name: 'Bachelor of Commerce',
        code: 'B.Com',
        description: 'Commerce degree with finance, accounting, and business subjects.',
        stream: streams.find(s => s.name === 'Commerce')._id,
        college: colleges[0]._id,
        duration: '3 years',
        eligibility: '10+2 with any stream',
        fees: '₹80,000 per year',
        degree: 'B.Com',
      },
      {
        name: 'MBBS',
        code: 'MBBS',
        description: 'Undergraduate medical degree program.',
        stream: streams.find(s => s.name === 'Medical')._id,
        college: colleges[1]._id,
        duration: '5.5 years',
        eligibility: '10+2 with PCB',
        fees: '₹5,00,000 per year',
        degree: 'MBBS',
      },
      {
        name: 'BCA (Bachelor of Computer Applications)',
        code: 'BCA',
        description: 'Undergraduate course in computer applications and software development.',
        stream: streams.find(s => s.name === 'Engineering')._id,
        college: colleges[0]._id,
        duration: '3 years',
        eligibility: '10+2 with Math/IP',
        fees: '₹90,000 per year',
        degree: 'BCA',
      },
      {
        name: 'B.Sc (Hons) in Computer Science',
        code: 'B.Sc CS',
        description: 'Three-year academic program focusing on computer science concepts.',
        stream: streams.find(s => s.name === 'Engineering')._id,
        college: colleges[0]._id,
        duration: '3 years',
        eligibility: '10+2 with PCM',
        fees: '₹75,000 per year',
        degree: 'B.Sc',
      },
      {
        name: 'BDS (Bachelor of Dental Surgery)',
        code: 'BDS',
        description: 'Undergraduate training in dental surgery and oral health.',
        stream: streams.find(s => s.name === 'Medical')._id,
        college: colleges[1]._id,
        duration: '5 years',
        eligibility: '10+2 with PCB + NEET',
        fees: '₹3,00,000 per year',
        degree: 'BDS',
      },
      {
        name: 'B.Pharm (Bachelor of Pharmacy)',
        code: 'B.Pharm',
        description: 'Four-year program in pharmaceutical sciences and drug formulation.',
        stream: streams.find(s => s.name === 'Medical')._id,
        college: colleges[1]._id,
        duration: '4 years',
        eligibility: '10+2 with PCB/PCM',
        fees: '₹1,20,000 per year',
        degree: 'B.Pharm',
      },
      {
        name: 'B.A. (Hons) in Economics',
        code: 'B.A. Econ',
        description: 'Undergraduate degree focusing on economic systems and analysis.',
        stream: streams.find(s => s.name === 'Commerce')._id,
        college: colleges[0]._id,
        duration: '3 years',
        eligibility: '10+2 with Math',
        fees: '₹60,000 per year',
        degree: 'B.A.',
      },
      {
        name: 'BFIA (Bachelor of Financial & Investment Analysis)',
        code: 'BFIA',
        description: 'Integrated finance degree with stock market and portfolio study.',
        stream: streams.find(s => s.name === 'Commerce')._id,
        college: colleges[0]._id,
        duration: '3 years',
        eligibility: '10+2 with Math',
        fees: '₹1,10,000 per year',
        degree: 'BFIA',
      }
    ];

    const courses = await Course.create(courseData);

    await Exam.create([
      {
        name: 'JEE Main',
        code: 'JEE-Main',
        description: 'National entrance exam for engineering colleges in India.',
        streams: [streams.find(s => s.name === 'Engineering')._id],
        eligibility: '10+2 with PCM',
        examDates: [
          { name: 'Session 1', date: new Date('2025-04-05') },
          { name: 'Session 2', date: new Date('2025-05-07') },
        ],
        pattern: 'Objective exam with Physics, Chemistry, Maths sections.',
        officialWebsite: 'https://jeemain.nta.nic.in',
      },
      {
        name: 'NEET',
        code: 'NEET',
        description: 'National eligibility exam for medical college admission.',
        streams: [streams.find(s => s.name === 'Medical')._id],
        eligibility: '10+2 with PCB',
        examDates: [
          { name: 'Exam', date: new Date('2025-05-05') },
        ],
        pattern: 'Objective exam with Biology, Physics, Chemistry sections.',
        officialWebsite: 'https://neet.nta.nic.in',
      },
    ]);

    console.log('Seeding complete');
    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed();
