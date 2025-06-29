import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function MarkdownTextarea() {
  return (
    <div className="grid w-full gap-1.5">
      <Textarea placeholder="Type your custom message here." id="message-2" className="w-80 md:w-full"/>
      <p className="text-muted-foreground text-sm">
        Markdown supported.
      </p>
    </div>
  )
}
