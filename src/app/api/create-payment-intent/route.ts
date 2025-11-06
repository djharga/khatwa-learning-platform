import { NextRequest, NextResponse } from 'next/server';

/**
 * Mock API endpoint for creating payment intent
 * Returns a mock client secret for testing without actual Stripe integration
 */
export async function POST(request: NextRequest) {
  try {
    const { planId, amount } = await request.json();

    // Validate required fields
    if (!planId || !amount) {
      return NextResponse.json(
        { error: 'planId و amount مطلوبان' },
        { status: 400 }
      );
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Generate a mock client secret (in real implementation, this would come from Stripe)
    const mockClientSecret = `mock_client_secret_${Date.now()}_${planId}`;

    console.log('Mock payment intent created:', {
      planId,
      amount,
      clientSecret: mockClientSecret,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        clientSecret: mockClientSecret,
        amount,
        currency: 'EGP',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في معالجة الطلب' },
      { status: 500 }
    );
  }
}
