'use client'

import { useState } from 'react'
import type { ContentDraft } from '@/types/dashboard'

interface Props {
  draft: ContentDraft
  onClose: () => void
}

const channelGuide: Record<string, string> = {
  thread: 'Threads 앱 → 새 게시물 → 붙여넣기 → 게시',
  instagram: 'Instagram 앱 → + → 게시물 → 캡션에 붙여넣기 → 공유',
  blog: '네이버 블로그 또는 브런치 → 새 글 → 붙여넣기 → 발행',
}

export default function PublishModal({ draft, onClose }: Props) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(draft.preview)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-navy-900 border border-navy-800 rounded-xl p-6 w-full max-w-lg shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm font-semibold text-slate-200">발행 준비 — {draft.title}</p>
          <button onClick={onClose} className="text-navy-700 hover:text-slate-400 text-xl leading-none">✕</button>
        </div>

        <div className="bg-navy-800 rounded-lg p-4 mb-3 max-h-60 overflow-y-auto">
          <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{draft.preview}</p>
        </div>

        <p className="text-[11px] text-navy-700 mb-4">📌 {channelGuide[draft.channel]}</p>

        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="bg-navy-800 text-slate-500 rounded-lg px-4 py-2 text-sm hover:bg-navy-700 transition-colors">닫기</button>
          <button
            onClick={copy}
            className="bg-brand-purple-dark text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-brand-purple transition-colors min-w-[110px]"
          >
            {copied ? '✓ 복사됨' : '클립보드 복사'}
          </button>
        </div>
      </div>
    </div>
  )
}
