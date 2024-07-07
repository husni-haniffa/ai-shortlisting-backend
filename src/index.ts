import express from "express";
import cors, { CorsOptions, CorsRequest } from 'cors'; // Import types from cors
const { connectDB } = require('./infrastructure/db');
import jobsRouter from "./api/jobs";
import jobApplicationRouter from "./api/job-application";
import GlobalErrorHandler from "./api/middleware/global-error-handler";
const dotenv = require('dotenv');

dotenv.config();

console.log('MONGO_URI:', process.env.MONGO_URI);

const app = express();
app.use(express.json());

const allowedOrigins = ['http://localhost:5173', 'https://aidf-front-end-husni.netlify.app'];

// Define the CORS options
const corsOptions: CorsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

connectDB();

app.use("/jobs", jobsRouter);
app.use("/jobApplications", jobApplicationRouter);

app.use(GlobalErrorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
