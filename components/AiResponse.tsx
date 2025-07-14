'use client'
import { useEffect } from 'react';
import { useState } from 'react';
import { ResponsiveModal, ResponsiveModalContent, ResponsiveModalDescription, ResponsiveModalHeader, ResponsiveModalTitle, ResponsiveModalTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Loader2, Sparkles } from 'lucide-react'
import { Textarea } from './ui/textarea'
export const AiResponse = ({ prompt }: { prompt: string }) => {


    const [data, setdata] = useState<string | null>(null);

    console.log('Prompt received in AiResponse:', prompt)
    
  useEffect(() => {
    if (prompt.length === 0){
        setdata('No Feedbacks yet to summarize 💔🥀');
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
        console.log(data.reply);
        setdata(data.reply);
      } catch (error) {
        console.log('Error in AiResponse:', error);
      }
    };

    handleAiResponse();
  }, [prompt]);

  return <div>
        <ResponsiveModal>
            <ResponsiveModalTrigger asChild>
            <Button
            className="mt-5 flex items-center fixed justify-center w-20 h-20 rounded-full bottom-5 right-5"
            variant={'outline'}
            >
            <Sparkles className="size-10" />
            </Button>
            </ResponsiveModalTrigger>
        <ResponsiveModalContent>
            <ResponsiveModalHeader>
            <ResponsiveModalTitle>Ai Summary</ResponsiveModalTitle>
            <ResponsiveModalDescription>
              Ai can help you summarize the feedbacks and provide insights.
            </ResponsiveModalDescription>
            {data ? <Textarea value={data||'No data'} readOnly={true} /> : <Loader2 className="animate-spin size-6 mx-auto mt-10" />}
            
          </ResponsiveModalHeader>
        </ResponsiveModalContent>
        
        </ResponsiveModal>
    </div>;
};

export default AiResponse;
