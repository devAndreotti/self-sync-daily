
import React, { useState } from 'react';
import { Clock, Check, Play, Pause, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FocusTimer from './FocusTimer';

interface FocusBlockProps {
  block: {
    id: number;
    title: string;
    duration: number;
    category: string;
    completed: boolean;
    time: string;
  };
  onToggle: () => void;
}

const FocusBlock: React.FC<FocusBlockProps> = ({ block, onToggle }) => {
  const [showTimer, setShowTimer] = useState(false);

  const getCategoryColor = (category: string) => {
    const colors = {
      criatividade: 'from-purple-400 to-pink-400',
      conhecimento: 'from-blue-400 to-cyan-400',
      saude: 'from-green-400 to-emerald-400',
      trabalho: 'from-orange-400 to-red-400',
      estudo: 'from-indigo-400 to-purple-400',
      pessoal: 'from-pink-400 to-rose-400',
    };
    return colors[category as keyof typeof colors] || 'from-gray-400 to-gray-500';
  };

  const getCategoryBg = (category: string) => {
    const colors = {
      criatividade: 'bg-purple-100 dark:bg-purple-900/30',
      conhecimento: 'bg-blue-100 dark:bg-blue-900/30',
      saude: 'bg-green-100 dark:bg-green-900/30',
      trabalho: 'bg-orange-100 dark:bg-orange-900/30',
      estudo: 'bg-indigo-100 dark:bg-indigo-900/30',
      pessoal: 'bg-pink-100 dark:bg-pink-900/30',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 dark:bg-gray-900/30';
  };

  const handleTimerComplete = () => {
    setShowTimer(false);
    onToggle(); // Mark as completed
  };

  if (showTimer) {
    return (
      <div className="backdrop-blur-xl bg-white/60 dark:bg-black/60 border-2 border-white/40 dark:border-gray-600 rounded-2xl p-6 shadow-xl animate-scale-in">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{block.title}</h3>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getCategoryColor(block.category)}`}></div>
            <span className="capitalize">{block.category}</span>
          </div>
        </div>
        
        <FocusTimer
          duration={block.duration}
          onComplete={handleTimerComplete}
          onStop={() => setShowTimer(false)}
        />
        
        <Button
          onClick={() => setShowTimer(false)}
          variant="outline"
          className="w-full mt-4 bg-white/30 dark:bg-black/30 backdrop-blur-sm border-white/40 dark:border-gray-600 hover:bg-white/40 dark:hover:bg-black/40"
        >
          Fechar Timer
        </Button>
      </div>
    );
  }

  return (
    <div className={`relative p-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
      block.completed 
        ? 'bg-white/60 dark:bg-black/60 backdrop-blur-sm border-2 border-green-200 dark:border-green-800 shadow-lg animate-pulse' 
        : 'bg-white/30 dark:bg-black/30 backdrop-blur-sm border-2 border-white/40 dark:border-gray-600 hover:bg-white/40 dark:hover:bg-black/40 shadow-md hover:shadow-lg'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getCategoryColor(block.category)} shadow-sm`}></div>
            <h3 className={`font-semibold transition-all duration-300 ${
              block.completed ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-800 dark:text-gray-200'
            }`}>
              {block.title}
            </h3>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{block.duration}min</span>
            </div>
            {block.time && <span>{block.time}</span>}
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryBg(block.category)} shadow-sm`}>
              {block.category}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!block.completed && (
            <>
              <Button
                size="sm"
                onClick={() => setShowTimer(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Timer className="w-4 h-4" />
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                className="bg-white/20 dark:bg-black/20 backdrop-blur-sm border-white/30 dark:border-gray-600 hover:bg-white/30 dark:hover:bg-black/30 transform hover:scale-105 transition-all duration-200"
              >
                <Play className="w-4 h-4" />
              </Button>
            </>
          )}
          
          <Button
            size="sm"
            onClick={onToggle}
            className={`transform hover:scale-105 transition-all duration-300 shadow-lg ${
              block.completed 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-white/20 dark:bg-black/20 backdrop-blur-sm border-white/30 dark:border-gray-600 hover:bg-white/30 dark:hover:bg-black/30'
            }`}
          >
            {block.completed ? (
              <Check className="w-4 h-4" />
            ) : (
              <div className="w-4 h-4 border-2 border-current rounded-sm" />
            )}
          </Button>
        </div>
      </div>

      {block.completed && (
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-xl pointer-events-none animate-pulse"></div>
      )}
    </div>
  );
};

export default FocusBlock;
