import { getDailyViews, GetSpace } from '@/app/actions/actions'
import { DashboardStackedChart } from '@/components/DashboardChart'
import Navbar from '@/components/Navbar'
import { Eye, MessageSquareQuote, Percent, ThumbsUp } from 'lucide-react'
import React from 'react'

interface PageProps {
  params: {
    spacename: string
  }
}

const page = async ({ params }: PageProps) => {
  const { spacename } = params

  const [Chartdata, SpaceData] = await Promise.all([
    getDailyViews(spacename),
    GetSpace(spacename),
  ])

  if (!Array.isArray(Chartdata)) {
    return <p>Error: {Chartdata.message}</p>
  }

  const totalFeedbacks = SpaceData.space?.feedbacks?.length || 0
  const totalViews = SpaceData.space?.views?.length || 0
  const avgFeedbacksPerDay = ((totalFeedbacks / Chartdata.length).toFixed(1))
  const ConversionRate =
    totalViews > 0
      ? ((totalFeedbacks / totalViews) * 100).toFixed(1) + '%'
      : '0%'

  const data = [
    { label: 'Feedbacks', value: totalFeedbacks, Icon: MessageSquareQuote },
    { label: 'Views', value: totalViews, Icon: Eye },
    { label: 'Conversion', value: ConversionRate, Icon: Percent },
    { label: 'Average', value: avgFeedbacksPerDay==='NaN' ? 0 : avgFeedbacksPerDay, Icon: ThumbsUp },
  ]

  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-20 py-10 space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">
            Engagement Overview
          </h2>
          <p className="text-sm text-muted-foreground">
            Daily breakdown of views and feedback submissions.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-2">
          {data.map(({ label, value, Icon }, idx) => (
            <div
              key={idx}
              className="border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-lg font-semibold text-foreground">{label}</p>
                <Icon className="text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground">
                {typeof value === 'number' ? value.toLocaleString() : value}
              </p>
            </div>
          ))}
        </div>

        <DashboardStackedChart chartdata={Chartdata} />

        
      </div>
    </div>
  )
}

export default page
