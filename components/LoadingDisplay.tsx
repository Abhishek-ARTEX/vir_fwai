
import React from 'react';

interface LoadingDisplayProps {
  message: string;
}

const LoadingDisplay: React.FC<LoadingDisplayProps> = ({ message }) => {
  return (
    <div className="text-center my-12">
      <div className="inline-block animate-spin h-12 w-12 border-t-2 border-b-2 border-white"></div>
      <p className="mt-4 text-lg text-white">{message}</p>
    </div>
  );
};

export default LoadingDisplay;