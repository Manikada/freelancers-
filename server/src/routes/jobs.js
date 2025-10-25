import { Router } from 'express';
import { z } from 'zod';
import Job from '../models/Job.js';
import Bid from '../models/Bid.js';
import Rating from '../models/Rating.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => {
  const { category, status, search } = req.query;
  const q = {};
  if (category) q.category = category;
  if (status) q.status = status;
  if (search) q.title = { $regex: search, $options: 'i' };
  const jobs = await Job.find(q).sort({ createdAt: -1 }).populate('client', 'name');
  res.json(jobs);
});

router.get('/:id', async (req, res) => {
  const job = await Job.findById(req.params.id).populate('client', 'name').populate('claimedBy', 'name');
  if (!job) return res.status(404).json({ error: 'not_found' });
  const bids = await Bid.find({ job: job._id }).sort({ createdAt: -1 }).populate('freelancer', 'name');
  let rating = null;
  if (job.status === 'Completed') rating = await Rating.findOne({ job: job._id });
  res.json({ job, bids, rating });
});

const createSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.enum(['Design', 'Writing', 'Development', 'Data', 'Other']),
  budget: z.number().optional()
});

router.post('/', requireAuth, requireRole('client'), async (req, res) => {
  const parse = createSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: 'invalid' });
  const job = await Job.create({ ...parse.data, client: req.userId });
  res.status(201).json(job);
});

router.patch('/:id', requireAuth, requireRole('client'), async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ error: 'not_found' });
  if (job.client.toString() !== req.userId) return res.status(403).json({ error: 'forbidden' });
  const allowed = ['title', 'description', 'category', 'budget'];
  for (const k of allowed) if (k in req.body) job[k] = req.body[k];
  await job.save();
  res.json(job);
});

router.post('/:id/claim', requireAuth, requireRole('freelancer'), async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ error: 'not_found' });
  if (job.status !== 'Open' || job.claimedBy) return res.status(400).json({ error: 'not_open' });
  job.claimedBy = req.userId;
  job.status = 'InProgress';
  await job.save();
  res.json(job);
});

router.post('/:id/complete', requireAuth, requireRole('client'), async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ error: 'not_found' });
  if (job.client.toString() !== req.userId) return res.status(403).json({ error: 'forbidden' });
  if (job.status !== 'InProgress') return res.status(400).json({ error: 'not_in_progress' });
  job.status = 'Completed';
  await job.save();
  res.json(job);
});

router.post('/:id/bids', requireAuth, requireRole('freelancer'), async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ error: 'not_found' });
  if (job.status !== 'Open') return res.status(400).json({ error: 'not_open' });
  const schema = z.object({ amount: z.number(), message: z.string().optional() });
  const parse = schema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: 'invalid' });
  const bid = await Bid.create({ job: job._id, freelancer: req.userId, ...parse.data });
  res.status(201).json(bid);
});

router.get('/:id/bids', async (req, res) => {
  const bids = await Bid.find({ job: req.params.id }).sort({ createdAt: -1 }).populate('freelancer', 'name');
  res.json(bids);
});

router.post('/:id/rating', requireAuth, requireRole('client'), async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ error: 'not_found' });
  if (job.client.toString() !== req.userId) return res.status(403).json({ error: 'forbidden' });
  if (job.status !== 'Completed') return res.status(400).json({ error: 'not_completed' });
  const schema = z.object({ stars: z.number().min(1).max(5), feedback: z.string().optional() });
  const parse = schema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: 'invalid' });
  const exists = await Rating.findOne({ job: job._id });
  if (exists) return res.status(409).json({ error: 'already_rated' });
  if (!job.claimedBy) return res.status(400).json({ error: 'no_freelancer' });
  const rating = await Rating.create({ job: job._id, client: req.userId, freelancer: job.claimedBy, ...parse.data });
  res.status(201).json(rating);
});

export default router;
