'use client'
import { Button } from "@/components/ui/button"
import { validateHTMLColorHex } from "validate-color";
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CirclePlus, Eye, EyeClosed, Loader2, Pencil, Plus, Trash2 } from "lucide-react"
import { MarkdownTextarea } from "./MarkdownTextarea"
import Preview from "./Preview";
import { useRef, useState } from "react";
import { CreateSpace } from "@/app/actions/actions";
import { toast } from "sonner";
import Image from "next/image";
import { Switch } from "./ui/switch";



export function EditSpaceDialog() {
  const CloseButtonRef = useRef<HTMLButtonElement>(null);
  const [showPreview, setshowPreview] = useState<boolean>(false);
  const [selectedColor, setselectedColor] = useState<string>('');
  const [customColor, setcustomColor] = useState<string>('');
  const [Error, setError] = useState<boolean | null>(null);
  const [spaceName, setspaceName] = useState<string>('');
  const [header, setheader] = useState<string>('');
  const [customMessage, setcustomMessage] = useState<string>('');
  const [questions, setQuestions] = useState<string[]>(['What do you honestly think about this project?','what can improve?','Anything else to share anonymously?'])
  const [loading, setLoading] = useState<boolean>(false);
  const [SpaceLogo, setSpaceLogo] = useState<File | undefined>(undefined);
  const [LogoUrl, setLogoUrl] = useState<string | undefined>(undefined);
  const [isRounded, setisRounded] = useState<boolean>(false);

  const checkValidHex = (hex:string) =>{
    if (validateHTMLColorHex(hex)) {
      setError(false);
      return;
      }
      else{
      setError(true);
      setcustomColor('');
      return;
      }
  }

  const colors = [{color:'#ff6800',id:1},{color:'#faba28',id:2},{color:'#83ddb8',id:3},{color:'#35cf89',id:4},{color:'#8fd1fd',id:5},{color:'#0293e3',id:6},{color:'#abb9c3',id:7}];

  const handleSubmit = async() =>{
    setLoading(true);
    setspaceName(spaceName.toLowerCase().replaceAll(' ','-'))
    if (!spaceName.trim() || !header.trim() || !customMessage.trim()) {
      toast.error('Please fill all the fields');
      setLoading(false);
      return;
    }
    else if (Error){
      toast.error('Invalid hex color');
      setLoading(false);
      return;
    }
    else if(!SpaceLogo){
      toast.error('Space logo is required');
      setLoading(false);
      return;
    }
    questions.forEach((q)=>{
      if( q.trim() === ''){
        toast.error('Please fill all the questions');
        setLoading(false);
        return;
      }
    })

        const formData = new FormData();
        formData.append('photo', SpaceLogo);

        const uploadRes = await fetch("/api/image-upload", {
        method: "POST",
        body: formData,
      });
      
      const data = await uploadRes.json();
      const photoUrl = data.url;
      const public_ID = data.publicId;

      if (!data.success) {
        toast.error('Image upload failed');
        setLoading(false);
        return;
      }

    const response = await CreateSpace({
      spacename: spaceName,
      title: header,
      message: customMessage,
      questions: questions,
      color: selectedColor || customColor,
      SpaceLogo: photoUrl,
      imageId: public_ID,
      rounded: isRounded
    });
    if (response?.success) {
      CloseButtonRef.current?.click();
      toast.success(response?.message);
      setLoading(false);
    }
    else {
      toast.error('Something went wrong, please try again');
      setLoading(false);
      setspaceName('');
      setheader('');
      setcustomMessage('');
      setQuestions(['What do you honestly think about this project?','what can improve?','Anything else to share anonymously?']);
      setselectedColor('');
      setcustomColor('');
    }
  }
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files.length > 0) {
    const file = e.target.files[0];
    
    const url = URL.createObjectURL(file);
    setLogoUrl(url);
    setSpaceLogo(file);
  }
}
  
  return (
      <ResponsiveModal>
      <form>
        <ResponsiveModalTrigger asChild>
           <Button effect='expandIcon' icon={Pencil} iconPlacement='right'>
              Edit Space
            </Button>
        </ResponsiveModalTrigger>
        <ResponsiveModalContent className="grid place-items-center">
          <ResponsiveModalHeader>
            <ResponsiveModalTitle>Create a new space</ResponsiveModalTitle>
            <ResponsiveModalDescription>
              Create the feedback form as your liking and Click save when you&apos;re
              done.
            </ResponsiveModalDescription>
          </ResponsiveModalHeader>
          {showPreview ? 
          <Preview Header={header} CustomColor={customColor} SelectedColor={selectedColor} Custommessage={customMessage} Questions={questions} LogoUrl={LogoUrl} Rounded={isRounded}/> 
          :
          <div className="grid gap-4">
            <div className="grid">
              <Label htmlFor="name-1">Space name</Label>
              <Input id="name-1" name="name" required className="mt-3 mb-1.5 w-80 md:w-full" placeholder="Project Feedback" value={spaceName} onChange={(e)=>{setspaceName(e.target.value)}}/>
              <p className="text-[12.5px]">Public URL is: send-opinion.vercel.app/{spaceName.toLowerCase().replaceAll(' ','-')}</p>
            </div>
              <div className="grid gap-3">
                <Label htmlFor="space-logo">Space logo</Label>
                <Input id="space-logo" name="space-logo" type="file" accept="image/*" className="w-80 md:w-full" onChange={handleImageChange}/>
              </div>
              <div className="flex gap-3 items-center">
                {LogoUrl? <Image src={LogoUrl} alt="Space Logo" width={100} height={100} className={`mb-3 ${isRounded ? 'rounded-full' : 'rounded-sm'}`} /> : ''}
               
                {LogoUrl ?<div className="flex flex-col items-center w-full gap-2">
                  <Button onClick={()=>{setLogoUrl(undefined); setSpaceLogo(undefined)}} variant={'outline'} className="w-full"><Trash2/></Button>
                  <div className="flex items-center gap-2">
                  <Switch id="rounded" checked={isRounded} onCheckedChange={()=>{setisRounded(!isRounded)}} className="cursor-pointer"/>
                  <Label htmlFor="rounded" className="text-[12.5px]">Circle</Label>
                  </div>
                  </div>
                  : ''}

                

              </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Header title</Label>
              <Input id="username-1" name="header" required className="w-80 md:w-full" placeholder="Presentation Feedback"
              value={header} onChange={(e)=>{setheader(e.target.value)}}/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Custom message</Label>
                <MarkdownTextarea value={customMessage} onChange={(e)=>{setcustomMessage(e.target.value)}} />
            </div>
              <div className={`grid gap-3 ${questions.length===0 ? 'gap-0':''}`}>
              <Label htmlFor="username-1" className={`${questions.length===0 ? 'hidden':''}`}>Questions</Label> 
              <div className="flex items-center gap-2 flex-col">
              {questions.map((q, index) => (
                <Input
                  key={index}
                  id={`question-${index + 1}`}
                  name={`question-${index + 1}`}
                  required
                  placeholder="Add a question"
                  className="w-80 md:w-full"
                  value={q}
                  onChange={(e) => {
                    const updated = [...questions];
                    updated[index] = e.target.value;
                    setQuestions(updated);
                  }}
                />
              ))}
              </div>
              <div className="flex items-center justify-between">
                  <Button
                  onClick={() => {
                    if (questions.length === 5) return;
                    setQuestions([...questions, '']);
                  }}
                  variant="link"
                  className="flex items-center justify-start cursor-pointer text-black dark:text-white hover:no-underline hover:text-primary hover:dark:text-primary"
                >
                  <p className="flex items-center gap-2">
                    <CirclePlus />Add one (up to 5)
                  </p>
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    if (questions.length === 0) return;
                    setQuestions(questions.slice(0, -1));
                  }}
                >
                  <Trash2 />
                </Button>
              </div>
              
            </div>
            <div className="flex flex-col gap-3 mb-3">
              <Label htmlFor="username-1">Custom button color</Label>
              <div className="flex flex-col gap-2">
                <div className="flex gap-3.5 mb-1">
              {colors.map((color)=>{
                  return (
                    <Button key={color.id} onClick={()=>{
                      if (selectedColor===color.color) {
                        setError(false);
                        setcustomColor('');
                        setselectedColor('');
                        return;
                      }
                      setError(false);
                      setcustomColor('');
                      setselectedColor(color.color);
                    }} style={{ backgroundColor: color.color }} className={`p-4 md:p-5 ${selectedColor===color.color ? 'ring-3 ring-primary':''}`}></Button>
                  )
                })}
                </div>
                <Input id="username-1" name="color" placeholder="Custom color #ffffff" className="w-80 md:w-full" value={customColor} onChange={
                  (e)=>{
                      setselectedColor('');
                      setcustomColor(e.target.value);
                      checkValidHex(e.target.value);
                    }
                  }/>
                      {Error ? <p className="text-red-500 text-sm">Invalid hex color</p>: ''}
              </div>
            </div>
          </div>
          }
          <ResponsiveModalFooter className="w-80 md:w-full gap-3 lg:gap-0">
            <ResponsiveModalClose asChild>
              <Button ref={CloseButtonRef} variant="outline">Cancel</Button>
            </ResponsiveModalClose>
            <Button variant={"outline"} onClick={()=>{setshowPreview(!showPreview)}}>
            {showPreview ? <p className="flex items-center gap-2">Close preview <EyeClosed/></p>:<p className="flex items-center gap-2">Preview<Eye /></p>}
            </Button>
            <Button type="submit" onClick={handleSubmit}>
              {loading ? <Loader2 className="animate-spin size-4 self-center" /> : 'Save changes'}</Button>
          </ResponsiveModalFooter>
        </ResponsiveModalContent>
      </form>
    </ResponsiveModal>    
  )
}
