import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const client = new Anthropic()

const channelNames: Record<string, string> = {
  thread: '스레드',
  instagram: '인스타그램',
  blog: '블로그',
}

export async function POST(request: Request) {
  const { channel, content, instruction } = await request.json()

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: [
        {
          type: 'text',
          text: '루나르 스튜디오 콘텐츠 에이전트. 소상공인/프리랜서 대상 아임웹 전문. 톤: 전문가적이고 친근하게. 수정된 콘텐츠만 반환해 (설명 없이).',
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [
        {
          role: 'user',
          content: `${channelNames[channel] ?? channel} 콘텐츠를 수정해줘.\n\n현재 내용:\n${content}\n\n수정 요청: ${instruction}`,
        },
      ],
    })

    const resp = message.content[0]
    if (resp.type !== 'text') return NextResponse.json({ error: 'API error' }, { status: 500 })

    return NextResponse.json({ content: resp.text })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
