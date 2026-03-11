'use client'

import React from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface PieChartProps {
  data: {
    labels: string[]
    datasets: Array<{
      label?: string
      data: number[]
      backgroundColor?: string[]
      borderColor?: string[]
      borderWidth?: number
    }>
  }
  title?: string
  loading?: boolean
  error?: string
  height?: number
}

export function PieChart({ data, title, loading, error, height = 300 }: PieChartProps) {
  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: !!title,
        text: title,
      },
    },
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <div className="text-gray-500 dark:text-gray-400">Loading chart...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <div className="text-red-600 dark:text-red-400">Error: {error}</div>
      </div>
    )
  }

  if (!data.datasets.length || !data.labels.length) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <div className="text-gray-500 dark:text-gray-400">No data available</div>
      </div>
    )
  }

  return (
    <div style={{ height }}>
      <Doughnut options={options} data={data} />
    </div>
  )
}

