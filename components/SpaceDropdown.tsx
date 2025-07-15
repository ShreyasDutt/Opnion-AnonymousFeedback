"use client"

import * as React from "react"
import { Ellipsis } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeleteSpace, DuplicateSpace } from "@/app/actions/actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function SpaceDropdown({spaceId,spaceName}:{spaceId:string,spaceName:string}) {

    const router = useRouter();
    
    const DeleteHandler = async () => {
      const res = await DeleteSpace(spaceId);
      if (res.success) {
        toast.success('Space deleted');
      } else {
        toast.error('Failed to delete space');
      }
    }
    const DuplicateHandler = async () => {
      const res = await DuplicateSpace(spaceId);
      if (res.success) {
        toast.success('Space duplicated');
      } else {
        toast.error(res.message || 'Failed to duplicate space');
      }
    }

    const CopyLinkhandler = async () => {
      navigator.clipboard.writeText('https://send-opinion.vercel.app/' + spaceName).then(()=>{
        toast.success('Link copied to clipboard');
      }).catch(()=>{
        toast.error('Failed to copy link');
      })
    }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Ellipsis />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push(`/dashboard/${spaceName}`)}>
          Manage feedbacks
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => window.open(`/${spaceName}`, '_blank')}>
          Feedback form
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => CopyLinkhandler()}>
          Get the link
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => DuplicateHandler()}>
          Duplicate the space
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => DeleteHandler()}>
          Delete the space
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
