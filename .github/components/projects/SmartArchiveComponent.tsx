'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, File, Plus, Search, Calendar, Users, Download, Clock } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: string;
  size: string;
  addedDate: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  createdDate: string;
  members: string[];
  files: FileItem[];
}

const SmartArchive = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'مشروع المراجعة',
      description: 'توثيق الملفات المالية ومتابعة الإجراءات',
      createdDate: '2024-01-10',
      members: ['أحمد', 'فاطمة'],
      files: [
        { id: 'f1', name: 'بيان التدقيق.pdf', type: 'pdf', size: '2.3 MB', addedDate: '2024-01-15' },
        { id: 'f2', name: 'عرض داخلي.pptx', type: 'powerpoint', size: '5.1 MB', addedDate: '2024-01-17' },
      ],
    },
  ]);
  const [selected, setSelected] = useState<Project | null>(null);
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () => projects.filter((p) => p.name.includes(search) || p.description.includes(search)),
    [projects, search]
  );

  const createProject = () => {
    const name = prompt('اسم المشروع:');
    if (!name) return;
    setProjects((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        name,
        description: 'مشروع جديد',
        createdDate: new Date().toISOString().split('T')[0],
        members: [],
        files: [],
      },
    ]);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 p-4 border-l border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-gray-900 dark:text-white">المشاريع</h2>
          <button onClick={createProject} className="p-1.5 bg-blue-600 text-white rounded">
            <Plus className="w-3 h-3" />
          </button>
        </div>
        <div className="relative mb-3">
          <Search className="absolute right-2 top-2 w-3 h-3 text-gray-400" />
          <input
            placeholder="بحث..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs rounded-lg border border-gray-200 dark:border-gray-700 pl-2 pr-7 py-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>
        <div className="flex-1 overflow-y-auto space-y-2">
          {filtered.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelected(p)}
              className={`p-2 rounded-md text-xs cursor-pointer ${
                selected?.id === p.id ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              <p className="font-semibold">{p.name}</p>
              <p className="text-[10px] opacity-80">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-5 overflow-y-auto">
        {selected ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{selected.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{selected.description}</p>
                </div>
                <button
                  onClick={() => alert('تم التصدير بنجاح')}
                  className="flex items-center gap-1 bg-green-500 text-white text-xs px-3 py-1 rounded"
                >
                  <Download className="w-3 h-3" />
                  تصدير
                </button>
              </div>
              <div className="flex items-center gap-4 text-[10px] text-gray-500 dark:text-gray-400 mt-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {selected.createdDate}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {selected.members.join(', ') || 'بدون أعضاء'}
                </span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-white dark:bg-gray-800 rounded shadow text-xs">
                <p className="font-bold text-lg text-blue-600">{selected.files.length}</p>
                ملفات
              </div>
              <div className="p-3 bg-white dark:bg-gray-800 rounded shadow text-xs">
                <p className="font-bold text-lg text-purple-600">{selected.members.length}</p>
                أعضاء
              </div>
              <div className="p-3 bg-white dark:bg-gray-800 rounded shadow text-xs">
                <p className="font-bold text-lg text-green-600">
                  {selected.files.reduce(
                    (s, f) =>
                      s + parseFloat(f.size.replace(' MB', '').replace(' KB', '')) * (f.size.includes('KB') ? 0.001 : 1),
                    0
                  ).toFixed(1)}{' '}
                  MB
                </p>
                الحجم
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-semibold text-sm mb-2 text-gray-800 dark:text-white">الملفات</h4>
              {selected.files.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center justify-between text-xs border-b border-gray-200 dark:border-gray-700 py-1.5"
                >
                  <div className="flex items-center gap-2">
                    <File className="w-3 h-3 text-blue-600" />
                    <span>{f.name}</span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {f.addedDate}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Folder className="w-12 h-12 mb-2" />
            <p>اختر مشروعًا من القائمة</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartArchive;
