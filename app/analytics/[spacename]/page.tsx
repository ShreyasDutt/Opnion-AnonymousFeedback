import { getDailyViews } from '@/app/actions/actions'
import { ChartBarViews } from '@/components/ChartInteractive'
import Navbar from '@/components/Navbar'
import React from 'react'

interface PageProps {
  params: Promise<{
    spacename: string
  }>
}

const page = async({ params }: PageProps) => {
        const { spacename } = await params;
        const Chartdata = await getDailyViews(spacename);
        if (!Array.isArray(Chartdata)) {
        return <p>Error: {Chartdata.message}</p>;
        }

  return (
    <div>
        <div>
            <Navbar/>
        </div>
        <div className='mt-10 p-20'>
           <ChartBarViews ChartData={Chartdata} />
        </div>
    </div>
  )
}

export default page