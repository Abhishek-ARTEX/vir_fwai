
import React, { useState, useCallback } from 'react';
import { generateViralPosts } from './services/geminiService';
import type { ApiResponse, ViralIdea } from './types';
import IndustryInput from './components/IndustryInput';
import LoadingDisplay from './components/LoadingDisplay';
import ResultsDisplay from './components/ResultsDisplay';

const App: React.FC = () => {
  const [industry, setIndustry] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [results, setResults] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!industry.trim()) {
      setError('Please enter an industry.');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      setLoadingMessage('Researching trending news in your industry...');
      const response = await generateViralPosts(industry);
      setLoadingMessage('Generating viral post concepts...'); // This is fast, but good for UX
      setResults(response);
    } catch (err) {
      console.error(err);
      setError('An error occurred while generating content. Please check your API key and try again.');
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  }, [industry]);

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
            Viral Post Generator AI
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Enter an industry to get 10 viral Instagram post concepts, complete with captions and image prompts, based on the latest trending news.
          </p>
        </header>

        <main>
          <IndustryInput
            industry={industry}
            setIndustry={setIndustry}
            onGenerate={handleGenerate}
            isLoading={loading}
          />

          {error && (
            <div className="mt-8 text-center bg-gray-900 border border-white text-white p-4">
              <p>{error}</p>
            </div>
          )}

          {loading && <LoadingDisplay message={loadingMessage} />}

          {results && <ResultsDisplay results={results} />}
        </main>
        
        <footer className="text-center mt-12 text-gray-500 text-sm">
            <p>Powered by Gemini AI</p>
        </footer>
      </div>
    </div>
  );
};

export default App;