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
import { Loader2 } from "lucide-react"
import { FeedbackFormTextArea } from "./MarkdownTextarea"
import { useRef, useState } from "react";
import { SubmitFeedback } from "@/app/actions/actions";
import { toast } from "sonner";

export function FeedbackForm({ color,spacename }: { color: string, spacename: string }) {
  const CloseButtonRef = useRef<HTMLButtonElement>(null);
  const [customMessage, setCustomMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const maxCharacters = 250;
  const remaining = maxCharacters - customMessage.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    if (input.length <= maxCharacters) {
      setCustomMessage(input);
    }
  };
  
  const handleSubmit = async() =>{
    setLoading(true);
    if(customMessage.length === 0) {
      toast.error('Please enter a message before submitting.');
      setLoading(false);
      return;
    }
    const res = await SubmitFeedback(spacename, customMessage);
    if(res.success) {
      toast.success(res.message || 'Feedback submitted successfully');
      setCustomMessage('');
      CloseButtonRef.current?.click();
    } else {
      toast.error(res.message || 'Failed to submit feedback');
    }  
    setLoading(false);
  }

  return (
    <ResponsiveModal>
      <form>
        <ResponsiveModalTrigger asChild>
          <Button
            effect="shineHover"
            className="px-8 py-3 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            style={{ backgroundColor: color }}
          >
            Write a Feedback
          </Button>
        </ResponsiveModalTrigger>

        <ResponsiveModalContent className="grid place-items-center">
          <ResponsiveModalHeader>
            <ResponsiveModalTitle>Create a new space</ResponsiveModalTitle>
            <ResponsiveModalDescription>Submit a Feedback</ResponsiveModalDescription>
          </ResponsiveModalHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="customMessage">Custom message</Label>
              <FeedbackFormTextArea
                value={customMessage}
                onChange={handleChange}
                color={color}
              />
              <p className="text-xs text-gray-500">{remaining} characters remaining</p>
            </div>
          </div>

          <ResponsiveModalFooter className="w-80 md:w-full gap-3 lg:gap-0">
            <ResponsiveModalClose asChild>
              <Button
                style={{ backgroundColor: color }}
                ref={CloseButtonRef}
                variant="outline"
              >
                Cancel
              </Button>
            </ResponsiveModalClose>

            <Button
              style={{ backgroundColor: color }}
              type="submit"
              onClick={handleSubmit}
            >
              {loading ? <Loader2 className="animate-spin size-4 self-center" /> : 'Save changes'}
            </Button>
          </ResponsiveModalFooter>
        </ResponsiveModalContent>
      </form>
    </ResponsiveModal>
  );
}
