'use client';
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CirclePlus, Eye, EyeClosed, Loader2, Pencil, Trash2 } from "lucide-react";
import { MarkdownTextarea } from "./MarkdownTextarea";
import Preview from "./Preview";
import { useRef, useState } from "react";
import { UpdateSpace } from "@/app/actions/actions";
import { toast } from "sonner";
import Image from "next/image";
import { Switch } from "./ui/switch";

export function EditSpaceDialog({
  spacename,
  title,
  message,
  Logourl,
  colorHex,
  rounded,
  question,
  LogoId
}: {
  spacename: string;
  title: string;
  message: string;
  Logourl: string;
  colorHex: string;
  rounded: boolean;
  question: string[];
  LogoId: string;
}) {
  const CloseButtonRef = useRef<HTMLButtonElement>(null);
  const [showPreview, setshowPreview] = useState(false);
  const [selectedColor, setselectedColor] = useState('');
  const [customColor, setcustomColor] = useState(colorHex);
  const [Error, setError] = useState<boolean | null>(null);
  const spaceName = spacename;
  const [header, setheader] = useState(title);
  const [customMessage, setcustomMessage] = useState(message);
  const [questions, setQuestions] = useState(question);
  const [loading, setLoading] = useState(false);
  const [SpaceLogo, setSpaceLogo] = useState<File | undefined>(undefined);
  const [LogoUrl, setLogoUrl] = useState<string | undefined>(Logourl);
  const LogoPublicId = LogoId;
  const [isRounded, setisRounded] = useState<boolean>(rounded);

  const checkValidHex = (hex: string) => {
    setError(!validateHTMLColorHex(hex));
  };

  const colors = [
    { color: '#ff6800', id: 1 },
    { color: '#faba28', id: 2 },
    { color: '#83ddb8', id: 3 },
    { color: '#35cf89', id: 4 },
    { color: '#8fd1fd', id: 5 },
    { color: '#0293e3', id: 6 },
    { color: '#abb9c3', id: 7 },
  ];

  const handleSubmit = async () => {
    setLoading(true);
    const finalName = spaceName.toLowerCase().replaceAll(' ', '-');
    if (!finalName.trim() || !header.trim() || !customMessage.trim()) {
      toast.error('Please fill all the fields');
      setLoading(false);
      return;
    }
    if (Error) {
      toast.error('Invalid hex color');
      setLoading(false);
      return;
    }

    for (let q of questions) {
      if (q.trim() === '') {
        toast.error('Please fill all the questions');
        setLoading(false);
        return;
      }
    }

    let finalPhotoUrl = LogoUrl;
    let finalPublicId = LogoPublicId;

    if (SpaceLogo) {
      const formData = new FormData();
      formData.append('photo', SpaceLogo);
       formData.append('publicIdToDelete', LogoPublicId);
      const uploadRes = await fetch("/api/image-upload", {
        method: "POST",
        body: formData,
      });

      const data = await uploadRes.json();
      if (!data.success) {
        toast.error('Image upload failed');
        setLoading(false);
        return;
      }

      finalPhotoUrl = data.url;
      finalPublicId = data.publicId;
    }

    const response = await UpdateSpace({
      spacename: finalName,
      title: header,
      message: customMessage,
      questions: questions,
      color: selectedColor || customColor,
      SpaceLogo: finalPhotoUrl!,
      imageId: finalPublicId,
      rounded: isRounded,
    });

    if (response?.success) {
      CloseButtonRef.current?.click();
      toast.success(response.message);
    } else {
      toast.error('Something went wrong, please try again');
    }
    setLoading(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setLogoUrl(url);
      setSpaceLogo(file);
    }
  };

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
            <ResponsiveModalTitle>Space: {spaceName}</ResponsiveModalTitle>
            <ResponsiveModalDescription>
              Update the feedback form and click save when you&apos;re done.
            </ResponsiveModalDescription>
          </ResponsiveModalHeader>

          {showPreview ? (
            <Preview
              Header={header}
              CustomColor={customColor}
              SelectedColor={selectedColor}
              Custommessage={customMessage}
              Questions={questions}
              LogoUrl={LogoUrl}
              Rounded={isRounded}
            />
          ) : (
            <div className="grid gap-4">
              {/* LOGO INPUT */}
              <div className="grid gap-3">
                <Label htmlFor="space-logo">Space logo</Label>
                <Input id="space-logo" type="file" accept="image/*" onChange={handleImageChange} />
              </div>

              <div className="flex gap-3 items-center">
                {LogoUrl && (
                  <>
                    <Image
                      src={LogoUrl}
                      alt="Logo"
                      width={100}
                      height={100}
                      className={`mb-3 ${isRounded ? 'rounded-full' : 'rounded-sm'}`}
                    />
                    <div className="flex flex-col gap-2 w-full items-center">
                      <div className="flex items-center gap-2">
                        <Switch id="rounded" checked={isRounded} onCheckedChange={setisRounded} />
                        <Label htmlFor="rounded" className="text-xs">Circle</Label>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* TITLE */}
              <div className="grid gap-3">
                <Label htmlFor="header">Header title</Label>
                <Input id="header" value={header} onChange={(e) => setheader(e.target.value)} placeholder="Presentation Feedback" />
              </div>

              {/* MESSAGE */}
              <div className="grid gap-3">
                <Label htmlFor="message">Custom message</Label>
                <MarkdownTextarea value={customMessage} onChange={(e) => setcustomMessage(e.target.value)} />
              </div>

              {/* QUESTIONS */}
              <div className={`grid gap-3 ${questions.length === 0 ? 'gap-0' : ''}`}>
                <Label htmlFor="questions" className={`${questions.length === 0 ? 'hidden' : ''}`}>Questions</Label>
                <div className="flex flex-col gap-2">
                  {questions.map((q, idx) => (
                    <Input
                      key={idx}
                      value={q}
                      onChange={(e) => {
                        const newQ = [...questions];
                        newQ[idx] = e.target.value;
                        setQuestions(newQ);
                      }}
                      placeholder="Add a question"
                    />
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <Button
                    onClick={() => {
                      if (questions.length < 5) setQuestions([...questions, '']);
                    }}
                    variant="link"
                    className="text-sm"
                  >
                    <CirclePlus className="mr-1" /> Add one (up to 5)
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (questions.length > 0) setQuestions(questions.slice(0, -1));
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
          )}

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
  );
}
