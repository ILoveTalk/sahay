export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export interface Counselor {
  id: string;
  name: string;
  title: string;
  imageUrl: string;
  bio: string;
}

export type ResourceCategory = 'Stress' | 'Anxiety' | 'Habits' | 'Relationships';
export type ResourceType = 'article' | 'video' | 'audio';

export interface Resource {
  id:string;
  title: string;
  category: ResourceCategory;
  type: ResourceType;
  imageUrl: string;
  description: string;
  link: string; // The URL to the actual resource
}

// New types for Peer Support Forum
export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export type PostCategory = 'Academic Stress' | 'Relationships' | 'Feeling Down' | 'General';

export interface Post {
  id: string;
  author: string;
  title: string;
  content: string;
  category: PostCategory;
  timestamp: string;
  comments: Comment[];
}
