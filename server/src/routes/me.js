import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import Job from '../models/Job.js';
import Bid from '../models/Bid.js';

const router = Router();

router.get('/jobs', requireAuth, async (req, res) => {
  const jobs = await Job.find({ client: req.userId }).sort({ createdAt: -1 });
  res.json(jobs);
});

router.get('/work', requireAuth, async (req, res) => {
  const claimed = await Job.find({ claimedBy: req.userId }).sort({ createdAt: -1 });
  const bids = await Bid.find({ freelancer: req.userId }).sort({ createdAt: -1 });
  res.json({ claimed, bids });
});

export default router;
