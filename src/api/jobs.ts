import express from "express";
import { createJobs, deleteJobs, getAllJobs, getJobsById, noOfJobsPosted, updateJobs } from "../applications/jobs";
import AuthorizationMiddleware from "./middleware/authorization-middleware";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const jobsRouter = express.Router();

jobsRouter.route('/').get(getAllJobs);
jobsRouter.route('/').post(ClerkExpressRequireAuth({}), AuthorizationMiddleware, createJobs);
jobsRouter.route('/posted').get(ClerkExpressRequireAuth({}), AuthorizationMiddleware, noOfJobsPosted)
jobsRouter.route('/:id').get(ClerkExpressRequireAuth({}), getJobsById);
jobsRouter.route('/:id').delete(ClerkExpressRequireAuth({}), AuthorizationMiddleware, deleteJobs);
jobsRouter.route('/:id').put(ClerkExpressRequireAuth({}), AuthorizationMiddleware, updateJobs);



export default jobsRouter;
