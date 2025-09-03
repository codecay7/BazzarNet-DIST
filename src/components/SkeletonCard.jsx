import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-black/10 border border-white/10 rounded-2xl p-6 flex flex-col shadow-lg animate-pulse">
      <div className="w-full h-48 bg-gray-700 rounded-lg mb-4"></div>
      <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-5 bg-gray-700 rounded w-1/2 mb-4"></div>
      <div className="flex gap-2 mt-auto">
        <div className="flex-1 h-10 bg-gray-700 rounded-lg"></div>
        <div className="w-10 h-10 bg-gray-700 rounded-lg"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;