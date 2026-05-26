import dashboardData from '@/data/dashboard.json'
import type { DashboardData } from '@/types/dashboard'
import DashboardClient from '@/components/DashboardClient'

const data = dashboardData as DashboardData

export default function Dashboard() {
  return <DashboardClient initial={data} />
}
