
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageCircle, Star, Send } from 'lucide-react';

const ReflectionPanel = () => {
  const [reflection, setReflection] = useState('');
  const [mood, setMood] = useState<number | null>(null);

  const moodEmojis = ['😫', '😕', '😐', '😊', '🚀'];
  const moodLabels = ['Esgotado', 'Difícil', 'Neutro', 'Bem', 'Incrível'];

  const handleSubmitReflection = () => {
    // Here you would save the reflection
    console.log('Reflection submitted:', { reflection, mood });
    setReflection('');
    setMood(null);
  };

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
                onClick={() => setMood(index)}
                className={`p-2 rounded-full transition-all duration-200 ${
                  mood === index 
                    ? 'bg-white/60 backdrop-blur-sm shadow-lg scale-110' 
                    : 'hover:bg-white/30 hover:scale-105'
                }`}
              >
                <span className="text-2xl">{emoji}</span>
              </button>
            ))}
          </div>
          {mood !== null && (
            <p className="text-center text-sm text-gray-600 mt-2">{moodLabels[mood]}</p>
          )}
        </div>

        {/* Reflection Input */}
        <div>
          <p className="text-sm text-gray-600 mb-2">O que está em sua mente?</p>
          <Textarea
            placeholder="Escreva seus pensamentos, conquistas ou desafios do dia..."
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="bg-white/40 backdrop-blur-sm border-white/50 resize-none"
            rows={3}
          />
        </div>

        <Button 
          onClick={handleSubmitReflection}
          className="w-full bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white shadow-lg"
          disabled={!reflection.trim() && mood === null}
        >
          <Send className="w-4 h-4 mr-2" />
          Registrar Reflexão
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
