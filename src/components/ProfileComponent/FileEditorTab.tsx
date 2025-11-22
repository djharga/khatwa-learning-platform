import { motion } from 'framer-motion';
import { FileText, Upload, Save } from 'lucide-react';

export interface FileEditorTabProps {
  uploadedFile: File | null;
  fileContent: string;
  fileType: string | null;
  excelData: any[];
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveFile: () => void;
}

export const FileEditorTab = ({
  uploadedFile,
  fileContent,
  fileType,
  excelData,
  handleFileUpload,
  handleSaveFile,
}: FileEditorTabProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
        <h3 className="text-xl font-bold mb-4">محرر الملفات</h3>
        
        {/* محتوى تبويب محرر الملفات */}
        <div className="space-y-4">
          <input type="file" onChange={handleFileUpload} />
          
          {uploadedFile && (
            <button onClick={handleSaveFile} className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              <Save className="w-4 h-4" />
              <span>حفظ الملف</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
