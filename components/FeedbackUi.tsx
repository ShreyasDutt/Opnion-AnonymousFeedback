import React from 'react'
import { Button } from './ui/button'
import { Trash2 } from 'lucide-react'

const FeedbackUi = () => {
  return (
    <div className='bg-accent px-2 rounded-lg flex flex-col pb-5'>
        <div className='flex items-center gap-4 justify-between py-2'>
            <p className='font-bold text-gray-400 text-sm'>{new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            })}</p>
            <Button variant={'outline'} size={'icon'} effect={'ringHover'}>
                <Trash2 />
            </Button>
        </div>
        <div className='w-80 flex'>
            <p>FeedbackFeedbackFeedbackFeedbackFeedback</p>
        </div>
    </div>
  )
}

export default FeedbackUi