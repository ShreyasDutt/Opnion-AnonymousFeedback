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
import Link from 'next/link'

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

const page = async () => {
  const space = await GetSpaces();
  const spaces = space?.spaces as spacesInterface[];

  let totalFeedbacks = 0;
  let totalViews = 0;
  spaces?.forEach(s => {
    totalFeedbacks += s.feedbacks?.length || 0;
    totalViews += s.views || 0;
  });

  const ConversionRate = totalViews > 0 ? ((totalFeedbacks / totalViews) * 100).toFixed(1) + '%' : '0%';

  const data = [
    { label: 'Total Feedbacks', value: totalFeedbacks, Icon: MessageSquareQuote },
    { label: 'Total Spaces', value: spaces?.length, Icon: Sparkle },
    { label: 'Conversion Rate', value: ConversionRate, Icon: Percent },
  ];

  return (
    <div>
      <Navbar />
      <div className="py-10 px-6">
        <div className="flex items-center justify-start md:px-10 lg:px-40">
          <p className="text-3xl font-bold flex gap-2">Welcome, Shreyas</p>
          <p className="text-4xl motion-preset-shake">👋🏻</p>
        </div>

        <div className="absolute border-b h-1 mt-8 w-full right-0"></div>

        <div className="mt-6 pt-6 md:pt-8 md:px-10 lg:px-40">
          <div className="mb-9">
            <p className="text-3xl font-bold">Overview</p>
          </div>

          {spaces.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.map(({ label, value, Icon }, idx) => (
                <div
                  key={idx}
                  className="bg-[#f1f5fe] dark:bg-black/30 border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-100">{label}</p>
                    <Icon className="text-primary" />
                  </div>
                  <p className="text-3xl font-bold text-black dark:text-white">
                    {typeof value === 'number' ? value.toLocaleString() : value}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#f1f5fe] dark:bg-black/30 border p-6 rounded-2xl shadow-sm text-center">
              <p className="text-lg font-bold text-gray-800 dark:text-white">No data to show</p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                You haven't created any spaces yet, so your dashboard is empty.
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 pt-6 md:px-10 md:pt-8 lg:px-40">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-3xl font-bold">Spaces</p>
            {spaces.length > 0 ? <AddSpaceDialog /> : ""}
          </div>

          {spaces.length > 0 ? (
            <div className="my-7 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {spaces.map((space) => (
                <div key={space._id} className="col-span-1 w-full flex flex-col justify-between bg-[#f1f5fe] dark:bg-black/30 gap-16 py-5 rounded-2xl border px-6">
                  <div className="flex justify-between gap-10">
                    <div className="flex items-center">
                      <Image src={LogoPng} height={35} width={35} alt="" className="mr-3" />
                      <Link href={`/dashboard/${space.spacename}`} className="font-bold text-lg">{space.spacename}</Link>
                    </div>
                    <div>
                      <SpaceDropdown spaceId={space._id.toString()} spaceName={space.spacename} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-gray-400 font-medium px-1">
                    <p>Views: {space.views}</p>
                    <p>Feedbacks: {space.feedbacks?.length || 0}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#f1f5fe] dark:bg-black/30 my-5 flex flex-col items-center justify-center py-5 px-3 md:py-9 rounded-2xl border">
              <FolderPlus className="size-18 stroke-1 mb-3" />
              <p className="text-lg font-bold">No Spaces yet</p>
              <p className="text-center font-semibold text-gray-500 mt-2">
                Start by creating your first space to collect valuable feedback.
              </p>
              <AddSpaceDialog />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default page
