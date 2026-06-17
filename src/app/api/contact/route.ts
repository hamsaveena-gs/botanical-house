import { contactSchema } from '@/lib/schemas'

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return Response.json({ error: 'RESEND_API_KEY not configured' }, { status: 500 })
    }

    const body = await req.json()
    const parsed = contactSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 })
    }

    const { name, email, phone, message } = parsed.data

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
        subject: `Contact Form: ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
            <h1 style="font-size:20px;margin:0 0 16px">New Contact Form Submission</h1>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 12px;font-weight:bold;color:#525252;white-space:nowrap">Name</td><td style="padding:8px 12px">${name}</td></tr>
              <tr style="background:#fafafa"><td style="padding:8px 12px;font-weight:bold;color:#525252;white-space:nowrap">Email</td><td style="padding:8px 12px">${email}</td></tr>
              ${phone ? `<tr><td style="padding:8px 12px;font-weight:bold;color:#525252;white-space:nowrap">Phone</td><td style="padding:8px 12px">${phone}</td></tr>` : ''}
              <tr style="background:#fafafa;vertical-align:top"><td style="padding:8px 12px;font-weight:bold;color:#525252;white-space:nowrap">Message</td><td style="padding:8px 12px">${message.replace(/\n/g, '<br>')}</td></tr>
            </table>
            <hr style="border:none;border-top:1px solid #e5e5e5;margin:24px 0"/>
            <p style="color:#a3a3a3;font-size:12px">Sent from Botanical House contact form</p>
          </div>
        `,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Resend error:', err)
      return Response.json({ error: 'Failed to send message' }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
