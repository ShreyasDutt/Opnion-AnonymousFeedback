import { ChartLine, Settings } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FeedbackUi from '@/components/FeedbackUi';
import LogoPng from '@/public/Opnion.png';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { GetSpace } from '@/app/actions/actions';
import { notFound } from 'next/navigation';
import { EditSpaceDialog } from '@/components/EditSpaceDialog';
import Feedback from '@/app/db/models/feedback.model';

interface Feedback {
  _id: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

interface PageProps {
  params: {
    space: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { space } = params;
  const Data = await GetSpace(space);

  if (!Data.success) {
    return notFound();
  }


const spaceData = Data.space;
console.log(spaceData);
const spacename = spaceData?.spacename || '';
const spaceTitle = spaceData?.title || '';
const spaceMessage = spaceData?.message || '';
const LogoUrl = spaceData?.SpaceLogo || '';
const colorHex = spaceData?.color || '';
const rounded = spaceData?.rounded || false;
const questions = spaceData?.questions || [];
const LogoId = spaceData?.imageId || '';

const Feedbacks = (Data.space?.feedbacks as unknown as Feedback[]) ?? [];

  return (
    <div>
      <Navbar />
      <div className='flex flex-col py-10 px-6 gap-3'>
        <div className='flex gap-3 justify-between items-start'>
          <div className='flex items-center gap-2'>
            <Image src={LogoPng} height={30} width={30} alt='' />
            <p className='text-2xl font-bold'>{space}</p>
          </div>

          <div className='flex gap-3 items-center'>
            <Button variant='outline' size='icon' effect='ringHover'>
              <ChartLine />
            </Button>
            <EditSpaceDialog spacename={spacename} title={spaceTitle} message={spaceMessage} Logourl={LogoUrl} colorHex={colorHex} rounded={rounded} question={questions} LogoId={LogoId}/>
            <Button variant='outline' size='icon' effect='ringHover'>
              <Settings />
            </Button>
          </div>
        </div>

        <FeedbackUi feedbacks={Feedbacks} />
      </div>
    </div>
  );
};

export default Page;
