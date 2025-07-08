'use client'
import React from 'react'
import { Button } from './ui/button'
import { ChartLine } from 'lucide-react'
import Link from 'next/link'

export const ChartButton = ({spacename}:{spacename:string}) => {
    return (
      <Link href={'/analytics/'+spacename}>
          <Button variant='outline' size='icon' effect='ringHover'>
              <ChartLine />
          </Button>
      </Link>

    )
}

const Chart = () => {
  return (
    <div>Chart</div>
  )
}

export default Chart