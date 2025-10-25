import { config } from 'dotenv';
config();
import mongoose from 'mongoose';
import { connectDB } from '../lib/db.js';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Job from '../models/Job.js';
import Bid from '../models/Bid.js';

async function run() {
  await connectDB();
  await Promise.all([
    User.deleteMany({}),
    Job.deleteMany({}),
    Bid.deleteMany({})
  ]);

  const pw = await bcrypt.hash('password123', 10);

  const client = await User.create({ name: 'Alice Client', email: 'alice@example.com', passwordHash: pw, role: 'client' });
  const freelancer = await User.create({ name: 'Bob Freelancer', email: 'bob@example.com', passwordHash: pw, role: 'freelancer' });

  const jobs = await Job.insertMany([
    { client: client._id, title: 'Logo for cafe', description: 'Need a simple logo for a small cafe.', category: 'Design', budget: 100 },
    { client: client._id, title: 'Blog post on MERN', description: 'Write a 1000-word blog post about MERN basics.', category: 'Writing', budget: 60 },
    { client: client._id, title: 'Fix CSS on landing page', description: 'Minor CSS fixes for responsiveness.', category: 'Development', budget: 80 }
  ]);

  await Bid.create({ job: jobs[0]._id, freelancer: freelancer._id, amount: 90, message: 'I can deliver in 2 days.' });

  console.log('Seed complete');
  await mongoose.disconnect();
}

run().catch(e => { console.error(e); process.exit(1); });
