
import app from './index.js'
const PORT = process.env.BACKEND_PORT || 3000;
import { connectDB } from './config/db.js';

console.log(PORT)
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}, db connected`));
  }).catch(err => {
    console.error('Failed to connect to the database', err);
    process.exit(1);
  });