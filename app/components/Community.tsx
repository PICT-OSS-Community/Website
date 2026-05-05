import React from 'react';
import { MessageCircle, GitBranch, Heart, BookOpen } from 'lucide-react';

type Expression = 'happy' | 'sad' | 'surprised' | 'wink' | 'cool' | 'smirk' | 'thinking' | 'nervous' | 'excited';

const Community = () => {
  return (
    <section id="about" className="bg-gray-50 dark:bg-gray-700">
      <div className="pt-10 lg:pt-14 grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-mono text-5xl sm:text-6xl font-bold text-black dark:text-white mb-6">
            MEET THE
            <br />
            <span className="bg-green-500 text-white px-4 py-2 pixelated-border inline-block">
              COMMUNITY
            </span>
          </h2>
          <p className="text-base sm:text-xl font-mono text-gray-600 dark:text-white max-w-3xl mx-auto">
              A community of builders learning, collaborating, and growing together.
          </p>
        </div>

        <div className="mb-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-8 justify-items-center">
          {[
            { name: "ANISH",    color: "emerald", message: "git commit -m 'YOLO 🌱'",                           expression: "happy"     as Expression },
            { name: "ANSHUL",   color: "sky",     message: "i have a team of testers, they're called users",    expression: "smirk"     as Expression },
            { name: "ANURAG",   color: "emerald", message: "I only test in production 🤖",                      expression: "wink"      as Expression },
            { name: "ARYAN",    color: "indigo",  message: "I use Arch BTW… in Docker 😁",                      expression: "cool"      as Expression },
            { name: "ASWATHI",  color: "rose",    message: "Ping me only for merge conflicts 🛠️",              expression: "thinking"  as Expression },
            { name: "CHIRAG",   color: "violet",  message: "0 bugs, 0 enemies, life sorted.",                   expression: "happy"     as Expression },
            { name: "KSHITIJ",  color: "amber",   message: "99 bugs in the code, take one down…",              expression: "sad"       as Expression },
            { name: "SAKSHAM",  color: "pink",    message: "Currently cd-ing into /dev/null",                   expression: "thinking"  as Expression },
            { name: "SALINA",   color: "fuchsia", message: "Debugging my life, one commit at a time 🐞",        expression: "sad"       as Expression },
            { name: "SAMIR",    color: "orange",  message: "Livestreaming Stack Overflow searches 🎥",          expression: "excited"   as Expression },
            { name: "SARANG",   color: "cyan",    message: "It works on my machine ¯\\_(ツ)_/¯",               expression: "smirk"     as Expression },
            { name: "SHANTANU", color: "teal",    message: "Deploying on Friday, wish me luck 🚀",              expression: "nervous"   as Expression },
            { name: "SUJAL",    color: "lime",    message: "⌛ compiling witty status…",                       expression: "thinking"  as Expression },
            { name: "TRUPTI",   color: "cyan",    message: "sudo make me a sandwich 🥪",                       expression: "happy"     as Expression },
            { name: "VEDANT",   color: "purple",  message: "sudo apt-get coffee && learn",                      expression: "cool"      as Expression },
          ].map((char) => (
            <Character key={char.name} name={char.name} color={char.color as any} message={char.message} expression={char.expression} />
          ))}
        </div>

      </div>
      </div>

      <hr className="border-t-4 border-black dark:border-gray-500" />

      {/* Stats */}
      <div className="py-10 lg:py-14 bg-gray-50 dark:bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <StatCard icon={<BookOpen size={40} />}    number="FOSSible" label="MEDIUM PUBLICATION"   color="violet" />
            <StatCard icon={<GitBranch size={40} />}   number="Sessions" label="WORKSHOPS & TALKS"    color="orange" />
            <StatCard icon={<MessageCircle size={40} />} number="Projects" label="COLLABORATIVE BUILDS" color="teal"   />
            <StatCard icon={<Heart size={40} />}       number="850+"     label="COMMUNITY MEMBERS"    color="rose"   />
          </div>
        </div>
      </div>
    </section>
  );
};

function PixelFace({ expression }: { expression: Expression }) {
  switch (expression) {
    case 'happy':
      return (
        <div className="absolute inset-2">
          <div className="bg-white w-2 h-2 absolute top-1 left-1" />
          <div className="bg-white w-2 h-2 absolute top-1 right-1" />
          {/* smile: corners above middle */}
          <div className="bg-white w-1 h-1 absolute bottom-2 left-1" />
          <div className="bg-white w-4 h-1 absolute bottom-1 left-1/2 -translate-x-1/2" />
          <div className="bg-white w-1 h-1 absolute bottom-2 right-1" />
        </div>
      );
    case 'sad':
      return (
        <div className="absolute inset-2">
          <div className="bg-white w-2 h-2 absolute top-1 left-1" />
          <div className="bg-white w-2 h-2 absolute top-1 right-1" />
          {/* frown: corners below middle */}
          <div className="bg-white w-1 h-1 absolute bottom-1 left-1" />
          <div className="bg-white w-4 h-1 absolute bottom-2 left-1/2 -translate-x-1/2" />
          <div className="bg-white w-1 h-1 absolute bottom-1 right-1" />
        </div>
      );
    case 'surprised':
      return (
        <div className="absolute inset-2">
          {/* wide eyes */}
          <div className="bg-white w-3 h-3 absolute top-0 left-0" />
          <div className="bg-white w-3 h-3 absolute top-0 right-0" />
          {/* O mouth */}
          <div className="bg-white w-2 h-2 absolute bottom-0 left-1/2 -translate-x-1/2" />
        </div>
      );
    case 'wink':
      return (
        <div className="absolute inset-2">
          {/* winking eye (horizontal bar) */}
          <div className="bg-white w-2 h-1 absolute top-2 left-1" />
          <div className="bg-white w-2 h-2 absolute top-1 right-1" />
          {/* smile */}
          <div className="bg-white w-1 h-1 absolute bottom-2 left-1" />
          <div className="bg-white w-4 h-1 absolute bottom-1 left-1/2 -translate-x-1/2" />
          <div className="bg-white w-1 h-1 absolute bottom-2 right-1" />
        </div>
      );
    case 'cool':
      return (
        <div className="absolute inset-2">
          {/* sunglasses: left lens + bridge + right lens */}
          <div className="bg-white w-3 h-2 absolute top-1 left-0" />
          <div className="bg-white w-2 h-1 absolute top-2 left-1/2 -translate-x-1/2" />
          <div className="bg-white w-3 h-2 absolute top-1 right-0" />
          {/* smile */}
          <div className="bg-white w-1 h-1 absolute bottom-2 left-1" />
          <div className="bg-white w-4 h-1 absolute bottom-1 left-1/2 -translate-x-1/2" />
          <div className="bg-white w-1 h-1 absolute bottom-2 right-1" />
        </div>
      );
    case 'smirk':
      return (
        <div className="absolute inset-2">
          <div className="bg-white w-2 h-2 absolute top-1 left-1" />
          <div className="bg-white w-2 h-2 absolute top-1 right-1" />
          {/* smirk: right-side only */}
          <div className="bg-white w-3 h-1 absolute bottom-2 right-0" />
        </div>
      );
    case 'thinking':
      return (
        <div className="absolute inset-2">
          {/* one eye squinting */}
          <div className="bg-white w-2 h-1 absolute top-2 left-1" />
          <div className="bg-white w-2 h-2 absolute top-1 right-1" />
          {/* neutral mouth */}
          <div className="bg-white w-4 h-1 absolute bottom-2 left-1/2 -translate-x-1/2" />
          {/* thought dot */}
          <div className="bg-white w-1 h-1 absolute top-0 right-0" />
        </div>
      );
    case 'nervous':
      return (
        <div className="absolute inset-2">
          <div className="bg-white w-2 h-2 absolute top-1 left-1" />
          <div className="bg-white w-2 h-2 absolute top-1 right-1" />
          {/* sweat drop */}
          <div className="bg-white w-1 h-2 absolute top-0 right-0 opacity-70" />
          {/* teeth: 4 bars evenly spaced */}
          <div className="bg-white w-1 h-2 absolute bottom-0 left-1" />
          <div className="bg-white w-1 h-2 absolute bottom-0 left-4" />
          <div className="bg-white w-1 h-2 absolute bottom-0 right-4" />
          <div className="bg-white w-1 h-2 absolute bottom-0 right-1" />
        </div>
      );
    case 'excited':
      return (
        <div className="absolute inset-2">
          {/* eyes with sparkle dots */}
          <div className="bg-white w-2 h-2 absolute top-1 left-1" />
          <div className="bg-white w-1 h-1 absolute top-0 left-0" />
          <div className="bg-white w-2 h-2 absolute top-1 right-1" />
          <div className="bg-white w-1 h-1 absolute top-0 right-0" />
          {/* wide open mouth */}
          <div className="bg-white w-5 h-2 absolute bottom-0 left-1/2 -translate-x-1/2" />
        </div>
      );
    default:
      return (
        <div className="absolute inset-2">
          <div className="bg-white w-2 h-2 absolute top-1 left-1" />
          <div className="bg-white w-2 h-2 absolute top-1 right-1" />
          <div className="bg-white w-4 h-1 absolute bottom-2 left-1/2 -translate-x-1/2" />
        </div>
      );
  }
}

const Character = ({
  name,
  color,
  message,
  expression,
}: {
  name: string;
  color: 'emerald' | 'rose' | 'violet' | 'orange' | 'cyan' | 'indigo' | 'amber' | 'pink' | 'teal' | 'lime' | 'purple' | 'sky' | 'fuchsia';
  message: string;
  expression: Expression;
}) => {
  const colorClasses = {
    emerald: 'bg-emerald-500',
    rose:    'bg-rose-500',
    violet:  'bg-violet-500',
    orange:  'bg-orange-500',
    cyan:    'bg-cyan-500',
    indigo:  'bg-indigo-500',
    amber:   'bg-amber-500',
    pink:    'bg-pink-500',
    teal:    'bg-teal-500',
    lime:    'bg-lime-500',
    purple:  'bg-purple-500',
    sky:     'bg-sky-500',
    fuchsia: 'bg-fuchsia-500',
  };

  return (
    <div className="text-center group relative">
      {/* Speech Bubble */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        <div className="bg-white dark:bg-gray-900 border-4 border-black dark:border-gray-400 px-3 py-2 font-mono text-sm whitespace-nowrap text-black dark:text-white">
          {message}
        </div>
        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black dark:border-t-gray-400 mx-auto" />
      </div>

      {/* Avatar */}
      <div className={`
        ${colorClasses[color]}
        w-16 h-16 mx-auto mb-2 pixelated-border
        group-hover:scale-110 transition-all duration-200 cursor-pointer
        relative overflow-hidden
      `}>
        <PixelFace expression={expression} />
      </div>

      <p className="font-mono text-sm font-bold text-black dark:text-white">{name}</p>
    </div>
  );
};

const StatCard = ({
  icon,
  number,
  label,
  color,
}: {
  icon: React.ReactNode;
  number: string;
  label: string;
  color: 'emerald' | 'rose' | 'violet' | 'orange' | 'cyan' | 'indigo' | 'amber' | 'pink' | 'teal' | 'lime' | 'purple' | 'sky' | 'fuchsia';
}) => {
  const colorClasses = {
    emerald: 'bg-emerald-500',
    rose:    'bg-rose-500',
    violet:  'bg-violet-500',
    orange:  'bg-orange-500',
    cyan:    'bg-cyan-500',
    indigo:  'bg-indigo-500',
    amber:   'bg-amber-500',
    pink:    'bg-pink-500',
    teal:    'bg-teal-500',
    lime:    'bg-lime-500',
    purple:  'bg-purple-500',
    sky:     'bg-sky-500',
    fuchsia: 'bg-fuchsia-500',
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
      <h3 className="font-mono text-2xl font-bold text-black dark:text-white mb-2">{number}</h3>
      <p className="font-mono text-gray-600 text-sm dark:text-gray-200">{label}</p>
    </div>
  );
};

export default Community;
