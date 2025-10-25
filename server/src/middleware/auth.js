import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export function requireAuth(req, res, next) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: 'unauthorized' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    req.userId = payload.sub;
    req.userRole = payload.role;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'unauthorized' });
  }
}

export function requireRole(role) {
  return (req, res, next) => {
    if (req.userRole !== role) return res.status(403).json({ error: 'forbidden' });
    next();
  };
}

export async function getMe(req, res) {
  if (!req.userId) return res.status(401).json({ error: 'unauthorized' });
  const user = await User.findById(req.userId).select('-passwordHash');
  if (!user) return res.status(404).json({ error: 'not found' });
  res.json(user);
}
