import React, { JSX } from 'react'
import data from "./blogs.json";
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

const BlogPost = () => {
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: JSX.Element[] = [];
    let currentParagraph: string[] = [];

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith('# ')) {
        if (currentParagraph.length > 0) {
          elements.push(
            <p key={`p-${index}`} className="text-gray-700 leading-relaxed mb-6">
              {currentParagraph.join(' ')}
            </p>
          );
          currentParagraph = [];
        }
        elements.push(
          <h1 key={index} className="font-mono text-3xl font-bold text-black mb-6 mt-8">
            {trimmedLine.substring(2)}
          </h1>
        );
      } else if (trimmedLine.startsWith('## ')) {
        if (currentParagraph.length > 0) {
          elements.push(
            <p key={`p-${index}`} className="text-gray-700 leading-relaxed mb-6">
              {currentParagraph.join(' ')}
            </p>
          );
          currentParagraph = [];
        }
        elements.push(
          <h2 key={index} className="font-mono text-2xl font-bold text-black mb-4 mt-6">
            {trimmedLine.substring(3)}
          </h2>
        );
      } else if (trimmedLine.startsWith('### ')) {
        if (currentParagraph.length > 0) {
          elements.push(
            <p key={`p-${index}`} className="text-gray-700 leading-relaxed mb-6">
              {currentParagraph.join(' ')}
            </p>
          );
          currentParagraph = [];
        }
        elements.push(
          <h3 key={index} className="font-mono text-xl font-bold text-black mb-3 mt-5">
            {trimmedLine.substring(4)}
          </h3>
        );
      } else if (trimmedLine.match(/^\d+\./)) {
        if (currentParagraph.length > 0) {
          elements.push(
            <p key={`p-${index}`} className="text-gray-700 leading-relaxed mb-6">
              {currentParagraph.join(' ')}
            </p>
          );
          currentParagraph = [];
        }
        elements.push(
          <li key={index} className="text-gray-700 mb-2 ml-4">
            {trimmedLine}
          </li>
        );
      } else if (trimmedLine.startsWith('- ')) {
        if (currentParagraph.length > 0) {
          elements.push(
            <p key={`p-${index}`} className="text-gray-700 leading-relaxed mb-6">
              {currentParagraph.join(' ')}
            </p>
          );
          currentParagraph = [];
        }
        elements.push(
          <li key={index} className="text-gray-700 mb-2 ml-4 list-disc">
            {trimmedLine.substring(2)}
          </li>
        );
      } else if (trimmedLine === '') {
        if (currentParagraph.length > 0) {
          elements.push(
            <p key={`p-${index}`} className="text-gray-700 leading-relaxed mb-6">
              {currentParagraph.join(' ')}
            </p>
          );
          currentParagraph = [];
        }
      } else if (trimmedLine) {
        currentParagraph.push(trimmedLine);
      }
    });

    if (currentParagraph.length > 0) {
      elements.push(
        <p key="final-p" className="text-gray-700 leading-relaxed mb-6">
          {currentParagraph.join(' ')}
        </p>
      );
    }

    return elements;
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const mockBlogPost = data
  return (
     
     <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
     {/* Featured Image */}
     {mockBlogPost.featuredImage && (
       <div className="mb-12">
         <img
           src={mockBlogPost.featuredImage}
           alt={mockBlogPost.title}
           className="w-full h-64 md:h-96 object-cover border-4 border-black"
         />
       </div>
     )}

     {/* Article Header */}
     <header className="mb-12">
       <div className="flex flex-wrap items-center gap-4 mb-6">
         <span className="bg-red-500 text-white px-3 py-1 pixelated-border font-mono text-sm font-bold">
           {mockBlogPost.category}
         </span>
         <div className="flex items-center space-x-4 text-sm font-mono text-gray-600">
           <div className="flex items-center space-x-1">
             <Calendar size={14} />
             <span>{formatDate(mockBlogPost.date)}</span>
           </div>
           <div className="flex items-center space-x-1">
             <Clock size={14} />
             <span>{mockBlogPost.readTime} min read</span>
           </div>
         </div>
       </div>

       <h1 className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6 leading-tight">
         {mockBlogPost.title}
       </h1>

       <p className="text-xl text-gray-600 leading-relaxed mb-8">
         {mockBlogPost.excerpt}
       </p>

       {/* Tags */}
       <div className="flex flex-wrap gap-2 mb-8">
         {mockBlogPost.tags.map((tag) => (
           <span
             key={tag}
             className="bg-gray-100 text-gray-700 px-3 py-1 pixelated-border font-mono text-sm flex items-center space-x-1"
           >
             <Tag size={12} />
             <span>#{tag}</span>
           </span>
         ))}
       </div>

       {/* Author Info */}
       <div className="flex items-center space-x-4 p-6 bg-gray-50 border-4 border-black">
         {mockBlogPost.authorAvatar && (
           <img
             src={mockBlogPost.authorAvatar}
             alt={mockBlogPost.author}
             className="w-16 h-16 border-4 border-black object-cover"
           />
         )}
         <div>
           <div className="flex items-center space-x-2 mb-2">
             <User size={16} className="text-gray-500" />
             <span className="font-mono font-bold text-black">{mockBlogPost.author}</span>
           </div>
           <p className="text-gray-600 text-sm leading-relaxed">{mockBlogPost.authorBio}</p>
         </div>
       </div>
     </header>

     {/* Article Content */}
     <div className="prose prose-lg max-w-none">
       <div className="text-lg leading-relaxed">
         {renderContent(mockBlogPost.content)}
       </div>
     </div>

  
   </article>
  )
}

export default BlogPost