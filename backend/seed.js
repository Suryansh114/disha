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
      },
      {
        name: 'Disha Medical College',
        city: 'Delhi',
        state: 'Delhi',
        type: 'Government',
        website: 'https://disha-med.edu',
        establishedYear: 2012,
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
