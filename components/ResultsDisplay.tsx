
import React, { useState } from 'react';
import type { ApiResponse } from '../types';
import ArticleCard from './ArticleCard';
import PostIdeaCard from './PostIdeaCard';

interface ResultsDisplayProps {
  results: ApiResponse;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'news'>('posts');

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-center mb-2">
        Your Viral Content Plan for <span className="text-white">{results.industry}</span>
      </h2>
      <p className="text-center text-gray-400 mb-8">Here's what we've generated for you.</p>

      <div className="flex justify-center border-b border-white mb-8">
        <button
          onClick={() => setActiveTab('posts')}
          className={`px-6 py-3 font-semibold text-lg transition-colors duration-200 ${
            activeTab === 'posts'
              ? 'border-b-2 border-white text-white'
              : 'text-gray-500 hover:text-white'
          }`}
        >
          Viral Post Ideas (10)
        </button>
        <button
          onClick={() => setActiveTab('news')}
          className={`px-6 py-3 font-semibold text-lg transition-colors duration-200 ${
            activeTab === 'news'
              ? 'border-b-2 border-white text-white'
              : 'text-gray-500 hover:text-white'
          }`}
        >
          Top News Articles (10)
        </button>
      </div>

      <div>
        {activeTab === 'posts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.viral_ideas.map((idea) => (
              <PostIdeaCard key={idea.idea_id} idea={idea} />
            ))}
          </div>
        )}
        {activeTab === 'news' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {results.top_articles.map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsDisplay;