import OpenAI from "openai";
import JobApplication from "../infrastructure/schemas/job-application";
import { Types } from "mongoose";

export const generateRating = async (jobApplicationId:Types.ObjectId) => {
  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const jobApplication = await JobApplication.findById(jobApplicationId).populate<{ job: { title: string; answers: string[] } }>("job");

    if (!jobApplication) {
      console.error("Job application not found");
      return;
    }

    const content = `Role:${jobApplication.job.title}, User Description:${jobApplication.answers.join(". ")}`;

    const completion = await client.chat.completions.create({
      messages: [{ role: "user", content }],
      model: "ft:gpt-3.5-turbo-0125:stemlink:aidrivenproject:9gqqc76N"
    });

    const strResponse = completion.choices[0].message.content;
    console.log("Response from model:", strResponse);
    if (!strResponse) {
    return;
  }
    const response = JSON.parse(strResponse);

    if (!response.rate) {
      console.error("Rating not found in response");
      return;
    }

    const updateResult = await JobApplication.findOneAndUpdate(
      { _id: jobApplicationId },
      { rating: response.rate },
      { new: true }  // Return the updated document
    );

    if (!updateResult) {
      console.error("Failed to update the job application");
    } else {
      console.log("Updated job application:", updateResult);
    }
  } catch (error) {
    console.error("Error in generating rating:", error);
  }
};
