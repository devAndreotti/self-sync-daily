
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageCircle, Star, Send } from 'lucide-react';
import { DailyReflection } from '@/hooks/useSupabaseData';

interface ReflectionPanelProps {
  reflection: DailyReflection | null;
  onSave: (reflection: Partial<DailyReflection>) => void;
}

const ReflectionPanel: React.FC<ReflectionPanelProps> = ({ reflection, onSave }) => {
  const [gratitude, setGratitude] = useState('');
  const [achievements, setAchievements] = useState('');
  const [challenges, setChallenges] = useState('');
  const [tomorrowGoals, setTomorrowGoals] = useState('');
  const [mood, setMood] = useState<number | null>(null);

  const moodEmojis = ['😫', '😕', '😐', '😊', '🚀'];
  const moodLabels = ['Esgotado', 'Difícil', 'Neutro', 'Bem', 'Incrível'];

  // Load existing reflection data
  useEffect(() => {
    if (reflection) {
      setGratitude(reflection.gratitude || '');
      setAchievements(reflection.achievements || '');
      setChallenges(reflection.challenges || '');
      setTomorrowGoals(reflection.tomorrow_goals || '');
      setMood(reflection.mood_rating);
    }
  }, [reflection]);

  const handleSubmitReflection = () => {
    const reflectionData = {
      gratitude: gratitude.trim() || null,
      achievements: achievements.trim() || null,
      challenges: challenges.trim() || null,
      tomorrow_goals: tomorrowGoals.trim() || null,
      mood_rating: mood,
    };

    onSave(reflectionData);
  };

  const hasContent = gratitude.trim() || achievements.trim() || challenges.trim() || tomorrowGoals.trim() || mood !== null;

  return (
    <Card className="bg-white/40 backdrop-blur-sm border-white/50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-500" />
          Check-in Emocional
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mood Selector */}
        <div>
          <p className="text-sm text-gray-600 mb-3">Como você está se sentindo agora?</p>
          <div className="flex justify-between">
            {moodEmojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => setMood(index + 1)}
                className={`p-2 rounded-full transition-all duration-200 ${
                  mood === index + 1
                    ? 'bg-white/60 backdrop-blur-sm shadow-lg scale-110' 
                    : 'hover:bg-white/30 hover:scale-105'
                }`}
              >
                <span className="text-2xl">{emoji}</span>
              </button>
            ))}
          </div>
          {mood !== null && (
            <p className="text-center text-sm text-gray-600 mt-2">{moodLabels[mood - 1]}</p>
          )}
        </div>

        {/* Gratitude Input */}
        <div>
          <p className="text-sm text-gray-600 mb-2">Pelo que você é grato hoje?</p>
          <Textarea
            placeholder="Escreva suas gratidões do dia..."
            value={gratitude}
            onChange={(e) => setGratitude(e.target.value)}
            className="bg-white/40 backdrop-blur-sm border-white/50 resize-none"
            rows={2}
          />
        </div>

        {/* Achievements Input */}
        <div>
          <p className="text-sm text-gray-600 mb-2">Suas conquistas de hoje:</p>
          <Textarea
            placeholder="O que você conquistou hoje?"
            value={achievements}
            onChange={(e) => setAchievements(e.target.value)}
            className="bg-white/40 backdrop-blur-sm border-white/50 resize-none"
            rows={2}
          />
        </div>

        {/* Challenges Input */}
        <div>
          <p className="text-sm text-gray-600 mb-2">Desafios enfrentados:</p>
          <Textarea
            placeholder="Que desafios você enfrentou?"
            value={challenges}
            onChange={(e) => setChallenges(e.target.value)}
            className="bg-white/40 backdrop-blur-sm border-white/50 resize-none"
            rows={2}
          />
        </div>

        {/* Tomorrow Goals Input */}
        <div>
          <p className="text-sm text-gray-600 mb-2">Metas para amanhã:</p>
          <Textarea
            placeholder="O que você quer conquistar amanhã?"
            value={tomorrowGoals}
            onChange={(e) => setTomorrowGoals(e.target.value)}
            className="bg-white/40 backdrop-blur-sm border-white/50 resize-none"
            rows={2}
          />
        </div>

        <Button 
          onClick={handleSubmitReflection}
          className="w-full bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white shadow-lg"
          disabled={!hasContent}
        >
          <Send className="w-4 h-4 mr-2" />
          {reflection ? 'Atualizar Reflexão' : 'Registrar Reflexão'}
        </Button>

        {/* Recent Insights */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            Insights Recentes
          </h4>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-white/40 backdrop-blur-sm text-sm">
              <p className="text-gray-600">Você tem sido mais produtivo pela manhã nos últimos 5 dias.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/40 backdrop-blur-sm text-sm">
              <p className="text-gray-600">Suas sessões de foco são 30% mais eficazes quando você faz pausas regulares.</p>
            </div>
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="pt-4 border-t border-white/30">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Progresso da Semana</h4>
          <div className="grid grid-cols-7 gap-1">
            {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-500 mb-1">{day}</div>
                <div className={`w-8 h-8 rounded-full ${
                  index < 5 ? 'bg-green-400' : index === 5 ? 'bg-yellow-400' : 'bg-gray-200'
                } flex items-center justify-center`}>
                  <span className="text-xs text-white font-medium">
                    {index < 5 ? '✓' : index === 5 ? '~' : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReflectionPanel;
