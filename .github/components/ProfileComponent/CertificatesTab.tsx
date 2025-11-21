import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

export interface CertificatesTabProps {
  certificates: any[];
}

export const CertificatesTab = ({ certificates }: CertificatesTabProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
        <h3 className="text-xl font-bold mb-4">شهاداتي</h3>
        
        {/* محتوى تبويب الشهادات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certificates.map((cert) => (
            <div key={cert.id} className="border rounded-lg p-4">
              <h4>{cert.courseTitle}</h4>
              <p>{cert.type}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
