import React from 'react'
import LogoPng from '@/public/Opnion.png'
import Image from 'next/image'
import Link from 'next/link'
import { ModeToggle } from '@/components/ModeToggle'
import { GetSpace } from '../actions/actions'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    spacename: string
  }>
}

const page = async({ params }: PageProps) => {
      const { spacename } = await params;
    
      const Data = await GetSpace(spacename);

      if(!Data.success){
        return notFound();
      }

  return (
    <div>
      
        <div className='flex items-center justify-between py-4 px-3 lg:px-7 lg:py-7 border-b'>
        <Link href={'/'} className='flex items-center'>
          <Image src={LogoPng} height={35} width={35} alt=''/>
            <p className='font-bold text-4xl'>pinion</p>
        </Link>
        <ModeToggle/>
        </div>
        <div>
             
        </div>
    </div>
  )
}

export default page