import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-black/10 border border-white/10 rounded-2xl overflow-hidden shadow-lg flex-shrink-0 w-[180px] sm:w-[200px] md:w-[220px] lg:w-[250px] flex flex-col animate-pulse">
      {/* Placeholder for image */}
      <div className="w-full h-32 sm:h-40 bg-gray-700"></div>
      
      {/* Placeholder for text content */}
      <div className="p-3 flex-grow flex-col">
        <div className="h-5 bg-gray-700 rounded w-3/4 mb-2"></div> {/* Product Name */}
        <div className="h-3 bg-gray-700 rounded w-1/2 mb-1"></div> {/* Category */}
        <div className="h-3 bg-gray-700 rounded w-2/5 mb-1"></div> {/* Store Name */}
        <div className="h-4 bg-gray-700 rounded w-1/3 mb-1"></div> {/* Price */}
        <div className="h-3 bg-gray-700 rounded w-1/4 mb-1"></div> {/* Rating/Reviews */}
        <div className="h-3 bg-gray-700 rounded w-1/3"></div> {/* Stock */}
      </div>
      
      {/* Placeholder for buttons */}
      <div className="flex gap-2 mt-auto p-3 pt-0">
        <div className="flex-1 h-8 bg-gray-700 rounded-lg"></div> {/* Add to Cart button */}
        <div className="w-8 h-8 bg-gray-700 rounded-lg"></div> {/* Wishlist button */}
      </div>
    </div>
  );
};

export default SkeletonCard;