"use client";
import React, {useState, useRef} from 'react';
import { Paperclip, Send } from 'lucide-react';
import { AttachmentModel } from '@/app/models/common';
import AttachmentPreview from './attachment_preview';

// Message Input Component Props
interface MessageInputProps {
    onSendMessage: (message: string, attachments?: AttachmentModel[]) => void;
  }
  
  const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');
    const [attachments, setAttachments] = useState<AttachmentModel[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
  
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);
      const newAttachments: AttachmentModel[] = files.map(file => ({
        id: Date.now() + Math.random(),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
      }));
      
      setAttachments(prev => [...prev, ...newAttachments]);
      event.target.value = '';
    };
  
    const handleRemoveAttachment = (attachmentId: number) => {
      setAttachments(prev => {
        const attachment = prev.find(a => a.id === attachmentId);
        if (attachment?.preview) {
          URL.revokeObjectURL(attachment.preview);
        }
        return prev.filter(a => a.id !== attachmentId);
      });
    };
  
    const handleSend = () => {
      if (message.trim() || attachments.length > 0) {
        const messageAttachments: AttachmentModel[] = attachments.map(att => ({
          name: att.name,
          size: att.size,
          type: att.type,
          url: att.preview || `data:${att.type};base64,${btoa('mock-file-data')}`
        }));
        
        onSendMessage(message || 'Sent an attachment', messageAttachments);
        setMessage('');
        
        // Clean up object URLs
        attachments.forEach(att => {
          if (att.preview) URL.revokeObjectURL(att.preview);
        });
        setAttachments([]);
      }
    };
  
    const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSend();
      }
    };
  
    return (
        <div className="bg-white border-t">
          {/* Attachment Preview */}
          {attachments.length > 0 && (
            <div className="px-6 py-3 border-b bg-gray-50">
              <div className="flex flex-wrap">
                {attachments.map(attachment => (
                  <AttachmentPreview
                    key={attachment.id}
                    attachment={attachment}
                    onRemove={() => handleRemoveAttachment(attachment.id || 0)}
                  />
                ))}
              </div>
            </div>
          )}
      
          {/* Message Input */}
          <div className="px-6 py-4">
            <div className="flex items-center space-x-3">
              {/* Textarea with buttons inside same flex row */}
              <div className="relative flex-1">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  className="w-full pr-20 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={1}
                  style={{ minHeight: '40px', maxHeight: '120px' }}
                />
                {/* Attachment Button inside textarea container, right-aligned */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                  title="Attach files"
                >
                  <Paperclip size={18} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx,.txt"
                />
              </div>
      
              {/* Send Button */}
              <button
                onClick={handleSend}
                disabled={!message.trim() && attachments.length === 0}
                className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      );
      
  };
  
  export default MessageInput;