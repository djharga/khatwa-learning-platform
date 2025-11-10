'use client';

/**
 * صفحة الكتب الإلكترونية - منصة خطى التعليمية
 * صفحة خاصة بالكتب الإلكترونية والموارد التعليمية
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Download,
  Eye,
  Search,
  Filter,
  Star,
  Calendar,
  FileText,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export default function BooksPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const books = [
    {
      id: '1',
      title: 'أساسيات المحاسبة المالية',
      author: 'د. أحمد محمد',
      category: 'محاسبة',
      rating: 4.8,
      downloads: 1250,
      pages: 350,
      size: '15 MB',
      image: '/assets/financial accounting.png',
      description: 'كتاب شامل عن أساسيات المحاسبة المالية للمبتدئين',
    },
    {
      id: '2',
      title: 'المراجعة الداخلية الحديثة',
      author: 'أ. سارة علي',
      category: 'مراجعة',
      rating: 4.9,
      downloads: 980,
      pages: 420,
      size: '18 MB',
      image: '/assets/financial accounting.png',
      description: 'دليل شامل للمراجعة الداخلية وأفضل الممارسات',
    },
    {
      id: '3',
      title: 'التحليل المالي المتقدم',
      author: 'د. خالد عمر',
      category: 'مالية',
      rating: 4.7,
      downloads: 750,
      pages: 380,
      size: '16 MB',
      image: '/assets/financial accounting.png',
      description: 'تقنيات متقدمة في تحليل القوائم المالية',
    },
    {
      id: '4',
      title: 'إدارة المخاطر المالية',
      author: 'أ. فاطمة أحمد',
      category: 'إدارة',
      rating: 4.6,
      downloads: 620,
      pages: 300,
      size: '14 MB',
      image: '/assets/financial accounting.png',
      description: 'إدارة المخاطر المالية في المؤسسات',
    },
  ];

  const categories = ['all', 'محاسبة', 'مراجعة', 'مالية', 'إدارة'];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-green-100 px-6 py-3 rounded-full mb-6">
            <BookOpen className="w-6 h-6 text-green-600" />
            <span className="text-green-700 font-bold">الكتب الإلكترونية</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            مكتبة الكتب الإلكترونية
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            تصفح مجموعة واسعة من الكتب الإلكترونية التعليمية في المحاسبة والمراجعة والمالية
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
              placeholder="ابحث عن كتاب..."
              className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category === 'all' ? 'الكل' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredBooks.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-green-600" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                <p className="text-xs text-gray-500 mb-4 line-clamp-2">{book.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">{book.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500">{book.pages} صفحة</span>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{book.downloads} تحميل</span>
                  <span>{book.size}</span>
                </div>

                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  تحميل
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">لم يتم العثور على كتب</p>
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg p-8 text-center text-white"
        >
          <h2 className="text-2xl font-bold mb-4">اكتشف المزيد من الموارد</h2>
          <p className="text-green-100 mb-6">
            تصفح مكتبتنا الكاملة من الكتب والموارد التعليمية
          </p>
          <Link
            href="/resources"
            className="inline-block px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium"
          >
            عرض جميع الموارد
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

