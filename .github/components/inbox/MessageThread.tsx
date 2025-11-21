'use client';

import React, { useState } from 'react';
import StyledButton from '@/components/ui/StyledButton';
import { Send, Paperclip, Smile } from 'lucide-react';
import { initialMessages } from '../inbox-data';

/**
 * Message bubble component with sender-based styling. User messages appear on right with blue background, others on left with gray background.
 */
interface MessageBubbleProps {
  message: {
    id: number;
    sender: string;
    content: string;
    time: string;
    isMe: boolean;
  };
}

function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs sm:max-w-md rounded-2xl px-4 py-2 ${message.isMe ? 'bg-blue-100 rounded-tr-none' : 'bg-gray-100 rounded-tl-none'}`}>
        <p className="text-gray-800">{message.content}</p>
        <p className="text-xs text-gray-500 mt-1 text-right">{message.time}</p>
      </div>
    </div>
  );
}

/**
 * Message thread component displaying conversation messages with send functionality. Features scrollable message list, message bubbles with timestamps, and message input with send button.
 */
export default function MessageThread() {
  // Conversation messages with sender, content, and timestamp
  const [messages, setMessages] = useState(initialMessages);

  // Input field value for new message
  const [newMessage, setNewMessage] = useState('');

  /**
   * Handles sending new message. Adds message to thread and clears input field.
   */
  const handleSend = () => {
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: messages.length + 1,
      sender: 'أنا',
      content: newMessage,
      time: 'الآن',
      isMe: true,
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
          <div>
            <h3 className="font-bold text-gray-900">فريق الدعم الفني</h3>
            <p className="text-sm text-gray-500">متصل الآن</p>
          </div>
        </div>
      </div>

      {/* Scrollable message thread with message bubbles */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      {/* Message input area with attachment, emoji, and send controls */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <StyledButton variant="secondary" size="sm">
            <Paperclip className="w-5 h-5 inline-block mr-2" />
          </StyledButton>
          <StyledButton variant="secondary" size="sm">
            <Smile className="w-5 h-5 inline-block mr-2" />
          </StyledButton>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="اكتب رسالتك هنا..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <StyledButton onClick={handleSend} variant="primary" size="default">
            <Send className="w-5 h-5 inline-block mr-2" />
            إرسال
          </StyledButton>
        </div>
      </div>
    </div>
  );
}
