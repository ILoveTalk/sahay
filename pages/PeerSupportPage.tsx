
import React, { useState, useCallback } from 'react';
import type { Post, Comment, PostCategory } from '../types';
import { forumPosts } from '../data/forum';
import { rephraseText } from '../services/geminiService';

import Button from '../components/Button';
import UsersIcon from '../components/icons/UsersIcon';
import ChatBubbleIcon from '../components/icons/ChatBubbleIcon';
import SparklesIcon from '../components/icons/SparklesIcon';
import Modal from '../components/Modal';


const categories: PostCategory[] = ['Academic Stress', 'Relationships', 'Feeling Down', 'General'];

const PostCard: React.FC<{ post: Post; onSelect: () => void }> = ({ post, onSelect }) => (
    <div 
      className="bg-white/50 rounded-lg shadow-sm p-6 flex flex-col cursor-pointer group hover:shadow-lg transition-shadow duration-300"
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
      aria-label={`View post titled ${post.title}`}
    >
        <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-semibold bg-[#A3B18A]/50 text-[#343A40] px-2 py-1 rounded-full">{post.category}</span>
            <span className="text-sm text-gray-500">{post.timestamp}</span>
        </div>
        <h3 className="text-xl font-['Poppins'] font-semibold text-[#343A40] mb-2 group-hover:text-[#A3B18A] transition-colors">{post.title}</h3>
        <p className="text-[#343A40] leading-relaxed line-clamp-3 flex-grow">{post.content}</p>
        <div className="flex items-center text-gray-600 mt-4 pt-4 border-t border-gray-200">
            <ChatBubbleIcon className="w-5 h-5 mr-2" />
            <span>{post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}</span>
        </div>
    </div>
);

const PeerSupportPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>(forumPosts);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<PostCategory | 'All'>('All');
    
    // New Post State
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostCategory, setNewPostCategory] = useState<PostCategory>('General');
    const [isRephrasing, setIsRephrasing] = useState(false);

    // New Comment State
    const [newComment, setNewComment] = useState('');

    const handleAddPost = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPostTitle.trim() || !newPostContent.trim()) return;

        const newPost: Post = {
            id: `post-${Date.now()}`,
            author: 'Anonymous User',
            title: newPostTitle,
            content: newPostContent,
            category: newPostCategory,
            timestamp: 'Just now',
            comments: [],
        };

        setPosts(prevPosts => [newPost, ...prevPosts]);
        setIsNewPostModalOpen(false);
        setNewPostTitle('');
        setNewPostContent('');
        setNewPostCategory('General');
    };

    const handleAddComment = (postId: string) => {
        if (!newComment.trim()) return;

        const newCommentObj: Comment = {
            id: `c-${Date.now()}`,
            author: 'Anonymous User',
            text: newComment,
            timestamp: 'Just now',
        };

        setPosts(posts.map(p => 
            p.id === postId ? { ...p, comments: [...p.comments, newCommentObj] } : p
        ));
        setSelectedPost(prev => prev ? { ...prev, comments: [...prev.comments, newCommentObj] } : null);
        setNewComment('');
    };

    const handleRephrase = useCallback(async () => {
      if (!newPostContent.trim()) return;
      setIsRephrasing(true);
      const rephrased = await rephraseText(newPostContent);
      setNewPostContent(rephrased);
      setIsRephrasing(false);
    }, [newPostContent]);

    const filteredPosts = posts.filter(p => activeCategory === 'All' || p.category === activeCategory);

    return (
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
            <section className="text-center mb-12">
                 <div className="flex justify-center mb-4">
                    <UsersIcon className="w-16 h-16 text-[#A3B18A]" />
                 </div>
                <h1 className="text-4xl md:text-5xl font-['Poppins'] font-semibold text-[#343A40]">Student Support Forum</h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-[#343A40]">
                    A private, anonymous place to connect with other students. You are not alone.
                </p>
                <div className='mt-8'>
                    <Button onClick={() => setIsNewPostModalOpen(true)}>Create a New Post</Button>
                </div>
            </section>
            
            <div className="flex justify-center flex-wrap gap-2 sm:gap-3 mb-12">
                <button 
                    onClick={() => setActiveCategory('All')}
                    className={`px-4 py-2 rounded-full font-semibold transition-colors text-sm sm:text-base ${activeCategory === 'All' ? 'bg-[#A3B18A] text-[#343A40]' : 'bg-white/50 hover:bg-gray-200/50'}`}
                >
                    All Topics
                </button>
                {categories.map(category => (
                    <button 
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 rounded-full font-semibold transition-colors text-sm sm:text-base ${activeCategory === category ? 'bg-[#A3B18A] text-[#343A40]' : 'bg-white/50 hover:bg-gray-200/50'}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map(post => (
                    <PostCard key={post.id} post={post} onSelect={() => setSelectedPost(post)} />
                ))}
            </div>

            {/* View Post Modal */}
            {selectedPost && (
                <Modal isOpen={!!selectedPost} onClose={() => setSelectedPost(null)}>
                    <div className="flex flex-col h-full">
                        <div className="p-6 border-b border-gray-300/50">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-sm font-semibold bg-[#A3B18A]/50 text-[#343A40] px-2 py-1 rounded-full">{selectedPost.category}</span>
                                <span className="text-sm text-gray-500">{selectedPost.timestamp}</span>
                            </div>
                            <h2 className="text-2xl font-['Poppins'] font-semibold text-[#343A40]">{selectedPost.title}</h2>
                            <p className="text-sm text-gray-600 mt-1">by {selectedPost.author}</p>
                        </div>
                        <div className="flex-grow p-6 overflow-y-auto">
                            <p className="text-base text-[#343A40] leading-relaxed whitespace-pre-wrap">{selectedPost.content}</p>
                            <h3 className="text-xl font-['Poppins'] mt-8 mb-4 border-t pt-4">Comments ({selectedPost.comments.length})</h3>
                            <div className="space-y-4">
                                {selectedPost.comments.map(comment => (
                                    <div key={comment.id} className="bg-white/50 p-4 rounded-lg">
                                        <p className="text-[#343A40]">{comment.text}</p>
                                        <p className="text-xs text-gray-500 mt-2 text-right">by {comment.author} - {comment.timestamp}</p>
                                    </div>
                                ))}
                                {selectedPost.comments.length === 0 && <p className="text-gray-500">No comments yet. Be the first to reply!</p>}
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-300/50 bg-gray-50/50 rounded-b-xl">
                            <form onSubmit={(e) => { e.preventDefault(); handleAddComment(selectedPost.id); }} className="flex gap-4">
                                <input 
                                    type="text" 
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Write a supportive comment..." 
                                    className="flex-grow p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent"
                                />
                                <Button type="submit">Reply</Button>
                            </form>
                        </div>
                    </div>
                </Modal>
            )}

            {/* New Post Modal */}
            <Modal isOpen={isNewPostModalOpen} onClose={() => setIsNewPostModalOpen(false)}>
                <div className="flex flex-col h-full">
                    <h2 className="p-6 text-2xl font-['Poppins'] font-semibold text-[#343A40] border-b border-gray-300/50">Create a New Post</h2>
                    <form onSubmit={handleAddPost} className="flex-grow p-6 flex flex-col gap-4 overflow-y-auto">
                        <div>
                            <label htmlFor="post-title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input type="text" id="post-title" value={newPostTitle} onChange={e => setNewPostTitle(e.target.value)} className="w-full p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent" required />
                        </div>
                        <div>
                            <label htmlFor="post-category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select id="post-category" value={newPostCategory} onChange={e => setNewPostCategory(e.target.value as PostCategory)} className="w-full p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent">
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <div className="flex flex-col flex-grow">
                            <label htmlFor="post-content" className="block text-sm font-medium text-gray-700 mb-1">Your Thoughts</label>
                            <textarea id="post-content" value={newPostContent} onChange={e => setNewPostContent(e.target.value)} className="w-full flex-grow p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent resize-none" rows={10} required></textarea>
                            <div className="text-right mt-2">
                                <button type="button" onClick={handleRephrase} disabled={isRephrasing} className="inline-flex items-center gap-2 text-sm font-semibold text-[#343A40] hover:text-[#A3B18A] disabled:opacity-50 disabled:cursor-wait">
                                    <SparklesIcon className="w-5 h-5" />
                                    {isRephrasing ? 'Rephrasing...' : 'Rephrase with Sahay AI'}
                                </button>
                            </div>
                        </div>
                    </form>
                     <div className="p-6 flex justify-end gap-4 border-t border-gray-300/50 bg-gray-50/50 rounded-b-xl">
                        <Button variant="secondary" onClick={() => setIsNewPostModalOpen(false)}>Cancel</Button>
                        <Button onClick={handleAddPost}>Post Anonymously</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default PeerSupportPage;
