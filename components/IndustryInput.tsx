
import React from 'react';

interface IndustryInputProps {
  industry: string;
  setIndustry: (industry: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const IndustryInput: React.FC<IndustryInputProps> = ({ industry, setIndustry, onGenerate, isLoading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isLoading) {
      onGenerate();
    }
  };
    
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center gap-4 p-2 bg-black border border-white shadow-lg">
        <input
          type="text"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., Sustainable Fashion, AI, Electric Vehicles..."
          className="w-full sm:flex-1 bg-transparent text-white placeholder-gray-500 py-3 px-6 focus:outline-none"
          disabled={isLoading}
        />
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black font-semibold py-3 px-8 transition-all duration-300 ease-in-out hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            'Generate Posts'
          )}
        </button>
      </div>
    </div>
  );
};

export default IndustryInput;