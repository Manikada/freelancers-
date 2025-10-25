import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['Design', 'Writing', 'Development', 'Data', 'Other'], required: true },
  budget: { type: Number },
  status: { type: String, enum: ['Open', 'InProgress', 'Completed'], default: 'Open' },
  claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);
