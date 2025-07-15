'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import {  Settings, Trash2,  } from "lucide-react";
import { Switch } from "./ui/switch";
import { useRef, useState } from "react";
import { DeleteSpace, UpdateSettings } from "@/app/actions/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";




export function DeleteAlert({spaceId}:{spaceId:string}) {


  const router = useRouter();
  const submitHandler = async () =>{
    const res = await DeleteSpace(spaceId);
    if(!res.success){
      toast.error(res.message);
      return;
    }
    router.push('/dashboard');
    toast.success(res.message);
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" effect="expandIcon" icon={Trash2} iconPlacement="right">
            Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            space and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <form className="flex items-start justify-end" onSubmit={(e)=>{
                e.preventDefault();
                submitHandler();
            }}>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500 hover:bg-red-700 transition-colors duration-200 ml-2.5" type="submit">Continue</AlertDialogAction>
            </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}




export function SettingsModal({accepting,spacename,spaceId}:{accepting:boolean,spacename:string,spaceId:string}) {

    const [isAccepting, setisAccepting] = useState<boolean>(accepting);
    const CloseButtonRef = useRef<HTMLButtonElement | null>(null);

    const handleSubmit = async () => {
            const res = await UpdateSettings(isAccepting,spacename);
            if(!res.success){
               toast.error(res.message);
               CloseButtonRef.current?.click();
               return;
            }
            if(res.success === 'same'){
                CloseButtonRef.current?.click();
                return;
            }
            toast.success(res.message);
            CloseButtonRef.current?.click();
    }

  return (
    <ResponsiveModal>
      <form>
        <ResponsiveModalTrigger asChild>
            <Button variant='outline' size='icon' effect='ringHover'>
              <Settings />
            </Button>
        </ResponsiveModalTrigger>
        <ResponsiveModalContent side={'topSettings'} Showclose={false} className="grid place-items-start w-full h-66">
          <ResponsiveModalHeader>
            <ResponsiveModalTitle>Settings</ResponsiveModalTitle>
            <ResponsiveModalDescription className="text-start flex">
                Manage feedback settings and delete your space if needed.
            </ResponsiveModalDescription>
          </ResponsiveModalHeader>

            <div className="grid gap-4 w-92">
              <div className="flex items-start justify-between">
                <Label htmlFor="header">Accept Feedbacks</Label>
                <Switch checked={isAccepting} onCheckedChange={()=>{setisAccepting(!isAccepting)}}/>
              </div>
            </div>


           <ResponsiveModalFooter className="w-full flex items-end justify-end">
            <ResponsiveModalClose asChild className="hidden">
              <Button ref={CloseButtonRef} variant="outline">Cancel</Button>
            </ResponsiveModalClose>
            <div className="flex gap-2.5 items-end">
            <DeleteAlert spaceId={spaceId}/>
            <Button type="submit" onClick={handleSubmit}>Save changes</Button>
            </div>
            
          </ResponsiveModalFooter>
        </ResponsiveModalContent>
      </form>
    </ResponsiveModal>
  );
}


