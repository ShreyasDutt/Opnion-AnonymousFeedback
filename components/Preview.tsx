import React from 'react';
import { Pencil } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown'


const Preview = ({Header,SelectedColor,CustomColor,Custommessage,Questions,LogoUrl,Rounded}:{Header:string,CustomColor:string,SelectedColor:string,Custommessage:string,Questions:string[],LogoUrl:string|undefined,Rounded:boolean}) => {

  const Color: string = CustomColor || SelectedColor || 'var(--primary)';
  return (
    <div className=" flex items-center justify-center p-4 w-full">
      <div className="w-full max-w-md border rounded-2xl p-4 relative">
        {/* Live preview badge */}
        <div className="flex items-center gap-2 absolute -top-3 left-6 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium border">
          Live preview <p className='h-2.5 w-2.5 bg-white rounded-full animate-pulse'></p>
        </div>
        
        {/* Logo */}
        <div className="flex justify-center mt-6 mb-6">
          {LogoUrl? 
          <Image src={LogoUrl} alt="Space Logo" width={100} height={100} className={`mb-3 border-2 shadow-lg ${Rounded ? 'rounded-full' : 'rounded-sm'}`} style={{ borderColor: Color }}/>          
          : 
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center relative">
            <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
            <div className="absolute top-2 right-2 w-3 h-3 bg-blue-800 rounded-full"></div>
          </div>}
        </div> 
        
        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-2">
          {Header ? Header : 'Header Title goes here'}
        </h1>
        
        {/* Subtitle */}
        <p className="text-center mb-8">
          {Custommessage?<ReactMarkdown
            components={{
              h2: ({ node, ...props }) => <h2 className="text-lg text-gray-300 my-2 text-start" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc text-gray-300 pl-5 text-start" {...props} />,
              li: ({ node, ...props }) => <li className="mb-1 text-start" {...props} />,
              p: ({ node, ...props }) => <p className="mb-1 text-start" {...props} />,
            }}
          >{Custommessage}</ReactMarkdown> : "Your custom message goes here..."}
        </p>
        
        {/* Questions section */}
        <div>

            {Questions.length > 0 && (
              <ul className="space-y-3 mb-8">
              <h2 className="text-lg font-semibold mb-1 ">
              QUESTIONS
            </h2>
            <div className="h-1 w-30" style={{ backgroundColor: Color }}></div>
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
  style={{backgroundColor:Color}}
>
  <Pencil size={20} />
  Send Feedback
</Button>

      </div>
    </div>
  );
};

export default Preview;