'use client';

import { motion } from 'framer-motion';
import {
  Download,
  FileText,
  Wrench,
  ExternalLink,
  BookOpen,
  Calculator,
  ClipboardList,
  TrendingUp,
} from 'lucide-react';
import React from 'react';

/** Represents a downloadable resource with metadata and categorization */
export interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'templates' | 'tools' | 'documents' | 'guides';
  fileSize?: string;
  downloadUrl: string;
  icon: React.ComponentType<{ className?: string }>;
}

/** Represents an external recommended link with description */
export interface ExternalLink {
  id: string;
  title: string;
  url: string;
  description: string;
}

/** Props for ResourcesComponent including resources list, external links, and optional title */
interface ResourcesComponentProps {
  resources: Resource[];
  externalLinks: ExternalLink[];
  title?: string;
}

/** Individual resource card with icon, title, description, file size, and download button. Features hover effects and gradient styling. */
interface ResourceCardProps {
  resource: Resource;
  onDownload: (resource: Resource) => void;
  index: number;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onDownload, index }) => (
  <motion.div
    key={resource.id}
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.03, y: -4 }}
    className="bg-white/95 backdrop-blur-sm p-8 border border-gray-200 rounded-3xl hover:border-purple-300 hover:shadow-2xl transition-all duration-500 group"
  >
    <div className="flex items-start space-x-4 space-x-reverse mb-6">
      {React.createElement(resource.icon, {
        className:
          'w-8 h-8 text-purple-600 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300',
      })}
      <div className="flex-1">
        <h4 className="font-bold text-slate-800 text-lg mb-3 leading-tight">
          {resource.title}
        </h4>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          {resource.description}
        </p>
        {resource.fileSize && (
          <p className="text-xs text-slate-500 mb-4">
            حجم الملف: {resource.fileSize}
          </p>
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDownload(resource)}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-bold rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Download className="w-4 h-4 ml-2" />
          تحميل
        </motion.button>
      </div>
    </div>
  </motion.div>
);

/** External link card with icon, title, and description. Opens in new tab with proper security attributes. */
interface ExternalLinkCardProps {
  link: ExternalLink;
  index: number;
}

const ExternalLinkCard: React.FC<ExternalLinkCardProps> = ({ link, index }) => (
  <motion.a
    key={link.id}
    href={link.url}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.03, x: 4 }}
    className="block p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
  >
    <div className="flex items-start space-x-3 space-x-reverse">
      <ExternalLink className="w-5 h-5 text-primary mt-0.5 flex-shrink-0 transition-all duration-300" />
      <div>
        <h4 className="font-semibold text-primary text-sm mb-2 leading-tight">
          {link.title}
        </h4>
        <p className="text-xs text-neutral leading-relaxed tracking-normal">
          {link.description}
        </p>
      </div>
    </div>
  </motion.a>
);

/** Resources library component displaying categorized downloadable resources and external links. Features grouped resources by category (templates, tools, documents, guides) with download functionality and sidebar of recommended external links. */
const ResourcesComponent: React.FC<ResourcesComponentProps> = ({
  resources,
  externalLinks,
  title = 'المكتبة والموارد',
}) => {
  // Category metadata with icons and colors for resource grouping
  const categories = {
    templates: { label: 'قوالب العمل', icon: FileText, color: 'text-blue-500' },
    tools: { label: 'أدوات المراجعة', icon: Wrench, color: 'text-green-500' },
    documents: {
      label: 'مستندات مرجعية',
      icon: BookOpen,
      color: 'text-purple-500',
    },
    guides: {
      label: 'دليل المستخدم',
      icon: ClipboardList,
      color: 'text-orange-500',
    },
  };

  /** Handles resource download action. Currently simulated - needs integration with actual download service. */
  const handleDownload = (resource: Resource) => {
    if (!resource.downloadUrl) {
      return;
    }

    try {
      const link = document.createElement('a');
      link.href = resource.downloadUrl;
      const sanitizedTitle = resource.title.replace(/[^\w-_]+/g, '_');
      link.download = sanitizedTitle || 'resource';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('فشل تنزيل المورد:', error);
    }
  };

  // Group resources by category for organized display
  const groupedResources = resources.reduce(
    (acc, resource) => {
      if (!acc[resource.category]) {
        acc[resource.category] = [];
      }
      acc[resource.category].push(resource);
      return acc;
    },
    {} as Record<string, Resource[]>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Grid-based resources layout with consistent spacing */}
      <div className="grid grid-cols-1 gap-y-12 py-24">
        
        {/* Header Section */}
        <section className="container mx-auto max-w-7xl px-8">
          {title && (
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary text-center leading-tight"
            >
              {title}
            </motion.h1>
          )}
        </section>

        {/* Main Resources Content */}
        <section className="container mx-auto max-w-7xl px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 gap-y-12">
                {Object.entries(groupedResources).map(
                  ([category, categoryResources], categoryIndex) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 lg:p-10 border border-gray-100 dark:border-gray-700 transition-all duration-300"
                    >
                      <div className="flex items-center mb-8">
                        {React.createElement(
                          categories[category as keyof typeof categories].icon,
                          {
                            className: `w-7 h-7 mr-4 ${categories[category as keyof typeof categories].color} transition-all duration-300`,
                          }
                        )}
                        <h2 className="text-2xl lg:text-3xl font-bold text-primary leading-tight">
                          {categories[category as keyof typeof categories].label}
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {categoryResources.map((resource, index) => (
                          <ResourceCard
                            key={resource.id}
                            resource={resource}
                            onDownload={handleDownload}
                            index={index}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sticky top-24 border border-gray-100 dark:border-gray-700 transition-all duration-300"
              >
                <h3 className="text-lg lg:text-xl font-bold text-primary mb-6 leading-tight">
                  مصادر إضافية موصى بها
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  {externalLinks.map((link, index) => (
                    <ExternalLinkCard key={link.id} link={link} index={index} />
                  ))}
                </div>
              </motion.div>
            </div>
            
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default ResourcesComponent;
