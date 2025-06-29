import React from 'react'
import LogoPng from '@/public/Opnion.png'
import Image from 'next/image'
import { Button } from './ui/button'

const Preview = () => {
  return (
    <div className='flex flex-col items-center justify-center py-3 px-5 w-96'>
        <div className='flex flex-col items-center justify-center gap-6'>
          <Image src={LogoPng} height={100} width={100} alt=''/>
          <p>Header goes here...</p>
          <p>Your custom message here...</p>
        </div>

        <div className='flex flex-col items-start'>
          <p>Questions</p>
            <p>Who are you / what are you working on?</p>
        </div>

        <div>
          <Button>Write a Feedback</Button>
        </div>
    </div>
  )
}

export default Preview