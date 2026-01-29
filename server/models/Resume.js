const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
    technicalSkills: [String],
    softSkills: [String],
    experienceScore: Number, // 0-100
    formattingScore: Number, // 0-100
    atsScore: Number, // 0-100
    suggestions: [String],
    summary: String,
    projectFeedback: String,
});

const resumeSchema = new mongoose.Schema({
    originalFilename: String,
    uploadDate: { type: Date, default: Date.now },
    parsedText: String, // Store parsed text if needed
    analysis: analysisSchema,
});

module.exports = mongoose.model('Resume', resumeSchema);
