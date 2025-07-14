import React from 'react';
import FeedbackDeleteButton from './FeedbackDeleteButton';

interface Feedback {
  _id: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

const FeedbackUi = ({ feedbacks }: { feedbacks: Feedback[] }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-7 mb-20'>
      {feedbacks.map((feedback) => (
        <div
          key={feedback._id}
          className='background px-4 py-3 rounded-lg flex flex-col shadow-sm'
        >
          <div className='flex items-center justify-between'>
            <p className='font-semibold text-gray-400 text-xs'>
              {new Date(feedback.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            <FeedbackDeleteButton Id={feedback._id.toString()} />
          </div>
          <div className='mt-2 text-sm text-muted-foreground break-words'>
            {feedback.message}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbackUi;
