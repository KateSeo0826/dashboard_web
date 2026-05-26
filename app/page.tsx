import dashboardData from '@/data/dashboard.json'
import type { DashboardData } from '@/types/dashboard'
import Header from '@/components/Header'
import KpiGrid from '@/components/KpiGrid'
import ContentDrafts from '@/components/ContentDrafts'
import InquiryQueue from '@/components/InquiryQueue'
import WeeklyCalendar from '@/components/WeeklyCalendar'
import ProjectList from '@/components/ProjectList'
import ActivityLog from '@/components/ActivityLog'

const data = dashboardData as DashboardData

export default function Dashboard() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-6">
      <Header />
      <KpiGrid kpi={data.kpi} />
      <div className="grid grid-cols-[1fr_300px] gap-3">
        <div>
          <ContentDrafts drafts={data.contentDrafts} />
          <InquiryQueue inquiries={data.inquiries} />
        </div>
        <div className="flex flex-col gap-3">
          <WeeklyCalendar calendar={data.weeklyCalendar} />
          <ProjectList projects={data.projects} />
          <ActivityLog log={data.activityLog} />
        </div>
      </div>
    </main>
  )
}
