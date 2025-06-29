import { SignUp } from '@clerk/nextjs'
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
export default function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="flex flex-col items-center justify-center mt-5">
        {/* <div className="absolute -bottom-30 -right-15">
          <Image src={Bglogo} height={400} width={400} alt="" className='opacity-40'/>
        </div> */}
        <div className="absolute top-12 left-30 hidden md:block ">
            <Link href={'/'}>
            <Button variant="outline" size="icon">
            <ArrowLeft/>
            </Button>
            </Link>
        </div>
        <SignUp />
      </div>
    </div>
  )
}