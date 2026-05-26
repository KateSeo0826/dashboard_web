import type { Channel } from '@/types/dashboard'

const DAYS = ['월', '화', '수', '목', '금', '토', '일']
const LABELS: Record<Channel, string> = {
  thread: '스레드',
  instagram: '인스타',
  blog: '블로그',
}

interface Props { calendar: Record<Channel, boolean[]> }

export default function WeeklyCalendar({ calendar }: Props) {
  const todayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1

  return (
    <div className="bg-navy-900 border border-navy-800 rounded-xl p-4">
      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-3">주간 발행 현황</p>
      {(Object.entries(calendar) as [Channel, boolean[]][]).map(([channel, days]) => (
        <div key={channel} className="mb-3 last:mb-0">
          <p className="text-[10px] text-navy-700 mb-1">{LABELS[channel]}</p>
          <div className="grid grid-cols-7 gap-1">
            {days.map((done, i) => (
              <div
                key={i}
                className={`h-6 rounded flex items-center justify-center text-[10px] ${
                  i === todayIdx
                    ? 'bg-brand-purple-dark text-white'
                    : done
                    ? 'bg-indigo-950 text-brand-violet'
                    : 'bg-navy-800 text-navy-700'
                }`}
              >
                {DAYS[i]}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
