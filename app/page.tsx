import Navbar from '@/components/Navbar'
import Image from 'next/image'
import React from 'react'
import UserImg from '@/public/userimg.png'
import { FaDotCircle } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

const page = () => {
  return (
    <div>
        <Navbar/>
        <div className='flex flex-col md:flex-row p-7 lg:p-20 items-center lg:justify-around select-none'>

          <div className='flex flex-col items-center justify-center md:items-baseline md:justify-start lg:w-2xl'>
            <div className="inline-flex items-center space-x-2 bg-[#4063ff]/20 px-4 py-2 rounded-full border border-[#4063ff]/30 mb-3">
              <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Real-time Feedback</span>
            </div>
            <p className='font-bold text-5xl text-center md:text-left lg:text-8xl'>Get honest feedback Anonymously.</p>
            <p className='md:text-left text-center mt-6 text-wrap text-sm md:w-90 md:text-xl lg:w-2xl'>Opnion helps teams, creators, and individuals gather real feedback without fear or filters.</p>
            
              <div className='flex gap-2 mt-5 items-center justify-center'>
              <Button className='p-5 text-white lg:w-72 '>
                Start for free
              </Button>
              <Button className='bg-white hover:bg-white border text-black p-5 lg:w-72'>
                See How it Works
              </Button>
            </div>

          </div>


          {/* Image here */}
          <div className='bg-[#c8dcfd] dark:bg-[#1e293b] mt-7 lg:mt-0 p-5 w-full lg:w-1/3 lg:box-content py-8 lg:py-10 rounded-lg border dark:border-slate-600'>
            <div className='flex flex-col'>
              {/* User Icon */}
              <div className='flex items-center gap-2'>
                <Image src={UserImg} height={100} width={100} alt='Image' className='rounded-full'/>
                <div className='flex flex-col gap-4'>
                  <div className='bg-white dark:bg-slate-700 animate-pulse w-42 h-5 rounded-full md:w-60 lg:w-86'></div>
                  <div className='bg-white dark:bg-slate-700 w-32 h-5 rounded-full animate-pulse md:w-42 lg:w-70'></div>
                  <div className='bg-white dark:bg-slate-700 w-40 h-5 rounded-full animate-pulse md:w-54 lg:w-82'></div>
                </div>
              </div>

              {/* 3 Comments */}
              <div className='mt-7 flex flex-col gap-3 font-semibold text-sm lg:text-[16px]'>
                <div className='bg-white dark:bg-slate-900 flex items-center text-black dark:text-white p-4 rounded-lg gap-2'>
                  <FaDotCircle className='text-green-600' />
                  <p>Good Job on the presentation!</p>
                </div>
                <div className='bg-white dark:bg-slate-900 flex items-center text-black dark:text-white p-4 rounded-lg text-wrap gap-2'>
                  <FaDotCircle className='text-blue-600'/>
                  <p>You could improve communication</p>
                </div>
                <div className='bg-white dark:bg-slate-900 flex items-center text-black dark:text-white p-4 rounded-lg gap-2'>
                  <FaDotCircle className='text-blue-400'/>
                  <p>Consider refining the design</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default page