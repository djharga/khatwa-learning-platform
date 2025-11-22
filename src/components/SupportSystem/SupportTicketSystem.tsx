'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Send,
  Paperclip,
  User,
  Calendar,
  Tag,
  Star,
  FileText,
  Video,
  Phone,
  Mail,
  Bell,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketCategory = 'technical' | 'billing' | 'course' | 'consultation' | 'general';

export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  messages: TicketMessage[];
  attachments?: string[];
  tags?: string[];
  rating?: number;
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  sender: 'user' | 'support';
  senderName: string;
  content: string;
  timestamp: string;
  attachments?: string[];
  read: boolean;
}

interface SupportTicketSystemProps {
  userId?: string;
  userEmail?: string;
  userName?: string;
}

/**
 * نظام دعم شامل مع تذاكر الدعم والمحادثات المباشرة
 */
export default function SupportTicketSystem({
  userId,
  userEmail,
  userName = 'المستخدم',
}: SupportTicketSystemProps) {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority | 'all'>('all');
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // بيانات نموذج التذكرة الجديدة
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    category: 'general' as TicketCategory,
    priority: 'medium' as TicketPriority,
  });

  // تحميل التذاكر (في التطبيق الحقيقي، سيتم جلبها من API)
  useEffect(() => {
    // بيانات تجريبية
    const mockTickets: SupportTicket[] = [
      {
        id: '1',
        title: 'مشكلة في الوصول إلى الدورة',
        description: 'لا أستطيع الوصول إلى محتوى الدورة رغم الاشتراك',
        status: 'in_progress',
        priority: 'high',
        category: 'course',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        assignedTo: 'فريق الدعم',
        messages: [
          {
            id: 'm1',
            ticketId: '1',
            sender: 'user',
            senderName: userName,
            content: 'مرحباً، لدي مشكلة في الوصول إلى الدورة',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            read: true,
          },
          {
            id: 'm2',
            ticketId: '1',
            sender: 'support',
            senderName: 'فريق الدعم',
            content: 'شكراً لتواصلك معنا. سنقوم بفحص المشكلة وإصلاحها في أقرب وقت.',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            read: true,
          },
        ],
        tags: ['دورة', 'وصول'],
      },
      {
        id: '2',
        title: 'استفسار عن الفاتورة',
        description: 'أريد توضيح بخصوص الفاتورة الأخيرة',
        status: 'resolved',
        priority: 'medium',
        category: 'billing',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        assignedTo: 'فريق الفواتير',
        messages: [
          {
            id: 'm3',
            ticketId: '2',
            sender: 'user',
            senderName: userName,
            content: 'أريد توضيح بخصوص الفاتورة',
            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            read: true,
          },
          {
            id: 'm4',
            ticketId: '2',
            sender: 'support',
            senderName: 'فريق الفواتير',
            content: 'تم توضيح الفاتورة وإرسال التفاصيل إلى بريدك الإلكتروني.',
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            read: true,
          },
        ],
        tags: ['فاتورة', 'دفع'],
        rating: 5,
      },
    ];
    setTickets(mockTickets);
  }, [userName]);

  // فلترة التذاكر
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // إنشاء تذكرة جديدة
  const handleCreateTicket = () => {
    if (!newTicket.title || !newTicket.description) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const ticket: SupportTicket = {
      id: `ticket-${Date.now()}`,
      title: newTicket.title,
      description: newTicket.description,
      status: 'open',
      priority: newTicket.priority,
      category: newTicket.category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: `msg-${Date.now()}`,
          ticketId: `ticket-${Date.now()}`,
          sender: 'user',
          senderName: userName,
          content: newTicket.description,
          timestamp: new Date().toISOString(),
          read: false,
        },
      ],
    };

    setTickets([ticket, ...tickets]);
    setSelectedTicket(ticket);
    setShowNewTicketModal(false);
    setNewTicket({
      title: '',
      description: '',
      category: 'general',
      priority: 'medium',
    });
  };

  // إرسال رسالة جديدة
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedTicket) return;

    const message: TicketMessage = {
      id: `msg-${Date.now()}`,
      ticketId: selectedTicket.id,
      sender: 'user',
      senderName: userName,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false,
    };

    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === selectedTicket.id
          ? {
              ...ticket,
              messages: [...ticket.messages, message],
              updatedAt: new Date().toISOString(),
              status: ticket.status === 'closed' ? 'open' : ticket.status,
            }
          : ticket
      )
    );

    setSelectedTicket((prev) =>
      prev
        ? {
            ...prev,
            messages: [...prev.messages, message],
            updatedAt: new Date().toISOString(),
            status: prev.status === 'closed' ? 'open' : prev.status,
          }
        : null
    );

    setNewMessage('');
    setIsTyping(true);

    // محاكاة رد الدعم (في التطبيق الحقيقي، سيتم إرسالها إلى API)
    setTimeout(() => {
      const supportMessage: TicketMessage = {
        id: `msg-support-${Date.now()}`,
        ticketId: selectedTicket.id,
        sender: 'support',
        senderName: 'فريق الدعم',
        content: 'شكراً لرسالتك. سنقوم بالرد عليك في أقرب وقت ممكن.',
        timestamp: new Date().toISOString(),
        read: false,
      };

      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === selectedTicket.id
            ? {
                ...ticket,
                messages: [...ticket.messages, supportMessage],
                updatedAt: new Date().toISOString(),
              }
            : ticket
        )
      );

      setSelectedTicket((prev) =>
        prev
          ? {
              ...prev,
              messages: [...prev.messages, supportMessage],
              updatedAt: new Date().toISOString(),
            }
          : null
      );

      setIsTyping(false);
    }, 2000);
  };

  // الحصول على لون الحالة
  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  // الحصول على لون الأولوية
  const getPriorityColor = (priority: TicketPriority) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
    }
  };

  // الحصول على أيقونة الحالة
  const getStatusIcon = (status: TicketStatus) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="w-4 h-4" />;
      case 'in_progress':
        return <Clock className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      case 'closed':
        return <XCircle className="w-4 h-4" />;
    }
  };

  // تنسيق التاريخ
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // إحصائيات سريعة
  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === 'open').length,
    inProgress: tickets.filter((t) => t.status === 'in_progress').length,
    resolved: tickets.filter((t) => t.status === 'resolved').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            مركز الدعم
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            إدارة تذاكر الدعم والاستفسارات
          </p>
        </div>
        <Button
          variant="default"
          onClick={() => setShowNewTicketModal(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          تذكرة جديدة
        </Button>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي التذاكر</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">مفتوحة</p>
                <p className="text-2xl font-bold text-blue-600">{stats.open}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">قيد المعالجة</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">محلولة</p>
                <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* قائمة التذاكر */}
        <div className="lg:col-span-1 space-y-4">
          {/* البحث والفلترة */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="بحث في التذاكر..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  الحالة
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as TicketStatus | 'all')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                >
                  <option value="all">الكل</option>
                  <option value="open">مفتوحة</option>
                  <option value="in_progress">قيد المعالجة</option>
                  <option value="resolved">محلولة</option>
                  <option value="closed">مغلقة</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  الأولوية
                </label>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value as TicketPriority | 'all')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                >
                  <option value="all">الكل</option>
                  <option value="low">منخفضة</option>
                  <option value="medium">متوسطة</option>
                  <option value="high">عالية</option>
                  <option value="urgent">عاجلة</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* قائمة التذاكر */}
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            <AnimatePresence>
              {filteredTickets.map((ticket) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onClick={() => setSelectedTicket(ticket)}
                  className={`
                    p-4 rounded-lg border-2 cursor-pointer transition-all
                    ${
                      selectedTicket?.id === ticket.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 hover:border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700'
                    }
                  `}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {ticket.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${getStatusColor(ticket.status)}`}>
                      {getStatusIcon(ticket.status)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                    {ticket.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{formatDate(ticket.updatedAt)}</span>
                    <span className={`px-2 py-0.5 rounded ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority === 'urgent' ? 'عاجل' :
                       ticket.priority === 'high' ? 'عالية' :
                       ticket.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                    </span>
                  </div>
                  {ticket.messages.length > 0 && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                      <MessageSquare className="w-3 h-3" />
                      <span>{ticket.messages.length} رسالة</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* تفاصيل التذكرة */}
        <div className="lg:col-span-2">
          {selectedTicket ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="mb-2">{selectedTicket.title}</CardTitle>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${getStatusColor(selectedTicket.status)}`}>
                        {getStatusIcon(selectedTicket.status)}
                        {selectedTicket.status === 'open' ? 'مفتوحة' :
                         selectedTicket.status === 'in_progress' ? 'قيد المعالجة' :
                         selectedTicket.status === 'resolved' ? 'محلولة' : 'مغلقة'}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(selectedTicket.priority)}`}>
                        {selectedTicket.priority === 'urgent' ? 'عاجل' :
                         selectedTicket.priority === 'high' ? 'عالية' :
                         selectedTicket.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                      </span>
                      {selectedTicket.category && (
                        <span className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                          {selectedTicket.category === 'technical' ? 'تقني' :
                           selectedTicket.category === 'billing' ? 'دفع' :
                           selectedTicket.category === 'course' ? 'دورة' :
                           selectedTicket.category === 'consultation' ? 'استشارة' : 'عام'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-gray-700 dark:text-gray-300">{selectedTicket.description}</p>
                  <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(selectedTicket.createdAt)}
                    </span>
                    {selectedTicket.assignedTo && (
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {selectedTicket.assignedTo}
                      </span>
                    )}
                  </div>
                </div>

                {/* المحادثة */}
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    المحادثة
                  </h4>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto mb-4">
                    {selectedTicket.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${
                          message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                        }`}
                      >
                        <div
                          className={`flex-1 rounded-lg p-3 ${
                            message.sender === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-sm">{message.senderName}</span>
                            <span className="text-xs opacity-75">
                              {formatDate(message.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex gap-3">
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* إرسال رسالة */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="اكتب رسالتك..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                    />
                    <Button
                      variant="default"
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  اختر تذكرة لعرض التفاصيل
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  اختر تذكرة من القائمة أو أنشئ تذكرة جديدة
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* نافذة إنشاء تذكرة جديدة */}
      <AnimatePresence>
        {showNewTicketModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowNewTicketModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-2xl font-bold mb-6">إنشاء تذكرة دعم جديدة</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">العنوان</label>
                  <input
                    type="text"
                    value={newTicket.title}
                    onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                    placeholder="عنوان التذكرة"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">الوصف</label>
                  <textarea
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                    placeholder="وصف المشكلة أو الاستفسار..."
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">الفئة</label>
                    <select
                      value={newTicket.category}
                      onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value as TicketCategory })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="general">عام</option>
                      <option value="technical">تقني</option>
                      <option value="billing">دفع</option>
                      <option value="course">دورة</option>
                      <option value="consultation">استشارة</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">الأولوية</label>
                    <select
                      value={newTicket.priority}
                      onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value as TicketPriority })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="low">منخفضة</option>
                      <option value="medium">متوسطة</option>
                      <option value="high">عالية</option>
                      <option value="urgent">عاجلة</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="default"
                    onClick={handleCreateTicket}
                    className="flex-1"
                  >
                    إنشاء التذكرة
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setShowNewTicketModal(false)}
                  >
                    إلغاء
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

