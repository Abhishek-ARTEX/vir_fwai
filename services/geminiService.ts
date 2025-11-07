
import { GoogleGenAI, Type } from "@google/genai";
import type { ApiResponse } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        industry: { type: Type.STRING },
        top_articles: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    summary: { type: Type.STRING },
                    insight: { type: Type.STRING },
                },
                required: ["title", "summary", "insight"],
            },
        },
        viral_ideas: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    idea_id: { type: Type.INTEGER },
                    short_hook: { type: Type.STRING },
                    concept: { type: Type.STRING },
                    tone: { type: Type.STRING },
                    call_to_action: { type: Type.STRING },
                    related_news_title: { type: Type.STRING },
                    image_generation_prompt: { type: Type.STRING },
                    on_image_text: { type: Type.STRING },
                    caption: { type: Type.STRING },
                    alt_text: { type: Type.STRING },
                },
                required: [
                    "idea_id", "short_hook", "concept", "tone",
                    "call_to_action", "related_news_title",
                    "image_generation_prompt", "on_image_text",
                    "caption", "alt_text"
                ],
            },
        },
    },
    required: ["industry", "top_articles", "viral_ideas"],
};

export const generateViralPosts = async (industry: string): Promise<ApiResponse> => {
  const prompt = `
    You are an expert social media strategist and AI automation designer.

    Objective:
    Create 10 viral Instagram post concepts based on the latest trending news in a chosen industry.

    Steps:
    1. Research and summarize the *10 most trending and relevant news stories* in the **${industry}** industry. For each story, include:
       - title
       - one-sentence summary (max 20 words)
       - short insight on why it's going viral (10–15 words)

    2. Based on these news items, generate *10 unique viral post ideas*.
       For each idea, include:
       - idea_id (1–10)
       - short_hook (attention-grabbing line, ≤12 words)
       - concept (2–3 sentences explaining the post)
       - tone (choose: inspirational, informative, emotional, or thought-provoking)
       - call_to_action (short 1-line engagement prompt)
       - related_news_title (which article inspired it)

    3. For each viral idea, create both **visual and caption assets**:
       - image_generation_prompt → a *detailed* description for a square (1:1) Instagram post image. It must include a composition that leaves space for bold, readable overlay text (e.g., “top third clean for text”). Ensure good color contrast, minimal background clutter, and professional tone.
       - on_image_text → 6–12 words of impactful text that should appear boldly on the image.
       - caption → a well-written 2–4 paragraph Instagram caption (≤350 words) that:
           * opens with a strong hook,
           * summarizes the story or lesson in a simple, human way,
           * ends with a call to action and 3 relevant hashtags.
       - alt_text → a 20–40 word accessibility description of the final image.

    Formatting:
    Return the output strictly in clean, valid JSON.

    Rules:
    - Use simple, natural English.
    - Avoid jargon or overly technical terms.
    - Make sure on-image text is **highly readable** and the image prompt clearly reserves clean space for text.
    - The overall goal: make content that is informative, emotional, and easily shareable on Instagram.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.7,
            },
        });

        const jsonText = response.text.trim();
        const parsedData = JSON.parse(jsonText);

        return parsedData as ApiResponse;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate content from Gemini API.");
    }
};
