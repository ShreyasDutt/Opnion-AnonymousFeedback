import { getDailyViews } from '@/app/actions/actions'
import { DashboardStackedChart } from '@/components/DashboardChart'
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
        console.log(Chartdata);
        if (!Array.isArray(Chartdata)) {
        return <p>Error: {Chartdata.message}</p>;
        }

  return (
    <div>
        <div>
            <Navbar/>
        </div>
        <div className='mt-10 p-20'>
          <DashboardStackedChart chartdata={Chartdata}/>
        </div>
    </div>
  )
}

export default page