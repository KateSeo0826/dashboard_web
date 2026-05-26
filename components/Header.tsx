'use client'

import { useState } from 'react'

interface Props {
  onRoutineStart?: (keyword: string) => void
  generating?: boolean
}

export default function Header({ onRoutineStart, generating }: Props) {
  const [showInput, setShowInput] = useState(false)
  const [keyword, setKeyword] = useState('')

  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
  })

  const handleStart = () => {
    if (showInput) {
      onRoutineStart?.(keyword || '아임웹 웹사이트 제작')
      setShowInput(false)
      setKeyword('')
    } else {
      setShowInput(true)
    }
  }

  return (
    <div className="mb-6 pb-4 border-b border-navy-800">
      <div className="flex justify-between items-center">
        <p className="text-sm font-bold text-brand-violet tracking-widest">LUNAR STUDIO</p>
        <p className="text-xs text-navy-700">{today}</p>
        <button
          onClick={handleStart}
          disabled={generating}
          className="bg-brand-purple-dark text-white rounded-md px-3 py-1.5 text-xs font-semibold hover:bg-brand-purple transition-colors disabled:opacity-60"
        >
          {generating ? '초안 생성 중…' : '▶ 오늘 루틴 시작'}
        </button>
      </div>
      {showInput && (
        <div className="flex gap-2 mt-3">
          <input
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleStart()}
            placeholder="오늘 키워드 입력 (예: 아임웹 쇼핑몰) — 비우고 Enter 시 기본값 사용"
            className="flex-1 bg-navy-800 border border-navy-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-brand-purple placeholder:text-navy-700"
            autoFocus
          />
          <button
            onClick={handleStart}
            className="bg-brand-purple-dark text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-brand-purple transition-colors"
          >
            생성
          </button>
        </div>
      )}
    </div>
  )
}
