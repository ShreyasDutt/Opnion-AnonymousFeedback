import { Textarea } from "@/components/ui/textarea"

export function MarkdownTextarea({value,onChange}:{value:string,onChange:(e:React.ChangeEvent<HTMLTextAreaElement>)=>void}) {
  return (
    <div className="grid w-full gap-1.5">
      <Textarea placeholder="Type your custom message here." id="message-2" className="w-80 md:w-full" value={value} onChange={onChange}/>
      <p className="text-muted-foreground text-sm">
        Markdown supported.
      </p>
    </div>
  )
}
