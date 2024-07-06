import { Request, Response, NextFunction } from "express";

const GlobalErrorHandler = (error:Error, req:Request, res:Response, next:NextFunction) => {
    console.log(error);  // Ensure this logs the full error object for debugging
    switch (error.name) {
        case "NotFoundError":
            return res.status(404).json({ message: error.message.replace(/\n/g, "") });
        case "ValidationError":
            return res.status(400).json({ message: error.message.replace(/\n/g, "") });
        case "Unauthenticated":
            return res.status(401).json({ message: error.message.replace(/\n/g, "") });
        case "ForbiddenError":
            return res.status(403).json({ message: error.message.replace(/\n/g, "") })
        default:
            return res.status(500).json({ message: error.message.replace(/\n/g, "") });
    }
}

export default GlobalErrorHandler;