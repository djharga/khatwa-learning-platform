import { NextRequest, NextResponse } from 'next/server';

/**
 * API endpoint to check enrollment and subscription status
 * Reads cookies to determine if user has subscription or specific course enrollment
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');

    // Check for active subscription
    const subscription = request.cookies.get('mock_subscription');
    const subscriptionPlan = request.cookies.get('mock_subscription_plan');
    const hasSubscription = subscription?.value === 'active';

    // Check for specific course enrollment
    let hasEnrollment = false;
    if (courseId) {
      const enrollmentCookie = request.cookies.get(`enrolled_${courseId}`);
      hasEnrollment = enrollmentCookie?.value === '1';
    }

    // If user has subscription, they have access to all courses
    const hasAccess = hasSubscription || hasEnrollment;

    const status = {
      hasSubscription,
      subscriptionPlan: subscriptionPlan?.value || null,
      hasEnrollment: courseId ? hasEnrollment : null,
      hasAccess,
      courseId: courseId || null,
    };

    return NextResponse.json(status, { status: 200 });
  } catch (error) {
    console.error('Error checking enrollment status:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في التحقق من حالة التسجيل' },
      { status: 500 }
    );
  }
}
