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

export function SpaceDropdown() {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Ellipsis />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => console.log('hi')}>
          Manage feedbacks
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log('hi')}>
          Get the link
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log('hi')}>
          Edit the space
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log('hi')}>
          Duplicate the space
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log('hi')}>
          Delete the space
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
