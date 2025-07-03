
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Square, RotateCcw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface FocusTimerProps {
  duration: number; // em minutos
  onComplete?: () => void;
  onStart?: () => void;
  onPause?: () => void;
  onStop?: () => void;
}

const FocusTimer: React.FC<FocusTimerProps> = ({
  duration,
  onComplete,
  onStart,
  onPause,
  onStop,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // converter para segundos
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    const totalSeconds = duration * 60;
    return ((totalSeconds - timeLeft) / totalSeconds) * 100;
  };

  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
    onStart?.();
    
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Timer completed
          setIsRunning(false);
          onComplete?.();
          toast({
            title: "Parabéns! 🎉",
            description: "Sessão de foco concluída com sucesso!",
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    setIsPaused(true);
    onPause?.();
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(duration * 60);
    onStop?.();
  };

  const resetTimer = () => {
    stopTimer();
    setTimeLeft(duration * 60);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);

  const getTimerColor = () => {
    const percentage = getProgressPercentage();
    if (percentage < 50) return 'from-green-400 to-emerald-500';
    if (percentage < 80) return 'from-yellow-400 to-orange-500';
    return 'from-orange-500 to-red-500';
  };

  return (
    <div className="text-center space-y-4">
      {/* Circular Progress */}
      <div className="relative w-32 h-32 mx-auto">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r="50"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="60"
            cy="60"
            r="50"
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 50}`}
            strokeDashoffset={`${2 * Math.PI * 50 * (1 - getProgressPercentage() / 100)}`}
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" className="stop-color-green-400" />
              <stop offset="100%" className="stop-color-emerald-500" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Timer display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {formatTime(timeLeft)}
            </div>
            <div className="text-xs text-gray-600">
              {isRunning ? 'Em foco' : isPaused ? 'Pausado' : 'Pronto'}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-2">
        {!isRunning && !isPaused && (
          <Button
            onClick={startTimer}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
          >
            <Play className="w-4 h-4 mr-2" />
            Iniciar
          </Button>
        )}
        
        {isRunning && (
          <Button
            onClick={pauseTimer}
            className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white shadow-lg"
          >
            <Pause className="w-4 h-4 mr-2" />
            Pausar
          </Button>
        )}
        
        {isPaused && (
          <Button
            onClick={startTimer}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
          >
            <Play className="w-4 h-4 mr-2" />
            Continuar
          </Button>
        )}
        
        {(isRunning || isPaused) && (
          <>
            <Button
              onClick={stopTimer}
              variant="outline"
              className="bg-white/30 backdrop-blur-sm border-white/40 hover:bg-white/40"
            >
              <Square className="w-4 h-4 mr-2" />
              Parar
            </Button>
            
            <Button
              onClick={resetTimer}
              variant="outline"
              className="bg-white/30 backdrop-blur-sm border-white/40 hover:bg-white/40"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default FocusTimer;
