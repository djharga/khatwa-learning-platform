import { NextRequest, NextResponse } from 'next/server';

/**
 * Mock API endpoint for purchasing a single course
 * This is essentially the same as enrollment, but represents a paid purchase
 */
export async function POST(request: NextRequest) {
  try {
    const { courseId, amount } = await request.json();

    // Validate required fields
    if (!courseId) {
      return NextResponse.json(
        { error: 'courseId مطلوب' },
        { status: 400 }
      );
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Create response with purchase/enrollment cookie
    const response = NextResponse.json(
      {
        success: true,
        purchased: true,
        enrolled: true,
        courseId,
        amount: amount || 0,
        purchasedAt: new Date().toISOString(),
      },
      { status: 200 }
    );

    // Set enrollment cookie (same as enroll endpoint)
    response.cookies.set(`enrolled_${courseId}`, '1', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });

    // Also set a purchase flag for tracking
    response.cookies.set(`purchased_${courseId}`, '1', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });

    console.log('Mock course purchase completed:', {
      courseId,
      amount: amount || 0,
      timestamp: new Date().toISOString(),
    });

    return response;
  } catch (error) {
    console.error('Error processing purchase:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في معالجة الشراء' },
      { status: 500 }
    );
  }
}
