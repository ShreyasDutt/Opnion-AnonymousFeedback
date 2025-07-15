"use client"
import React from 'react'
import { Button } from './ui/button'
import { Trash2 } from 'lucide-react'
import { DeleteFeedback } from '@/app/actions/actions'
import { toast } from 'sonner'


const FeedbackDeleteButton = ({Id,spaceId}:{Id:string,spaceId:string}) => {
    const handleDelete = async () => {
        try{
            const res = await DeleteFeedback(Id, spaceId);
            if(!res.success){
                toast.error(res.message);
                return;
            }
            toast.success(res.message || 'Feedback deleted successfully');
        }catch (error) {
            console.error('Error deleting feedback:', error);
            
        }
    }

  return (
    <Button variant={'outline'} size={'icon'} onClick={handleDelete}>
        <Trash2 className='w-4 h-4' />
    </Button>
  )
}

export default FeedbackDeleteButton