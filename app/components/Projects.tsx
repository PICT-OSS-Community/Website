import React from 'react';
import { ExternalLink, Star, GitFork } from 'lucide-react';

const Projects = () => {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-mono text-4xl sm:text-6xl font-bold text-black mb-8">
            FEATURED
            <br />
            <span className="bg-blue-500 text-white px-4 py-2 pixelated-border inline-block">
              PROJECTS
            </span>
          </h2>
          <p className="text-xl font-mono text-gray-600 max-w-3xl mx-auto">
            Amazing open source projects built by our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCard
            title="PIXEL EDITOR"
            description="A web-based pixel art editor with collaborative features"
            language="JavaScript"
            stars={245}
            forks={67}
            color="red"
          />
          <ProjectCard
            title="CODE RUNNER"
            description="Execute code snippets in multiple programming languages"
            language="Python"
            stars={432}
            forks={89}
            color="green"
          />
          <ProjectCard
            title="TASK TRACKER"
            description="Minimalist task management with team collaboration"
            language="TypeScript"
            stars={178}
            forks={34}
            color="blue"
          />
          <ProjectCard
            title="API DOCS GEN"
            description="Automatic API documentation generator for REST APIs"
            language="Go"
            stars={356}
            forks={91}
            color="yellow"
          />
          <ProjectCard
            title="CHAT BOT AI"
            description="Open source chatbot with natural language processing"
            language="Python"
            stars={523}
            forks={145}
            color="red"
          />
          <ProjectCard
            title="WEB SCRAPER"
            description="Ethical web scraping toolkit with rate limiting"
            language="JavaScript"
            stars={289}
            forks={76}
            color="green"
          />
        </div>

        <div className="text-center mt-16">
          <button className="bg-black text-white font-mono font-bold px-8 py-4 text-xl pixelated-border hover:scale-105 transition-all duration-200 flex items-center justify-center mx-auto">
            <ExternalLink className="mr-2" size={20} />
            VIEW ALL PROJECTS
          </button>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ 
  title, 
  description, 
  language, 
  stars, 
  forks, 
  color 
}: {
  title: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  color: 'red' | 'blue' | 'green' | 'yellow';
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

  return (
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
          <span className="text-gray-700">{language}</span>
        </div>
        
        <div className="flex items-center space-x-4 text-gray-600">
          <div className="flex items-center space-x-1">
            <Star size={14} />
            <span>{stars}</span>
          </div>
          <div className="flex items-center space-x-1">
            <GitFork size={14} />
            <span>{forks}</span>
          </div>
        </div>
      </div>
      
      {/* Hover Effect */}
      <div className="absolute inset-0 hover:bg-gray-200 bg-opacity-5 opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
    </div>
  );
};

export default Projects;