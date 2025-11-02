interface LoadingSkeletonProps {
  variant?: 'card' | 'text' | 'avatar' | 'button' | 'input';
  count?: number;
  className?: string;
}

const LoadingSkeleton = ({
  variant = 'card',
  count = 1,
  className = '',
}: LoadingSkeletonProps) => {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return (
          <div
            className={`bg-white/95 backdrop-blur-sm dark:bg-gray-800/95 rounded-3xl p-8 space-y-6 shadow-xl border border-white/50 ${className}`}
            role="status"
            aria-label="جاري التحميل"
          >
            <div className="skeleton h-52 w-full rounded-2xl" />
            <div className="skeleton h-7 w-3/4 rounded-xl" />
            <div className="skeleton h-5 w-full rounded-lg" />
            <div className="skeleton h-5 w-5/6 rounded-lg" />
            <span className="sr-only">جاري تحميل المحتوى...</span>
          </div>
        );

      case 'text':
        return (
          <div
            className={`space-y-3 ${className}`}
            role="status"
            aria-label="جاري التحميل"
          >
            <div className="skeleton h-5 w-full rounded-lg" />
            <div className="skeleton h-5 w-5/6 rounded-lg" />
            <div className="skeleton h-5 w-4/6 rounded-lg" />
            <span className="sr-only">جاري تحميل النص...</span>
          </div>
        );

      case 'avatar':
        return (
          <div
            className={`flex items-center space-x-6 space-x-reverse ${className}`}
            role="status"
            aria-label="جاري التحميل"
          >
            <div className="skeleton h-16 w-16 rounded-2xl" />
            <div className="flex-1 space-y-3">
              <div className="skeleton h-5 w-3/4 rounded-lg" />
              <div className="skeleton h-4 w-1/2 rounded-lg" />
            </div>
            <span className="sr-only">جاري تحميل الملف الشخصي...</span>
          </div>
        );

      case 'button':
        return (
          <div
            className={`skeleton h-14 w-36 rounded-2xl ${className}`}
            role="status"
            aria-label="جاري التحميل"
          >
            <span className="sr-only">جاري تحميل الزر...</span>
          </div>
        );

      case 'input':
        return (
          <div
            className={`space-y-3 ${className}`}
            role="status"
            aria-label="جاري التحميل"
          >
            <div className="skeleton h-6 w-28 rounded-lg" />
            <div className="skeleton h-14 w-full rounded-2xl" />
            <span className="sr-only">جاري تحميل حقل الإدخال...</span>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {skeletons.map((index) => (
        <div key={index}>{renderSkeleton()}</div>
      ))}
    </>
  );
};

export default LoadingSkeleton;
