import React from 'react'
import {
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ModeToggle } from './ModeToggle'
import Image from 'next/image'
import LogoPng from '@/public/Opnion.png'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between py-4 px-3 lg:px-7 lg:py-7'>
        <div className='flex items-center'>
          <Image src={LogoPng} height={35} width={35} alt=''/>
            <p className='font-bold text-4xl'>pnion</p>
        </div>

        <div className='flex items-center gap-4'>
          <ModeToggle/>
            <SignedOut>
                <Link href={'/sign-in'} className='font-semibold'>Log in</Link>
              <Link href={'/sign-up'}>
                <Button className='rounded-sm py-6 px-2 cursor-pointer'>
                  <p className='text-[16px] text-white'>Try Now</p>
                  <ChevronRight className='size-5 text-white' />
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
        </div>
    </div>
  )
}

export default Navbar