/**
 * Inbox data including initial conversations and messages for demonstration.
 * Replace with API integration in production.
 */

export interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  avatar: string;
}

export const initialConversations: Conversation[] = [
  {
    id: 1,
    name: 'فريق الدعم الفني',
    lastMessage: 'تم حل مشكلتك في الدورة التعليمية',
    time: '10:30 ص',
    unread: false,
    avatar: '',
  },
  {
    id: 2,
    name: 'أحمد محمد',
    lastMessage: 'شكرًا على المساعدة في حل المشكلة',
    time: 'أمس',
    unread: true,
    avatar: '',
  },
  {
    id: 3,
    name: 'المدرب سامي',
    lastMessage: 'تم إضافة مواد جديدة في دورة المراجعة الداخلية',
    time: '12/10',
    unread: false,
    avatar: '',
  },
];

export interface Message {
  id: number;
  sender: string;
  content: string;
  time: string;
  isMe: boolean;
}

export const initialMessages: Message[] = [
  {
    id: 1,
    sender: 'فريق الدعم الفني',
    content: 'مرحبًا! لقد استلمنا مشكلتك في الدورة التعليمية وسنقوم بحلها في أقرب وقت ممكن.',
    time: '10:15 ص',
    isMe: false,
  },
  {
    id: 2,
    sender: 'أنا',
    content: 'شكرًا لردكم السريع. المشكلة تتعلق بتحميل ملفات الدورة.',
    time: '10:20 ص',
    isMe: true,
  },
  {
    id: 3,
    sender: 'فريق الدعم الفني',
    content: 'تم حل المشكلة الآن. يمكنك تحميل الملفات بدون أي مشاكل.',
    time: '10:30 ص',
    isMe: false,
  },
];