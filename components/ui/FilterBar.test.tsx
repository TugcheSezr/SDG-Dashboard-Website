import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react' 
import { FilterBar } from './FilterBar'

describe('FilterBar Component', () => {
  it('renders all filter controls', () => {
    const mockCallback = vi.fn()
    render(<FilterBar onFilterChange={mockCallback} />)
    
    expect(screen.getByLabelText('Region')).toBeInTheDocument()
    expect(screen.getByLabelText('From Year')).toBeInTheDocument()
    expect(screen.getByLabelText('To Year')).toBeInTheDocument()
  })

  it('calls onFilterChange when Apply Filters is clicked', () => {
    const mockCallback = vi.fn()
    render(<FilterBar onFilterChange={mockCallback} />)
    
    const applyButton = screen.getByText('Apply Filters')
    fireEvent.click(applyButton)
    
    expect(mockCallback).toHaveBeenCalled()
  })

  it('resets filters when Reset is clicked', () => {
    const mockCallback = vi.fn()
    render(<FilterBar onFilterChange={mockCallback} />)
    
    const resetButton = screen.getByText('Reset')
    fireEvent.click(resetButton)
    
    expect(mockCallback).toHaveBeenCalledWith({})
  })

  it('shows country select when region is selected', () => {
    const mockCallback = vi.fn()
    render(<FilterBar onFilterChange={mockCallback} />)
    
    const regionSelect = screen.getByLabelText('Region')
    fireEvent.change(regionSelect, { target: { value: 'Europe' } })
    
    expect(screen.getByLabelText('Country')).toBeInTheDocument()
  })
})
