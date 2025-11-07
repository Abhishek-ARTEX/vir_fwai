
import React, { useState } from 'react';
import type { ViralIdea } from '../types';

interface PostIdeaCardProps {
  idea: ViralIdea;
}

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);


const CopyButton: React.FC<{ textToCopy: string }> = ({ textToCopy }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button onClick={handleCopy} className="p-1 bg-gray-800 hover:bg-gray-700 transition-colors">
            {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
    );
};

const PostIdeaCard: React.FC<PostIdeaCardProps> = ({ idea }) => {
  const [allCopied, setAllCopied] = useState(false);

  const handleCopyAll = () => {
    const allText = `
--- ON-IMAGE TEXT ---
${idea.on_image_text}

--- CAPTION ---
${idea.caption}

--- IMAGE PROMPT ---
${idea.image_generation_prompt}

--- ALT TEXT ---
${idea.alt_text}
    `;
    navigator.clipboard.writeText(allText.trim());
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2000);
  };

  return (
    <div className="bg-black border border-white shadow-xl overflow-hidden flex flex-col h-full">
      <div className="aspect-square w-full bg-black flex items-center justify-center p-6 relative">
        <img src={`https://picsum.photos/seed/${idea.idea_id}/400/400`} alt="Placeholder" className="absolute inset-0 w-full h-full object-cover opacity-20"/>
        <p className="relative text-2xl font-bold text-center text-white leading-tight shadow-text-lg">
          {idea.on_image_text}
        </p>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <span className="inline-block bg-gray-800 text-white text-xs font-semibold px-3 py-1 mb-3 self-start">
          {idea.tone}
        </span>
        <h3 className="text-xl font-bold mb-2 text-white">{idea.short_hook}</h3>
        <p className="text-gray-400 text-sm mb-4 flex-grow">{idea.concept}</p>
        
        <div className="space-y-2 text-sm mt-auto">
           <button 
             onClick={handleCopyAll}
             className="w-full bg-white text-black font-semibold py-2 px-4 transition-colors duration-200 hover:bg-gray-300"
           >
             {allCopied ? 'Copied!' : 'Copy All Assets'}
           </button>
          <details className="bg-gray-900 p-3">
            <summary className="font-semibold text-white cursor-pointer">View Individual Assets</summary>
            <div className="mt-3 space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                    <h4 className="font-semibold text-white">Caption</h4>
                    <CopyButton textToCopy={idea.caption} />
                </div>
                <p className="text-gray-400 whitespace-pre-wrap bg-black p-2">{idea.caption}</p>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                    <h4 className="font-semibold text-white">Image Prompt</h4>
                    <CopyButton textToCopy={idea.image_generation_prompt} />
                </div>
                <p className="text-gray-400 italic bg-black p-2">{idea.image_generation_prompt}</p>
              </div>
              <div>
                 <h4 className="font-semibold text-white mb-1">Alt Text</h4>
                 <p className="text-gray-400 italic bg-black p-2">{idea.alt_text}</p>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default PostIdeaCard;
