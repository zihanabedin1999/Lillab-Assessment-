
import React from 'react';
import type { Comment as CommentType } from '../types';

interface CommentProps {
  comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="flex items-start space-x-3">
      <img src={comment.author.avatarUrl} alt={comment.author.name} className="w-9 h-9 rounded-full object-cover" />
      <div className="flex-1">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
          <p className="font-semibold text-sm text-gray-900 dark:text-white">{comment.author.name}</p>
          <p className="text-sm text-gray-800 dark:text-gray-300">{comment.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
