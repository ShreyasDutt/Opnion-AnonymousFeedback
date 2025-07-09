  'use client'

  import {
    BarChart,
    Bar,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from 'recharts'

  type ChartData = {
    date: string
    views: number
    feedbacks: number
  }[]

  export const DashboardStackedChart = ({ chartdata }: { chartdata: ChartData }) => {
    const data = chartdata.length > 0 ? chartdata : [
      { date: '2025-07-08', views: 2, feedbacks: 3 },
      { date: '2025-07-09', views: 5, feedbacks: 1 },
      { date: '2025-07-10', views: 4, feedbacks: 2 },
      { date: '2025-07-11', views: 7, feedbacks: 3 },
    ]

    return (
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            barCategoryGap="30%"
          >
            <defs>
              <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.8} />
                <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="feedbacksGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#14B8A6" stopOpacity={0.9} />
              <stop offset="50%" stopColor="#10B981" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#059669" stopOpacity={0.7} />
            </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="var(--muted)" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tick={{ fill: 'var(--foreground)' }}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              }}
            />
           
            <Tooltip
              cursor={{ fill: 'rgba(88, 86, 214, 0.1)' }}
              contentStyle={{
                backgroundColor: 'var(--popover)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                color: 'var(--popover-foreground)',
              }}
              labelStyle={{ color: 'var(--foreground)' }}
              formatter={(value: number, name: string) => [`${value}`, name]}
              labelFormatter={(label: string) => {
                const date = new Date(label)
                return date.toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })
              }}
            />

            <Bar
              dataKey="views"
              stackId="a"
              fill="url(#viewsGradient)"
              name="Views"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="feedbacks"
              stackId="a"
              fill="url(#feedbacksGradient)"
              name="Feedbacks"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
