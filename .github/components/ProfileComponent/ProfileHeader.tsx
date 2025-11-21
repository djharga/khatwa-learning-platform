import { motion as headerMotion } from 'framer-motion';
import { BookOpen, CheckCircle, Play, Clock, TrendingUp, MapPin, Calendar, Camera } from 'lucide-react';
import { toEnglishDigits } from '../../lib/numberUtils';

interface ProfileHeaderProps {
  userData: {
    name: string;
    email: string;
    phone: string;
    bio: string;
    profileImage: string;
    location: string;
    website: string;
    linkedin: string;
    twitter: string;
    joinDate: string;
    lastActive: string;
  };
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  totalHours: number;
  averageProgress: number;
  onProfileImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userData, totalCourses, completedCourses, inProgressCourses, totalHours, averageProgress, onProfileImageUpload }) => {
  return (
    <>
      <headerMotion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        {/* باقي محتوى الملف */}
      </headerMotion.div>
    </>
  );
};

export default ProfileHeader;
