import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import distanceRoute from './routes/distanceRoute.js';
import historyRoute from './routes/historyRoute.js';
import { connectDB } from './config/db.js';

dotenv.config(); // Load .env file into process.env
connectDB(); // Connect to the database

const app = express();
app.use(cors());
app.use(express.json());


app.use('/distance', distanceRoute); // To use distance route for distance calculation
app.use('/history', historyRoute); // To retrive history of distance calculation for previous queries
app.get('/', (req, res) => {
    res.send('Backend Started Running!!!!');
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
}
);

export default app;
