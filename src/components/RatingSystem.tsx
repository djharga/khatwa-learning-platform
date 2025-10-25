'use client';

import { useState, useEffect } from 'react';
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Flag,
  CheckCircle,
  AlertCircle,
  Heart,
  Share2,
  Bookmark,
  BookmarkCheck,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface RatingData {
  average: number;
  total: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
  courseId?: string;
}

interface RatingSystemProps {
  contentId: string;
  contentType: 'course' | 'lesson' | 'file' | 'video';
  initialRating?: RatingData;
  initialReviews?: Review[];
  allowReviews?: boolean;
  showDistribution?: boolean;
  className?: string;
}

const RatingSystem = ({
  contentId,
  contentType,
  initialRating = {
    average: 0,
    total: 0,
    distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  },
  initialReviews = [],
  allowReviews = true,
  showDistribution = true,
  className = ""
}: RatingSystemProps) => {
  const [rating, setRating] = useState<RatingData>(initialRating);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
  const [filterBy, setFilterBy] = useState<number>(0);

  // بيانات تجريبية للتقييمات
  const sampleReviews: Review[] = [
    {
      id: '1',
      userId: '1',
      userName: 'أحمد محمد',
      userAvatar: '/avatars/ahmed.jpg',
      rating: 5,
      comment: 'كورس ممتاز جداً، شرح وافي ومفيد للمبتدئين في مجال المراجعة الداخلية',
      date: '2024-01-15',
      helpful: 12,
      verified: true,
      courseId: contentId
    },
    {
      id: '2',
      userId: '2',
      userName: 'فاطمة علي',
      userAvatar: '/avatars/fatma.jpg',
      rating: 4,
      comment: 'المحتوى جيد والشرح واضح، لكن أتمنى إضافة المزيد من الأمثلة العملية',
      date: '2024-01-10',
      helpful: 8,
      verified: true,
      courseId: contentId
    },
    {
      id: '3',
      userId: '3',
      userName: 'محمد السعيد',
      userAvatar: '/avatars/mohamed.jpg',
      rating: 5,
      comment: 'تجربة تعليمية رائعة، المحتوى مرتب ومنظم بشكل ممتاز',
      date: '2024-01-08',
      helpful: 15,
      verified: false,
      courseId: contentId
    }
  ];

  useEffect(() => {
    if (initialReviews.length === 0) {
      setReviews(sampleReviews);
    }
  }, [initialReviews]);

  // حساب متوسط التقييم
  const calculateAverageRating = (reviews: Review[]) => {
    if (reviews.length === 0) return 0;

    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  };

  // حساب توزيع التقييمات
  const calculateDistribution = (reviews: Review[]) => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    reviews.forEach(review => {
      undefined+=1;
    });

    return distribution;
  };

  // فلترة وترتيب المراجعات
  const filteredReviews = reviews
    .filter(review => filterBy === 0 || review.rating === filterBy)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

  // إرسال التقييم والمراجعة
  const submitReview = async () => {
    if (userRating === 0) {
      toast.error('يرجى اختيار تقييم');
      return;
    }

    if (!userReview.trim()) {
      toast.error('يرجى كتابة مراجعة');
      return;
    }

    setIsSubmitting(true);

    try {
      // محاكاة إرسال البيانات للخادم
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newReview: Review = {
        id: Date.now().toString(),
        userId: 'current-user',
        userName: 'المستخدم الحالي',
        rating: userRating,
        comment: userReview,
        date: new Date().toISOString().split('T')[0],
        helpful: 0,
        verified: false,
        courseId: contentId
      };

      const updatedReviews = [newReview, ...reviews];
      setReviews(updatedReviews);

      // تحديث التقييم العام
      const newAverage = calculateAverageRating(updatedReviews);
      const newDistribution = calculateDistribution(updatedReviews);

      setRating({
        average: newAverage,
        total: updatedReviews.length,
        distribution: newDistribution
      });

      setUserRating(0);
      setUserReview('');
      setShowReviewForm(false);

      toast.success('تم إرسال مراجعتك بنجاح!');
    } catch (error) {
      toast.error('فشل في إرسال المراجعة');
    } finally {
      setIsSubmitting(false);
    }
  };

  // التصويت على المراجعة (مساعدة/غير مساعدة)
  const voteReview = (reviewId: string, isHelpful: boolean) => {
    setReviews(prev => prev.map(review =>
      review.id === reviewId
        ? { ...review, helpful: review.helpful + (isHelpful ? 1 : -1) }
        : review
    ));
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 ${className}`}>
      {/* رأس نظام التقييمات */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          تقييمات ومراجعات
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {rating.total} مراجعة
          </span>
        </div>
      </div>

      {/* التقييم العام */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* متوسط التقييم */}
        <div className="text-center">
          <div className="mb-4">
            <span className="text-5xl font-bold text-gray-900">
              {rating.average}
            </span>
            <div className="flex items-center justify-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${
                    star <= rating.average
                      ? 'text-yellow-500 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600 mt-1">
              من أصل {rating.total} مراجعة
            </p>
          </div>
        </div>

        {/* توزيع التقييمات */}
        {showDistribution && (
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = rating.distribution[stars as keyof typeof rating.distribution];
              const percentage = rating.total > 0 ? (count / rating.total) * 100 : 0;

              return (
                <div key={stars} className="flex items-center gap-3 text-sm">
                  <span className="text-gray-600 w-8">
                    {stars} ⭐
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full transition-all duration-800 ease-out"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-gray-600 w-8">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* فلاتر وترتيب المراجعات */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">ترتيب:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">الأحدث</option>
            <option value="oldest">الأقدم</option>
            <option value="highest">الأعلى تقييماً</option>
            <option value="lowest">الأقل تقييماً</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">فلترة:</span>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(Number(e.target.value))}
            className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500"
          >
            <option value={0}>جميع التقييمات</option>
            <option value={5}>5 نجوم</option>
            <option value={4}>4 نجوم</option>
            <option value={3}>3 نجوم</option>
            <option value={2}>2 نجوم</option>
            <option value={1}>1 نجمة</option>
          </select>
        </div>
      </div>

      {/* نموذج إضافة مراجعة */}
      {allowReviews && (
        <div className="mb-8">
          {!showReviewForm ? (
            <button
              onClick={() => setShowReviewForm(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 hover-scale-subtle"
            >
              <MessageSquare className="w-5 h-5" />
              أضف مراجعتك
            </button>
          ) : (
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 animate-fadeIn">
              <h4 className="font-bold text-gray-900 mb-4">أضف مراجعتك</h4>

              {/* اختيار التقييم */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تقييمك
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setUserRating(star)}
                      className={`p-1 rounded transition-colors hover-scale-subtle ${
                        star <= userRating ? 'text-yellow-500' : 'text-gray-300'
                      }`}
                    >
                      <Star className="w-6 h-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              {/* كتابة المراجعة */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  مراجعتك
                </label>
                <textarea
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                  placeholder="شاركنا رأيك في هذا المحتوى..."
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  dir="rtl"
                />
              </div>

              {/* أزرار التحكم */}
              <div className="flex gap-3">
                <button
                  onClick={submitReview}
                  disabled={isSubmitting || userRating === 0}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 hover-scale-subtle"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      جاري الإرسال...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      إرسال المراجعة
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setShowReviewForm(false);
                    setUserRating(0);
                    setUserReview('');
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors hover-scale-subtle"
                >
                  إلغاء
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* قائمة المراجعات */}
      <div className="space-y-6">
        {filteredReviews.map((review, index) => (
          <div
            key={review.id}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow animate-fadeIn"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  {review.userAvatar ? (
                    <img
                      src={review.userAvatar}
                      alt={review.userName}
                      className="w-10 h-10 rounded-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-blue-600 font-semibold">
                      {review.userName.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">
                      {review.userName}
                    </span>
                    {review.verified && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{new Date(review.date).toLocaleDateString('ar-SA')}</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4" dir="rtl">
              {review.comment}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => voteReview(review.id, true)}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600 transition-colors hover-scale-subtle"
                >
                  <ThumbsUp className="w-4 h-4" />
                  مفيد ({review.helpful})
                </button>

                <button
                  onClick={() => voteReview(review.id, false)}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition-colors hover-scale-subtle"
                >
                  <ThumbsDown className="w-4 h-4" />
                  غير مفيد
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors hover-scale-subtle"
                >
                  <Flag className="w-4 h-4" />
                </button>

                <button
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors hover-scale-subtle"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-12 animate-fadeIn">
          <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            لا توجد مراجعات بعد
          </h3>
          <p className="text-gray-600">
            كن أول من يضيف مراجعة لهذا المحتوى
          </p>
        </div>
      )}
    </div>
  );
};

export default RatingSystem;