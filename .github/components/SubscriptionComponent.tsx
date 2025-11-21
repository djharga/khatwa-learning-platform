'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { createPaymentIntent, subscribe } from '@/lib/apiClient';

// TODO: Replace with actual Stripe publishable key from environment variables
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_...'
);

// Three-tier subscription plans with features and pricing
const subscriptionPlans = [
  {
    id: 'basic',
    name: 'الخطة الأساسية',
    price: 50,
    currency: 'EGP',
    interval: 'شهريًا',
    features: ['وصول إلى 5 كورسات', 'دعم فني أساسي', 'شهادات إتمام'],
  },
  {
    id: 'premium',
    name: 'الخطة المميزة',
    price: 100,
    currency: 'EGP',
    interval: 'شهريًا',
    features: [
      'وصول غير محدود للكورسات',
      'دعم فني متقدم',
      'شهادات معتمدة',
      'محتوى حصري',
    ],
  },
  {
    id: 'enterprise',
    name: 'الخطة المؤسسية',
    price: 200,
    currency: 'EGP',
    interval: 'شهريًا',
    features: [
      'جميع مميزات المميز',
      'استشارات شخصية',
      'تدريب مخصص',
      'تقارير مفصلة',
    ],
  },
];

/**
 * Subscription plan card displaying plan name, price, features list, and selection button.
 */
const PlanCard = ({
  plan,
  onSelect,
}: {
  plan: {
    id: string;
    name: string;
    price: number;
    currency: string;
    interval: string;
    features: string[];
  };
  onSelect: () => void;
}) => (
  <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
    <div className="text-3xl font-bold text-blue-600 mb-4">
      {plan.price} {plan.currency}
      <span className="text-sm text-gray-500">/{plan.interval}</span>
    </div>

    <ul className="space-y-2 mb-6">
      {plan.features.map((feature, index) => (
        <li key={index} className="flex items-center text-sm">
          <span className="text-green-500 mr-2">✓</span>
          {feature}
        </li>
      ))}
    </ul>

    <button
      onClick={onSelect}
      className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
    >
      اختر الخطة
    </button>
  </div>
);

/**
 * Mock checkout form component (no Stripe required)
 */
const MockCheckoutForm = ({
  plan,
  onSuccess,
}: {
  plan: any;
  onSuccess: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Mock mode: directly subscribe without payment confirmation
      await createPaymentIntent(plan.id, plan.price);

      // Subscribe directly
      const subscribeResponse = await subscribe(plan.id, `mock_payment_${Date.now()}`);

      if (subscribeResponse.error) {
        throw new Error(subscribeResponse.error.message || 'فشل في الاشتراك');
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في المعالجة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>وضع تجريبي:</strong> سيتم تفعيل الاشتراك بدون دفع فعلي
        </p>
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {loading
          ? 'جاري المعالجة...'
          : `اشتراك بـ ${plan.price} ${plan.currency}`}
      </button>
    </form>
  );
};

/**
 * Stripe checkout form component handling payment card input and submission. Integrates with Stripe API to create payment intent and confirm card payment.
 */
const StripeCheckoutForm = ({
  plan,
  onSuccess,
}: {
  plan: any;
  onSuccess: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setError('');

    try {
      const paymentIntentResponse = await createPaymentIntent(plan.id, plan.price);
      
      if (paymentIntentResponse.error || !paymentIntentResponse.data) {
        throw new Error(paymentIntentResponse.error?.message || 'فشل في إنشاء payment intent');
      }

      const { clientSecret } = paymentIntentResponse.data;

      // تأكيد الدفع
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: 'اسم العميل', // استبدل ببيانات حقيقية
          },
        },
      });

      if (result.error) {
        setError(result.error.message || 'فشل في الدفع');
      } else {
        if (result.paymentIntent?.status === 'succeeded') {
          // تحديث صلاحيات المستخدم وإضافة الاشتراك
          const subscribeResponse = await subscribe(plan.id, result.paymentIntent.id);
          
          if (subscribeResponse.error) {
            throw new Error(subscribeResponse.error.message || 'فشل في الاشتراك');
          }
          
          onSuccess();
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في المعالجة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border border-gray-300 rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': { color: '#aab7c4' },
              },
            },
          }}
        />
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {loading
          ? 'جاري المعالجة...'
          : `اشتراك بـ ${plan.price} ${plan.currency}`}
      </button>
    </form>
  );
};

/**
 * Subscription management component displaying available plans and handling checkout flow. Features three-tier pricing (basic, premium, enterprise) with Stripe payment integration.
 */
const SubscriptionComponent = ({ onClose }: { onClose: () => void }) => {
  // Currently selected plan for checkout
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  // Controls visibility of checkout form vs plan selection
  const [showCheckout, setShowCheckout] = useState(false);

  /**
   * Handles successful subscription completion. Shows success message and closes modal.
   */
  const handleSuccess = () => {
    // TODO: Integrate with notification system - use addNotification from NotificationProvider
    // addNotification({ type: 'success', title: 'تم الاشتراك بنجاح!', message: 'تم تفعيل اشتراكك وإضافة الصلاحيات' });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">خطط الاشتراك</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>

        {!showCheckout ? (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subscriptionPlans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  onSelect={() => {
                    setSelectedPlan(plan);
                    setShowCheckout(true);
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6">
            <button
              onClick={() => setShowCheckout(false)}
              className="mb-4 text-blue-500 hover:text-blue-700"
            >
              ← العودة للخطط
            </button>

            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-bold mb-4">
                الدفع لـ {selectedPlan?.name}
              </h3>
              {(() => {
                const isMockMode = !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 
                                   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === 'pk_test_...';
                if (isMockMode) {
                  return <MockCheckoutForm plan={selectedPlan} onSuccess={handleSuccess} />;
                }
                return (
                  <Elements stripe={stripePromise}>
                    <StripeCheckoutForm plan={selectedPlan} onSuccess={handleSuccess} />
                  </Elements>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionComponent;
