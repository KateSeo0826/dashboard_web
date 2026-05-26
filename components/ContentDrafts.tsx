'use client'

import { useState } from 'react'
import type { ContentDraft, Channel } from '@/types/dashboard'
import ReviseModal from './ReviseModal'
import PublishModal from './PublishModal'

const channelDot: Record<Channel, string> = {
  thread: 'bg-brand-cyan',
  instagram: 'bg-brand-pink',
  blog: 'bg-brand-violet',
}

interface Props {
  drafts: ContentDraft[]
  onDraftUpdate?: (channel: Channel, content: string) => void
}

export default function ContentDrafts({ drafts, onDraftUpdate }: Props) {
  const [revising, setRevising] = useState<ContentDraft | null>(null)
  const [publishing, setPublishing] = useState<ContentDraft | null>(null)

  const handleSave = (content: string) => {
    if (revising) {
      onDraftUpdate?.(revising.channel, content)
    }
    setRevising(null)
  }

  return (
    <>
      <div className="bg-navy-900 border border-navy-800 rounded-xl p-4 mb-3">
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
                <p className="text-[11px] text-navy-700 mt-0.5 max-w-xs truncate whitespace-pre-line line-clamp-2">{draft.preview}</p>
              </div>
            </div>
            <div className="flex gap-1.5">
              <button
                onClick={() => setPublishing(draft)}
                className="bg-brand-purple-dark text-white rounded px-2.5 py-1 text-[11px] hover:bg-brand-purple transition-colors"
              >
                발행
              </button>
              <button
                onClick={() => setRevising(draft)}
                className="bg-navy-800 text-slate-500 rounded px-2.5 py-1 text-[11px] hover:bg-navy-700 transition-colors"
              >
                수정
              </button>
            </div>
          </div>
        ))}
      </div>

      {revising && (
        <ReviseModal draft={revising} onSave={handleSave} onClose={() => setRevising(null)} />
      )}
      {publishing && (
        <PublishModal draft={publishing} onClose={() => setPublishing(null)} />
      )}
    </>
  )
}
