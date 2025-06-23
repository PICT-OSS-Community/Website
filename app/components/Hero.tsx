import React from 'react';
import { Code, Users, Zap, BookOpen } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-white py-16 lg:py-24 relative overflow-hidden">
      {/* Decorative Clouds */}
      <div className="absolute top-10 left-10 opacity-20">
        <PixelCloud />
      </div>
      <div className="absolute top-20 right-10 opacity-20">
        <PixelCloud />
      </div>
      <div className="absolute bottom-20 left-1/4 opacity-20">
        <PixelCloud />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1
  className="font-mono font-bold text-black mb-8 tracking-wider leading-tight
             flex flex-col items-start   /* left-align the three lines */
             w-fit mx-auto               /* shrink to content & centre the block */
">
  <span className="text-xl  sm:text-2xl lg:text-3xl">PICT</span>

  <span className="text-6xl sm:text-8xl lg:text-[10rem]">OSS</span>

  <span className="text-xl  sm:text-2xl lg:text-3xl
                   bg-black text-white px-3 py-1 pixelated-border">
    COMMUNITY
  </span>
</h1>
          
          <p className="text-xl sm:text-2xl font-mono text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
            A Beginner friendly community of<br />
            passionate developers building the<br />
            future with Open-Source
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <CTAButton color="red" size="large">
              <Users className="mr-2" size={20} />
              JOIN COMMUNITY
            </CTAButton>
            <CTAButton color="green" size="large" variant="outline">
              <Code className="mr-2" size={20} />
              EXPLORE PROJECTS
            </CTAButton>
          </div>
        </div>

        {/* Feature Icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          <FeatureCard
            icon={<BookOpen size={40} />}
            title="FOSSIBLE"
            description="Our Medium publication sharing insights and stories from the open-source world"
            color="red"
          />
          <FeatureCard
            icon={<Zap size={40} />}
            title="SESSIONS"
            description="Regular workshops, talks, and learning sessions for the community"
            color="yellow"
          />
          <FeatureCard
            icon={<Code size={40} />}
            title="PROJECTS"
            description="Collaborative open-source projects built by our community members"
            color="blue"
          />
          <FeatureCard
            icon={<Users size={40} />}
            title="650+ MEMBERS"
            description="A thriving community of passionate developers and innovators"
            color="green"
          />
        </div>
      </div>
    </section>
  );
};

const CTAButton = ({ 
  children, 
  color, 
  size = 'medium', 
  variant = 'solid' 
}: {
  children: React.ReactNode;
  color: 'red' | 'blue' | 'green' | 'yellow';
  size?: 'medium' | 'large';
  variant?: 'solid' | 'outline';
}) => {
  const colorClasses = {
    red: variant === 'solid' 
      ? 'bg-red-500 hover:bg-red-600 text-white border-red-700' 
      : 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white',
    blue: variant === 'solid' 
      ? 'bg-blue-500 hover:bg-blue-600 text-white border-blue-700' 
      : 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
    green: variant === 'solid' 
      ? 'bg-green-500 hover:bg-green-600 text-white border-green-700' 
      : 'border-green-500 text-green-500 hover:bg-green-500 hover:text-white',
    yellow: variant === 'solid' 
      ? 'bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-700' 
      : 'border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white'
  };

  const sizeClasses = {
    medium: 'px-6 py-3 text-lg',
    large: 'px-8 py-4 text-xl'
  };

  return (
    <button className={`
      ${colorClasses[color]} 
      ${sizeClasses[size]}
      font-mono font-bold pixelated-border 
      hover:scale-105 transition-all duration-200 
      flex items-center justify-center
    `}>
      {children}
    </button>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  color 
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'red' | 'blue' | 'green' | 'yellow';
}) => {
  const colorClasses = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500'
  };

  return (
    <div className="text-center group">
      <div className={`
        ${colorClasses[color]} 
        text-white w-20 h-20 mx-auto mb-4 
        pixelated-border flex items-center justify-center
        group-hover:scale-110 transition-transform duration-200
      `}>
        {icon}
      </div>
      <h3 className="font-mono text-xl font-bold text-black mb-2">{title}</h3>
      <p className="text-gray-600 font-mono text-sm leading-relaxed">{description}</p>
    </div>
  );
};

const PixelCloud = () => (
  <div className="relative">
    <div className="bg-gray-300 w-16 h-8 pixelated-border"></div>
    <div className="bg-gray-300 w-12 h-6 pixelated-border absolute -top-2 left-2"></div>
    <div className="bg-gray-300 w-8 h-4 pixelated-border absolute -top-1 right-1"></div>
  </div>
);

export default Hero;