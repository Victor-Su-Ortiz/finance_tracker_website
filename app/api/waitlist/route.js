import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Generate a unique referral code
function generateReferralCode(email) {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 8)
  return `${timestamp}${randomStr}`.toUpperCase()
}

export async function POST(request) {
  try {
    const { email, firstName, userType, painPoint, referredBy } = await request.json()

    // Check if email already exists
    const { data: existing } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'You\'re already on the waitlist! Check your email for updates.' },
        { status: 400 }
      )
    }

    // Generate unique referral code
    const referralCode = generateReferralCode(email)

    // Add to waitlist
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        {
          email,
          first_name: firstName || null,
          user_type: userType || null,
          pain_point: painPoint || null,
          referral_code: referralCode,
          referred_by: referredBy || null,
          metadata: {
            source: 'website',
            signup_path: request.headers.get('referer') || 'unknown'
          }
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    // Get total count and position
    const { count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })

    // TODO: Send welcome email here (using Resend, SendGrid, etc.)
    // await sendWelcomeEmail(email, firstName, referralCode, data.position)

    return NextResponse.json({
      success: true,
      message: 'Welcome to SocialFin! Check your email for confirmation.',
      position: data.position,
      referralCode: referralCode,
      totalCount: count || 0
    })

  } catch (error) {
    console.error('Waitlist error:', error)
    return NextResponse.json(
      { error: 'Failed to join waitlist. Please try again.' },
      { status: 500 }
    )
  }
}

// GET endpoint to fetch waitlist stats
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const referralCode = searchParams.get('referralCode')

    // Get total count
    const { count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })

    // If referral code provided, get referral stats
    if (referralCode) {
      const { data: referrals } = await supabase
        .from('waitlist')
        .select('id')
        .eq('referred_by', referralCode)

      const { data: user } = await supabase
        .from('waitlist')
        .select('position')
        .eq('referral_code', referralCode)
        .single()

      return NextResponse.json({
        totalCount: count || 0,
        referralCount: referrals?.length || 0,
        userPosition: user?.position || null
      })
    }

    // Get recent signups for social proof (optional)
    const { data: recentSignups } = await supabase
      .from('waitlist')
      .select('first_name, created_at')
      .order('created_at', { ascending: false })
      .limit(5)

    return NextResponse.json({
      totalCount: count || 0,
      recentSignups: recentSignups || []
    })

  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json({ totalCount: 0 })
  }
}