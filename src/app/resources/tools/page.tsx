'use client';

/**
 * صفحة الأدوات - منصة خطى التعليمية
 * صفحة خاصة بالأدوات والموارد المساعدة
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Wrench,
  Calculator,
  FileSpreadsheet,
  BarChart3,
  Search,
  Filter,
  Download,
  ExternalLink,
  Star,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export default function ToolsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const tools = [
    {
      id: '1',
      title: 'حاسبة التكاليف',
      description: 'أداة لحساب التكاليف والمصروفات',
      category: 'محاسبة',
      type: 'calculator',
      rating: 4.8,
      downloads: 1250,
      icon: Calculator,
    },
    {
      id: '2',
      title: 'قوالب Excel المالية',
      description: 'مجموعة من القوالب الجاهزة للتحليل المالي',
      category: 'مالية',
      type: 'template',
      rating: 4.9,
      downloads: 980,
      icon: FileSpreadsheet,
    },
    {
      id: '3',
      title: 'أداة تحليل البيانات',
      description: 'أداة متقدمة لتحليل البيانات المالية',
      category: 'تحليل',
      type: 'tool',
      rating: 4.7,
      downloads: 750,
      icon: BarChart3,
    },
    {
      id: '4',
      title: 'حاسبة المخاطر',
      description: 'أداة لتقييم المخاطر المالية',
      category: 'إدارة',
      type: 'calculator',
      rating: 4.6,
      downloads: 620,
      icon: Calculator,
    },
  ];

  const categories = ['all', 'محاسبة', 'مالية', 'تحليل', 'إدارة'];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-orange-100 px-6 py-3 rounded-full mb-6">
            <Wrench className="w-6 h-6 text-orange-600" />
            <span className="text-orange-700 font-bold">الأدوات</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            أدوات وموارد مساعدة
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            استخدم مجموعة من الأدوات والقوالب الجاهزة لتسهيل عملك
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث عن أداة..."
              className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-orange-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category === 'all' ? 'الكل' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredTools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    {tool.type === 'calculator' ? 'حاسبة' : tool.type === 'template' ? 'قالب' : 'أداة'}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">{tool.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">{tool.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500">{tool.downloads} تحميل</span>
                </div>

                <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  استخدام الأداة
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <Wrench className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">لم يتم العثور على أدوات</p>
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl shadow-lg p-8 text-center text-white"
        >
          <h2 className="text-2xl font-bold mb-4">اكتشف المزيد من الأدوات</h2>
          <p className="text-orange-100 mb-6">
            تصفح مكتبتنا الكاملة من الأدوات والموارد المساعدة
          </p>
          <Link
            href="/resources"
            className="inline-block px-6 py-3 bg-white text-orange-600 rounded-lg hover:bg-orange-50 transition-colors font-medium"
          >
            عرض جميع الموارد
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

