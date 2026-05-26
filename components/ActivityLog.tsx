import type { LogEntry } from '@/types/dashboard'

interface Props { log: LogEntry[] }

export default function ActivityLog({ log }: Props) {
  return (
    <div className="bg-navy-900 border border-navy-800 rounded-xl p-4">
      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-3">활동 로그</p>
      {log.length === 0 ? (
        <p className="text-[12px] text-navy-700 py-1">아직 기록이 없어요</p>
      ) : (
        log.map((entry, i) => (
          <div key={i} className="flex gap-2 items-start py-1.5 border-b border-navy-800 last:border-0 last:pb-0">
            <div className="w-1.5 h-1.5 rounded-full bg-navy-700 mt-1.5 shrink-0" />
            <div>
              <p className="text-[12px] text-slate-500">{entry.text}</p>
              <p className="text-[10px] text-navy-800">{entry.time}</p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
