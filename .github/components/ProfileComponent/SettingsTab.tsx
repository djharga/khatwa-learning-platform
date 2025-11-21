import { motion } from 'framer-motion';
import { Settings, Bell, Shield, Trash2 } from 'lucide-react';
import StyledButton from '../ui/StyledButton';

export interface SettingsTabProps {
  settings: any;
  setSettings: (settings: any) => void;
  handleSaveSettings: () => void;
  isLoading: boolean;
  handleExportData: () => void;
  handleDeleteAccount: () => void;
}

export const SettingsTab = ({
  settings,
  setSettings,
  handleSaveSettings,
  isLoading,
  handleExportData,
  handleDeleteAccount,
}: SettingsTabProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
        <h3 className="text-xl font-bold mb-4">الإعدادات</h3>
        
        {/* محتوى تبويب الإعدادات */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>اللغة</span>
            <select 
              value={settings.language}
              onChange={(e) => setSettings({...settings, language: e.target.value})}
              className="border rounded p-2"
            >
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          </div>
          
          <div className="flex justify-end space-x-4">
            <StyledButton onClick={handleSaveSettings} disabled={isLoading} variant="primary" size="default">
              {isLoading ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
            </StyledButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
