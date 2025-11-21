'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ModuleSidebar from '@/components/course-content/ModuleSidebar';
import UnitSidebar from '@/components/course-content/UnitSidebar';
import FileList from '@/components/course-content/FileList';
import { useCourseModules, useModuleUnits, useUnitFiles } from '@/hooks/useCourseModules';
import type { Module, Lesson, CourseContent } from '@/types/course-management';

export default function CourseContentPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;

  // State management
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  const [selectedModuleTitle, setSelectedModuleTitle] = useState<string>('');
  const [selectedUnitTitle, setSelectedUnitTitle] = useState<string>('');

  // Data fetching
  const {
    data: modules = [],
    isLoading: modulesLoading,
    error: modulesError,
  } = useCourseModules(courseId);

  const {
    data: units = [],
    isLoading: unitsLoading,
    error: unitsError,
  } = useModuleUnits(courseId, selectedModuleId || undefined);

  const {
    data: files = [],
    isLoading: filesLoading,
    error: filesError,
  } = useUnitFiles(
    courseId,
    selectedModuleId || undefined,
    selectedUnitId || undefined
  );

  // Auto-select first module when modules load
  useEffect(() => {
    if (modules.length > 0 && !selectedModuleId) {
      const firstModule = modules[0];
      setSelectedModuleId(firstModule.id);
      setSelectedModuleTitle(firstModule.title);
    }
  }, [modules, selectedModuleId]);

  // Auto-select first unit when units load
  useEffect(() => {
    if (units.length > 0 && selectedModuleId && !selectedUnitId) {
      const firstUnit = units[0];
      setSelectedUnitId(firstUnit.id);
      setSelectedUnitTitle(firstUnit.title);
    } else if (units.length === 0) {
      setSelectedUnitId(null);
      setSelectedUnitTitle('');
    }
  }, [units, selectedModuleId, selectedUnitId]);

  // Update module title when module changes
  useEffect(() => {
    if (selectedModuleId) {
      const courseModule = modules.find((m) => m.id === selectedModuleId);
      if (courseModule) {
        setSelectedModuleTitle(courseModule.title);
      }
    }
  }, [selectedModuleId, modules]);

  // Update unit title when unit changes
  useEffect(() => {
    if (selectedUnitId) {
      const unit = units.find((u) => u.id === selectedUnitId);
      if (unit) {
        setSelectedUnitTitle(unit.title);
      }
    }
  }, [selectedUnitId, units]);

  // Handle module selection
  const handleModuleSelect = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setSelectedUnitId(null); // Reset unit selection when module changes
    setSelectedUnitTitle('');
  };

  // Handle unit selection
  const handleUnitSelect = (unitId: string) => {
    setSelectedUnitId(unitId);
  };

  // Handle file open
  const handleFileOpen = (fileId: string) => {
    const file = files.find((f) => f.id === fileId);
    if (!file) return;

    // Navigate based on file type
    if (file.type === 'video' && file.fileUrl) {
      // Navigate to video player or open in new tab
      window.open(file.fileUrl, '_blank');
    } else if (file.fileUrl) {
      // Open document or other file types
      window.open(file.fileUrl, '_blank');
    } else if (file.content) {
      // Open HTML content
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(file.content);
      }
    }
  };

  // Handle file download
  const handleFileDownload = (fileId: string) => {
    const file = files.find((f) => f.id === fileId);
    if (!file || !file.fileUrl) return;

    // Create download link
    const link = document.createElement('a');
    link.href = file.fileUrl;
    link.download = file.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Error states
  if (modulesError) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
            خطأ في تحميل المحاور
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            {modulesError instanceof Error ? modulesError.message : 'حدث خطأ غير متوقع'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex flex-col" dir="rtl">
      {/* Page Header */}
      <div className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 px-6 py-4">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
          محتوى الدورة
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          تصفح المحاور والوحدات والملفات
        </p>
      </div>

      {/* Main Content - Three Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column - Modules */}
        <ModuleSidebar
          modules={modules}
          selectedModuleId={selectedModuleId}
          selectedUnitId={selectedUnitId}
          onModuleSelect={handleModuleSelect}
          onUnitSelect={handleUnitSelect}
          isLoading={modulesLoading}
        />

        {/* Middle Column - Units */}
        {selectedModuleId && (
          <UnitSidebar
            units={units}
            selectedUnitId={selectedUnitId}
            onUnitSelect={handleUnitSelect}
            selectedModuleTitle={selectedModuleTitle}
            isLoading={unitsLoading}
          />
        )}

        {/* Right Column - Files */}
        {selectedUnitId && (
          <FileList
            files={files}
            selectedUnitTitle={selectedUnitTitle}
            onFileOpen={handleFileOpen}
            onFileDownload={handleFileDownload}
            isLoading={filesLoading}
          />
        )}

        {/* Empty State when no selection */}
        {!selectedModuleId && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <p className="text-lg font-medium text-neutral-600 dark:text-neutral-400">
                اختر محورًا للبدء
              </p>
            </div>
          </div>
        )}

        {selectedModuleId && !selectedUnitId && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <p className="text-lg font-medium text-neutral-600 dark:text-neutral-400">
                اختر وحدة لعرض الملفات
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
