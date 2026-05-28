import { NextRequest, NextResponse } from 'next/server'

const PRODUCT_PERMALINKS: Record<string, string> = {
  world:     'laohtv',
  animal:    'dwejrj',
  celebrity: 'ojyjng',
  planet:    'errpt',
}

export async function POST(req: NextRequest) {
  let body: { licenseKey?: string; category?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 })
  }

  const { licenseKey, category } = body
  const permalink = category ? PRODUCT_PERMALINKS[category] : undefined

  if (!permalink || !licenseKey?.trim()) {
    return NextResponse.json({ success: false, error: 'Missing license key or category' }, { status: 400 })
  }

  let data: { success: boolean; message?: string }
  try {
    const res = await fetch('https://api.gumroad.com/v2/licenses/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        product_permalink: permalink,
        license_key: licenseKey.trim(),
        increment_uses_count: 'false',
      }),
    })
    data = await res.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Could not reach Gumroad — try again' }, { status: 502 })
  }

  if (data.success) {
    return NextResponse.json({ success: true })
  }
  return NextResponse.json(
    { success: false, error: data.message || 'Invalid license key' },
    { status: 400 },
  )
}
