import { config } from 'dotenv';
config();
import app from './server.js';
import { connectDB } from './lib/db.js';

const PORT = process.env.PORT || 4000;

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
  });
}

start();
