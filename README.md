# 🚀 Smart Resume Analyzer

<p align="center">
  <img src="https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-5+-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/DeepSeek-AI-FF6B35?style=for-the-badge&logo=openai&logoColor=white" alt="DeepSeek AI"/>
</p>

> An AI-powered resume analysis tool that provides instant, ATS-friendly feedback to help job seekers optimize their resumes and improve their chances of landing their dream job.

---

## 📚 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#️-technology-stack)
- [Project Architecture](#-project-architecture)
- [File Structure](#-file-structure)
- [How It Works](#-how-it-works)
- [API Endpoints](#-api-endpoints)
- [Key Concepts to Study](#-key-concepts-to-study)
- [Setup and Installation](#️-setup-and-installation)
- [Environment Variables](#-environment-variables)
- [Learning Resources](#-learning-resources)

---

## 🎯 Overview

Smart Resume Analyzer is a **full-stack web application** that leverages **AI (DeepSeek model via OpenRouter)** to analyze resumes and provide comprehensive feedback including:

- Technical and soft skills extraction
- ATS (Applicant Tracking System) compatibility score
- Experience and formatting scores
- Actionable improvement suggestions
- Project feedback

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📄 **PDF Upload** | Drag-and-drop or click to upload PDF resumes |
| 🤖 **AI Analysis** | Uses DeepSeek R1 model for intelligent resume parsing |
| 📊 **Scoring System** | Provides ATS, Experience, and Formatting scores |
| 💡 **Smart Suggestions** | Actionable recommendations to improve your resume |
| 🔧 **Skill Extraction** | Identifies both technical and soft skills |
| 💾 **Data Persistence** | Stores analysis results in MongoDB |

---

## 🛠️ Technology Stack

### Frontend (Client)

| Technology | Purpose |
|-----------|---------|
| **React 18+** | UI library for building component-based interfaces |
| **Vite** | Modern build tool with fast HMR (Hot Module Replacement) |
| **Tailwind CSS** | Utility-first CSS framework for styling |
| **ES6+ JavaScript** | Modern JavaScript features |

### Backend (Server)

| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express 5** | Web application framework |
| **MongoDB + Mongoose** | Database and ODM for data persistence |
| **Multer** | Middleware for handling file uploads |
| **pdf-parse** | Library for extracting text from PDFs |
| **OpenAI SDK** | Client for OpenRouter API (DeepSeek model) |

---

## 🏗 Project Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CLIENT (React + Vite)                     │
│                                                                      │
│  ┌──────────────────┐    ┌──────────────────┐    ┌────────────────┐ │
│  │   UploadSection   │───▶│      App.jsx      │───▶│ AnalysisResult │ │
│  │  (File Upload)    │    │   (State Mgmt)    │    │   (Display)    │ │
│  └──────────────────┘    └────────┬─────────┘    └────────────────┘ │
│                                   │                                  │
└───────────────────────────────────┼──────────────────────────────────┘
                                    │ HTTP POST (FormData)
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         SERVER (Node.js + Express)                   │
│                                                                      │
│  ┌──────────────┐    ┌────────────────┐    ┌─────────────────────┐  │
│  │   index.js    │───▶│ routes/analyze │───▶│ services/gemini.js  │  │
│  │ (Entry Point) │    │  (API Route)   │    │  (AI Integration)   │  │
│  └──────────────┘    └───────┬────────┘    └──────────┬──────────┘  │
│                              │                        │              │
│                              ▼                        ▼              │
│                     ┌────────────────┐      ┌──────────────────┐    │
│                     │    MongoDB      │      │   OpenRouter AI   │    │
│                     │   (Storage)     │      │   (DeepSeek R1)   │    │
│                     └────────────────┘      └──────────────────┘    │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📁 File Structure

```
Smart Analyser/
├── 📂 client/                      # Frontend React Application
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── UploadSection.jsx   # File upload component with drag-drop
│   │   │   └── AnalysisResult.jsx  # Displays AI analysis results
│   │   ├── App.jsx                 # Main application component
│   │   ├── App.css                 # Application styles
│   │   ├── index.css               # Global styles
│   │   └── main.jsx                # React entry point
│   ├── index.html                  # HTML template
│   ├── vite.config.js              # Vite configuration
│   └── package.json                # Frontend dependencies
│
├── 📂 server/                      # Backend Node.js Application
│   ├── 📂 models/
│   │   └── Resume.js               # Mongoose schema for resume data
│   ├── 📂 routes/
│   │   └── analyze.js              # API route for resume analysis
│   ├── 📂 services/
│   │   └── gemini.js               # AI service (DeepSeek integration)
│   ├── index.js                    # Express server entry point
│   ├── .env                        # Environment variables (not committed)
│   └── package.json                # Backend dependencies
│
├── .gitignore                      # Git ignore patterns
└── README.md                       # This file
```

---

## 🔄 How It Works

### Step-by-Step Flow

```
1️⃣ USER UPLOADS RESUME
   └── User drags & drops or selects a PDF file
   
2️⃣ FILE HANDLING (UploadSection.jsx)
   └── Frontend creates FormData and sends POST request
   
3️⃣ SERVER RECEIVES FILE (routes/analyze.js)
   └── Multer middleware parses multipart form data
   └── pdf-parse extracts text from PDF
   
4️⃣ AI ANALYSIS (services/gemini.js)
   └── Resume text sent to DeepSeek R1 via OpenRouter
   └── AI returns structured JSON with analysis
   
5️⃣ DATA PERSISTENCE (MongoDB)
   └── Analysis saved to database via Mongoose
   
6️⃣ RESPONSE SENT TO CLIENT
   └── JSON response displayed in AnalysisResult component
```

### Key Code Snippets

#### Frontend: File Upload Handler (App.jsx)

```javascript
const handleUpload = async (file) => {
  setLoading(true);
  const formData = new FormData();
  formData.append('resume', file);

  const response = await fetch(`${API_URL}/api/analyze`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  setAnalysisData(data.analysis);
};
```

#### Backend: Route Handler (routes/analyze.js)

```javascript
router.post('/', upload.single('resume'), async (req, res) => {
  const buffer = req.file.buffer;
  
  // Extract text from PDF
  const data = await pdfParse(buffer);
  const text = data.text;
  
  // Analyze with AI
  const analysisResult = await analyzeResume(text);
  
  // Save to database
  const newResume = new Resume({
    originalFilename: req.file.originalname,
    parsedText: text,
    analysis: analysisResult
  });
  await newResume.save();
  
  res.json(newResume);
});
```

#### AI Service: DeepSeek Integration (services/gemini.js)

```javascript
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});

const analyzeResume = async (resumeText) => {
  const response = await openai.chat.completions.create({
    model: "deepseek/deepseek-r1",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt + resumeText }
    ]
  });
  
  // Parse and return structured analysis
  return parsedAnalysis;
};
```

---

## 📡 API Endpoints

### POST `/api/analyze`

Analyzes an uploaded resume and returns AI-generated insights.

**Request:**
```http
POST /api/analyze
Content-Type: multipart/form-data

resume: <PDF File>
```

**Response:**
```json
{
  "_id": "...",
  "originalFilename": "resume.pdf",
  "parsedText": "... extracted text ...",
  "analysis": {
    "technicalSkills": ["JavaScript", "React", "Node.js"],
    "softSkills": ["Communication", "Leadership"],
    "experienceScore": 75,
    "formattingScore": 80,
    "atsScore": 70,
    "suggestions": ["Add more quantifiable achievements"],
    "summary": "Strong technical background...",
    "projectFeedback": "Projects demonstrate practical skills..."
  }
}
```

---

## 📖 Key Concepts to Study

### 1. **React Fundamentals**
- **useState Hook**: Managing component state
- **Conditional Rendering**: Showing loading states, errors, results
- **Props**: Passing data between components
- **Event Handling**: Form submissions, drag-drop events

### 2. **Modern JavaScript (ES6+)**
- **Async/Await**: Handling promises cleanly
- **Destructuring**: Extracting object properties
- **Arrow Functions**: Concise function syntax
- **Template Literals**: String interpolation

### 3. **Node.js & Express**
- **Middleware**: CORS, body parsing, file uploads
- **Routes**: Organizing API endpoints
- **Error Handling**: Try-catch blocks, error responses

### 4. **MongoDB & Mongoose**
- **Schemas**: Defining data structure
- **Models**: Database operations (save, find, etc.)
- **Connection**: Environment-based database URI

### 5. **File Upload Handling**
- **Multer**: Processing multipart/form-data
- **Memory Storage**: Keeping files in buffer
- **pdf-parse**: Extracting text from PDFs

### 6. **AI Integration**
- **OpenAI SDK**: Compatible with OpenRouter
- **Prompt Engineering**: Crafting effective AI prompts
- **JSON Parsing**: Extracting structured data from AI responses

### 7. **CORS (Cross-Origin Resource Sharing)**
- Understanding same-origin policy
- Configuring allowed origins
- Handling preflight requests

---

## ⚙️ Setup and Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB instance (local or cloud)
- OpenRouter API key

### Installation Steps

```bash
# 1. Clone the repository
git clone <repository-url>
cd "Smart Analyser"

# 2. Install server dependencies
cd server
npm install

# 3. Install client dependencies
cd ../client
npm install

# 4. Set up environment variables (see below)

# 5. Start the server (from /server directory)
npm run dev
# Server runs on http://localhost:5000

# 6. Start the client (from /client directory)
npm run dev
# Client runs on http://localhost:5173
```

---

## 🔐 Environment Variables

Create a `.env` file in the `/server` directory:

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# OpenRouter API Key (for DeepSeek AI)
OPENROUTER_API_KEY=your_openrouter_api_key

# Server Port (optional, default: 5000)
PORT=5000
```

For the client, create a `.env` file in the `/client` directory (optional):

```env
# API URL (optional, default: http://localhost:5000)
VITE_API_URL=http://localhost:5000
```

---

## 📚 Learning Resources

### React
- [Official React Documentation](https://react.dev/)
- [React Hooks Guide](https://react.dev/reference/react/hooks)
- [Vite Documentation](https://vitejs.dev/)

### Node.js & Express
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Multer File Upload](https://github.com/expressjs/multer)

### MongoDB
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Mongoose Quick Start](https://mongoosejs.com/docs/)

### AI Integration
- [OpenRouter Documentation](https://openrouter.ai/docs)
- [Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)

### CSS & Styling
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## 🧪 Testing the Application

1. **Start both servers** (backend on port 5000, frontend on port 5173)
2. **Open browser** at `http://localhost:5173`
3. **Upload a PDF resume** using the drag-drop area
4. **View the AI analysis** with scores and suggestions

---

## 🎓 Study Questions

Test your understanding with these questions:

1. How does the `useState` hook manage the upload state in `App.jsx`?
2. What is the purpose of `FormData` when uploading files?
3. How does Multer handle file uploads in memory storage mode?
4. Why do we use `pdf-parse` and what does it return?
5. Explain how the AI prompt engineering works in `gemini.js`
6. What is the role of CORS middleware and why is it necessary?
7. How does Mongoose connect to MongoDB and save documents?
8. What happens if the AI returns invalid JSON?

---

## 📝 License

This project is for educational purposes.

---

<p align="center">
  Made with ❤️ for learning full-stack development
</p>
