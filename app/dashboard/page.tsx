import React from 'react'
import Navbar from '../../components/Navbar'
import { FolderPlus, MessageSquareQuote, Percent, Sparkle } from 'lucide-react'
import Footer from '@/components/Footer'
import LogoPng from '@/public/Opnion.png'
import Image from 'next/image'
import { SpaceDropdown } from '@/components/SpaceDropdown'
import { AddSpaceDialog } from '@/components/AddSpaceDialog'
import { GetSpaces } from '../actions/actions'
import { Types } from 'mongoose'


export interface spacesInterface {
  _id: string;
  spacename: string;
  title: string;
  message: string;
  questions: string[];
  color: string;
  feedbacks?: Types.ObjectId[];
  views: number;
  createdby: Types.ObjectId;
}

const page = async() => {
            const space = await GetSpaces();
            const spaces = space?.spaces as spacesInterface[];
            let totalFeedbacks = 0;
            let totalViews = 0;
            const ConversionRate = (totalFeedbacks / totalViews) * 100 || 0;
              const data = [
              { label: 'Total Feedbacks', value: totalFeedbacks, Icon: MessageSquareQuote },
              { label: 'Total Spaces', value: spaces?.length, Icon: Sparkle },
              { label: 'Conversion Rate', value: ConversionRate+'%', Icon: Percent },
            ]
  return (
    <div>
      <Navbar />
      <div className="py-10 px-6">
        {/* Welcome */}
        <div className="flex items-center justify-start md:px-10 lg:px-40">
          <p className="text-3xl font-bold flex gap-2">Welcome, Shreyas</p>
          <p className={`text-4xl motion-preset-shake`}>👋🏻</p>
        </div>

        {/* Overview */}
        <div className='absolute border-b h-1 mt-8 w-full overflow- right-0'></div>

        <div className="mt-6 pt-6 md:pt-8 md:px-10 lg:px-40">
          <div className="mb-2">
            <p className="text-3xl font-bold">Overview</p>
          </div>

          {/* Overview Cards */}
          <div className="flex flex-col lg:flex-row lg:gap-3 lg:justify-around">
            {data.map(({ label, value, Icon }, idx) => (
              <div
                key={idx}
                className="mt-4 bg-[#f1f5fe] dark:bg-black/30 flex flex-col py-5 px-4 rounded-2xl lg:w-full border"
              >
                <div className="flex justify-between items-center px-2">
                  <p className="text-xl font-bold">{label}</p>
                  <Icon />
                </div>
                <div className="mt-10 px-2">
                  <p className="text-3xl font-bold">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spaces */}
        <div className="mt-6 pt-6 md:px-10 md:pt-8 lg:px-40">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-3xl font-bold">Spaces</p>
            {spaces ? <AddSpaceDialog/>:""}
          </div>
            
            {spaces.length > 0 ? 
              <div className="my-7 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">

                {spaces.map((space)=>{
                  totalFeedbacks += space.feedbacks?.length || 0;
                  totalViews += space.views || 0;
                  return (
                <div key={space._id} className="col-span-1 w-full flex flex-col justify-between bg-[#f1f5fe] dark:bg-black/30 gap-16 py-5 rounded-2xl border px-6">
                  <div className="flex justify-between gap-10">
                    <div className="flex items-center">
                      <Image src={LogoPng} height={35} width={35} alt="" className="mr-3" />
                      <p className="font-bold text-lg">{space.spacename}</p>
                    </div>
                    <div>
                      <SpaceDropdown />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-gray-400 font-medium px-1">
                    <p>Views: {space.views}</p>
                    <p>Feedbacks: {space.feedbacks?.length}</p>
                  </div>
              </div>   
                  )
                })}         
            </div>
            :
            <div className="bg-[#f1f5fe] dark:bg-black/30 my-5 flex flex-col items-center justify-center py-5 px-3 md:py-9 rounded-2xl border">
            <FolderPlus className="size-18 stroke-1 mb-3" />
            <p className="text-lg font-bold">No Spaces yet</p>
            <p className="text-center font-semibold text-gray-500 mt-2">
              Start by creating your first space to collect valuable feedback.
            </p>
                <AddSpaceDialog/>
          </div>}
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default page
