
import { GoogleGenAI } from "@google/genai";
import type { ApiResponse } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateViralPosts = async (industry: string): Promise<ApiResponse> => {
  const prompt = `
    You are an expert social media strategist powered by Google Search. Your task is to analyze real-time search trends and news for a specific industry and generate viral content ideas.

    INDUSTRY: "${industry}"

    Using Google Search, perform the following steps:

    1.  **Find Trending News:** Identify the top 10 most current, trending, and relevant news stories for the specified industry.
    2.  **Generate Content Plan:** Based on this research, create a comprehensive content plan.

    Your final output MUST be a single, clean, valid JSON object that follows this structure exactly:
    {
      "industry": "The industry provided",
      "top_articles": [
        {
          "title": "News article title",
          "summary": "A one-sentence summary of the article (max 20 words).",
          "insight": "A short insight on why this story is currently trending (10-15 words)."
        }
      ],
      "viral_ideas": [
        {
          "idea_id": 1,
          "short_hook": "An attention-grabbing line (<=12 words).",
          "concept": "A 2-3 sentence explanation of the post concept.",
          "tone": "Choose one: inspirational, informative, emotional, or thought-provoking.",
          "call_to_action": "A short, 1-line engagement prompt.",
          "related_news_title": "The title of the news article that inspired this idea.",
          "image_generation_prompt": "A detailed prompt for a square (1:1) Instagram image. It must describe a composition that leaves clean space for overlay text (e.g., 'top third is a clean sky for text overlay'). Ensure good color contrast and a professional tone.",
          "on_image_text": "6-12 words of impactful text to overlay on the image.",
          "caption": "A well-written 2-4 paragraph Instagram caption (<=350 words) that opens with a strong hook, summarizes the story, and ends with a call to action and 3 relevant hashtags.",
          "alt_text": "A 20-40 word accessibility description of the final image."
        }
      ]
    }

    RULES:
    - The output must be ONLY the JSON object. No introductory text, no markdown, just the raw JSON.
    - Ensure all 10 articles and 10 viral ideas are generated.
    - The content should be engaging, shareable, and tailored for Instagram.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{googleSearch: {}}], // Use Google Search grounding
                temperature: 0.7,
            },
        });

        const jsonText = response.text.trim();
        // Sometimes the model might wrap the JSON in ```json ... ```, so we strip it.
        const cleanedJsonText = jsonText.replace(/^```json\n/, '').replace(/\n```$/, '');
        const parsedData = JSON.parse(cleanedJsonText);

        return parsedData as ApiResponse;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate content from Gemini API.");
    }
};
