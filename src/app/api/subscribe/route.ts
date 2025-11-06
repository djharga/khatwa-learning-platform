import { NextRequest, NextResponse } from 'next/server';

/**
 * Mock API endpoint for subscription
 * Sets a cookie to track active subscription status
 */
export async function POST(request: NextRequest) {
  try {
    const { planId, paymentIntentId } = await request.json();

    // Validate required fields
    if (!planId) {
      return NextResponse.json(
        { error: 'planId مطلوب' },
        { status: 400 }
      );
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Create response with subscription cookie
    // Cookie expires in 30 days (for monthly subscription simulation)
    const response = NextResponse.json(
      {
        success: true,
        subscription: 'active',
        planId,
        paymentIntentId: paymentIntentId || 'mock_payment_intent',
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
      { status: 200 }
    );

    // Set subscription cookie (30 days expiration)
    response.cookies.set('mock_subscription', 'active', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    // Store plan ID for reference
    response.cookies.set('mock_subscription_plan', planId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    console.log('Mock subscription activated:', {
      planId,
      paymentIntentId: paymentIntentId || 'mock_payment_intent',
      timestamp: new Date().toISOString(),
    });

    return response;
  } catch (error) {
    console.error('Error processing subscription:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في معالجة الاشتراك' },
      { status: 500 }
    );
  }
}
