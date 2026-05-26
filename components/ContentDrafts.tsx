'use client'

import { useState } from 'react'
import type { ContentDraft, Channel } from '@/types/dashboard'

const channelDot: Record<Channel, string> = {
  thread: 'bg-brand-cyan',
  instagram: 'bg-brand-pink',
  blog: 'bg-brand-violet',
}

interface Props { drafts: ContentDraft[] }

export default function ContentDrafts({ drafts }: Props) {
  const [toast, setToast] = useState('')

  const copy = (text: string, msg: string) => {
    navigator.clipboard.writeText(text)
    setToast(msg)
    setTimeout(() => setToast(''), 2000)
  }

  return (
    <div className="bg-navy-900 border border-navy-800 rounded-xl p-4 mb-3 relative">
      {toast && (
        <div className="absolute top-3 right-3 bg-brand-purple text-white text-[11px] px-3 py-1.5 rounded-lg shadow-lg z-10">
          {toast}
        </div>
      )}
      <div className="flex justify-between items-center mb-3">
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">콘텐츠 초안</p>
        <span className="text-[10px] bg-indigo-950 text-brand-violet rounded px-2 py-0.5">오늘 생성</span>
      </div>
      {drafts.map((draft) => (
        <div key={draft.channel} className="flex justify-between items-center py-2.5 border-b border-navy-800 last:border-0 last:pb-0">
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${channelDot[draft.channel]}`} />
            <div>
              <p className="text-sm text-slate-300">{draft.title}</p>
              <p className="text-[11px] text-navy-700 mt-0.5 max-w-xs truncate">{draft.preview}</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={() => copy(draft.preview, `${draft.title} 복사됨`)}
              className="bg-brand-purple-dark text-white rounded px-2.5 py-1 text-[11px] hover:bg-brand-purple transition-colors"
            >
              발행
            </button>
            <button
              onClick={() => copy(draft.preview, '수정용 복사됨')}
              className="bg-navy-800 text-slate-500 rounded px-2.5 py-1 text-[11px] hover:bg-navy-700 transition-colors"
            >
              수정
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
