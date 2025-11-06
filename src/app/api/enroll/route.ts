import { NextRequest, NextResponse } from 'next/server';

/**
 * Mock API endpoint for enrolling in a course
 * Sets a cookie to track enrollment status for a specific course
 */
export async function POST(request: NextRequest) {
  try {
    const { courseId } = await request.json();

    // Validate required fields
    if (!courseId) {
      return NextResponse.json(
        { error: 'courseId مطلوب' },
        { status: 400 }
      );
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Create response with enrollment cookie
    // Cookie expires in 1 year
    const response = NextResponse.json(
      {
        success: true,
        enrolled: true,
        courseId,
        enrolledAt: new Date().toISOString(),
      },
      { status: 200 }
    );

    // Set enrollment cookie for this specific course
    response.cookies.set(`enrolled_${courseId}`, '1', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });

    console.log('Mock enrollment completed:', {
      courseId,
      timestamp: new Date().toISOString(),
    });

    return response;
  } catch (error) {
    console.error('Error processing enrollment:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في معالجة التسجيل' },
      { status: 500 }
    );
  }
}
