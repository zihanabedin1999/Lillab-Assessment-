import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { postService } from '../services/postService';
import type { Post as PostType } from '../types';
import Header from '../components/Header';
import Post from '../components/Post';
import CreatePostForm from '../components/CreatePostForm';
import { Spinner } from '../components/ui/Spinner';
import Stories from '../components/Stories';
import { MOCK_USERS } from '../constants';

const FeedScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatePostOpen, setCreatePostOpen] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      // Don't set loading to true on refetch
      const fetchedPosts = await postService.getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchPosts();
  }, [fetchPosts]);

  const handleCreatePost = async (content: string) => {
    if (!user) return;
    await postService.createPost(content, user);
    setCreatePostOpen(false);
    await fetchPosts();
  };

  const handleToggleLike = async (postId: string) => {
    if (!user) return;
    const updatedPost = await postService.toggleLike(postId, user.id);
    setPosts(prevPosts =>
      prevPosts.map(p => (p.id === postId ? updatedPost : p))
    );
  };
  
  const handleAddComment = async (postId: string, text: string) => {
    if (!user) return;
    await postService.addComment(postId, text, user);
    await fetchPosts(); // Refetch to get updated comments, simple but effective for mock
  };

  if (!user) return null;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header user={user} onLogout={logout} />
      <main className="container mx-auto max-w-xl">
        <Stories users={MOCK_USERS} />
        
        {/* Create Post Prompt */}
        <div className="px-4 py-3">
            <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
                <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                <button 
                  onClick={() => setCreatePostOpen(true)}
                  className="w-full text-left bg-gray-100 rounded-full py-2 px-4 text-gray-500 hover:bg-gray-200 transition"
                >
                    What's happening?
                </button>
            </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center mt-12">
            <Spinner />
          </div>
        ) : (
          <div className="space-y-4 p-4">
            {posts.map(post => (
              <Post 
                key={post.id} 
                post={post} 
                currentUser={user}
                onToggleLike={handleToggleLike}
                onAddComment={handleAddComment}
              />
            ))}
          </div>
        )}
      </main>

      {isCreatePostOpen && (
          <CreatePostForm 
            user={user}
            onClose={() => setCreatePostOpen(false)}
            onSubmit={handleCreatePost}
          />
      )}
    </div>
  );
};

export default FeedScreen;