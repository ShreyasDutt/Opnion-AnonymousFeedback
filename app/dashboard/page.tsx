import React from 'react'
import Navbar from '../../components/Navbar'
import { FolderPlus, MessageSquareQuote, Percent, Plus, Sparkle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Footer from '@/components/Footer'

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="py-10 px-6">
        {/* Welcome */}
        <div className="flex items-center justify-start md:px-10 lg:px-40">
          <p className="text-3xl font-bold flex gap-2">Welcome, Shreyas</p>
          <p className={`waving-hand text-4xl`}>👋🏻</p>
        </div>

        {/* Overview */}
        <div className='absolute border-b h-1 mt-8 w-full overflow- right-0'></div>

        <div className="mt-6 pt-6 md:pt-8 md:px-10 lg:px-40">
          <div className="mb-2">
            <p className="text-3xl font-bold">Overview</p>
          </div>

          {/* Overview Cards */}
          <div className="flex flex-col lg:flex-row lg:gap-3 lg:justify-around">
            {[
              { label: 'Total Feedbacks', value: '178', Icon: MessageSquareQuote },
              { label: 'Total Spaces', value: '2', Icon: Sparkle },
              { label: 'Conversion Rate', value: '15%', Icon: Percent },
            ].map(({ label, value, Icon }, idx) => (
              <div
                key={idx}
                className="mt-4 bg-[#f1f5fe] dark:bg-black/30 flex flex-col py-5 px-4 rounded-2xl lg:px-10 lg:w-full border"
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
          <div className="mb-2">
            <p className="text-3xl font-bold">Spaces</p>
          </div>

          {/* Empty State */}
          <div className="bg-[#f1f5fe] dark:bg-black/30 my-5 flex flex-col items-center justify-center py-5 px-3 md:py-9 rounded-2xl border">
            <FolderPlus className="size-18 stroke-1 mb-3" />
            <p className="text-lg font-bold">No Spaces yet</p>
            <p className="text-center font-semibold text-gray-500 mt-2">
              Start by creating your first space to collect valuable feedback.
            </p>
            <Button className="text-white mt-5 flex py-5 gap-2">
              <Plus />
              Create a new space
            </Button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default page
