import type { Inquiry } from '@/types/dashboard'

interface Props { inquiries: Inquiry[] }

export default function InquiryQueue({ inquiries }: Props) {
  return (
    <div className="bg-navy-900 border border-navy-800 rounded-xl p-4">
      <div className="flex justify-between items-center mb-3">
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">문의 응대</p>
        {inquiries.length > 0 && (
          <span className="text-[10px] bg-sky-950 text-sky-400 rounded px-2 py-0.5">대기 {inquiries.length}건</span>
        )}
      </div>
      {inquiries.length === 0 ? (
        <p className="text-[12px] text-navy-700 py-2">새로운 문의가 없어요</p>
      ) : (
        inquiries.map((inq, i) => (
          <div key={i} className="py-2.5 border-b border-navy-800 last:border-0 last:pb-0">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-slate-200">{inq.name}</span>
              <span className="text-[10px] bg-sky-950 text-sky-400 rounded px-1.5 py-0.5">{inq.type}</span>
            </div>
            <p className="text-[11px] text-navy-700 mb-2 truncate">{inq.preview}</p>
            <div className="flex gap-1.5">
              <button className="bg-brand-purple-dark text-white rounded px-2.5 py-1 text-[11px] hover:bg-brand-purple transition-colors">응대 초안 보기</button>
              <button className="bg-navy-800 text-slate-500 rounded px-2.5 py-1 text-[11px] hover:bg-navy-700 transition-colors">발송</button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
