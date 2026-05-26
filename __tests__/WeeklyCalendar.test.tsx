import { render, screen } from '@testing-library/react'
import WeeklyCalendar from '@/components/WeeklyCalendar'
import type { Channel } from '@/types/dashboard'

const mockCalendar: Record<Channel, boolean[]> = {
  thread: [true, true, false, false, false, false, false],
  instagram: [true, false, false, false, false, false, false],
  blog: [false, false, false, false, false, false, false],
}

describe('WeeklyCalendar', () => {
  it('스레드 레이블을 표시한다', () => {
    render(<WeeklyCalendar calendar={mockCalendar} />)
    expect(screen.getByText('스레드')).toBeInTheDocument()
  })

  it('인스타 레이블을 표시한다', () => {
    render(<WeeklyCalendar calendar={mockCalendar} />)
    expect(screen.getByText('인스타')).toBeInTheDocument()
  })

  it('7개의 요일 도트를 렌더링한다', () => {
    render(<WeeklyCalendar calendar={mockCalendar} />)
    const days = screen.getAllByText(/[월화수목금토일]/)
    expect(days.length).toBeGreaterThanOrEqual(7)
  })
})
