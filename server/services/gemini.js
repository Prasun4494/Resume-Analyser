const OpenAI = require('openai');
require('dotenv').config();

// OpenRouter is OpenAI-compatible, so we use the OpenAI SDK with custom baseURL
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});

const analyzeResume = async (resumeText) => {
  const systemPrompt = `You are an expert Resume Analyst. You MUST respond with ONLY valid JSON. No explanations, no markdown, no code blocks - just pure JSON.`;

  const userPrompt = `Analyze this resume and respond with ONLY this JSON structure (fill in actual values):

{"technicalSkills":["skill1","skill2"],"softSkills":["skill1","skill2"],"experienceScore":75,"formattingScore":80,"atsScore":70,"suggestions":["suggestion1","suggestion2"],"summary":"Brief summary","projectFeedback":"Project feedback"}

Resume:
${resumeText}`;

  try {
    const response = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ]
    });

    const text = response.choices[0]?.message?.content || "";
    console.log("DeepSeek Raw Response (first 500 chars):", text.substring(0, 500));

    // Try multiple methods to extract JSON
    let jsonString = null;

    // Method 1: Look for JSON code block
    const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (codeBlockMatch) {
      jsonString = codeBlockMatch[1].trim();
      console.log("Found JSON in code block");
    }

    // Method 2: Find JSON object directly - be more careful with nested braces
    if (!jsonString) {
      const jsonStartIndex = text.indexOf('{');
      if (jsonStartIndex !== -1) {
        // Find the matching closing brace
        let braceCount = 0;
        let jsonEndIndex = -1;
        for (let i = jsonStartIndex; i < text.length; i++) {
          if (text[i] === '{') braceCount++;
          if (text[i] === '}') braceCount--;
          if (braceCount === 0) {
            jsonEndIndex = i;
            break;
          }
        }

        if (jsonEndIndex !== -1) {
          jsonString = text.substring(jsonStartIndex, jsonEndIndex + 1);
          console.log("Found JSON by brace matching");
        }
      }
    }

    if (!jsonString) {
      console.log("Full response for debugging:", text);
      throw new Error("Could not find JSON in DeepSeek response");
    }

    // Clean up common issues
    jsonString = jsonString
      .replace(/,\s*}/g, '}')
      .replace(/,\s*]/g, ']')
      .replace(/[\r\n]+/g, ' ')
      .replace(/\s+/g, ' ');

    console.log("Extracted JSON (first 300 chars):", jsonString.substring(0, 300));

    const parsed = JSON.parse(jsonString);

    // Validate and provide defaults for missing fields
    return {
      technicalSkills: Array.isArray(parsed.technicalSkills) ? parsed.technicalSkills : ["Not specified"],
      softSkills: Array.isArray(parsed.softSkills) ? parsed.softSkills : ["Not specified"],
      experienceScore: typeof parsed.experienceScore === 'number' ? parsed.experienceScore : 50,
      formattingScore: typeof parsed.formattingScore === 'number' ? parsed.formattingScore : 70,
      atsScore: typeof parsed.atsScore === 'number' ? parsed.atsScore : 60,
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : ["Please review your resume"],
      summary: parsed.summary || "Resume analysis completed.",
      projectFeedback: parsed.projectFeedback || "No specific project feedback available."
    };
  } catch (error) {
    console.error("DeepSeek Analysis Error:", error.message);

    return {
      "technicalSkills": ["Could not extract skills"],
      "softSkills": ["Could not extract skills"],
      "experienceScore": 0,
      "formattingScore": 0,
      "atsScore": 0,
      "suggestions": ["Analysis failed. Please try again later."],
      "summary": "We encountered an error processing your resume: " + error.message,
      "projectFeedback": "N/A"
    };
  }
};

module.exports = { analyzeResume };
