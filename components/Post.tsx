import React, { useState } from 'react';
import type { Post as PostType, User } from '../types';
import { HeartIcon } from './icons/HeartIcon';
import { MessageCircle } from './icons/MessageCircleIcon';
import Comment from './Comment';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface PostProps {
  post: PostType;
  currentUser: User;
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
}

const Post: React.FC<PostProps> = ({ post, currentUser, onToggleLike, onAddComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  
  const isLiked = post.likes.includes(currentUser.id);
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(post.id, newComment.trim());
      setNewComment('');
    }
  };

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return Math.floor(seconds) + "s ago";
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 sm:p-5">
        <div className="flex items-center mb-4">
          <img src={post.author.avatarUrl} alt={post.author.name} className="w-11 h-11 rounded-full mr-4 object-cover" />
          <div>
            <p className="font-semibold text-gray-800">{post.author.name}</p>
            <p className="text-xs text-gray-500">@{post.author.username} · {timeAgo(post.timestamp)}</p>
          </div>
        </div>
        <p className="text-gray-700 whitespace-pre-wrap text-sm">{post.content}</p>
      </div>

      {post.imageUrl && (
        <img src={post.imageUrl} alt="Post content" className="w-full h-auto max-h-[500px] object-cover" />
      )}

      <div className="p-4 sm:p-5 border-t border-gray-100">
        <div className="flex items-center space-x-6 text-gray-500">
          <button onClick={() => onToggleLike(post.id)} className="flex items-center space-x-2 hover:text-red-500 transition-colors text-sm">
            <HeartIcon className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : ''}`} />
            <span>{post.likes.length} Likes</span>
          </button>
          <button onClick={() => setShowComments(!showComments)} className="flex items-center space-x-2 hover:text-brand-blue transition-colors text-sm">
            <MessageCircle className="w-5 h-5" />
            <span>{post.comments.length} Comments</span>
          </button>
        </div>
      </div>

      {showComments && (
        <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50">
          <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2 mb-4">
            <img src={currentUser.avatarUrl} alt="Your avatar" className="w-8 h-8 rounded-full object-cover"/>
            <Input 
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-grow !bg-white !rounded-full"
            />
            <Button type="submit" size="sm" className="!text-xs">Post</Button>
          </form>
          <div className="space-y-4">
            {post.comments.slice().sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map(comment => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;