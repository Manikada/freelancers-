import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true, index: true },
  freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  message: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Bid', bidSchema);
