import type { User, Post } from './types';

export const MOCK_USERS: User[] = [
  { id: 'user-1', name: 'Alice Johnson', email: 'alice@example.com', username: 'alice', avatarUrl: 'https://i.pravatar.cc/150?u=user-1' },
  { id: 'user-2', name: 'Bob Williams', email: 'bob@example.com', username: 'bob', avatarUrl: 'https://i.pravatar.cc/150?u=user-2' },
  { id: 'user-3', name: 'Charlie Brown', email: 'charlie@example.com', username: 'charlie', avatarUrl: 'https://i.pravatar.cc/150?u=user-3' },
  { id: 'user-4', name: 'Diana Prince', email: 'diana@example.com', username: 'diana', avatarUrl: 'https://i.pravatar.cc/150?u=user-4' },
  { id: 'user-5', name: 'Eduardo Franco', email: 'eduardo@example.com', username: 'eduardo', avatarUrl: 'https://i.pravatar.cc/150?u=user-5' },
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'post-1',
    author: MOCK_USERS[0],
    content: "After 7 1/2 years at Samsung Australia, I am fortunate to have been a part of this amazing company and have done some amazing things.",
    imageUrl: 'https://picsum.photos/seed/post1/600/400',
    likes: ['user-2', 'user-3'],
    comments: [
      { id: 'comment-1', author: MOCK_USERS[1], text: 'Wow, that looks amazing!', timestamp: new Date(Date.now() - 3600000).toISOString() },
      { id: 'comment-2', author: MOCK_USERS[2], text: 'I wish I was there!', timestamp: new Date(Date.now() - 1800000).toISOString() },
    ],
    timestamp: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'post-2',
    author: MOCK_USERS[1],
    content: "My new coding setup is finally complete! Ready to build some amazing projects. What do you think? I'm particularly happy with the ergonomic chair and the ultra-wide monitor.",
    imageUrl: 'https://picsum.photos/seed/post2/600/400',
    likes: ['user-1'],
    comments: [],
    timestamp: new Date(Date.now() - 172800000).toISOString(),
  },
    {
    id: 'post-3',
    author: MOCK_USERS[2],
    content: "Exploring the city and found this hidden gem of a coffee shop. ☕ The latte art is on another level! Highly recommend this place if you're ever in the area.",
    likes: [],
    comments: [],
    timestamp: new Date(Date.now() - 259200000).toISOString(),
  },
];