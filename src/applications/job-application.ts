import { NextFunction, Request, Response } from "express";
import JobApplication from "../infrastructure/schemas/job-application";
import { generateRating } from "./rating";
import { z } from "zod";
import NotFoundError from "../domain/errors/not-found-error";


export const createJobApplication = async (req: Request, res: Response, next: NextFunction) => {
    
  try {
        const jobApplication = req.body;
        const createJobApplication = await JobApplication.create(jobApplication);
        generateRating(createJobApplication.id);
        return res.status(201).send();
    } catch (error) {
        next(error)
    }
}

// IF JOB ID FOUND RETRIEVE JOB APPLICATION WHERE JOB FEILD MATHCHES ITS ID
// IF NOT RETRIEVE ALL JOB APPLICATIONS AND POPULATE JOB DETAILS
export const getJobApplication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {jobId} = req.query;
    if(jobId) {
      const jobApplications = await JobApplication.find({job:jobId});
      return res.status(200).json(jobApplications);
    }
    const jobApplications = await JobApplication.find().populate("job").exec();
    return res.status(200).json(jobApplications);
  } catch (error) {
    next(error);
    return res.status(500).send();
  }
}


// FIND JOB APPLICATION BASED ON ITS ID 
export const getJobApplicationById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params;
    const jobApplicationById = await JobApplication.findById(id);
    if(jobApplicationById === null) {
      return res.status(404).send();
    }
    return res.status(200).json(jobApplicationById);
  } catch (error) {
    next(error);
    return res.status(500).send();
  }
}

export const deleteJobApplication = async(req:Request, res:Response, next:NextFunction) => {
    try {
      const { _id } = req.params;
      const indexToRemove = await JobApplication.findByIdAndDelete(_id);
      if(!indexToRemove) {
        throw new NotFoundError("Job Application not found");
      }
      return res.status(200).json(indexToRemove);
    } catch (error) {
      next(error)
    }
}


export const noOfApplicationsReceived = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const countOfJobApplicationReceived = await JobApplication.countDocuments();
    if(!countOfJobApplicationReceived) {
      console.log("Job Applications not found");
      return res.status(500).send();
    }
    return res.status(200).json(countOfJobApplicationReceived);
  } catch (error) {
    next(error)
  }
}