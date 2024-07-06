import express from 'express';
import { createJobApplication, getJobApplication, getJobApplicationById, deleteJobApplication, noOfApplicationsReceived } from '../applications/job-application';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import AuthorizationMiddleware from './middleware/authorization-middleware';




const jobApplicationRouter = express.Router();


jobApplicationRouter.route('/').post(ClerkExpressRequireAuth({}),createJobApplication);
jobApplicationRouter.route('/').get(ClerkExpressRequireAuth({}), AuthorizationMiddleware,getJobApplication);
jobApplicationRouter.route('/received').get(ClerkExpressRequireAuth({}), AuthorizationMiddleware,noOfApplicationsReceived)
jobApplicationRouter.route('/:id').get(ClerkExpressRequireAuth({}), AuthorizationMiddleware,getJobApplicationById);
jobApplicationRouter.route('/:_id').delete(ClerkExpressRequireAuth({}), AuthorizationMiddleware, deleteJobApplication);


export default jobApplicationRouter;