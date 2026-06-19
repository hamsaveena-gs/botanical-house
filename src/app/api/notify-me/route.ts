import { notifyMeSchema } from '@/lib/schemas'

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return Response.json({ error: 'RESEND_API_KEY not configured' }, { status: 500 })
    }

    const body = await req.json()
    const cleaned = { ...body, plantSlug: (body.plantSlug ?? '').trim().toLowerCase() }
    const parsed = notifyMeSchema.safeParse(cleaned)
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 })
    }

    const { email, plantTitle, plantSlug } = parsed.data

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Botanical House <onboarding@resend.dev>',
        to: 'hamsa30gs@gmail.com',
        replyTo: email,
        subject: `Restock Request: ${plantTitle}`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
            <h1 style="font-size:20px;margin:0 0 16px">Restock Notification Request</h1>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 12px;font-weight:bold;color:#525252;white-space:nowrap">Customer Email</td><td style="padding:8px 12px">${email}</td></tr>
              <tr style="background:#fafafa"><td style="padding:8px 12px;font-weight:bold;color:#525252;white-space:nowrap">Plant</td><td style="padding:8px 12px">${plantTitle}</td></tr>
              <tr><td style="padding:8px 12px;font-weight:bold;color:#525252;white-space:nowrap">Plant URL</td><td style="padding:8px 12px">${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://botanical-house.vercel.app'}/plants/${plantSlug}</td></tr>
            </table>
            <hr style="border:none;border-top:1px solid #e5e5e5;margin:24px 0"/>
            <p style="color:#a3a3a3;font-size:12px">Sent from Botanical House "Notify Me" form</p>
          </div>
        `,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Resend error:', err)
      return Response.json({ error: 'Failed to send notification' }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Failed to send notification' }, { status: 500 })
  }
}
