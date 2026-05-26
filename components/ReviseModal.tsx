'use client'

import { useState } from 'react'
import type { ContentDraft } from '@/types/dashboard'

interface Props {
  draft: ContentDraft
  onSave: (content: string) => void
  onClose: () => void
}

const channelNames: Record<string, string> = {
  thread: '스레드',
  instagram: '인스타그램',
  blog: '블로그',
}

export default function ReviseModal({ draft, onSave, onClose }: Props) {
  const [content, setContent] = useState(draft.preview)
  const [instruction, setInstruction] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const revise = async () => {
    if (!instruction.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/revise-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channel: draft.channel, content, instruction }),
      })
      const data = await res.json()
      if (data.content) {
        setContent(data.content)
        setInstruction('')
      } else {
        setError('수정 실패. 다시 시도해줘.')
      }
    } catch {
      setError('서버 오류가 발생했어.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-navy-900 border border-navy-800 rounded-xl p-6 w-full max-w-lg shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm font-semibold text-slate-200">{channelNames[draft.channel]} 수정</p>
          <button onClick={onClose} className="text-navy-700 hover:text-slate-400 text-xl leading-none">✕</button>
        </div>

        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full bg-navy-800 border border-navy-700 rounded-lg p-3 text-sm text-slate-300 min-h-[140px] resize-none mb-3 focus:outline-none focus:border-brand-purple"
        />

        <div className="flex gap-2 mb-1">
          <input
            value={instruction}
            onChange={e => setInstruction(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !loading && revise()}
            placeholder="수정 요청 (예: 더 친근하게, 짧게 줄여줘)"
            className="flex-1 bg-navy-800 border border-navy-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-brand-purple placeholder:text-navy-700"
          />
          <button
            onClick={revise}
            disabled={loading || !instruction.trim()}
            className="bg-brand-purple-dark text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-brand-purple transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {loading ? '수정 중…' : 'Claude로 수정'}
          </button>
        </div>

        {error && <p className="text-[11px] text-red-400 mb-3">{error}</p>}

        <div className="flex gap-2 justify-end mt-4">
          <button onClick={onClose} className="bg-navy-800 text-slate-500 rounded-lg px-4 py-2 text-sm hover:bg-navy-700 transition-colors">취소</button>
          <button onClick={() => onSave(content)} className="bg-brand-purple-dark text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-brand-purple transition-colors">저장</button>
        </div>
      </div>
    </div>
  )
}
