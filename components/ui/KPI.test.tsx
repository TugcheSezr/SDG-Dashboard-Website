import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { KPI } from './KPI'

describe('KPI Component', () => {
  it('renders label and value correctly', () => {
    render(<KPI label="Test Metric" value="100" />)
    
    expect(screen.getByText('Test Metric')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  it('displays trend indicator when provided', () => {
    render(<KPI label="Metric" value="50" trend="up" trendValue="5" />)
    
    expect(screen.getByText('↑')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('shows unit when provided', () => {
    render(<KPI label="Temperature" value="25" unit="°C" />)
    
    expect(screen.getByText('°C')).toBeInTheDocument()
  })

  it('applies correct trend color classes', () => {
    const { container } = render(<KPI label="Metric" value="50" trend="down" />)
    
    const trendElement = container.querySelector('.text-red-600')
    expect(trendElement).toBeInTheDocument()
  })
})

