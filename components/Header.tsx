'use client'

import { useState } from 'react'

export default function Header() {
  const [toast, setToast] = useState(false)

  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
  })

  const startRoutine = () => {
    navigator.clipboard.writeText('오늘 루틴 시작해줘')
    setToast(true)
    setTimeout(() => setToast(false), 2500)
  }

  return (
    <div className="flex justify-between items-center mb-6 pb-4 border-b border-navy-800 relative">
      <p className="text-sm font-bold text-brand-violet tracking-widest">LUNAR STUDIO</p>
      <p className="text-xs text-navy-700">{today}</p>
      <div className="relative">
        <button
          onClick={startRoutine}
          className="bg-brand-purple-dark text-white rounded-md px-3 py-1.5 text-xs font-semibold hover:bg-brand-purple transition-colors"
        >
          ▶ 오늘 루틴 시작
        </button>
        {toast && (
          <div className="absolute right-0 top-9 bg-navy-800 border border-navy-700 text-slate-300 text-[11px] px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-10">
            📋 클립보드에 복사됨<br />
            <span className="text-navy-700">Claude에 붙여넣기하세요</span>
          </div>
        )}
      </div>
    </div>
  )
}
