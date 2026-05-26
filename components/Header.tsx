export default function Header() {
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
  })

  return (
    <div className="flex justify-between items-center mb-6 pb-4 border-b border-navy-800">
      <p className="text-sm font-bold text-brand-violet tracking-widest">LUNAR STUDIO</p>
      <p className="text-xs text-navy-700">{today}</p>
      <button className="bg-brand-purple-dark text-white rounded-md px-3 py-1.5 text-xs font-semibold hover:bg-brand-purple transition-colors">
        ▶ 오늘 루틴 시작
      </button>
    </div>
  )
}
