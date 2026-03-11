import React from 'react'
import { KPIData } from '@/lib/types'

interface KPIProps extends KPIData {
  className?: string
}

export function KPI({ label, value, trend, trendValue, unit, className = '' }: KPIProps) {
  const getTrendIcon = () => {
    if (!trend) return null
    if (trend === 'up') return '↑'
    if (trend === 'down') return '↓'
    return '→'
  }

  const getTrendColor = () => {
    if (!trend) return ''
    if (trend === 'up') return 'text-green-600 dark:text-green-400'
    if (trend === 'down') return 'text-red-600 dark:text-red-400'
    return 'text-gray-600 dark:text-gray-400'
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 ${className}`}>
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {value}
          {unit && <span className="text-xl ml-1">{unit}</span>}
        </p>
        {trend && (
          <span className={`text-sm font-medium flex items-center gap-1 ${getTrendColor()}`}>
            {getTrendIcon()}
            {trendValue && <span>{trendValue}</span>}
          </span>
        )}
      </div>
    </div>
  )
}

