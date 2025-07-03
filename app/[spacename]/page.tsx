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
      const space = Data.space;
      console.log(space);
  return (
    <div>
        <div className='flex items-center justify-between py-4 px-3 lg:px-7 lg:py-7 border-b'>
            <Link href={'/'} className='flex items-center'>
            <Image src={LogoPng} height={35} width={35} alt=''/>
                <p className='font-bold text-4xl'>pinion</p>
            </Link>
            <ModeToggle/>
        </div>
        <div className='flex items-center flex-col'>
            <div className='flex items-center justify-center flex-col gap-3 mt-5'>
                 <Image src={space?.SpaceLogo || ''} height={100} width={100} alt='' className={`${space?.rounded ? 'rounded-full' : 'rounded-sm border'}`} />
                 <p className='lg:text-6xl text-4xl font-bold mt-5 mb-2'>{space?.title}</p>
                <p className='text-sm text-gray-400 text-center'>{space?.message}</p>
            </div>
            {/* Questions */}
            
            <div>
                
                <div className='flex justify-start flex-col gap-3 mt-5 px-5'>
                    <div>
                    <p className='text-2xl font-bold '>Questions</p>
                    <p className={`w-16 h-1`} style={{ backgroundColor: space?.color }}></p>
                    </div>

                    {space?.questions.map((question, index) => (
                        <div key={index} className=' rounded-md w-full max-w-md px-5'>
                            <ul className='list-disc'>
                            <li className='text-md font-semibold'>{question}</li>
                            </ul>
                        </div>
                    ))}
                </div>
                </div>
            </div>
    </div>
  )
}

export default page