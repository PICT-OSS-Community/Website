"use client"
import React, { JSX, useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  Share2, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Link2,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Heart,
  Bookmark
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import BlogPost from './BlogPost';

interface BlogPostData {
  id: number;
  title: string;
  content: string;
  author: string;
  authorBio: string;
  authorAvatar?: string;
  date: string;
  readTime: number;
  category: string;
  tags: string[];
  featuredImage?: string;
  excerpt: string;
}

const BlogPage = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const shareTitle = "Getting Started with Open Source: A Beginner's Complete Guide to Contributing";
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, []);

  const handleShare = (platform: string) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    };

    if (platform === 'copy') {
      if (typeof window !== 'undefined') {
        navigator.clipboard.writeText(shareUrl);
      }
      setShowShareMenu(false);
      return;
    }

    window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <div className="bg-white border-b-4 border-black sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 pixelated-border hover:bg-blue-600 transition-colors font-mono font-bold"
            >
              <ArrowLeft size={16} />
              <span>BACK TO BLOG</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 pixelated-border transition-all duration-200 ${
                  isLiked ? 'bg-red-500 text-white' : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
              </button>

              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 pixelated-border transition-all duration-200 ${
                  isBookmarked ? 'bg-yellow-500 text-white' : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="p-2 bg-green-500 text-white pixelated-border hover:bg-green-600 transition-colors"
                >
                  <Share2 size={16} />
                </button>

                {showShareMenu && (
                  <div className="absolute right-0 top-full mt-2 bg-white border-4 border-black p-4 min-w-48 z-50">
                    <div className="space-y-2">
                      <button
                        onClick={() => handleShare('twitter')}
                        className="w-full flex items-center space-x-2 p-2 bg-blue-400 text-white pixelated-border hover:bg-blue-500 transition-colors"
                      >
                        <Twitter size={16} />
                        <span className="font-mono text-sm">Twitter</span>
                      </button>
                      <button
                        onClick={() => handleShare('facebook')}
                        className="w-full flex items-center space-x-2 p-2 bg-blue-600 text-white pixelated-border hover:bg-blue-700 transition-colors"
                      >
                        <Facebook size={16} />
                        <span className="font-mono text-sm">Facebook</span>
                      </button>
                      <button
                        onClick={() => handleShare('linkedin')}
                        className="w-full flex items-center space-x-2 p-2 bg-blue-700 text-white pixelated-border hover:bg-blue-800 transition-colors"
                      >
                        <Linkedin size={16} />
                        <span className="font-mono text-sm">LinkedIn</span>
                      </button>
                      <button
                        onClick={() => handleShare('copy')}
                        className="w-full flex items-center space-x-2 p-2 bg-gray-600 text-white pixelated-border hover:bg-gray-700 transition-colors"
                      >
                        <Link2 size={16} />
                        <span className="font-mono text-sm">Copy Link</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <BlogPost />
    </div>
  );
};

export default BlogPage;