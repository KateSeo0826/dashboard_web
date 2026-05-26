import type { Project } from '@/types/dashboard'

interface Props { projects: Project[] }

export default function ProjectList({ projects }: Props) {
  return (
    <div className="bg-navy-900 border border-navy-800 rounded-xl p-4">
      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-3">진행 중 프로젝트</p>
      {projects.length === 0 ? (
        <p className="text-[12px] text-navy-700 py-1">진행 중인 프로젝트가 없어요</p>
      ) : (
        projects.map((p, i) => (
          <div key={i} className="flex justify-between items-center py-2 border-b border-navy-800 last:border-0 last:pb-0">
            <div>
              <p className="text-sm text-slate-300">{p.name}</p>
              <p className="text-[10px] text-navy-700 mt-0.5">{p.phase}</p>
            </div>
            <p className="text-xs text-brand-violet font-medium">{p.current}/{p.total}</p>
          </div>
        ))
      )}
    </div>
  )
}
