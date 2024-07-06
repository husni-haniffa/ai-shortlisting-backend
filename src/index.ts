import express from "express";
const { connectDB } = require('./infrastructure/db'); 
import jobsRouter from "./api/jobs";
import jobApplicationRouter from "./api/job-application";
import GlobalErrorHandler from "./api/middleware/global-error-handler";
const dotenv = require('dotenv');


dotenv.config();

console.log('MONGO_URI:', process.env.MONGO_URI);


const app = express();
app.use(express.json());
const cors = require('cors');

app.use(cors());

connectDB();

app.use("/jobs", jobsRouter)
app.use("/jobApplications", jobApplicationRouter)

app.use(GlobalErrorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
