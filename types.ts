
export interface TopArticle {
  title: string;
  summary: string;
  insight: string;
}

export interface ViralIdea {
  idea_id: number;
  short_hook: string;
  concept: string;
  tone: string;
  call_to_action: string;
  related_news_title: string;
  image_generation_prompt: string;
  on_image_text: string;
  caption: string;
  alt_text: string;
}

export interface ApiResponse {
  industry: string;
  top_articles: TopArticle[];
  viral_ideas: ViralIdea[];
}
