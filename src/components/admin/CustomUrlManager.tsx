'use client';

import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Copy,
  RefreshCw,
  Search,
  Building,
  Link as LinkIcon,
} from 'lucide-react';
import type { CompanyBranding, InvitationLink } from '@/types/user';
import toast from 'react-hot-toast';

interface CustomUrlManagerProps {
  className?: string;
}

const CustomUrlManager: FC<CustomUrlManagerProps> = ({ className = '' }) => {
  const [companies, setCompanies] = useState<CompanyBranding[]>([]);
  const [invitations, setInvitations] = useState<InvitationLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [companiesRes, invitationsRes] = await Promise.all([
        fetch('/api/admin/companies/branding'),
        fetch('/api/admin/invitations'),
      ]);

      if (companiesRes.ok) {
        const data = await companiesRes.json();
        setCompanies(data.companies || []);
      }

      if (invitationsRes.ok) {
        const data = await invitationsRes.json();
        setInvitations(data.invitations || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('فشل تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateInvitation = async (userId: string, email: string, phone: string) => {
    try {
      const response = await fetch('/api/admin/invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, email, phone }),
      });

      if (!response.ok) {
        throw new Error('فشل إنشاء رابط الدعوة');
      }

      const data = await response.json();
      setInvitations((prev) => [data.invitation, ...prev]);
      toast.success('تم إنشاء رابط الدعوة بنجاح');
    } catch (error: any) {
      console.error('Error creating invitation:', error);
      toast.error(error.message || 'فشل إنشاء رابط الدعوة');
    }
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success('تم نسخ الرابط');
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Company Branding */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  الروابط المخصصة للشركات
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  إدارة العروض المخصصة للشركات مع الشعار والاسم
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4">
          {companies.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <Building className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>لا توجد شركات مميزة</p>
            </div>
          ) : (
            <div className="space-y-3">
              {companies.map((company) => (
                <motion.div
                  key={company.userId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center gap-4">
                    {company.companyLogo && (
                      <img
                        src={company.companyLogo}
                        alt={company.companyName}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        {company.companyName}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Globe className="w-4 h-4 text-gray-400" />
                        <a
                          href={`https://${company.customUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          {company.customUrl}
                        </a>
                        <button
                          onClick={() => handleCopyLink(`https://${company.customUrl}`)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      company.enabled
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                    }`}
                  >
                    {company.enabled ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        مفعل
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <XCircle className="w-3 h-3" />
                        معطل
                      </span>
                    )}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Invitation Links */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LinkIcon className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  الروابط الدعائية
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  إدارة روابط الدعوة للموقع
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              إرسال رابط دعائي
            </button>
          </div>
        </div>
        <div className="p-4">
          {invitations.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <LinkIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>لا توجد روابط دعائية</p>
            </div>
          ) : (
            <div className="space-y-3">
              {invitations.map((invitation) => (
                <motion.div
                  key={invitation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <a
                        href={invitation.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 hover:text-blue-700"
                      >
                        {invitation.link}
                      </a>
                      <button
                        onClick={() => handleCopyLink(invitation.link)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      {invitation.email && <span>البريد: {invitation.email}</span>}
                      {invitation.phone && <span>الهاتف: {invitation.phone}</span>}
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          invitation.used
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {invitation.used ? 'مستخدم' : 'غير مستخدم'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomUrlManager;

