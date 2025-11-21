'use client';

import { useState } from 'react';
import StyledButton from '@/components/ui/StyledButton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import Input from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { User, Search } from 'lucide-react';

/**
 * Compose new message dialog component with recipient search, subject, and message fields. Features modal dialog with form validation and send/cancel actions.
 */
export default function ComposeMessage() {
  // Controls dialog open/closed state
  const [isOpen, setIsOpen] = useState(false);
  // Form fields for recipient, subject, and message content
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  /**
   * Handles message send action. Resets form and closes dialog. Currently placeholder - needs API integration.
   */
  const handleSend = () => {
    // TODO: Implement actual message sending - POST to /api/messages
    // Logic to send message
    setIsOpen(false);
    setRecipient('');
    setSubject('');
    setMessage('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <StyledButton variant="primary" size="default">رسالة جديدة</StyledButton>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>رسالة جديدة</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="ابحث عن مستلم..."
              className="pl-10"
            />
          </div>
          <Input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="الموضوع"
          />
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="اكتب رسالتك هنا..."
            rows={5}
          />
          <div className="flex justify-end gap-2">
            <StyledButton variant="secondary" onClick={() => setIsOpen(false)} size="default">
              إلغاء
            </StyledButton>
            <StyledButton onClick={handleSend} variant="primary" size="default">إرسال</StyledButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
