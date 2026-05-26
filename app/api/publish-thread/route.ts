import { NextResponse } from 'next/server'

const TOKEN = process.env.THREADS_ACCESS_TOKEN
const BASE = 'https://graph.threads.net/v1.0'

export async function POST(request: Request) {
  if (!TOKEN) {
    return NextResponse.json({ error: 'THREADS_ACCESS_TOKEN이 설정되지 않았어요' }, { status: 500 })
  }

  const { text } = await request.json()

  try {
    // Step 1: 유저 ID 가져오기
    const meRes = await fetch(`${BASE}/me?fields=id,username&access_token=${TOKEN}`)
    const me = await meRes.json()

    if (!me.id) {
      return NextResponse.json({ error: '유저 ID 조회 실패. 토큰을 확인해줘.', detail: me }, { status: 401 })
    }

    // Step 2: 미디어 컨테이너 생성
    const containerParams = new URLSearchParams({
      media_type: 'TEXT',
      text,
      access_token: TOKEN,
    })

    const containerRes = await fetch(`${BASE}/${me.id}/threads`, {
      method: 'POST',
      body: containerParams,
    })
    const container = await containerRes.json()

    if (!container.id) {
      return NextResponse.json({ error: '컨테이너 생성 실패', detail: container }, { status: 500 })
    }

    // Step 3: 발행
    const publishParams = new URLSearchParams({
      creation_id: container.id,
      access_token: TOKEN,
    })

    const publishRes = await fetch(`${BASE}/${me.id}/threads_publish`, {
      method: 'POST',
      body: publishParams,
    })
    const published = await publishRes.json()

    if (published.id) {
      return NextResponse.json({ success: true, postId: published.id, username: me.username })
    }

    return NextResponse.json({ error: '발행 실패', detail: published }, { status: 500 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: '서버 오류' }, { status: 500 })
  }
}
