export interface Kpi {
  weeklyPublished: number
  weeklyTarget: number
  newInquiries: number
  contentReactions: number
  quotePending: number
}

export type Channel = 'thread' | 'instagram' | 'blog'

export interface ContentDraft {
  channel: Channel
  title: string
  preview: string
}

export interface Inquiry {
  name: string
  type: string
  preview: string
}

export interface Project {
  name: string
  phase: string
  current: number
  total: number
}

export interface LogEntry {
  text: string
  time: string
}

export interface DashboardData {
  kpi: Kpi
  contentDrafts: ContentDraft[]
  inquiries: Inquiry[]
  weeklyCalendar: Record<Channel, boolean[]>
  projects: Project[]
  activityLog: LogEntry[]
}
