import Navbar from '@/components/Navbar'
import React from 'react'
import LogoPng from '@/public/Opnion.png'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChartLine, Pencil, Settings } from 'lucide-react'
import FeedbackUi from '@/components/FeedbackUi'

const page = async({params}:{params:{space:string}}) => {
  return (
    <div>
        <Navbar/>
        <div className='flex flex-col py-10 px-6 gap-3'>
            <div className='flex gap-3 justify-between items-start'>
                <div className='flex items-center gap-2'>
                    <Image src={LogoPng} height={30} width={30} alt=''/>
                    <p className='text-2xl font-bold'>{params.space}</p>
                </div>

                 <div className='flex gap-3 items-center'>
                    <div className='flex items-center gap-3'>
                    <Button variant={'outline'} size={'icon'} effect={'ringHover'}>
                        <ChartLine />
                    </Button>
                        <Button effect="expandIcon" icon={Pencil} iconPlacement="right">
                        Edit Space
                        </Button>
                    <Button variant={'outline'} size={'icon'} effect={'ringHover'}>
                        <Settings />
                    </Button>
                    </div>
                </div>
            </div>

            <FeedbackUi/>
        
        
               


        </div>
    </div>
  )
}

export default page