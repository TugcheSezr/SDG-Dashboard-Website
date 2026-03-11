'use client'

import { useState, useMemo } from 'react'
import { SDGInfo, SDGMetric } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/Card'
import { KPI } from '@/components/ui/KPI'
import { FilterBar } from '@/components/ui/FilterBar'
import { LineChart } from '@/components/charts/LineChart'
import { BarChart } from '@/components/charts/BarChart'
import { PieChart } from '@/components/charts/PieChart'
import { Table } from '@/components/ui/Table'
import { Button } from '@/components/ui/Button'
import { calculateAverage, formatMetricValue } from '@/lib/data'

interface SDGDetailClientProps {
  sdg: SDGInfo
  metrics: SDGMetric[]
  isAuthenticated: boolean
  isFavorite: boolean
}

export function SDGDetailClient({ sdg, metrics, isAuthenticated, isFavorite }: SDGDetailClientProps) {
  const [filters, setFilters] = useState<{
    country?: string
    from?: number
    to?: number
  }>({})
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false)
  const [localIsFavorite, setLocalIsFavorite] = useState(isFavorite)

  const filteredMetrics = useMemo(() => {
    let filtered = metrics

    if (filters.country) {
      filtered = filtered.filter((m) => m.country === filters.country)
    }
    if (filters.from) {
      filtered = filtered.filter((m) => m.year >= filters.from)
    }
    if (filters.to) {
      filtered = filtered.filter((m) => m.year <= filters.to)
    }

    return filtered
  }, [metrics, filters])

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      alert('Log in om favoriete SDG\'s op te slaan')
      return
    }

    setIsTogglingFavorite(true)
    try {
      const response = await fetch('/api/user/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favoriteSdg: localIsFavorite ? null : sdg.number }),
      })

      if (response.ok) {
        setLocalIsFavorite(!localIsFavorite)
      }
    } catch (error) {
      console.error('Failed to update favorite:', error)
    } finally {
      setIsTogglingFavorite(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-start gap-6 mb-6">
            <div
              className="w-24 h-24 rounded-xl flex items-center justify-center text-5xl flex-shrink-0"
              style={{ backgroundColor: sdg.color }}
            >
              {sdg.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                SDG {sdg.number}: {sdg.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {sdg.description}
              </p>
              {isAuthenticated && (
                <Button
                  onClick={handleToggleFavorite}
                  disabled={isTogglingFavorite}
                  variant="outline"
                  size="sm"
                  className="mt-4"
                >
                  {localIsFavorite ? '⭐ Favorieten' : '☆ Toevoegen aan Favorieten'}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* KPIs */}
        <SDGKPIs sdgNumber={sdg.number} metrics={filteredMetrics} />

        {/* Filters */}
        <div className="mb-8">
          <FilterBar onFilterChange={setFilters} />
        </div>

        {/* Charts */}
        <SDGCharts sdgNumber={sdg.number} metrics={filteredMetrics} color={sdg.color} />

        {/* Data Table */}
        <div className="mt-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Gegevenstabel
              </h3>
              <Table
                data={filteredMetrics.slice(0, 50)}
                columns={[
                  { key: 'country', label: 'Land' },
                  { key: 'year', label: 'Jaar' },
                  { key: 'metricKey', label: 'Statistiek' },
                  {
                    key: 'value',
                    label: 'Waarde',
                    render: (item) => formatMetricValue(item.value),
                  },
                  { key: 'source', label: 'Bron' },
                ]}
                enableExport
                exportFilename={`sdg-${sdg.number}-data.csv`}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function SDGKPIs({ metrics }: { sdgNumber: number; metrics: SDGMetric[] }) {
  const kpis = useMemo(() => {
    if (metrics.length === 0) return []

    const latestYear = Math.max(...metrics.map((m) => m.year))
    const previousYear = latestYear - 1
    const latestMetrics = metrics.filter((m) => m.year === latestYear)
    const previousMetrics = metrics.filter((m) => m.year === previousYear)

    const uniqueMetricKeys = [...new Set(metrics.map((m) => m.metricKey))]
    
    return uniqueMetricKeys.slice(0, 4).map((key) => {
      const current = latestMetrics.filter((m) => m.metricKey === key)
      const previous = previousMetrics.filter((m) => m.metricKey === key)
      
      const currentAvg = calculateAverage(current.map((m) => m.value))
      const previousAvg = calculateAverage(previous.map((m) => m.value))
      
      const trend: 'up' | 'down' | 'stable' = currentAvg > previousAvg ? 'up' : currentAvg < previousAvg ? 'down' : 'stable'
      const trendValue = Math.abs(currentAvg - previousAvg).toFixed(2)

      return {
        label: key.replace(/_/g, ' ').toUpperCase(),
        value: currentAvg.toFixed(2),
        trend,
        trendValue: `${trendValue}`,
      }
    })
  }, [metrics])

  if (kpis.length === 0) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpis.map((kpi, idx) => (
        <KPI key={idx} {...kpi} />
      ))}
    </div>
  )
}

function SDGCharts({
  sdgNumber,
  metrics,
  color,
}: {
  sdgNumber: number
  metrics: SDGMetric[]
  color: string
}) {
  const chartData = useMemo(() => {
    if (metrics.length === 0) return null

    // Group by metric key
    const byMetricKey = metrics.reduce((acc, m) => {
      if (!acc[m.metricKey]) acc[m.metricKey] = []
      acc[m.metricKey].push(m)
      return acc
    }, {} as Record<string, SDGMetric[]>)

    return byMetricKey
  }, [metrics])

  if (!chartData) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">
          Geen gegevens beschikbaar voor grafieken
        </CardContent>
      </Card>
    )
  }

  // Render specific charts based on SDG
  switch (sdgNumber) {
    case 7:
      return <SDG7Charts chartData={chartData} color={color} />
    case 11:
      return <SDG11Charts chartData={chartData} color={color} />
    case 13:
      return <SDG13Charts chartData={chartData} color={color} />
    case 15:
      return <SDG15Charts chartData={chartData} color={color} />
    default:
      return null
  }
}

function SDG7Charts({ chartData, color }: { chartData: Record<string, SDGMetric[]>; color: string }) {
  const renewableData = chartData['renewable_energy_percent'] || []
  const accessData = chartData['energy_access_percent'] || []

  // Line chart for renewable energy trends
  const lineChartData = {
    labels: [...new Set(renewableData.map((m) => m.year.toString()))],
    datasets: renewableData.reduce((acc, m) => {
      const existing = acc.find((d) => d.label === m.country)
      const yearIndex = acc[0]?.data.length || 0
      
      if (!existing) {
        acc.push({
          label: m.country,
          data: Array(yearIndex).fill(0).concat([m.value || 0]),
          borderColor: color,
          backgroundColor: color + '20',
        })
      } else {
        existing.data.push(m.value || 0)
      }
      return acc
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, [] as any[]),
  }

  // Bar chart for energy access
  const barChartData = {
    labels: [...new Set(accessData.map((m) => m.country))],
    datasets: [
      {
        label: 'Energietoegang (%)',
        data: [...new Set(accessData.map((m) => m.country))].map((country) => {
          const metric = accessData.find((m) => m.country === country)
          return metric?.value || 0
        }),
        backgroundColor: color,
      },
    ],
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Trends Hernieuwbare Energie
          </h3>
          <LineChart data={lineChartData} height={300} />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Energietoegang per Regio
          </h3>
          <BarChart data={barChartData} height={300} />
        </CardContent>
      </Card>
    </div>
  )
}

function SDG11Charts({ chartData, color }: { chartData: Record<string, SDGMetric[]>; color: string }) {
  const urbanData = chartData['urban_population_percent'] || []
  const airData = chartData['pm25_air_pollution'] || []

  // Pie chart for urban vs rural
  const pieChartData = {
    labels: ['Stedelijk', 'Landelijk'],
    datasets: [
      {
        data: urbanData.length > 0
          ? [urbanData[0].value || 0, 100 - (urbanData[0].value || 0)]
          : [92, 8],
        backgroundColor: [color, '#e5e7eb'],
        borderColor: ['#ffffff', '#ffffff'],
        borderWidth: 2,
      },
    ],
  }

  // Line chart for air quality
  const lineChartData = {
    labels: [...new Set(airData.map((m) => m.year.toString()))],
    datasets: [...new Set(airData.map((m) => m.country))].map((country, idx) => ({
      label: country,
      data: [...new Set(airData.map((m) => m.year))].map((year) => {
        const metric = airData.find((m) => m.country === country && m.year === year)
        return metric?.value || 0
      }),
      borderColor: idx === 0 ? color : '#6366f1',
      backgroundColor: (idx === 0 ? color : '#6366f1') + '20',
    })),
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Stedelijke vs Landelijke Bevolking
          </h3>
          <PieChart data={pieChartData} height={300} />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Luchtkwaliteit Trends (PM2.5)
          </h3>
          <LineChart data={lineChartData} height={300} />
        </CardContent>
      </Card>
    </div>
  )
}

function SDG13Charts({ chartData, color }: { chartData: Record<string, SDGMetric[]>; color: string }) {
  const co2Data = chartData['co2_per_capita'] || []

  // Line chart for CO2 emissions
  const lineChartData = {
    labels: [...new Set(co2Data.map((m) => m.year.toString()))],
    datasets: [...new Set(co2Data.map((m) => m.country))].map((country, idx) => ({
      label: country,
      data: [...new Set(co2Data.map((m) => m.year))].map((year) => {
        const metric = co2Data.find((m) => m.country === country && m.year === year)
        return metric?.value || 0
      }),
      borderColor: idx === 0 ? color : ['#6366f1', '#ef4444', '#f59e0b'][idx % 3],
      backgroundColor: (idx === 0 ? color : ['#6366f1', '#ef4444', '#f59e0b'][idx % 3]) + '20',
    })),
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            CO₂ Uitstoot Per Capita
          </h3>
          <LineChart data={lineChartData} height={400} />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            Bron: Global Carbon Project | Gegevens geïntegreerd vanuit VN SDG API
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function SDG15Charts({ chartData, color }: { chartData: Record<string, SDGMetric[]>; color: string }) {
  const forestData = chartData['forest_coverage_percent'] || []
  const biodiversityData = chartData['biodiversity_index'] || []

  // Bar chart for forest coverage
  const barChartData = {
    labels: [...new Set(forestData.map((m) => m.country))],
    datasets: [
      {
        label: 'Bosbedekking (%)',
        data: [...new Set(forestData.map((m) => m.country))].map((country) => {
          const latest = forestData.filter((m) => m.country === country).sort((a, b) => b.year - a.year)[0]
          return latest?.value || 0
        }),
        backgroundColor: color,
      },
    ],
  }

  // Line chart for biodiversity
  const lineChartData = {
    labels: [...new Set(biodiversityData.map((m) => m.country))],
    datasets: [
      {
        label: 'Biodiversiteitsindex',
        data: biodiversityData.map((m) => m.value || 0),
        borderColor: color,
        backgroundColor: color + '20',
      },
    ],
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Bosbedekking per Land
          </h3>
          <BarChart data={barChartData} height={300} />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Biodiversiteitsindex
          </h3>
          <BarChart data={lineChartData} height={300} />
        </CardContent>
      </Card>
    </div>
  )
}

