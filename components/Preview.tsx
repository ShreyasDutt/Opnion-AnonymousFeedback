import React from 'react';
import { Pencil } from 'lucide-react';
import { Button } from './ui/button';

const Preview = ({Header,CustomColor,SelectedColor,Custommessage,Questions}:{Header:string,CustomColor:string,SelectedColor:string,Custommessage:string,Questions:string[]}) => {

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
          {Header ? Header : 'Header Title goes here'}
        </h1>
        
        {/* Subtitle */}
        <p className="text-center mb-8">
          {Custommessage?Custommessage : "Your custom message goes here..."}
        </p>
        
        {/* Questions section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-1 ">
            QUESTIONS
          </h2>
          <div className="h-1 w-12 bg-blue-600 mb-6"></div>
          
          {Questions.length > 0 && (
            <ul className="space-y-3">
              {Questions.map((q, i) => (
                <li className="flex items-start" key={i}>
                  <span className="text-gray-400 mr-2">•</span>
                  {q}
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Buttons */}
<Button
  className="w-full mb-2 text-white"
  style={{backgroundColor:SelectedColor}}
>
  <Pencil size={20} />
  Send Feedback
</Button>

      </div>
    </div>
  );
};

export default Preview;