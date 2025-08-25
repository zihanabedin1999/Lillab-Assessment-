
import { MOCK_POSTS } from '../constants';
import type { Post, User, Comment } from '../types';

let posts: Post[] = [...MOCK_POSTS];

export const postService = {
  getPosts: (): Promise<Post[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        // Sort posts by timestamp, newest first
        const sortedPosts = [...posts].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        resolve(sortedPosts);
      }, 500);
    });
  },

  createPost: (content: string, author: User): Promise<Post> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newPost: Post = {
          id: `post-${Date.now()}`,
          author,
          content,
          likes: [],
          comments: [],
          timestamp: new Date().toISOString(),
        };
        posts = [newPost, ...posts];
        resolve(newPost);
      }, 300);
    });
  },

  toggleLike: (postId: string, userId: string): Promise<Post> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const postIndex = posts.findIndex(p => p.id === postId);
        if (postIndex === -1) {
          reject(new Error('Post not found'));
          return;
        }
        const post = { ...posts[postIndex] };
        const likeIndex = post.likes.indexOf(userId);

        if (likeIndex > -1) {
          post.likes.splice(likeIndex, 1);
        } else {
          post.likes.push(userId);
        }
        
        posts[postIndex] = post;
        resolve(post);
      }, 200);
    });
  },

  addComment: (postId: string, text: string, author: User): Promise<Comment> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const postIndex = posts.findIndex(p => p.id === postId);
        if (postIndex === -1) {
          reject(new Error('Post not found'));
          return;
        }
        const newComment: Comment = {
          id: `comment-${Date.now()}`,
          text,
          author,
          timestamp: new Date().toISOString(),
        };
        posts[postIndex].comments.push(newComment);
        resolve(newComment);
      }, 300);
    });
  },
};
