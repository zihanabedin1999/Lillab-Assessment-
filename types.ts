export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  avatarUrl: string;
}

export interface Comment {
  id: string;
  text: string;
  author: User;
  timestamp: string;
}

export interface Post {
  id:string;
  author: User;
  content: string;
  imageUrl?: string;
  likes: string[]; // Array of user IDs
  comments: Comment[];
  timestamp: string;
}