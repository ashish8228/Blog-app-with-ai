import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white">
      {/* Spinner */}
      <div className="relative">
        <div className="animate-spin rounded-full h-24 w-24 border-4 border-t-transparent border-blue-500 shadow-lg"></div>

        {/* Inner dot */}
        <div className="absolute top-1/2 left-1/2 h-4 w-4 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
      </div>

      {/* Loading text */}
      <p className="text-gray-900 mt-6 text-lg animate-pulse">Hang tight...</p>
    </div>
  );
};

export default Loader;
