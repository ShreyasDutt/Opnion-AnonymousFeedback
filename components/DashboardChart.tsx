'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type ChartData = {
  date: string
  views: number
}[]

export const DashboardChart = ({ chartdata }: { chartdata: ChartData }) => {
  const data = chartdata.length > 0 ? chartdata : [
    { date: '2025-07-08', views: 2 },
    { date: '2025-07-09', views: 3 },
    { date: '2025-07-10', views: 4 },
    { date: '2025-07-11', views: 5 },
    { date: '2025-07-12', views: 6 },
    { date: '2025-07-13', views: 7 },
    { date: '2025-07-14', views: 8 },
    { date: '2025-07-15', views: 1 },
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
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.8} />
              <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />

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

          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            tick={{ fill: 'var(--foreground)' }}
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
            formatter={(value: number) => [`${value} views`, '']}
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
            fill="url(#barGradient)"
            radius={[8, 8, 0, 0]}
            name="Total Views"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
