import React from 'react';
import { Pencil } from 'lucide-react';
import { Button } from './ui/button';

const Preview = () => {
  return (
    <div className=" flex items-center justify-center p-4">
      <div className="w-full max-w-md border rounded-2xl p-4 relative">
        {/* Live preview badge */}
        <div className="absolute -top-3 left-6 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          Live preview
        </div>
        
        {/* Logo */}
        <div className="flex justify-center mt-6 mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center relative">
            <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
            <div className="absolute top-2 right-2 w-3 h-3 bg-blue-800 rounded-full"></div>
          </div>
        </div>
        
        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-2">
          Title Here
        </h1>
        
        {/* Subtitle */}
        <p className="text-center mb-8">
          Custom message
        </p>
        
        {/* Questions section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-1 ">
            QUESTIONS
          </h2>
          <div className="h-1 w-12 bg-blue-600 mb-6"></div>
          
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              Who are you / what are you working on?
            </li>
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              How has [our product / service] helped you?
            </li>
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              What is the best thing about [our product / service]
            </li>
          </ul>
        </div>
        
        {/* Buttons */}
          <Button className='w-full mb-2'>
            <Pencil size={20} />
            Send Feedback
          </Button>
      </div>
    </div>
  );
};

export default Preview;