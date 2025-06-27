import React from 'react';
import Link from 'next/link';
import { ExternalLink, Calendar, Clock } from 'lucide-react';

const Blogs = () => {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-mono text-4xl sm:text-6xl font-bold text-black mb-8">
            FEATURED
            <br />
            <span className="bg-blue-500 text-white px-4 py-2 pixelated-border inline-block">
              BLOGS
            </span>
          </h2>
          <p className="text-xl font-mono text-gray-600 max-w-3xl mx-auto">
            Insightful articles and tutorials from our community writers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BlogCard
            title="NEHA NARKHEDE'S JOURNEY"
            description="Open Source Innovation to Global Enterprise"
            author="Anish Dabhane"
            date="Jun 20"
            readTime="5 min read"
            color="red"
            href="https://medium.com/fossible/neha-narkhedes-journey-open-source-innovation-to-global-enterprise-f7f07a85c9cb"
          />
          <BlogCard
            title="HOW OPEN SOURCE TEACHES YOU"
            description="To Write Code for People, Not Just Machines"
            author="Sujal Bhor" 
            date="May 12"
            readTime="5 min read"
            color="green"
            href="https://medium.com/fossible/how-open-source-teaches-you-to-write-code-for-people-not-just-machines-f43000c4bf34"
          />
          <BlogCard
            title="A2A+MCP: PART 2"
            description="A Practical guide to the future of AI agent workflows"
            author="banshul K"
            date="Jun 18"
            readTime="12 min read"
            color="blue"
            href="https://medium.com/fossible/part-2-a2a-mcp-a-practical-guide-to-the-future-of-ai-agent-workflows-7ab38a013f02"
          />
          <BlogCard
            title="AUTOMATING HTTPS"
            description="With Docker, Nginx & Certbot for web projects"
            author="Samir Wankhede"
            date="Jun 14"
            readTime="7 min read"
            color="yellow"
            href="https://medium.com/fossible/automating-https-with-docker-nginx-certbot-c4c406409f32"
          />
          <BlogCard
            title="WHY VULKAN IS BETTER"
            description="But You Might Want OpenGL Anyway for game engines"
            author="Kshitijaucharmal"
            date="Jun 8"
            readTime="5 min read"
            color="red"
            href="https://medium.com/fossible/why-vulkan-is-better-but-you-might-want-opengl-anyway-f797cf9cfaea"
          />
          <BlogCard
            title="A2A + MCP: PART 1"
            description="A practical guide to the future of AI agent workflows"
            author="Anurag Mandke"
            date="May 13"
            readTime="10 min read"
            color="green"
            href="https://medium.com/fossible/part-1-a2a-mcp-a-practical-guide-to-the-future-of-ai-agent-workflows-f8052aa6e126"
          />
        </div>

        <div className="text-center mt-16">
          <Link 
            href="https://medium.com/fossible" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-black text-white font-mono font-bold px-8 py-4 text-xl pixelated-border hover:scale-105 transition-all duration-200 flex items-center justify-center mx-auto w-fit"
          >
            <ExternalLink className="mr-2" size={20} />
            VIEW ALL BLOGS
          </Link>
        </div>
      </div>
    </section>
  );
};

const BlogCard = ({ 
  title, 
  description, 
  author, 
  date, 
  readTime, 
  color,
  href 
}: {
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  color: 'red' | 'blue' | 'green' | 'yellow';
  href?: string;
}) => {
  const colorClasses = {
    red: 'border-red-500',
    blue: 'border-blue-500',
    green: 'border-green-500',
    yellow: 'border-yellow-500'
  };

  const dotColorClasses = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500'
  };

  const CardContent = () => (
    <div className={`
      bg-white border-4 ${colorClasses[color]} p-6 
      hover:scale-105 transition-all duration-200 cursor-pointer
      group relative overflow-hidden
    `}>
      {/* Decorative Corner */}
      <div className={`absolute top-0 right-0 w-8 h-8 ${dotColorClasses[color]} opacity-20`}></div>
      
      <h3 className="font-mono text-xl font-bold text-black mb-3">{title}</h3>
      <p className="text-gray-600 font-mono text-sm mb-4 leading-relaxed">{description}</p>
      
      <div className="flex items-center justify-between text-sm font-mono">
        <div className="flex items-center space-x-1">
          <div className={`w-3 h-3 ${dotColorClasses[color]} rounded-full`}></div>
          <span className="text-gray-700">{author}</span>
        </div>
        
        <div className="flex items-center space-x-4 text-gray-600">
          <div className="flex items-center space-x-1">
            <Calendar size={14} />
            <span>{date}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{readTime}</span>
          </div>
        </div>
      </div>
      
      {/* Hover Effect */}
      <div className="absolute inset-0 hover:bg-gray-200 bg-opacity-5 opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer">
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
};

export default Blogs;