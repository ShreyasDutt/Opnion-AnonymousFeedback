import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, Plus } from "lucide-react"
import { MarkdownTextarea } from "./MarkdownTextarea"

export function AddSpaceDialog() {
  const colors = [{color:'#ff6800',id:1},{color:'#faba28',id:2},{color:'#83ddb8',id:3},{color:'#35cf89',id:4},{color:'#8fd1fd',id:5},{color:'#0293e3',id:6},{color:'#abb9c3',id:7}];
  return (
      <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="text-white mt-5 flex py-5 gap-2">
              <Plus />
              Create a new space
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create a new space</DialogTitle>
            <DialogDescription>
              Create the feedback form as your liking and Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid">
              <Label htmlFor="name-1">Space name</Label>
              <Input id="name-1" name="name" required className="mt-3 mb-1.5 w-80 md:w-full"/>
              <p className="text-[12.5px]">Public URL is: testimonial.to/</p>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Header title</Label>
              <Input id="username-1" name="username" required className="w-80 md:w-full"/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Custom message</Label>
                <MarkdownTextarea/>
            </div>
              <div className="grid gap-3">
              <Label htmlFor="username-1">Questions</Label>
              <div className="flex items-center gap-2">
              <Input id="username-1" name="username" required placeholder="Add a question" className="w-80 md:w-full"/>
              </div>
            </div>
            <div className="flex flex-col gap-3 mb-3">
              <Label htmlFor="username-1">Custom button color</Label>
              <div className="flex flex-col gap-2">
                <div className="flex gap-3.5 mb-1">
              {colors.map((color)=>{
                  return (
                    <Button key={color.id} style={{ backgroundColor: color.color }} className="p-4 md:p-4.5" />
                  )
                })}
                </div>
                <Input id="username-1" name="color" placeholder="Custom color" className="w-80 md:w-full"/>
              </div>
            </div>
          </div>
          <DialogFooter className="w-80 md:w-full">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant={"outline"}>Preview<Eye /></Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>    
  )
}
