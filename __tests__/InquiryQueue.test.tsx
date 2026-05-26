import { render, screen } from '@testing-library/react'
import InquiryQueue from '@/components/InquiryQueue'
import type { Inquiry } from '@/types/dashboard'

const mockInquiries: Inquiry[] = [
  { name: '홍길동', type: '견적 문의', preview: '홈페이지 제작 비용이 어떻게 되나요?' },
]

describe('InquiryQueue', () => {
  it('문의자 이름을 표시한다', () => {
    render(<InquiryQueue inquiries={mockInquiries} />)
    expect(screen.getByText('홍길동')).toBeInTheDocument()
  })

  it('문의 유형 뱃지를 표시한다', () => {
    render(<InquiryQueue inquiries={mockInquiries} />)
    expect(screen.getByText('견적 문의')).toBeInTheDocument()
  })

  it('문의가 없을 때 빈 상태 메시지를 표시한다', () => {
    render(<InquiryQueue inquiries={[]} />)
    expect(screen.getByText('새로운 문의가 없어요')).toBeInTheDocument()
  })
})
