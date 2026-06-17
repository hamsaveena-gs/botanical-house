import { orderConfirmationSchema } from '@/lib/schemas'

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return Response.json({ error: 'RESEND_API_KEY not configured' }, { status: 500 })
    }

    const body = await req.json()
    const parsed = orderConfirmationSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 })
    }

    const { email, name, orderId, items, total } = parsed.data

    const itemRows = items
      .map((i: { title: string; quantity: number; price: number }) =>
        `<tr><td style="padding:8px;border-bottom:1px solid #e5e5e5">${i.title}</td><td style="padding:8px;border-bottom:1px solid #e5e5e5;text-align:center">${i.quantity}</td><td style="padding:8px;border-bottom:1px solid #e5e5e5;text-align:right">₹${(i.price * i.quantity).toLocaleString()}</td></tr>`
      )
      .join('')

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Botanical House <onboarding@resend.dev>',
        to: email,
        subject: `Order Confirmed — #${orderId}`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
            <div style="text-align:center;padding:32px 0">
              <span style="font-size:40px">🌿</span>
              <h1 style="font-size:24px;margin:8px 0 0">Order Confirmed!</h1>
            </div>
            <p style="color:#525252">Hi ${name},</p>
            <p style="color:#525252">Thank you for your order. Here's a summary:</p>
            <table style="width:100%;border-collapse:collapse;margin:16px 0">
              <thead><tr style="background:#fafafa"><th style="padding:8px;text-align:left">Item</th><th style="padding:8px;text-align:center">Qty</th><th style="padding:8px;text-align:right">Total</th></tr></thead>
              <tbody>${itemRows}</tbody>
            </table>
            <p style="text-align:right;font-size:18px;font-weight:bold">Total: ₹${total.toLocaleString()}</p>
            <p style="color:#525252">Your plants will be delivered soon. Happy growing! 🌱</p>
            <hr style="border:none;border-top:1px solid #e5e5e5;margin:24px 0"/>
            <p style="color:#a3a3a3;font-size:12px;text-align:center">Botanical House</p>
          </div>
        `,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Resend error:', err)
      return Response.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
