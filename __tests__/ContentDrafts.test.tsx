import { render, screen } from '@testing-library/react'
import ContentDrafts from '@/components/ContentDrafts'
import type { ContentDraft } from '@/types/dashboard'

const mockDrafts: ContentDraft[] = [
  { channel: 'thread', title: '스레드', preview: '루나르 스튜디오예요...' },
  { channel: 'instagram', title: '인스타그램', preview: '아임웹으로...' },
  { channel: 'blog', title: '블로그', preview: '아임웹 vs 다른 플랫폼...' },
]

describe('ContentDrafts', () => {
  it('채널 이름을 모두 표시한다', () => {
    render(<ContentDrafts drafts={mockDrafts} />)
    expect(screen.getByText('스레드')).toBeInTheDocument()
    expect(screen.getByText('인스타그램')).toBeInTheDocument()
    expect(screen.getByText('블로그')).toBeInTheDocument()
  })

  it('각 초안마다 발행 버튼이 있다', () => {
    render(<ContentDrafts drafts={mockDrafts} />)
    expect(screen.getAllByText('발행')).toHaveLength(3)
  })

  it('각 초안마다 수정 버튼이 있다', () => {
    render(<ContentDrafts drafts={mockDrafts} />)
    expect(screen.getAllByText('수정')).toHaveLength(3)
  })
})
