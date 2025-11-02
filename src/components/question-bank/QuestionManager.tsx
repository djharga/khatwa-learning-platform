'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Upload,
  Image as ImageIcon,
  FileText,
  Tag,
  Target,
  Clock,
  Eye,
  EyeOff,
  Copy,
  Download,
  Search,
  Filter,
  Grid,
  List,
  AlertCircle,
  CheckCircle,
  Brain,
  BarChart3,
  FileSpreadsheet,

  Calculator,
  Table,
  Bold,
  Italic,
  Underline,
  TestTube,
  Eye as PreviewIcon,
  Zap,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'سهل' | 'متوسط' | 'صعب';
  category: string;
  points: number;
  tags: string[];
  courseId?: string;
  axisId?: string;
  images?: string[];
  charts?: string[];
  createdAt: string;
  updatedAt: string;
  usageCount: number;
  successRate: number;
  aiGenerated?: boolean;
  isActive: boolean;
}

interface Course {
  id: string;
  name: string;
  axes: { id: string; name: string }[];
}

interface Test {
  id: string;
  name: string;
  questions: Question[];
  duration: number;
  totalPoints: number;
  createdAt: string;
}

interface QuestionManagerProps {
  questions: Question[];
  courses: Course[];
  onSave: (question: Question) => void;
  onDelete: (questionId: string) => void;
  onBulkImport: (questions: Question[]) => void;
  onBulkExport: (questions: Question[]) => void;
  onCreateTest?: (test: Test) => void;
}

const QuestionManager = ({
  questions,
  courses,
  onSave,
  onDelete,
  onBulkImport,
  onBulkExport,
  onCreateTest
}: QuestionManagerProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedSuccessRate, setSelectedSuccessRate] = useState<number | null>(null);
  const [selectedUsageCount, setSelectedUsageCount] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [showStats, setShowStats] = useState(false);
  const [showTestCreator, setShowTestCreator] = useState(false);
  const [testName, setTestName] = useState('');
  const [testDuration, setTestDuration] = useState(60);
  const [testQuestions, setTestQuestions] = useState<Question[]>([]);
  const [showTestPreview, setShowTestPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const excelInputRef = useRef<HTMLInputElement>(null);
  const wordInputRef = useRef<HTMLInputElement>(null);

  // فلترة الأسئلة
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCourse = selectedCourse === 'all' || question.courseId === selectedCourse;
    const matchesDifficulty = selectedDifficulty === 'all' || question.difficulty === selectedDifficulty;
    const matchesSuccessRate = selectedSuccessRate === null || question.successRate >= selectedSuccessRate;
    const matchesUsageCount = selectedUsageCount === null || question.usageCount >= selectedUsageCount;
    const matchesDate = !selectedDate || question.createdAt.startsWith(selectedDate);

    return matchesSearch && matchesCourse && matchesDifficulty && matchesSuccessRate && matchesUsageCount && matchesDate;
  });

  // توليد سؤال بالذكاء الاصطناعي (محاكاة)
  const generateAIQuestion = () => {
    const mockQuestion: Question = {
      id: `ai_${Date.now()}`,
      question: 'ما هو مفهوم الرقابة الداخلية في المحاسبة؟',
      options: [
        'نظام للتحكم في العمليات المالية',
        'طريقة لإعداد التقارير المالية',
        'أداة للتحليل المالي',
        'وسيلة للتواصل مع المستثمرين'
      ],
      correctAnswer: 0,
      explanation: 'الرقابة الداخلية هي نظام يهدف إلى ضمان دقة وموثوقية العمليات المالية.',
      difficulty: 'متوسط',
      category: 'المحاسبة',
      points: 10,
      tags: ['رقابة داخلية', 'محاسبة'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      usageCount: 0,
      successRate: 0,
      aiGenerated: true,
      isActive: true
    };
    onSave(mockQuestion);
    toast.success('تم توليد سؤال جديد بالذكاء الاصطناعي');
  };

  // إنشاء اختبار تلقائي
  const createAutomaticTest = () => {
    if (selectedQuestions.length === 0) {
      toast.error('يجب اختيار أسئلة لإنشاء الاختبار');
      return;
    }
    const selectedQs = questions.filter(q => selectedQuestions.includes(q.id));
    const totalPoints = selectedQs.reduce((sum, q) => sum + q.points, 0);
    const test: Test = {
      id: `test_${Date.now()}`,
      name: testName || 'اختبار تلقائي',
      questions: selectedQs,
      duration: testDuration,
      totalPoints,
      createdAt: new Date().toISOString()
    };
    onCreateTest?.(test);
    setShowTestCreator(false);
    setSelectedQuestions([]);
    setTestName('');
    setTestDuration(60);
    toast.success('تم إنشاء الاختبار بنجاح');
  };

  // إنشاء سؤال جديد
  const createNewQuestion = () => {
    const newQuestion: Question = {
      id: `q_${Date.now()}`,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
      difficulty: 'متوسط',
      category: '',
      points: 10,
      tags: [],
      images: [],
      charts: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      usageCount: 0,
      successRate: 0,
      aiGenerated: false,
      isActive: true
    };
    setEditingQuestion(newQuestion);
    setIsEditing(true);
  };

  // حفظ السؤال
  const saveQuestion = () => {
    if (!editingQuestion) return;

    if (!editingQuestion.question.trim()) {
      toast.error('يجب إدخال نص السؤال');
      return;
    }

    if (editingQuestion.options.some(opt => !opt.trim())) {
      toast.error('يجب ملء جميع الخيارات');
      return;
    }

    onSave(editingQuestion);
    setIsEditing(false);
    setEditingQuestion(null);
    toast.success('تم حفظ السؤال بنجاح');
  };

  // حذف السؤال
  const deleteQuestion = (questionId: string) => {
    if (confirm('هل أنت متأكد من حذف هذا السؤال؟')) {
      onDelete(questionId);
      toast.success('تم حذف السؤال');
    }
  };

  // نسخ السؤال
  const duplicateQuestion = (question: Question) => {
    const duplicated: Question = {
      ...question,
      id: `q_${Date.now()}`,
      question: `${question.question} (نسخة)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      usageCount: 0,
      successRate: 0
    };
    onSave(duplicated);
    toast.success('تم نسخ السؤال');
  };

  // استيراد الأسئلة من ملف
  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedQuestions = JSON.parse(e.target?.result as string);
        onBulkImport(importedQuestions);
        toast.success(`تم استيراد ${importedQuestions.length} سؤال`);
      } catch (error) {
        toast.error('خطأ في تنسيق الملف');
      }
    };
    reader.readAsText(file);
  };

  // استيراد من Excel (محاكاة)
  const handleExcelImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    // محاكاة استيراد من Excel
    const mockQuestions: Question[] = [
      {
        id: `excel_${Date.now()}`,
        question: 'سؤال مستورد من Excel',
        options: ['خيار 1', 'خيار 2', 'خيار 3', 'خيار 4'],
        correctAnswer: 0,
        explanation: '',
        difficulty: 'سهل',
        category: 'مستورد',
        points: 5,
        tags: ['excel'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        usageCount: 0,
        successRate: 0,
        isActive: true
      }
    ];
    onBulkImport(mockQuestions);
    toast.success('تم استيراد الأسئلة من Excel');
  };

  // تصدير إلى Word (محاكاة)
  const exportToWord = () => {
    const data = selectedQuestions.length > 0 ? questions.filter(q => selectedQuestions.includes(q.id)) : filteredQuestions;
    // محاكاة تصدير إلى Word
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'questions.doc';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('تم تصدير الأسئلة إلى Word');
  };

  // تصدير الأسئلة المحددة
  const exportSelectedQuestions = () => {
    const selectedData = questions.filter(q => selectedQuestions.includes(q.id));
    onBulkExport(selectedData);
    toast.success(`تم تصدير ${selectedData.length} سؤال`);
  };

  // إضافة صورة للسؤال
  const addImage = () => {
    // محاكاة إضافة صورة
    const imageUrl = prompt('أدخل رابط الصورة:');
    if (imageUrl && editingQuestion) {
      setEditingQuestion({
        ...editingQuestion,
        images: [...(editingQuestion.images || []), imageUrl]
      });
    }
  };

  // إضافة رسم بياني
  const addChart = () => {
    // محاكاة إضافة رسم بياني
    const chartUrl = prompt('أدخل رابط الرسم البياني:');
    if (chartUrl && editingQuestion) {
      setEditingQuestion({
        ...editingQuestion,
        charts: [...(editingQuestion.charts || []), chartUrl]
      });
    }
  };

  // إضافة معادلة رياضية
  const addEquation = () => {
    if (editingQuestion) {
      const equation = prompt('أدخل المعادلة الرياضية (مثال: E=mc²):');
      if (equation) {
        setEditingQuestion({
          ...editingQuestion,
          question: editingQuestion.question + ` [معادلة: ${equation}]`
        });
      }
    }
  };

  // إضافة جدول
  const addTable = () => {
    if (editingQuestion) {
      const tableMarkdown = `
| عمود 1 | عمود 2 | عمود 3 |
|---------|---------|---------|
| بيانات 1 | بيانات 2 | بيانات 3 |
| بيانات 4 | بيانات 5 | بيانات 6 |
      `;
      setEditingQuestion({
        ...editingQuestion,
        question: editingQuestion.question + tableMarkdown
      });
    }
  };

  // إحصائيات متقدمة
  const hardestQuestions = [...questions].sort((a, b) => a.successRate - b.successRate).slice(0, 5);
  const mostUsedQuestions = [...questions].sort((a, b) => b.usageCount - a.usageCount).slice(0, 5);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'سهل': return 'bg-green-100 text-green-800 border-green-200';
      case 'متوسط': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'صعب': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* رأس الإدارة */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">إدارة الأسئلة</h2>
            <p className="text-gray-600">إضافة وتعديل وحذف الأسئلة في بنك الأسئلة</p>
          </div>

          <div className="flex items-center gap-3">
            {/* تبديل عرض القائمة/الشبكة */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : 'text-gray-600'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : 'text-gray-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* أزرار التحكم */}
            <motion.button
              onClick={() => setShowStats(!showStats)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BarChart3 className="w-4 h-4" />
              إحصائيات
            </motion.button>

            <motion.button
              onClick={() => setShowTestCreator(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TestTube className="w-4 h-4" />
              إنشاء اختبار
            </motion.button>

            <motion.button
              onClick={generateAIQuestion}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Brain className="w-4 h-4" />
              توليد AI
            </motion.button>

            <motion.button
              onClick={createNewQuestion}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-5 h-5" />
              إضافة سؤال جديد
            </motion.button>
          </div>
        </div>

        {/* شريط البحث والفلاتر */}
        <div className="mt-6 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="البحث في الأسئلة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            >
              <option value="all">جميع الدورات</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            >
              <option value="all">جميع المستويات</option>
              <option value="سهل">سهل</option>
              <option value="متوسط">متوسط</option>
              <option value="صعب">صعب</option>
            </select>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <input
              type="number"
              placeholder="معدل النجاح الأدنى (%)"
              value={selectedSuccessRate || ''}
              onChange={(e) => setSelectedSuccessRate(e.target.value ? parseInt(e.target.value) : null)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              min="0"
              max="100"
            />

            <input
              type="number"
              placeholder="عدد مرات الاستخدام الأدنى"
              value={selectedUsageCount || ''}
              onChange={(e) => setSelectedUsageCount(e.target.value ? parseInt(e.target.value) : null)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              min="0"
            />

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />

            {/* أزرار الاستيراد والتصدير */}
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileImport}
                className="hidden"
              />
              <motion.button
                onClick={() => fileInputRef.current?.click()}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Upload className="w-4 h-4" />
                استيراد JSON
              </motion.button>

              <input
                ref={excelInputRef}
                type="file"
                accept=".xlsx,.xls"
                onChange={handleExcelImport}
                className="hidden"
              />
              <motion.button
                onClick={() => excelInputRef.current?.click()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileSpreadsheet className="w-4 h-4" />
                استيراد Excel
              </motion.button>

              <motion.button
                onClick={exportToWord}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="w-4 h-4" />
                تصدير Word
              </motion.button>

              <motion.button
                onClick={() => onBulkExport(filteredQuestions)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                تصدير JSON
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* قسم الإحصائيات */}
      <AnimatePresence>
        {showStats && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">إحصائيات متقدمة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">أصعب الأسئلة</h4>
                <div className="space-y-2">
                  {hardestQuestions.map((q, index) => (
                    <div key={q.id} className="flex justify-between items-center p-2 bg-red-50 rounded">
                      <span className="text-sm">{index + 1}. {q.question.substring(0, 50)}...</span>
                      <span className="text-red-600 font-semibold">{q.successRate}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">أكثر الأسئلة استخداماً</h4>
                <div className="space-y-2">
                  {mostUsedQuestions.map((q, index) => (
                    <div key={q.id} className="flex justify-between items-center p-2 bg-blue-50 rounded">
                      <span className="text-sm">{index + 1}. {q.question.substring(0, 50)}...</span>
                      <span className="text-blue-600 font-semibold">{q.usageCount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* عرض الأسئلة */}
      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredQuestions.map((question) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
              >
                {/* رأس البطاقة */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(question.difficulty)}`}>
                      {question.difficulty}
                    </span>
                    {question.aiGenerated && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium border border-purple-200">
                        <Brain className="w-3 h-3 inline ml-1" />
                        ذكاء اصطناعي
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={selectedQuestions.includes(question.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedQuestions([...selectedQuestions, question.id]);
                        } else {
                          setSelectedQuestions(selectedQuestions.filter(id => id !== question.id));
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* نص السؤال */}
                <h3 className="font-semibold text-gray-900 mb-3 line-clamp-3">
                  {question.question}
                </h3>

                {/* الخيارات */}
                <div className="space-y-2 mb-4">
                  {question.options.slice(0, 2).map((option, index) => (
                    <div key={index} className={`text-sm p-2 rounded border ${
                      index === question.correctAnswer
                        ? 'bg-green-50 border-green-200 text-green-800'
                        : 'bg-gray-50 border-gray-200 text-gray-600'
                    }`}>
                      {index === question.correctAnswer && <CheckCircle className="w-3 h-3 inline ml-1" />}
                      {option}
                    </div>
                  ))}
                  {question.options.length > 2 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{question.options.length - 2} خيارات أخرى
                    </div>
                  )}
                </div>

                {/* معلومات إضافية */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    {question.points} نقطة
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {question.usageCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {question.successRate}%
                  </span>
                </div>

                {/* العلامات */}
                {question.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {question.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                    {question.tags.length > 3 && (
                      <span className="text-xs text-gray-500">+{question.tags.length - 3}</span>
                    )}
                  </div>
                )}

                {/* أزرار التحكم */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => {
                        setEditingQuestion(question);
                        setIsEditing(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => duplicateQuestion(question)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Copy className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => deleteQuestion(question.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                  <div className="flex items-center gap-1">
                    {question.isActive ? (
                      <Eye className="w-4 h-4 text-green-600" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedQuestions(filteredQuestions.map(q => q.id));
                          } else {
                            setSelectedQuestions([]);
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">السؤال</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">الفئة</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">المستوى</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">النقاط</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">الاستخدام</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">النجاح</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredQuestions.map((question) => (
                    <tr key={question.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedQuestions.includes(question.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedQuestions([...selectedQuestions, question.id]);
                            } else {
                              setSelectedQuestions(selectedQuestions.filter(id => id !== question.id));
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <div className="font-semibold text-gray-900 truncate">{question.question}</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {question.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                {tag}
                              </span>
                            ))}
                            {question.aiGenerated && (
                              <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded text-xs">
                                <Brain className="w-3 h-3 inline ml-1" />
                                ذكاء اصطناعي
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{question.category}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                          {question.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{question.points}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{question.usageCount}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{question.successRate}%</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <motion.button
                            onClick={() => {
                              setEditingQuestion(question);
                              setIsEditing(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Edit className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            onClick={() => duplicateQuestion(question)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Copy className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            onClick={() => deleteQuestion(question.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* نافذة إنشاء الاختبار */}
      <AnimatePresence>
        {showTestCreator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">إنشاء اختبار تلقائي</h3>
                  <motion.button
                    onClick={() => setShowTestCreator(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      اسم الاختبار
                    </label>
                    <input
                      type="text"
                      value={testName}
                      onChange={(e) => setTestName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="أدخل اسم الاختبار"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      مدة الاختبار (دقائق)
                    </label>
                    <input
                      type="number"
                      value={testDuration}
                      onChange={(e) => setTestDuration(parseInt(e.target.value) || 60)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الأسئلة المحددة ({selectedQuestions.length})
                    </label>
                    <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-4">
                      {selectedQuestions.length === 0 ? (
                        <p className="text-gray-500 text-center">لم يتم تحديد أسئلة</p>
                      ) : (
                        <div className="space-y-2">
                          {questions.filter(q => selectedQuestions.includes(q.id)).map(q => (
                            <div key={q.id} className="text-sm text-gray-700">{q.question}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <motion.button
                      onClick={() => setShowTestPreview(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <PreviewIcon className="w-5 h-5" />
                      معاينة الاختبار
                    </motion.button>

                    <motion.button
                      onClick={createAutomaticTest}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Zap className="w-5 h-5" />
                      إنشاء الاختبار
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* نافذة معاينة الاختبار */}
      <AnimatePresence>
        {showTestPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">معاينة الاختبار: {testName}</h3>
                  <motion.button
                    onClick={() => setShowTestPreview(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                <div className="space-y-6">
                  {questions.filter(q => selectedQuestions.includes(q.id)).map((q, index) => (
                    <div key={q.id} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{index + 1}. {q.question}</h4>
                      <div className="space-y-1">
                        {q.options.map((opt, i) => (
                          <div key={i} className={`text-sm p-2 rounded ${i === q.correctAnswer ? 'bg-green-50 text-green-800' : 'text-gray-600'}`}>
                            {String.fromCharCode(65 + i)}. {opt}
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 text-sm text-gray-600">الإجابة الصحيحة: {String.fromCharCode(65 + q.correctAnswer)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* نافذة تحرير السؤال */}
      <AnimatePresence>
        {isEditing && editingQuestion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {editingQuestion.id.startsWith('q_') ? 'إضافة سؤال جديد' : 'تعديل السؤال'}
                  </h3>
                  <motion.button
                    onClick={() => {
                      setIsEditing(false);
                      setEditingQuestion(null);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                <div className="space-y-6">
                  {/* أدوات التحرير الغني */}
                  <div className="flex gap-2 p-2 bg-gray-50 rounded-lg">
                    <motion.button
                      onClick={() => {
                        const textarea = document.querySelector('textarea[name="question-text"]') as HTMLTextAreaElement;
                        if (textarea) {
                          const start = textarea.selectionStart;
                          const end = textarea.selectionEnd;
                          const text = textarea.value;
                          const selectedText = text.substring(start, end);
                          textarea.value = text.substring(0, start) + `**${selectedText}**` + text.substring(end);
                          setEditingQuestion({...editingQuestion, question: textarea.value});
                        }
                      }}
                      className="p-2 text-gray-600 hover:bg-white rounded"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Bold className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        const textarea = document.querySelector('textarea[name="question-text"]') as HTMLTextAreaElement;
                        if (textarea) {
                          const start = textarea.selectionStart;
                          const end = textarea.selectionEnd;
                          const text = textarea.value;
                          const selectedText = text.substring(start, end);
                          textarea.value = text.substring(0, start) + `*${selectedText}*` + text.substring(end);
                          setEditingQuestion({...editingQuestion, question: textarea.value});
                        }
                      }}
                      className="p-2 text-gray-600 hover:bg-white rounded"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Italic className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={addEquation}
                      className="p-2 text-gray-600 hover:bg-white rounded"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Calculator className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={addTable}
                      className="p-2 text-gray-600 hover:bg-white rounded"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Table className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* نص السؤال */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      نص السؤال *
                    </label>
                    <textarea
                      name="question-text"
                      value={editingQuestion.question}
                      onChange={(e) => setEditingQuestion({...editingQuestion, question: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      placeholder="أدخل نص السؤال هنا..."
                    />
                  </div>

                  {/* الخيارات */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      خيارات الإجابة *
                    </label>
                    <div className="space-y-3">
                      {editingQuestion.options.map((option, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="correct-answer"
                            checked={editingQuestion.correctAnswer === index}
                            onChange={() => setEditingQuestion({...editingQuestion, correctAnswer: index})}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...editingQuestion.options];
                              newOptions[index] = e.target.value;
                              setEditingQuestion({...editingQuestion, options: newOptions});
                            }}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder={`الخيار ${index + 1}`}
                          />
                          {editingQuestion.options.length > 2 && (
                            <motion.button
                              onClick={() => {
                                const newOptions = editingQuestion.options.filter((_, i) => i !== index);
                                setEditingQuestion({
                                  ...editingQuestion,
                                  options: newOptions,
                                  correctAnswer: editingQuestion.correctAnswer >= index && editingQuestion.correctAnswer > 0
                                    ? editingQuestion.correctAnswer - 1
                                    : editingQuestion.correctAnswer
                                });
                              }}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          )}
                        </div>
                      ))}
                      {editingQuestion.options.length < 6 && (
                        <motion.button
                          onClick={() => {
                            setEditingQuestion({
                              ...editingQuestion,
                              options: [...editingQuestion.options, '']
                            });
                          }}
                          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          + إضافة خيار جديد
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* التفسير */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      التفسير (اختياري)
                    </label>
                    <textarea
                      value={editingQuestion.explanation}
                      onChange={(e) => setEditingQuestion({...editingQuestion, explanation: e.target.value})}
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      placeholder="شرح الإجابة الصحيحة..."
                    />
                  </div>

                  {/* الإعدادات الأساسية */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        مستوى الصعوبة
                      </label>
                      <select
                        value={editingQuestion.difficulty}
                        onChange={(e) => setEditingQuestion({...editingQuestion, difficulty: e.target.value as any})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="سهل">سهل</option>
                        <option value="متوسط">متوسط</option>
                        <option value="صعب">صعب</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الفئة
                      </label>
                      <input
                        type="text"
                        value={editingQuestion.category}
                        onChange={(e) => setEditingQuestion({...editingQuestion, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="مثال: الأساسيات"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        النقاط
                      </label>
                      <input
                        type="number"
                        value={editingQuestion.points}
                        onChange={(e) => setEditingQuestion({...editingQuestion, points: parseInt(e.target.value) || 0})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="1"
                        max="100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الدورة
                      </label>
                      <select
                        value={editingQuestion.courseId || ''}
                        onChange={(e) => setEditingQuestion({...editingQuestion, courseId: e.target.value || undefined})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">اختر الدورة</option>
                        {courses.map(course => (
                          <option key={course.id} value={course.id}>{course.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* المحور (إذا تم اختيار دورة) */}
                  {editingQuestion.courseId && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        المحور
                      </label>
                      <select
                        value={editingQuestion.axisId || ''}
                        onChange={(e) => setEditingQuestion({...editingQuestion, axisId: e.target.value || undefined})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">اختر المحور</option>
                        {courses.find(c => c.id === editingQuestion.courseId)?.axes.map(axis => (
                          <option key={axis.id} value={axis.id}>{axis.name}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* العلامات */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      العلامات (اضغط Enter للإضافة)
                    </label>
                    <input
                      type="text"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                          e.preventDefault();
                          const newTag = e.currentTarget.value.trim();
                          if (!editingQuestion.tags.includes(newTag)) {
                            setEditingQuestion({
                              ...editingQuestion,
                              tags: [...editingQuestion.tags, newTag]
                            });
                          }
                          e.currentTarget.value = '';
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="أدخل علامة واضغط Enter..."
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {editingQuestion.tags.map((tag, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                          {tag}
                          <button
                            onClick={() => {
                              setEditingQuestion({
                                ...editingQuestion,
                                tags: editingQuestion.tags.filter((_, i) => i !== index)
                              });
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* الصور والرسوم البيانية */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الصور
                      </label>
                      <div className="space-y-2">
                        {editingQuestion.images?.map((image, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <ImageIcon className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700 truncate flex-1">{image}</span>
                            <button
                              onClick={() => {
                                setEditingQuestion({
                                  ...editingQuestion,
                                  images: editingQuestion.images?.filter((_, i) => i !== index)
                                });
                              }}
                              className="text-red-600 hover:text-red-800"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        <motion.button
                          onClick={addImage}
                          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <ImageIcon className="w-4 h-4" />
                          إضافة صورة
                        </motion.button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الرسوم البيانية
                      </label>
                      <div className="space-y-2">
                        {editingQuestion.charts?.map((chart, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <FileText className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700 truncate flex-1">{chart}</span>
                            <button
                              onClick={() => {
                                setEditingQuestion({
                                  ...editingQuestion,
                                  charts: editingQuestion.charts?.filter((_, i) => i !== index)
                                });
                              }}
                              className="text-red-600 hover:text-red-800"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        <motion.button
                          onClick={addChart}
                          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FileText className="w-4 h-4" />
                          إضافة رسم بياني
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* إعدادات إضافية */}
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={editingQuestion.isActive}
                        onChange={(e) => setEditingQuestion({...editingQuestion, isActive: e.target.checked})}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">نشط</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={editingQuestion.aiGenerated}
                        onChange={(e) => setEditingQuestion({...editingQuestion, aiGenerated: e.target.checked})}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">مولد بالذكاء الاصطناعي</span>
                    </label>
                  </div>
                </div>

                {/* أزرار التحكم */}
                <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                  <motion.button
                    onClick={() => {
                      setIsEditing(false);
                      setEditingQuestion(null);
                    }}
                    className="px-6 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    إلغاء
                  </motion.button>
                  <motion.button
                    onClick={saveQuestion}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Save className="w-5 h-5" />
                    حفظ السؤال
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuestionManager;
