import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '루나르 스튜디오 대시보드',
  description: '루나르 스튜디오 사업 OS 대시보드',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-navy-950 min-h-screen">{children}</body>
    </html>
  )
}
