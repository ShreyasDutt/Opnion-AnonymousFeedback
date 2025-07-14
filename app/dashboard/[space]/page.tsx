import {  MessageCircleOff } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FeedbackUi from '@/components/FeedbackUi';
import Image from 'next/image';
import { GetSpace } from '@/app/actions/actions';
import { notFound, redirect } from 'next/navigation';
import { EditSpaceDialog } from '@/components/EditSpaceDialog';
import Feedback from '@/app/db/models/feedback.model';
import { SettingsModal } from '@/components/Settings';
import { ChartButton } from '@/components/Chart';
import AiResponse from '@/components/AiResponse';

interface Feedback {
  _id: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

const Page = async ({ params }: { params: Promise<{ space: string }> }) => {
  const { space } = await params;
  const Data = await GetSpace(space);

  if (!Data.success) {
  if(Data.message === 'Unauthorized'){
    return redirect('/'+Data.space?.spacename);
  }
    return notFound();
  }
  const spaceData = Data.space;
  

  const spaceId = (spaceData?._id || '').toString();
  const spacename = spaceData?.spacename || '';
  const spaceTitle = spaceData?.title || '';
  const spaceMessage = spaceData?.message || '';
  const LogoUrl = spaceData?.SpaceLogo || '';
  const colorHex = spaceData?.color || '';
  const rounded = spaceData?.rounded || false;
  const questions = spaceData?.questions || [];
  const LogoId = spaceData?.imageId || '';
  const AcceptingFlag = spaceData?.isAcceptingFeedback || false;


  const Feedbacks = (Data.space?.feedbacks as unknown as Feedback[]) ?? [];
  const FeedbackMessages = Feedbacks.map((feedback) => feedback.message).join('\n');
  return (
    <div>
      <Navbar />
      <div className='flex flex-col py-10 px-6 gap-3'>
        <AiResponse prompt={FeedbackMessages}/>
        <div className='flex gap-3 justify-between items-start'>
          <div className='flex items-center gap-2'>
            <Image src={LogoUrl} height={40} width={40} alt='' className='rounded-full' />
            <p className='text-sm md:text-lg font-bold'>{space}</p>
          </div>

          <div className='flex gap-3 items-center'>
            <ChartButton spacename={spacename}/>
            <EditSpaceDialog spacename={spacename} title={spaceTitle} message={spaceMessage} Logourl={LogoUrl} colorHex={colorHex} rounded={rounded} question={questions} LogoId={LogoId}/>
            <SettingsModal accepting={AcceptingFlag} spacename={spacename} spaceId={spaceId}/>
          </div>
        </div>
        {Feedbacks.length>0 ? <FeedbackUi feedbacks={Feedbacks} /> 
        : 
        <div className="flex flex-col items-center justify-center text-center mt-10 text-muted-foreground">
          <MessageCircleOff width={150} height={150} className="mb-4 opacity-70"/>
          <p className="text-lg font-semibold">No feedbacks yet</p>
          <p className="text-sm mt-1">Once people start submitting, you'll see them here!</p>
        </div>
        }

      </div>
    </div>
  );
};

export default Page;