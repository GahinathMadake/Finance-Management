"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { ChartConfig } from "@/components/ui/chart"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type MonthlyData = {
  month: string
  budget: number
  expenses: number
}

type ChartBarMonthlyProps = {
  data: MonthlyData[],
}

const chartConfig = {
  budget: {
    label: "Budget",
    color: "var(--chart-1)",
  },
  expenses: {
    label: "Expenses",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartBarMonthly({ data }: ChartBarMonthlyProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Data Available</CardTitle>
          <CardDescription>
            Add budgets and transactions to see chart insights.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget vs Expenses</CardTitle>
        <CardDescription>
          {data[0]?.month} - {data[data.length - 1]?.month} 
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={data} height={300}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
            <Legend />
            <Bar dataKey="budget" fill="var(--color-budget)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expenses" fill="var(--color-expenses)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Budget on track this year <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="text-muted-foreground leading-none">
          Comparing monthly budget vs expenses for the year
        </div>
      </CardFooter>
    </Card>
  )
}








// Category wise chart data
import { LabelList, Pie, PieChart } from "recharts"

type CategoryChartData = {
  category: string
  amount: number
  fill: string
}

type Props = {
  data: CategoryChartData[]
}

export function ChartPieLabelList({ data }: Props) {
  const colors = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
    "var(--chart-6)",
  ]

  const chartData = data.map((item, index) => ({
    ...item,
    fill: colors[index % colors.length],
  }))

  const chartConfig: ChartConfig = {
    amount: {
      label: "Amount",
    },
  }

  chartData.forEach((item) => {
    chartConfig[item.category] = {
      label: item.category,
      color: item.fill,
    }
  })

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Category-wise Expenses</CardTitle>
        <CardDescription>For this Month</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="category" hideLabel />}
            />
            <Pie data={chartData} dataKey="amount">
              <LabelList
                dataKey="category"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(label) => {
                  if (typeof label === "string") {
                    return chartConfig[label]?.label ?? label
                  }
                  return label
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Track of Budget <TrendingUp className="h-4 w-4 text-green-500" /> on Categories!
        </div>
        <div className="text-muted-foreground leading-none">
          Total expenses by category over the month
        </div>
      </CardFooter>
    </Card>
  )
}
