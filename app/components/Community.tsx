import React from 'react';
import { MessageCircle, GitBranch, Heart, BookOpen } from 'lucide-react';

const Community = () => {
  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-mono text-4xl sm:text-6xl font-bold text-black mb-8">
            MEET THE
            <br />
            <span className="bg-green-500 text-white px-4 py-2 pixelated-border inline-block">
              COMMUNITY
            </span>
          </h2>
          <p className="text-xl font-mono text-gray-600 max-w-3xl mx-auto">
            650+ passionate developers collaborating on amazing open source projects
          </p>
        </div>

        {/* Character Pyramid Layout - Alphabetical Order */}
        <div className="mb-16 space-y-6">
          
          {/* Row 1 - Mobile: 3, Medium: 4, Large: 5 */}
          <div className="flex justify-center gap-6 lg:gap-8">
            <Character name="ANISH"    color="emerald" message="git commit -m 'YOLO 🌱'" />
            <Character name="ANSHUL"   color="sky"     message="i have a team of testers, they're called users" />
            <Character name="ANURAG"   color="emerald" message="I only test in production 🤖" />
            <div className="hidden md:block">
              <Character name="ARYAN"    color="indigo"  message="I use Arch BTW… in Docker 😁" />
            </div>
            <div className="hidden lg:block">
              <Character name="ASWATHI"  color="rose"    message="Ping me only for merge conflicts 🛠️" />
            </div>
          </div>

          {/* Row 2 - Mobile: 3, Medium: 3, Large: 4 */}
          <div className="flex justify-center gap-6 lg:gap-8">
            <div className="block md:hidden">
              <Character name="ARYAN"    color="indigo"  message="I use Arch BTW… in Docker 😁" />
            </div>
            <div className="block md:hidden">
              <Character name="ASWATHI"  color="rose"    message="Ping me only for merge conflicts 🛠️" />
            </div>
            <div className="block md:hidden">
              <Character name="CHIRAG"   color="violet"  message="0 bugs, 0 enemies, life sorted." />
            </div>
            <div className="hidden md:block lg:hidden">
              <Character name="ASWATHI"  color="rose"    message="Ping me only for merge conflicts 🛠️" />
            </div>
            <div className="hidden md:block">
              <Character name="CHIRAG"   color="violet"  message="0 bugs, 0 enemies, life sorted." />
            </div>
            <div className="hidden md:block">
              <Character name="KSHITIJ"  color="amber"   message="99 bugs in the code, take one down…" />
            </div>
            <div className="hidden lg:block">
              <Character name="SAKSHAM"  color="pink"    message="Currently cd-ing into /dev/null" />
            </div>
            <div className="hidden lg:block">
              <Character name="SAMIR"    color="orange"  message="Livestreaming Stack Overflow searches 🎥" />
            </div>
          </div>

          {/* Row 3 - Mobile: 3, Medium: 3, Large: 4 */}
          <div className="flex justify-center gap-6 lg:gap-8">
            <div className="block md:hidden">
              <Character name="KSHITIJ"  color="amber"   message="99 bugs in the code, take one down…" />
            </div>
            <div className="block md:hidden">
              <Character name="SAKSHAM"  color="pink"    message="Currently cd-ing into /dev/null" />
            </div>
            <div className="block md:hidden">
              <Character name="SAMIR"    color="orange"  message="Livestreaming Stack Overflow searches 🎥" />
            </div>
            <div className="hidden md:block lg:hidden">
              <Character name="SAKSHAM"  color="pink"    message="Currently cd-ing into /dev/null" />
            </div>
            <div className="hidden md:block lg:hidden">
              <Character name="SAMIR"    color="orange"  message="Livestreaming Stack Overflow searches 🎥" />
            </div>
            <div className="hidden md:block lg:hidden">
              <Character name="SHANTANU" color="teal"    message="Deploying on Friday, wish me luck 🚀" />
            </div>
            <div className="hidden lg:block">
              <Character name="SHANTANU" color="teal"    message="Deploying on Friday, wish me luck 🚀" />
            </div>
            <div className="hidden lg:block">
              <Character name="SUJAL"    color="lime"    message="⌛ compiling witty status…" />
            </div>
            <div className="hidden lg:block">
              <Character name="TRUPTI"   color="cyan"    message="sudo make me a sandwich 🥪" />
            </div>
            <div className="hidden lg:block">
              <Character name="VEDANT"   color="purple"  message="sudo apt-get coffee && learn" />
            </div>
          </div>

          {/* Row 4 - Mobile: 3, Medium: 3, Large: hidden */}
          <div className="flex justify-center gap-6 lg:gap-8 lg:hidden">
            <div className="block md:hidden">
              <Character name="SHANTANU" color="teal"    message="Deploying on Friday, wish me luck 🚀" />
            </div>
            <div className="block md:hidden">
              <Character name="SUJAL"    color="lime"    message="⌛ compiling witty status…" />
            </div>
            <div className="block md:hidden">
              <Character name="TRUPTI"   color="cyan"    message="sudo make me a sandwich 🥪" />
            </div>
            <div className="hidden md:block">
              <Character name="SUJAL"    color="lime"    message="⌛ compiling witty status…" />
            </div>
            <div className="hidden md:block">
              <Character name="TRUPTI"   color="cyan"    message="sudo make me a sandwich 🥪" />
            </div>
            <div className="hidden md:block">
              <Character name="VEDANT"   color="purple"  message="sudo apt-get coffee && learn" />
            </div>
          </div>

          {/* Row 5 - Mobile: 1, Medium: hidden, Large: hidden */}
          <div className="flex justify-center gap-6 md:hidden">
            <Character name="VEDANT"   color="purple"  message="sudo apt-get coffee && learn" />
          </div>

        </div>

        {/* Connection Lines */}
        <div className="relative mb-16">
          <svg className="w-full h-32 opacity-20" viewBox="0 0 800 200">
            <path
              d="M100,50 Q200,20 300,50 T500,50 T700,50"
              stroke="#FF0000"
              strokeWidth="4"
              fill="none"
              strokeDasharray="8,8"
            />
            <path
              d="M150,100 Q300,130 450,100 T750,100"
              stroke="#0000FF"
              strokeWidth="4"
              fill="none"
              strokeDasharray="8,8"
            />
            <path
              d="M50,150 Q250,120 450,150 T750,150"
              stroke="#00FF00"
              strokeWidth="4"
              fill="none"
              strokeDasharray="8,8"
            />
          </svg>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <StatCard
            icon={<BookOpen size={40} />}
            number="FOSSible"
            label="MEDIUM PUBLICATION"
            color="violet"
          />
          <StatCard
            icon={<GitBranch size={40} />}
            number="Sessions"
            label="WORKSHOPS & TALKS"
            color="orange"
          />
          <StatCard
            icon={<MessageCircle size={40} />}
            number="Projects"
            label="COLLABORATIVE BUILDS"
            color="teal"
          />
          <StatCard
            icon={<Heart size={40} />}
            number="650+"
            label="COMMUNITY MEMBERS"
            color="rose"
          />
        </div>
      </div>
    </section>
  );
};

const Character = ({ 
  name, 
  color, 
  message 
}: {
  name: string;
  color: 'emerald' | 'rose' | 'violet' | 'orange' | 'cyan' | 'indigo' | 'amber' | 'pink' | 'teal' | 'lime' | 'purple' | 'sky';
  message: string;
}) => {
  const colorClasses = {
    emerald: 'bg-emerald-500',
    rose: 'bg-rose-500',
    violet: 'bg-violet-500',
    orange: 'bg-orange-500',
    cyan: 'bg-cyan-500',
    indigo: 'bg-indigo-500',
    amber: 'bg-amber-500',
    pink: 'bg-pink-500',
    teal: 'bg-teal-500',
    lime: 'bg-lime-500',
    purple: 'bg-purple-500',
    sky: 'bg-sky-500'
  };

  return (
    <div className="text-center group relative">
      {/* Speech Bubble */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        <div className="bg-white border-4 border-black px-3 py-2 font-mono text-sm whitespace-nowrap text-black">
          {message}
        </div>
        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black mx-auto"></div>
      </div>

      {/* Avatar */}
      <div className={`
        ${colorClasses[color]} 
        w-16 h-16 mx-auto mb-2 pixelated-border
        group-hover:scale-110 transition-all duration-200 cursor-pointer
        relative overflow-hidden
      `}>
        {/* Simple pixel face */}
        <div className="absolute inset-2">
          <div className="bg-white w-2 h-2 absolute top-1 left-1"></div>
          <div className="bg-white w-2 h-2 absolute top-1 right-1"></div>
          <div className="bg-white w-4 h-1 absolute bottom-2 left-1/2 transform -translate-x-1/2"></div>
        </div>
      </div>
      
      <p className="font-mono text-sm font-bold text-black">{name}</p>
    </div>
  );
};

const StatCard = ({ 
  icon, 
  number, 
  label, 
  color 
}: {
  icon: React.ReactNode;
  number: string;
  label: string;
  color: 'emerald' | 'rose' | 'violet' | 'orange' | 'cyan' | 'indigo' | 'amber' | 'pink' | 'teal' | 'lime' | 'purple' | 'sky';
}) => {
  const colorClasses = {
    emerald: 'bg-emerald-500',
    rose: 'bg-rose-500',
    violet: 'bg-violet-500',
    orange: 'bg-orange-500',
    cyan: 'bg-cyan-500',
    indigo: 'bg-indigo-500',
    amber: 'bg-amber-500',
    pink: 'bg-pink-500',
    teal: 'bg-teal-500',
    lime: 'bg-lime-500',
    purple: 'bg-purple-500',
    sky: 'bg-sky-500'
  };

  return (
    <div className="group">
      <div className={`
        ${colorClasses[color]} 
        text-white w-20 h-20 mx-auto mb-4 
        pixelated-border flex items-center justify-center
        group-hover:scale-110 transition-transform duration-200
      `}>
        {icon}
      </div>
      <h3 className="font-mono text-2xl font-bold text-black mb-2">{number}</h3>
      <p className="font-mono text-gray-600 text-sm">{label}</p>
    </div>
  );
};

export default Community;