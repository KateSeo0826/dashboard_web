import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const client = new Anthropic()

const SYSTEM_PROMPT = `너는 루나르 스튜디오 콘텐츠 초안 작성 에이전트야.

루나르 스튜디오: 아임웹 AI 자동화 시스템 구축 전문. 소상공인/프리랜서 대상.
사명: 웹사이트도, AI 자동화도 없어서 기회를 놓치는 소상공인과 프리랜서를 도와서 누구나 온라인에서 자기 사업을 확장하는 존재로 설 수 있는 세상을 만든다.
톤: 전문가처럼 보이면서 친근하게 + 쉽게 단계별 설명. 강매 없이 자연스럽게.

주어진 키워드로 3개 채널 초안을 작성해. 반드시 아래 JSON 형식으로만 응답해 (다른 텍스트 없이):

{
  "thread": "스레드용 초안 — 각 문장은 반드시 빈 줄로 구분해. 형식: 첫 문장\\n\\n두 번째 문장\\n\\n세 번째 문장\\n\\n#해시태그1 #해시태그2 #해시태그3 (해시태그는 마지막 줄에 모아서)",
  "instagram": "인스타그램용 초안 (캡션 형식, 이모지 포함, 해시태그 5개 포함)",
  "blog": "블로그용 초안 (제목 포함, 400-600자, 소제목 포함)"
}`

export async function POST(request: Request) {
  const { keyword } = await request.json()

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
      messages: [{ role: 'user', content: `키워드: ${keyword || '아임웹 웹사이트 제작'}` }],
    })

    const content = message.content[0]
    if (content.type !== 'text') return NextResponse.json({ error: 'API error' }, { status: 500 })

    const jsonMatch = content.text.trim().match(/\{[\s\S]*\}/)
    if (!jsonMatch) return NextResponse.json({ error: 'Invalid response', raw: content.text }, { status: 500 })

    return NextResponse.json(JSON.parse(jsonMatch[0]))
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
