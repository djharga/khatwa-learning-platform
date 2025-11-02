'use client';

import { useState } from 'react';

interface SubscriptionData {
  plan: string;
  status: 'active' | 'expired' | 'cancelled';
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  nextRenewal?: Date;
}

const SubscriptionStatus = ({
  subscription,
}: {
  subscription?: SubscriptionData;
}) => {
  const [showRenewal, setShowRenewal] = useState(false);

  if (!subscription) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">حالة الاشتراك</h3>
        <div className="text-center py-8">
          <div className="text-gray-500 mb-4">لم يتم العثور على اشتراك نشط</div>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            اشترك الآن
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'expired':
        return 'text-red-600 bg-red-100';
      case 'cancelled':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'نشط';
      case 'expired':
        return 'منتهي الصلاحية';
      case 'cancelled':
        return 'ملغي';
      default:
        return 'غير محدد';
    }
  };

  const daysUntilExpiry = Math.ceil(
    (subscription.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4">حالة الاشتراك</h3>

      <div className="space-y-4">
        {/* حالة الاشتراك */}
        <div className="flex items-center justify-between">
          <span className="text-gray-600">الحالة:</span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(subscription.status)}`}
          >
            {getStatusText(subscription.status)}
          </span>
        </div>

        {/* نوع الخطة */}
        <div className="flex items-center justify-between">
          <span className="text-gray-600">الخطة:</span>
          <span className="font-medium">{subscription.plan}</span>
        </div>

        {/* تاريخ البدء */}
        <div className="flex items-center justify-between">
          <span className="text-gray-600">تاريخ البدء:</span>
          <span>{subscription.startDate.toLocaleDateString('ar-EG')}</span>
        </div>

        {/* تاريخ الانتهاء */}
        <div className="flex items-center justify-between">
          <span className="text-gray-600">تاريخ الانتهاء:</span>
          <span
            className={daysUntilExpiry < 7 ? 'text-red-600 font-medium' : ''}
          >
            {subscription.endDate.toLocaleDateString('ar-EG')}
            {daysUntilExpiry < 7 &&
              daysUntilExpiry > 0 &&
              ` (${daysUntilExpiry} أيام متبقية)`}
            {daysUntilExpiry <= 0 && ' (منتهي الصلاحية)'}
          </span>
        </div>

        {/* التجديد التلقائي */}
        {subscription.autoRenew && subscription.nextRenewal && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">التجديد التالي:</span>
            <span>{subscription.nextRenewal.toLocaleDateString('ar-EG')}</span>
          </div>
        )}

        {/* أزرار الإجراءات */}
        <div className="flex space-x-3 pt-4 border-t">
          {subscription.status === 'active' && (
            <>
              <button
                onClick={() => setShowRenewal(!showRenewal)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
              >
                تجديد الاشتراك
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm">
                إلغاء الاشتراك
              </button>
            </>
          )}

          {subscription.status === 'expired' && (
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              تجديد الاشتراك
            </button>
          )}
        </div>

        {/* نموذج التجديد */}
        {showRenewal && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-3">تجديد الاشتراك</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  مدة التجديد:
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option value="1">شهر واحد</option>
                  <option value="3">3 أشهر</option>
                  <option value="6">6 أشهر</option>
                  <option value="12">سنة كاملة</option>
                </select>
              </div>
              <div className="flex space-x-3">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                  تأكيد التجديد
                </button>
                <button
                  onClick={() => setShowRenewal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionStatus;
