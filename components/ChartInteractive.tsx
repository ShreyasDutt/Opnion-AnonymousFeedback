"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export type ViewDataPoint = {
  date: string
  views: number
}

const chartConfig = {
  views: {
    label: "Views",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartBarViews({ ChartData }: { ChartData: ViewDataPoint[] }) {
  const monthlyData = ChartData.reduce((acc: Record<string, number>, entry) => {
    const date = new Date(entry.date)
    const key = date.toLocaleDateString("en-US", { year: "numeric", month: "long" })
    acc[key] = (acc[key] || 0) + entry.views
    return acc
  }, {})

  const data = Object.entries(monthlyData).map(([month, views]) => ({
    month,
    views,
  }))

  const total = data.reduce((sum, d) => sum + d.views, 0)

  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle>Monthly Views</CardTitle>
        <CardDescription>Grouped by month from analytics</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)} 
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent nameKey="views" />}
            />
            <Bar dataKey="views" fill="var(--color-views)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          {`Total views: ${total.toLocaleString()}`}{" "}
          <TrendingUp className="h-4 w-4 text-green-600" />
        </div>
        <div className="text-muted-foreground leading-none">
          Monthly totals over the tracked period
        </div>
      </CardFooter>
    </Card>
  )
}
