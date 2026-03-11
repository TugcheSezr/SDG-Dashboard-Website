'use client'

import React, { useState } from 'react'
import { Select } from './Select'
import { Input } from './Input'
import { Button } from './Button'
import { REGIONS, COUNTRIES_BY_REGION, Region } from '@/lib/types'

interface FilterBarProps {
  onFilterChange: (filters: {
    region?: string
    country?: string
    from?: number
    to?: number
  }) => void
  showRegion?: boolean
  showCountry?: boolean
  showYearRange?: boolean
}

export function FilterBar({
  onFilterChange,
  showRegion = true,
  showCountry = true,
  showYearRange = true,
}: FilterBarProps) {
  const [region, setRegion] = useState<Region>('Global')
  const [country, setCountry] = useState<string>('')
  const [yearFrom, setYearFrom] = useState<string>('2018')
  const [yearTo, setYearTo] = useState<string>('2022')

  const handleApplyFilters = () => {
    onFilterChange({
      region: region !== 'Global' ? region : undefined,
      country: country || undefined,
      from: yearFrom ? parseInt(yearFrom) : undefined,
      to: yearTo ? parseInt(yearTo) : undefined,
    })
  }

  const handleReset = () => {
    setRegion('Global')
    setCountry('')
    setYearFrom('2018')
    setYearTo('2022')
    onFilterChange({})
  }

  const availableCountries = region === 'Global' 
    ? []
    : COUNTRIES_BY_REGION[region] || []

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {showRegion && (
          <Select
            label="Regio"
            value={region}
            onChange={(e) => {
              setRegion(e.target.value as Region)
              setCountry('')
            }}
            options={REGIONS.map((r) => ({ value: r, label: r }))}
          />
        )}
        {showCountry && region !== 'Global' && (
          <Select
            label="Land"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            options={[
              { value: '', label: 'Alle Landen' },
              ...availableCountries.map((c) => ({ value: c, label: c })),
            ]}
          />
        )}
        {showYearRange && (
          <>
            <Input
              label="Vanaf Jaar"
              type="number"
              min="1990"
              max="2030"
              value={yearFrom}
              onChange={(e) => setYearFrom(e.target.value)}
            />
            <Input
              label="Tot Jaar"
              type="number"
              min="1990"
              max="2030"
              value={yearTo}
              onChange={(e) => setYearTo(e.target.value)}
            />
          </>
        )}
      </div>
      <div className="flex gap-3 mt-4">
        <Button onClick={handleApplyFilters} size="sm">
          Filters Toepassen
        </Button>
        <Button onClick={handleReset} variant="outline" size="sm">
          Reset
        </Button>
      </div>
    </div>
  )
}

