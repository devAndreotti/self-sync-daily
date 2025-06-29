
import React from 'react';
import { Clock, Check, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const getCategoryColor = (category: string) => {
    const colors = {
      criatividade: 'from-purple-400 to-pink-400',
      conhecimento: 'from-blue-400 to-cyan-400',
      saude: 'from-green-400 to-emerald-400',
      trabalho: 'from-orange-400 to-red-400',
    };
    return colors[category as keyof typeof colors] || 'from-gray-400 to-gray-500';
  };

  const getCategoryBg = (category: string) => {
    const colors = {
      criatividade: 'bg-purple-100',
      conhecimento: 'bg-blue-100',
      saude: 'bg-green-100',
      trabalho: 'bg-orange-100',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100';
  };

  return (
    <div className={`relative p-4 rounded-xl transition-all duration-300 ${
      block.completed 
        ? 'bg-white/60 backdrop-blur-sm border-2 border-green-200 shadow-lg' 
        : 'bg-white/30 backdrop-blur-sm border-2 border-white/40 hover:bg-white/40 shadow-md hover:shadow-lg'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getCategoryColor(block.category)}`}></div>
            <h3 className={`font-semibold ${block.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
              {block.title}
            </h3>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{block.duration}min</span>
            </div>
            <span>{block.time}</span>
            <span className={`px-2 py-1 rounded-full text-xs ${getCategoryBg(block.category)}`}>
              {block.category}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!block.completed && (
            <Button size="sm" variant="outline" className="bg-white/20 backdrop-blur-sm border-white/30">
              <Play className="w-4 h-4" />
            </Button>
          )}
          
          <Button
            size="sm"
            onClick={onToggle}
            className={`${
              block.completed 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30'
            } transition-all duration-300`}
          >
            {block.completed ? <Check className="w-4 h-4" /> : <div className="w-4 h-4 border-2 border-current rounded-sm" />}
          </Button>
        </div>
      </div>

      {block.completed && (
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-xl pointer-events-none"></div>
      )}
    </div>
  );
};

export default FocusBlock;
