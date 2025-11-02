import { Button } from '@/components/ui';
import { Users, MessageSquare, TrendingUp, Award } from 'lucide-react';

/**
 * Community header component displaying the community title, description, and key statistics badges.
 * Shows member count, post count, satisfaction rate, and expert count with corresponding icons.
 */
export default function CommunityHeader() {
  return (
    <div className="text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">مجتمع خطى التعليمي</h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
        انضم إلى مجتمع من المحترفين والمتعلمين، شارك معرفتك، احصل على الدعم، وطور مهاراتك معًا.
      </p>
      // Statistics badges section displaying key community metrics
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <div className="flex items-center bg-blue-50 rounded-full px-4 py-2">
          <Users className="w-5 h-5 text-blue-500 mr-2" />
          <span className="text-blue-700 font-medium">10,000+ عضو</span>
        </div>
        <div className="flex items-center bg-green-50 rounded-full px-4 py-2">
          <MessageSquare className="w-5 h-5 text-green-500 mr-2" />
          <span className="text-green-700 font-medium">5,000+ منشور</span>
        </div>
        <div className="flex items-center bg-purple-50 rounded-full px-4 py-2">
          <TrendingUp className="w-5 h-5 text-purple-500 mr-2" />
          <span className="text-purple-700 font-medium">95% معدل رضا</span>
        </div>
        <div className="flex items-center bg-yellow-50 rounded-full px-4 py-2">
          <Award className="w-5 h-5 text-yellow-500 mr-2" />
          <span className="text-yellow-700 font-medium">100+ خبير</span>
        </div>
      </div>
      // Call-to-action button to start a discussion
      <Button size="lg">ابدأ المناقشة الآن</Button>
    </div>
  );
}
