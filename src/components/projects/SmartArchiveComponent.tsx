'use client';

import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Folder,
  FileText,
  Image,
  Video,
  File,
  Plus,
  Search,
  Download,
  Calendar,
  Users,
  HardDrive,
  ChevronRight,
  ChevronDown,
  X,
  Edit,
  Trash2,
  Clock,
  BarChart3,
} from 'lucide-react';

/**
 * Project interface with metadata and linked files
 */
interface Project {
  id: string;
  name: string;
  description: string;
  createdDate: string;
  members: string[];
  files: FileItem[];
}

/**
 * File item linked to project
 */
interface FileItem {
  id: string;
  name: string;
  type: 'document' | 'image' | 'video' | 'pdf' | 'word' | 'excel' | 'powerpoint' | 'other';
  size: string;
  addedDate: string;
  path?: string; // for tree structure
}

/**
 * Tree node for file hierarchy
 */
interface TreeNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: TreeNode[];
  file?: FileItem;
}

/**
 * Modal for creating new project
 */
const CreateProjectModal = ({
  isOpen,
  onClose,
  onCreate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (project: Omit<Project, 'id' | 'files'>) => void;
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      name,
      description,
      createdDate: new Date().toISOString().split('T')[0],
      members: members.split(',').map(m => m.trim()).filter(m => m),
    });
    setName('');
    setDescription('');
    setMembers('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                إنشاء مشروع جديد
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  اسم المشروع
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  الوصف
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  أعضاء الفريق (مفصولة بفواصل)
                </label>
                <input
                  type="text"
                  value={members}
                  onChange={(e) => setMembers(e.target.value)}
                  placeholder="أحمد، محمد، فاطمة"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end space-x-3 space-x-reverse">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                >
                  إنشاء
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Tree view component for file hierarchy
 */
const FileTree = ({
  nodes,
  onFileClick,
  expandedNodes,
  onToggleExpand,
  onDragStart,
  onDragEnd,
}: {
  nodes: TreeNode[];
  onFileClick: (file: FileItem) => void;
  expandedNodes: Set<string>;
  onToggleExpand: (id: string) => void;
  onDragStart: (e: React.DragEvent, file: FileItem) => void;
  onDragEnd: (e: React.DragEvent) => void;
}) => {
  const renderNode = (node: TreeNode, level: number = 0) => (
    <div key={node.id}>
      <div
        className={`flex items-center py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
          level > 0 ? 'ml-4' : ''
        }`}
        onClick={() => {
          if (node.type === 'folder') {
            onToggleExpand(node.id);
          } else if (node.file) {
            onFileClick(node.file);
          }
        }}
        draggable={node.type === 'file' && !!node.file}
        onDragStart={(e) => {
          if (node.file) {
            onDragStart(e, node.file);
          }
        }}
        onDragEnd={onDragEnd}
      >
        {node.type === 'folder' ? (
          <>
            {expandedNodes.has(node.id) ? (
              <ChevronDown className="w-4 h-4 ml-1" />
            ) : (
              <ChevronRight className="w-4 h-4 ml-1" />
            )}
            <Folder className="w-4 h-4 text-blue-500 ml-2" />
          </>
        ) : (
          <File className="w-4 h-4 text-gray-500 ml-5" />
        )}
        <span className="text-sm text-gray-900 dark:text-white">{node.name}</span>
      </div>
      {node.type === 'folder' && expandedNodes.has(node.id) && node.children && (
        <div>
          {node.children.map((child) => renderNode(child, level + 1))}
        </div>
      )}
    </div>
  );

  return <div className="space-y-1">{nodes.map((node) => renderNode(node))}</div>;
};

/**
 * Timeline component for project events
 */
const ProjectTimeline = ({ files }: { files: FileItem[] }) => {
  const sortedFiles = [...files].sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());

  return (
    <div className="space-y-4">
      {sortedFiles.map((file, index) => (
        <motion.div
          key={file.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start space-x-4 space-x-reverse"
        >
          <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <File className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              تم إضافة الملف: {file.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
              <Clock className="w-3 h-3 ml-1" />
              {file.addedDate}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

/**
 * Project statistics component
 */
const ProjectStats = ({ project }: { project: Project }) => {
  const totalSize = project.files.reduce((sum, file) => {
    const size = parseFloat(file.size.replace(' MB', '').replace(' KB', '')) * (file.size.includes('KB') ? 0.001 : 1);
    return sum + size;
  }, 0);

  const fileTypes = project.files.reduce((acc, file) => {
    acc[file.type] = (acc[file.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex items-center">
          <File className="w-8 h-8 text-blue-500 ml-3" />
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{project.files.length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">عدد الملفات</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex items-center">
          <HardDrive className="w-8 h-8 text-green-500 ml-3" />
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalSize.toFixed(1)} MB</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">الحجم الكلي</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex items-center">
          <Users className="w-8 h-8 text-purple-500 ml-3" />
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{project.members.length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">أعضاء الفريق</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex items-center">
          <BarChart3 className="w-8 h-8 text-orange-500 ml-3" />
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{Object.keys(fileTypes).length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">أنواع الملفات</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Main Smart Archive Component
 */
const SmartArchiveComponent = () => {
  const initialProjects: Project[] = [
    {
      id: '1',
      name: 'مشروع التدقيق الداخلي',
      description: 'مشروع شامل لتدقيق العمليات الداخلية',
      createdDate: '2023-10-01',
      members: ['أحمد محمد', 'فاطمة علي', 'محمد حسن'],
      files: [
        { id: 'f1', name: 'تقرير التدقيق.pdf', type: 'pdf', size: '2.3 MB', addedDate: '2023-10-05' },
        { id: 'f2', name: 'عرض تقديمي.pptx', type: 'powerpoint', size: '15.7 MB', addedDate: '2023-10-07' },
        { id: 'f3', name: 'جدول البيانات.xlsx', type: 'excel', size: '1.2 MB', addedDate: '2023-10-08' },
        { id: 'f4', name: 'صورة توضيحية.jpg', type: 'image', size: '4.1 MB', addedDate: '2023-10-10' },
      ],
    },
    {
      id: '2',
      name: 'مشروع الامتثال المالي',
      description: 'ضمان الامتثال للمعايير المالية',
      createdDate: '2023-09-15',
      members: ['سارة أحمد', 'علي محمد'],
      files: [
        { id: 'f5', name: 'وثيقة الامتثال.docx', type: 'word', size: '856 KB', addedDate: '2023-09-20' },
        { id: 'f6', name: 'فيديو شرح.mp4', type: 'video', size: '45.2 MB', addedDate: '2023-09-25' },
      ],
    },
  ];

  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [draggedFile, setDraggedFile] = useState<FileItem | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [projects, searchTerm]);

  const createProject = (newProject: Omit<Project, 'id' | 'files'>) => {
    const project: Project = {
      ...newProject,
      id: `project-${Date.now()}`,
      files: [],
    };
    setProjects((prev) => [...prev, project]);
  };

  const addFileToProject = (projectId: string, file: FileItem) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? { ...project, files: [...project.files, { ...file, addedDate: new Date().toISOString().split('T')[0] }] }
          : project
      )
    );
  };

  const buildFileTree = (files: FileItem[]): TreeNode[] => {
    const root: TreeNode = { id: 'root', name: 'الملفات', type: 'folder', children: [] };

    const typeFolders: Record<string, TreeNode> = {
      document: { id: 'docs', name: 'وثائق', type: 'folder', children: [] },
      pdf: { id: 'pdfs', name: 'PDF', type: 'folder', children: [] },
      word: { id: 'words', name: 'Word', type: 'folder', children: [] },
      excel: { id: 'excels', name: 'Excel', type: 'folder', children: [] },
      powerpoint: { id: 'ppts', name: 'PowerPoint', type: 'folder', children: [] },
      image: { id: 'images', name: 'صور', type: 'folder', children: [] },
      video: { id: 'videos', name: 'فيديوهات', type: 'folder', children: [] },
      other: { id: 'others', name: 'أخرى', type: 'folder', children: [] },
    };

    files.forEach((file) => {
      const folder = typeFolders[file.type] || typeFolders.other;
      folder.children!.push({
        id: file.id,
        name: file.name,
        type: 'file',
        file,
      });
    });

    root.children = Object.values(typeFolders).filter((folder) => folder.children!.length > 0);
    return [root];
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, projectId: string) => {
    e.preventDefault();

    // Handle dragged internal files
    if (draggedFile) {
      addFileToProject(projectId, draggedFile);
      setDraggedFile(null);
      return;
    }

    // Handle external files from OS
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      files.forEach((file) => {
        const fileItem: FileItem = {
          id: `file-${Date.now()}-${Math.random()}`,
          name: file.name,
          type: getFileTypeFromName(file.name),
          size: formatFileSize(file.size),
          addedDate: new Date().toISOString().split('T')[0],
        };
        addFileToProject(projectId, fileItem);
      });
    }
  };

  const handleDragStart = (e: React.DragEvent, file: FileItem) => {
    setDraggedFile(file);
  };

  const handleDragEnd = () => {
    setDraggedFile(null);
  };

  const getFileTypeFromName = (fileName: string): FileItem['type'] => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'pdf';
      case 'doc':
      case 'docx':
        return 'word';
      case 'xls':
      case 'xlsx':
        return 'excel';
      case 'ppt':
      case 'pptx':
        return 'powerpoint';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
        return 'image';
      case 'mp4':
      case 'avi':
      case 'mov':
        return 'video';
      case 'txt':
      case 'md':
        return 'document';
      default:
        return 'other';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const exportProject = (project: Project) => {
    // Simulate export
    alert(`تم تصدير المشروع "${project.name}" كأرشيف ZIP`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              الأرشيف الذكي للمشاريع
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {projects.length} مشروع
            </p>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateModal(true)}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 ml-2" />
              مشروع جديد
            </motion.button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="البحث في المشاريع..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </motion.div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-6 overflow-y-auto">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">المشاريع</h2>
          <div className="space-y-3">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedProject?.id === project.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
                onClick={() => setSelectedProject(project)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, project.id)}
              >
                <h3 className="font-medium">{project.name}</h3>
                <p className="text-sm opacity-75 mt-1">{project.description}</p>
                <div className="flex items-center justify-between mt-2 text-xs opacity-75">
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 ml-1" />
                    {project.createdDate}
                  </span>
                  <span className="flex items-center">
                    <File className="w-3 h-3 ml-1" />
                    {project.files.length}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div
          className="flex-1 p-6"
          onDragOver={handleDragOver}
          onDrop={(e) => selectedProject && handleDrop(e, selectedProject.id)}
        >
          {selectedProject ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Project Header */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedProject.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      {selectedProject.description}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => exportProject(selectedProject)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
                  >
                    <Download className="w-4 h-4 ml-2" />
                    تصدير ZIP
                  </motion.button>
                </div>

                <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 ml-1" />
                    تاريخ الإنشاء: {selectedProject.createdDate}
                  </span>
                  <span className="flex items-center">
                    <Users className="w-4 h-4 ml-1" />
                    أعضاء: {selectedProject.members.join(', ')}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <ProjectStats project={selectedProject} />

              {/* Content Tabs */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <nav className="flex">
                    <button className="px-6 py-3 text-primary border-b-2 border-primary font-medium">
                      شجرة الملفات
                    </button>
                    <button className="px-6 py-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                      الجدول الزمني
                    </button>
                  </nav>
                </div>

                <div className="p-6">
                  <FileTree
                    nodes={buildFileTree(selectedProject.files)}
                    onFileClick={(file) => console.log('File clicked:', file)}
                    expandedNodes={expandedNodes}
                    onToggleExpand={(id) => {
                      setExpandedNodes((prev) => {
                        const newSet = new Set(prev);
                        if (newSet.has(id)) {
                          newSet.delete(id);
                        } else {
                          newSet.add(id);
                        }
                        return newSet;
                      });
                    }}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  الجدول الزمني
                </h3>
                <ProjectTimeline files={selectedProject.files} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Folder className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                اختر مشروعاً للعرض
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                حدد مشروعاً من القائمة الجانبية لبدء العمل
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <CreateProjectModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={createProject}
      />
    </div>
  );
};

export default SmartArchiveComponent;
