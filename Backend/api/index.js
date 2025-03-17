import serverless from 'serverless-http';
import app from '../index.js';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';

dotenv.config(); 

let allowedOrigins = [];
if (process.env.ALLOWED_ORIGINS) {
  try {
    allowedOrigins = JSON.parse(process.env.ALLOWED_ORIGINS);
  } catch (error) {
    allowedOrigins = process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim());
  }
} else {
  allowedOrigins = [];
}

app.use(cors({
  origin: (origin, callback) => {
    console.log("origigigi", origin)
    console.log("origigigi is true",allowedOrigins.includes(origin));
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  }
}));

connectDB()
  .then(() => console.log('Database connected successfully.'))
  .catch(err => console.error('Database connection error:', err));

app.listen(5252, () => console.log("Server ready on port 5252."));

export default serverless(app);
