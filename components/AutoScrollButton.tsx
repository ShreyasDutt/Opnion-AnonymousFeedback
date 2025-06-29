"use client"
import React from 'react'
import { Button } from './ui/button'

const AutoScrollButton = ({sectionId}: {sectionId: string}) => {
    const handleClick = () =>{
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
    }
  return (
    <Button onClick={handleClick} className='bg-white hover:bg-white border text-black p-5 lg:w-72'  effect={'ringHover'}>
                See How it Works
    </Button>
  )
}

export default AutoScrollButton