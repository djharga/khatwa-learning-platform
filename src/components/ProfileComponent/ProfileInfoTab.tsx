import { motion } from 'framer-motion';
import { User, Settings, Globe, Bell, Camera, Edit } from 'lucide-react';
import { Button } from '../ui';

export interface ProfileInfoTabProps {
  userData: any;
  setUserData: (data: any) => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  handleSaveProfile: () => void;
  isLoading: boolean;
  handleExportData: () => void;
}

export const ProfileInfoTab = ({
  userData,
  setUserData,
  isEditing,
  setIsEditing,
  handleSaveProfile,
  isLoading,
  handleExportData,
}: ProfileInfoTabProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
        {/* محتوى تبويب المعلومات الشخصية */}
        <h3 className="text-xl font-bold mb-4">المعلومات الشخصية</h3>
        
        <div className="flex justify-end space-x-4 mb-6">
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'إلغاء' : 'تعديل'}
          </Button>
          
          {isEditing && (
            <Button onClick={handleSaveProfile} loading={isLoading}>
              حفظ
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
