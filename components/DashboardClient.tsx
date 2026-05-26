'use client'

import { useState } from 'react'
import type { DashboardData, ContentDraft, Channel } from '@/types/dashboard'
import Header from './Header'
import KpiGrid from './KpiGrid'
import ContentDrafts from './ContentDrafts'
import InquiryQueue from './InquiryQueue'
import WeeklyCalendar from './WeeklyCalendar'
import ProjectList from './ProjectList'
import ActivityLog from './ActivityLog'

interface Props { initial: DashboardData }

export default function DashboardClient({ initial }: Props) {
  const [drafts, setDrafts] = useState<ContentDraft[]>(initial.contentDrafts)
  const [generating, setGenerating] = useState(false)
  const [genError, setGenError] = useState('')

  const generateDrafts = async (keyword: string) => {
    setGenerating(true)
    setGenError('')
    try {
      const res = await fetch('/api/generate-drafts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword }),
      })
      const data = await res.json()
      if (data.thread) {
        setDrafts([
          { channel: 'thread', title: '스레드', preview: data.thread },
          { channel: 'instagram', title: '인스타그램', preview: data.instagram },
          { channel: 'blog', title: '블로그', preview: data.blog },
        ])
      } else {
        setGenError('초안 생성 실패. API 키를 확인해줘.')
      }
    } catch {
      setGenError('서버 오류가 발생했어.')
    } finally {
      setGenerating(false)
    }
  }

  const updateDraft = (channel: Channel, content: string) => {
    setDrafts(prev => prev.map(d => d.channel === channel ? { ...d, preview: content } : d))
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-6">
      <Header onRoutineStart={generateDrafts} generating={generating} />
      {genError && (
        <div className="mb-4 bg-red-950 border border-red-800 text-red-400 text-[12px] px-4 py-2 rounded-lg">
          {genError}
        </div>
      )}
      <KpiGrid kpi={initial.kpi} />
      <div className="grid grid-cols-[1fr_300px] gap-3">
        <div>
          <ContentDrafts drafts={drafts} onDraftUpdate={updateDraft} />
          <InquiryQueue inquiries={initial.inquiries} />
        </div>
        <div className="flex flex-col gap-3">
          <WeeklyCalendar calendar={initial.weeklyCalendar} />
          <ProjectList projects={initial.projects} />
          <ActivityLog log={initial.activityLog} />
        </div>
      </div>
    </main>
  )
}
