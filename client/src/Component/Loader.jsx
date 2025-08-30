import React from 'react';
import { FaSkullCrossbones } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black">
      {/* Spinner */}
      <div className="relative">
        <div className="animate-spin rounded-full h-24 w-24 border-4 border-t-transparent border-gray-300 shadow-lg flex items-center justify-center"></div>

        {/* Inner dot */}
        <div className="absolute top-8 left-8
        "><FaSkullCrossbones size={30} className='text-gray-300'/></div>
      </div>

      {/* Loading text */}
      <p className="text-gray-100 mt-6 text-lg animate-pulse">Hang tight...</p>
    </div>
  );
};

export default Loader;
