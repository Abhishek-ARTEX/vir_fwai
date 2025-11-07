
import React from 'react';
import type { TopArticle } from '../types';

interface ArticleCardProps {
  article: TopArticle;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="bg-black p-6 border border-white shadow-md">
      <h3 className="text-xl font-bold text-white">{article.title}</h3>
      <p className="mt-2 text-gray-300">{article.summary}</p>
      <div className="mt-4 pt-4 border-t border-gray-700">
        <p className="text-sm text-gray-400 italic">
          <span className="font-semibold text-white">Why it's trending:</span> {article.insight}
        </p>
      </div>
    </div>
  );
};

export default ArticleCard;