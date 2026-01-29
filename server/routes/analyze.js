const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdfParse = require('pdf-parse');
const Resume = require('../models/Resume');
const { analyzeResume } = require('../services/gemini');

const upload = multer(); // Memory storage

router.post('/', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const buffer = req.file.buffer;
        let text = '';

        // Simple text extraction (assumes PDF for now)
        if (req.file.mimetype === 'application/pdf') {
            const data = await pdfParse(buffer);
            text = data.text;
        } else {
            // Fallback for text/other (simplified)
            text = buffer.toString('utf-8');
        }

        if (!text.trim()) {
            return res.status(400).json({ error: 'Could not extract text from file.' });
        }

        // Analyze with Gemini
        const analysisResult = await analyzeResume(text);

        // Save to Database
        const newResume = new Resume({
            originalFilename: req.file.originalname,
            parsedText: text,
            analysis: analysisResult
        });

        await newResume.save();

        res.json(newResume);

    } catch (error) {
        console.error("Analysis Process Error Full Stack:", error);
        res.status(500).json({
            error: 'Failed to process resume',
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

module.exports = router;
