# HirelyAI - AI Shortlisting System Backend

## Overview
This is the backend API for HirelyAI, an AI-powered candidate shortlisting system that evaluates job applicants based on their responses to dynamic screening questions.

## Features
- User authentication via Clerk
- Job posting management
- Dynamic screening question generation
- AI-based evaluation of candidate responses
- Candidate ranking and classification

## Setup and Installation

### Prerequisites
- MongoDB account and database
- Clerk account for authentication
- OpenAI API key
- Node.js and npm installed

### Installation Steps
1. Clone the repository:
```
git clone https://github.com/Husnixix/ai-shortlisting-backend.git
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file in the root directory with the following:
```
MONGO_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
OPENAI_API_KEY=your_openai_api_key
```

4. Start the development server:
```
npm run dev
```

## Environment Variables
- `MONGO_URI`: Your MongoDB connection string
- `CLERK_SECRET_KEY`: Your Clerk secret key for authentication
- `CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key
- `OPENAI_API_KEY`: Your OpenAI API key for AI features

## Third-Party Services
- **MongoDB**: Sign up and create a database at [https://www.mongodb.com/docs/](https://www.mongodb.com/docs/)
- **Clerk Authentication**: Set up a project at [https://clerk.com/docs](https://clerk.com/docs)
- **OpenAI API**: Get an API key at [https://platform.openai.com/docs](https://platform.openai.com/docs)

## AI Implementation
AI implementation setup instructions will be provided soon. Note that without properly configuring the OpenAI integration, the project will run but AI-based candidate evaluation features will not function.

## Frontend Integration
This backend serves the HirelyAI frontend application. Make sure to set up the frontend as well:
[HirelyAI Frontend Repository](https://github.com/Husnixix/ai-booking-frontend.git)
