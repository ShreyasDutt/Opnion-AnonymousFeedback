import { Textarea } from "@/components/ui/textarea"

export function MarkdownTextarea({value,onChange}:{value:string,onChange:(e:React.ChangeEvent<HTMLTextAreaElement>)=>void}) {
  return (
    <div className="grid w-full gap-1.5">
      <Textarea placeholder="Type your custom message here." id="message-2" className="w-80 md:w-90" value={value} onChange={onChange}/>
      <p className="text-muted-foreground text-sm">
        Markdown supported.
      </p>
    </div>
  )
}


export function FeedbackFormTextArea({value,onChange,color}:{color:string,value:string,onChange:(e:React.ChangeEvent<HTMLTextAreaElement>)=>void}) {
  return (
    <div className="grid w-full gap-1.5">
          <Textarea
            placeholder="Type your custom message here."
            id="message-2"
            value={value}
            onChange={onChange}
            className="w-fit md:w-90 focus-visible:ring-0 focus:outline-none"
            style={{
              border: `1px solid ${color}`,
              boxShadow: `0 0 0 1px ${color}`,
            }}
          />
    </div>
  )
}