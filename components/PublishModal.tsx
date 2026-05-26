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

type PublishState = 'idle' | 'loading' | 'success' | 'error'

export default function PublishModal({ draft, onClose }: Props) {
  const [copied, setCopied] = useState(false)
  const [publishState, setPublishState] = useState<PublishState>('idle')
  const [publishMsg, setPublishMsg] = useState('')

  const copy = () => {
    navigator.clipboard.writeText(draft.preview)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const publishToThreads = async () => {
    setPublishState('loading')
    setPublishMsg('')
    try {
      const res = await fetch('/api/publish-thread', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: draft.preview }),
      })
      const data = await res.json()

      if (data.success) {
        setPublishState('success')
        setPublishMsg(`@${data.username} 계정에 발행 완료!`)
      } else {
        setPublishState('error')
        setPublishMsg(data.error ?? '발행 실패. 토큰을 확인해줘.')
      }
    } catch {
      setPublishState('error')
      setPublishMsg('서버 오류가 발생했어.')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-navy-900 border border-navy-800 rounded-xl p-6 w-full max-w-lg shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm font-semibold text-slate-200">발행 — {draft.title}</p>
          <button onClick={onClose} className="text-navy-700 hover:text-slate-400 text-xl leading-none">✕</button>
        </div>

        <div className="bg-navy-800 rounded-lg p-4 mb-4 max-h-60 overflow-y-auto">
          <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{draft.preview}</p>
        </div>

        {draft.channel === 'thread' ? (
          <div className="space-y-3">
            {publishState === 'success' && (
              <div className="bg-green-950 border border-green-800 text-green-400 text-[12px] px-3 py-2 rounded-lg">
                ✓ {publishMsg}
              </div>
            )}
            {publishState === 'error' && (
              <div className="bg-red-950 border border-red-800 text-red-400 text-[12px] px-3 py-2 rounded-lg">
                ✕ {publishMsg}
              </div>
            )}
            <div className="flex gap-2 justify-end">
              <button onClick={onClose} className="bg-navy-800 text-slate-500 rounded-lg px-4 py-2 text-sm hover:bg-navy-700 transition-colors">닫기</button>
              <button onClick={copy} className="bg-navy-700 text-slate-300 rounded-lg px-4 py-2 text-sm hover:bg-navy-600 transition-colors">
                {copied ? '✓ 복사됨' : '복사'}
              </button>
              <button
                onClick={publishToThreads}
                disabled={publishState === 'loading' || publishState === 'success'}
                className="bg-brand-purple-dark text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-brand-purple transition-colors disabled:opacity-50 min-w-[130px]"
              >
                {publishState === 'loading' ? '발행 중…' : publishState === 'success' ? '✓ 발행됨' : 'Threads에 바로 발행'}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-[11px] text-navy-700 mb-4">📌 {channelGuide[draft.channel]}</p>
            <div className="flex gap-2 justify-end">
              <button onClick={onClose} className="bg-navy-800 text-slate-500 rounded-lg px-4 py-2 text-sm hover:bg-navy-700 transition-colors">닫기</button>
              <button onClick={copy} className="bg-brand-purple-dark text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-brand-purple transition-colors min-w-[110px]">
                {copied ? '✓ 복사됨' : '클립보드 복사'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
