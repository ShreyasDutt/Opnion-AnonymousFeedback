'use client'
import { Button } from "@/components/ui/button"
import {
  ResponsiveModal,
  ResponsiveModalClose,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from '@/components/ui/dialog';
import { Label } from "@/components/ui/label"
import {  Loader2, } from "lucide-react"
import { FeedbackFormTextArea } from "./MarkdownTextarea"
import { useRef, useState } from "react";



export function FeedbackForm({color}: {color: string}) {
  const CloseButtonRef = useRef<HTMLButtonElement>(null);
  const [customMessage, setcustomMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);


    
  
  return (
      <ResponsiveModal>
      <form>
        <ResponsiveModalTrigger asChild>
                        <Button effect="shineHover"
                            className='px-8 py-3 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200'
                            style={{ backgroundColor: color }}
                        >
                            Write a Feedback
                        </Button>
        </ResponsiveModalTrigger>
        <ResponsiveModalContent className="grid place-items-center">
          <ResponsiveModalHeader>
            <ResponsiveModalTitle>Create a new space</ResponsiveModalTitle>
            <ResponsiveModalDescription>
              Submit a Feedback
            </ResponsiveModalDescription>
          </ResponsiveModalHeader>
          
          <div className="grid gap-4">

            <div className="grid gap-3">
              <Label htmlFor="username-1">Custom message</Label>
                <FeedbackFormTextArea value={customMessage}  onChange={(e)=>{setcustomMessage(e.target.value)}} color={color}/>
            </div>
              
           
          </div>
    
          <ResponsiveModalFooter className="w-80 md:w-full gap-3 lg:gap-0">
            <ResponsiveModalClose asChild>
              <Button style={{ backgroundColor: color }} ref={CloseButtonRef} variant="outline">Cancel</Button>
            </ResponsiveModalClose>
            <Button style={{ backgroundColor: color }} type="submit" onClick={()=>{setLoading(true)}}>
              {loading ? <Loader2 className="animate-spin size-4 self-center" /> : 'Save changes'}</Button>
          </ResponsiveModalFooter>
        </ResponsiveModalContent>
      </form>
    </ResponsiveModal>    
  )
}
