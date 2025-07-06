'use client'
import React from 'react'
import { Button } from './ui/button'
import { ChartLine } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const ChartButton = ({spacename}:{spacename:string}) => {
    const router = useRouter();
    return (
                    <Button variant='outline' size='icon' effect='ringHover' onClick={()=>{router.push('/analytics/'+spacename)}}>
                      <ChartLine />
                    </Button>
    )
}

const Chart = () => {
  return (
    <div>Chart</div>
  )
}

export default Chart