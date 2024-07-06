import { NextFunction, Request, Response } from "express";
import Job from "../infrastructure/schemas/job";
import { z } from "zod";
import ValidationError from "../domain/errors/validation-error";
import NotFoundError from "../domain/errors/not-found-error";



export const getAllJobs = async(req:Request , res:Response,  next:NextFunction) => {
    
    try {
        const jobs = await Job.find(); 
        return res.status(200).json(jobs);
        
    } catch (error) {
        next(error)
    }
}

export const createJobs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobSchema = z.object({
      title: z.string(),
      description: z.string(),
      type: z.string(),
      location: z.string(),
    });

    const job = jobSchema.safeParse(req.body);
    if (!job.success) {
      return res.status(400).json({ error: job.error.format() });
    }

    await Job.create(job.data);
    return res.status(201).send();
  } catch (error) {
    next(error);
  }
};

export const getJobsById = async (req:Request, res:Response, next:NextFunction) => {

    try {
        const job = await Job.findById(req.params.id);
        if(!job) {
            return res.status(404).send();
            
        } 
        return res.json(job)
    } catch (error) {
       next(error); 
    }
   
   
}

export const deleteJobs = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const indexToRemove = await Job.findByIdAndDelete(req.params.id);
        if(!indexToRemove) {
            throw new NotFoundError("Job not found");
        }
        return res.status(200).json(indexToRemove);
    } catch (error) {
        next(error);
    }
   
}

export const updateJobs = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Update request received:", req.params.id, req.body);

    try {
        const jobSchema = z.object({
            title: z.string(),
            description: z.string(),
            type: z.string(),
            location: z.string(),
        });

        const parsed = jobSchema.safeParse(req.body);
        if (!parsed.success) {
            console.log("Validation error:", parsed.error.message);
            throw new ValidationError(parsed.error.message);
        }

        const jobToUpdate = await Job.findByIdAndUpdate(
            req.params.id,
            parsed.data,
            { new: true, runValidators: true }
        );

        if (!jobToUpdate) {
            console.log("Job not found:", req.params.id);
            throw new NotFoundError("Job Not Found");
        }

        console.log("Job updated successfully:", jobToUpdate);
        return res.status(200).send(jobToUpdate);
    } catch (error) {
        console.log("Error occurred:", error);
        next(error);
    }
};

export const noOfJobsPosted = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const countOfJobPost = await Job.countDocuments();
        if(!countOfJobPost){
            console.log("Not found the documents");
            return res.status(500);
        }
        return res.status(200).json(countOfJobPost);
    } catch (error) {
        next(error)
    }
}