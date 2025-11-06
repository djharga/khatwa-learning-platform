'use client';

import { Download, ExternalLink, FileText, Image, File, Video, FileCode } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  url: string;
  type: string;
}

interface ResourcesPanelProps {
  resources: Resource[];
}

export default function ResourcesPanel({ resources }: ResourcesPanelProps) {
  const getResourceIcon = (type: string) => {
    if (type.includes('pdf')) return FileText;
    if (type.includes('image')) return Image;
    if (type.includes('video')) return Video;
    if (type.includes('code') || type.includes('text')) return FileCode;
    return File;
  };

  const handleDownload = (url: string, title: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = title;
    link.click();
  };

  if (resources.length === 0) {
    return (
      <div className="p-6 text-center text-gray-400">
        <File className="w-12 h-12 mx-auto mb-4 text-gray-600" />
        <p>لا توجد موارد متاحة لهذا الدرس.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="grid gap-4">
        {resources.map((resource) => {
          const Icon = getResourceIcon(resource.type);

          return (
            <div
              key={resource.id}
              className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-600 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="p-3 bg-blue-600/20 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white mb-1">{resource.title}</h4>
                  <p className="text-sm text-gray-400 uppercase">{resource.type}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload(resource.url, resource.title)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  aria-label="تحميل"
                >
                  <Download className="w-5 h-5 text-gray-400" />
                </button>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  aria-label="فتح في علامة تبويب جديدة"
                >
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

