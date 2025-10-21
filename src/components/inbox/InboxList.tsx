'use client';

import React, { useState } from 'react';
import { initialConversations } from '../inbox-data';

/**
 * Individual conversation item with avatar, name, last message preview, and unread indicator.
 * Features hover and selection states.
 */
interface ConversationItemProps {
  conversation: {
    id: number;
    name: string;
    lastMessage: string;
    time: string;
    unread: boolean;
    avatar: string;
  };
  isSelected: boolean;
  onSelect: () => void;
}

function ConversationItem({ conversation, isSelected, onSelect }: ConversationItemProps) {
  return (
    <div
      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${isSelected ? 'bg-blue-50' : ''}`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between">
            <h3 className="font-bold text-gray-900 truncate">{conversation.name}</h3>
            <span className="text-xs text-gray-500">{conversation.time}</span>
          </div>
          <p className={`text-sm truncate ${conversation.unread ? 'font-bold text-gray-900' : 'text-gray-500'}`}>
            {conversation.lastMessage}
          </p>
        </div>
        {conversation.unread && (
          <span className="flex-shrink-0 w-3 h-3 bg-blue-500 rounded-full"></span>
        )}
      </div>
    </div>
  );
}

/**
 * Inbox conversation list component displaying all conversations with unread indicators and selection.
 * Features scrollable list with active conversation highlighting.
 */
export default function InboxList() {
  // List of conversations with unread status and metadata
  const [conversations, setConversations] = useState(initialConversations);

  // Currently selected conversation ID for highlighting
  const [selectedId, setSelectedId] = useState(1);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800">المحادثات</h2>
      </div>
      {/* Scrollable conversation list with max height */}
      <div className="divide-y divide-gray-100 max-h-[calc(100vh-200px)] overflow-y-auto">
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            isSelected={selectedId === conversation.id}
            onSelect={() => setSelectedId(conversation.id)}
          />
        ))}
      </div>
    </div>
  );
}
