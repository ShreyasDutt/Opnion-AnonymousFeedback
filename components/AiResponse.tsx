'use client'
import { useEffect } from 'react';
import { useState } from 'react';
import { ResponsiveModal, ResponsiveModalContent, ResponsiveModalDescription, ResponsiveModalHeader, ResponsiveModalTitle, ResponsiveModalTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Loader2, Sparkles } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

export const AiResponse = ({ prompt }: { prompt: string }) => {

    const [data, setdata] = useState<string | null>(null);
    
  useEffect(() => {
    if (prompt.length === 0){
        setdata('## No Feedbacks Yet');
        return 
    };

    const handleAiResponse = async () => {
      try {
        const res = await fetch('/api/gemini', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt })
        });
        if (!res.ok) {
          throw new Error('Failed to fetch AI response');
        }
        const data = await res.json();
        setdata(data.reply);
      } catch (error) {
        console.log('Error in AiResponse:', error);
      }
    };

    handleAiResponse();
  }, [prompt]);

  return <div>
        <ResponsiveModal >
            <ResponsiveModalTrigger asChild>
            <Button
            className="mt-5 flex items-center fixed justify-center w-15 h-15 rounded-full bottom-5 right-5"
            variant={'outline'}
            >
            <Sparkles className="size-10" />
            </Button>
            </ResponsiveModalTrigger>
        <ResponsiveModalContent side={'top'}>
            <ResponsiveModalHeader>
            <ResponsiveModalTitle>Ai Summary</ResponsiveModalTitle>
            <ResponsiveModalDescription>
              Ai can help you summarize the feedbacks and provide insights.
            </ResponsiveModalDescription>
            {data ? <ReactMarkdown
            components={{
              h2: ({...props }) => <h2 className="text-lg text-slate-900 dark:text-gray-300 my-2 text-start" {...props} />,
              ul: ({...props }) => <ul className="list-disc text-slate-900 dark:text-gray-300 pl-5 text-start" {...props} />,
              li: ({...props }) => <li className="mb-1 text-start" {...props} />
            }}
            >{data || 'No data'}</ReactMarkdown> : <Loader2 className="animate-spin size-6 mx-auto mt-10" />}
          </ResponsiveModalHeader>
        </ResponsiveModalContent>
        </ResponsiveModal>
    </div>;
};

export default AiResponse;
