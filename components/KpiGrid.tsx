import type { Kpi } from '@/types/dashboard'

interface Props { kpi: Kpi }

export default function KpiGrid({ kpi }: Props) {
  const pct = Math.round((kpi.weeklyPublished / kpi.weeklyTarget) * 100)

  return (
    <div className="grid grid-cols-4 gap-3 mb-5">
      <div className="bg-navy-900 border border-navy-800 rounded-xl p-4">
        <p className="text-[10px] text-navy-700 uppercase tracking-widest mb-1">이번 주 발행</p>
        <p className="text-2xl font-bold text-slate-100">
          {kpi.weeklyPublished}<span className="text-sm text-navy-700"> /{kpi.weeklyTarget}</span>
        </p>
        <div className="h-1 bg-navy-800 rounded mt-2">
          <div className="h-1 bg-brand-purple rounded" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="bg-navy-900 border border-navy-800 rounded-xl p-4">
        <p className="text-[10px] text-navy-700 uppercase tracking-widest mb-1">신규 문의</p>
        <p className="text-2xl font-bold text-brand-cyan">{kpi.newInquiries}</p>
        <p className="text-[10px] text-navy-700 mt-1">이번 주</p>
      </div>

      <div className="bg-navy-900 border border-navy-800 rounded-xl p-4">
        <p className="text-[10px] text-navy-700 uppercase tracking-widest mb-1">콘텐츠 반응</p>
        <p className="text-2xl font-bold text-brand-violet">+{kpi.contentReactions}</p>
        <p className="text-[10px] text-navy-700 mt-1">좋아요 합계</p>
      </div>

      <div className="bg-navy-900 border border-navy-800 rounded-xl p-4">
        <p className="text-[10px] text-navy-700 uppercase tracking-widest mb-1">견적 대기</p>
        <p className="text-2xl font-bold text-brand-amber">{kpi.quotePending}</p>
        <p className="text-[10px] text-navy-700 mt-1">검토 중</p>
      </div>
    </div>
  )
}
