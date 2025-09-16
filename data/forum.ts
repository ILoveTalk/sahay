import type { Post } from '../types';

export const forumPosts: Post[] = [
  {
    id: 'post-1',
    author: 'Anonymous Squirrel',
    title: 'Feeling overwhelmed with exams',
    content: "I have three major exams next week and I can't seem to focus on studying. Every time I try, my mind just goes blank and I start panicking. Has anyone else felt this way? How do you cope?",
    category: 'Academic Stress',
    timestamp: '2 hours ago',
    comments: [
      { id: 'c1-1', author: 'Anonymous Owl', text: "I totally get that. Taking short breaks every 45 minutes to just walk around or listen to a song really helps me.", timestamp: '1 hour ago' },
      { id: 'c1-2', author: 'Anonymous Fox', text: "Deep breathing exercises before you start studying can make a huge difference. You've got this!", timestamp: '30 minutes ago' },
    ],
  },
  {
    id: 'post-2',
    author: 'Anonymous Badger',
    title: 'Drifting apart from a friend',
    content: "My best friend and I have been growing distant lately. We're in different classes and have different schedules, and it feels like we barely talk anymore. It makes me really sad. Should I try to talk to them about it?",
    category: 'Relationships',
    timestamp: '8 hours ago',
    comments: [
      { id: 'c2-1', author: 'Anonymous Deer', text: "It's definitely worth talking about. Maybe you could suggest a specific time to hang out, like grabbing lunch once a week?", timestamp: '7 hours ago' },
    ],
  },
    {
    id: 'post-3',
    author: 'Anonymous Rabbit',
    title: 'Just feeling... down.',
    content: "I don't have a specific reason, but I've been feeling really low and unmotivated for the past few days. Nothing seems interesting and I just want to stay in bed. It's hard to explain.",
    category: 'Feeling Down',
    timestamp: '1 day ago',
    comments: [
      { id: 'c3-1', author: 'Anonymous Bear', text: "It's okay to feel that way. Be gentle with yourself. Sometimes just a small step, like opening the curtains or drinking a glass of water, is a win.", timestamp: '22 hours ago' },
      { id: 'c3-2', author: 'Anonymous Otter', text: "I feel this. I find that listening to a comforting podcast or watching a favorite old movie can help a little. Sending you support.", timestamp: '15 hours ago' },
      { id: 'c3-3', author: 'Anonymous Squirrel', text: "Thanks for sharing this. It makes me feel less alone. We're here for you.", timestamp: '10 hours ago' },
    ],
  },
   {
    id: 'post-4',
    author: 'Anonymous Chipmunk',
    title: 'How do you build a new habit?',
    content: "I want to start meditating in the mornings, even for just 5 minutes, but I can't seem to stick with it for more than a couple of days. Any tips on making a new habit stick?",
    category: 'General',
    timestamp: '3 days ago',
    comments: [],
  },
];
