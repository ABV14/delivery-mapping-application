
import app from './index.js'
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config(); // Load .env file into process.env
console.log(process.env.BACKEND_PORT)

app.listen(process.env.BACKEND_PORT, () => console.log(`Server running on port ${process.env.BACKEND_PORT}`));
