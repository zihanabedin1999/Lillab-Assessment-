import React, { useState } from 'react';
import type { User } from '../types';
import { Button } from './ui/Button';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface CreatePostFormProps {
  user: User;
  onSubmit: (content: string) => Promise<void>;
  onClose: () => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ user, onSubmit, onClose }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    await onSubmit(content);
    // Component will be unmounted on success, no need to reset state
  };

  return (
    <div className="fixed inset-0 bg-white z-30 flex flex-col" aria-modal="true">
       <header className="flex items-center justify-between p-4 border-b">
         <button onClick={onClose} className="text-gray-600">&larr; Create a post</button>
         <div className="flex items-center space-x-2">
            <span className="text-sm">Visible for</span>
            <button className="flex items-center text-sm font-semibold text-brand-blue bg-blue-100 rounded-full px-3 py-1">
                Friends <ChevronDownIcon className="w-4 h-4 ml-1" />
            </button>
         </div>
       </header>

       <div className="flex-grow p-4 overflow-y-auto">
         <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <div className="flex items-start space-x-4">
              <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`After 7 1/2 years at Samsung Australia, I am fortunate to have been a part of this amazing company and have done some amazing things.`}
                className="w-full text-lg placeholder-gray-400 text-gray-800 focus:outline-none resize-none"
                rows={8}
                disabled={isSubmitting}
                autoFocus
              />
            </div>
            <div className="mt-auto pt-4">
              <Button type="submit" disabled={isSubmitting || !content.trim()} className="w-full">
                {isSubmitting ? 'Posting...' : 'Post'}
              </Button>
            </div>
          </form>
       </div>
    </div>
  );
};

export default CreatePostForm;