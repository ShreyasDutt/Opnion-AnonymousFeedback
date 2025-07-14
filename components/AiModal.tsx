import React from 'react'
import { ResponsiveModal, ResponsiveModalClose, ResponsiveModalContent, ResponsiveModalDescription, ResponsiveModalFooter, ResponsiveModalHeader, ResponsiveModalTitle, ResponsiveModalTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Sparkles } from 'lucide-react'

const AiModal = () => {
  return (
    <div>
        <ResponsiveModal>
            <ResponsiveModalTrigger asChild>
            <Button
                className="mt-5 flex items-center justify-center w-12 h-12 rounded-full absolute bottom-5 right-10"
                variant={'outline'}
            >
                <Sparkles />
            </Button>
            </ResponsiveModalTrigger>
        <ResponsiveModalContent>
            <ResponsiveModalHeader>
            <ResponsiveModalTitle>Create a new space</ResponsiveModalTitle>
            <ResponsiveModalDescription>
              Create the feedback form as your liking and Click save when you&apos;re
              done.
            </ResponsiveModalDescription>
          </ResponsiveModalHeader>
          <ResponsiveModalFooter className="w-80 md:w-full gap-3 lg:gap-0">
            <ResponsiveModalClose asChild>
              <Button variant="outline">Cancel</Button>
            </ResponsiveModalClose>
          </ResponsiveModalFooter>
        </ResponsiveModalContent>
        
        </ResponsiveModal>
    </div>
  )
}

export default AiModal