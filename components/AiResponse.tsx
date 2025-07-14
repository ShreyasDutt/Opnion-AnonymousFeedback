'use client'
import { useEffect } from 'react';
import { useState } from 'react';

export const AiResponse = ({ prompt }: { prompt: string }) => {


    const [data, setdata] = useState(null);
    console.log('Prompt received in AiResponse:', prompt)
  useEffect(() => {
    if (prompt.length === 0) return;

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

  return <div>{data}</div>;
};

export default AiResponse;
