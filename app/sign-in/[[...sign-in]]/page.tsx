import { SignIn } from '@clerk/nextjs'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="absolute top-12 left-30 hidden md:block">
            <Link href={'/'}>
            <Button variant="outline" size="icon">
            <ArrowLeft/>
            </Button>
            </Link>
        </div>
        <SignIn />
      </div>
    </div>
  );
}
