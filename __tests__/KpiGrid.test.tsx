import { render, screen } from '@testing-library/react'
import KpiGrid from '@/components/KpiGrid'
import type { Kpi } from '@/types/dashboard'

const mockKpi: Kpi = {
  weeklyPublished: 5,
  weeklyTarget: 7,
  newInquiries: 2,
  contentReactions: 47,
  quotePending: 1,
}

describe('KpiGrid', () => {
  it('발행 현황을 표시한다', () => {
    render(<KpiGrid kpi={mockKpi} />)
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('/7')).toBeInTheDocument()
  })

  it('신규 문의 건수를 표시한다', () => {
    render(<KpiGrid kpi={mockKpi} />)
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('콘텐츠 반응 수를 표시한다', () => {
    render(<KpiGrid kpi={mockKpi} />)
    expect(screen.getByText('+47')).toBeInTheDocument()
  })

  it('견적 대기 건수를 표시한다', () => {
    render(<KpiGrid kpi={mockKpi} />)
    expect(screen.getByText('1')).toBeInTheDocument()
  })
})
