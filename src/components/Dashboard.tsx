
import React, { useState } from 'react';
import { Plus, Calendar, Target, TrendingUp, Clock, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FocusBlock from './FocusBlock';
import EnergyChart from './EnergyChart';
import ReflectionPanel from './ReflectionPanel';

const Dashboard = () => {
  const [focusBlocks, setFocusBlocks] = useState([
    { id: 1, title: 'Bloco Criativo', duration: 90, category: 'criatividade', completed: false, time: '09:00' },
    { id: 2, title: 'Momento de Leitura', duration: 25, category: 'conhecimento', completed: true, time: '11:00' },
    { id: 3, title: 'Check-in Físico', duration: 50, category: 'saude', completed: false, time: '14:30' },
  ]);

  const [currentEnergy, setCurrentEnergy] = useState(75);

  const toggleBlock = (id: number) => {
    setFocusBlocks(prev => 
      prev.map(block => 
        block.id === id ? { ...block, completed: !block.completed } : block
      )
    );
  };

  const completedBlocks = focusBlocks.filter(block => block.completed).length;
  const totalBlocks = focusBlocks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Seu Dia Personalizado
            </h1>
            <p className="text-gray-600 mt-2">Transforme suas intenções em realidade</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              Nova Rotina
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/40 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Progresso Hoje</p>
                  <p className="text-2xl font-bold text-indigo-600">{completedBlocks}/{totalBlocks}</p>
                </div>
                <Target className="w-8 h-8 text-indigo-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/40 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Energia Atual</p>
                  <p className="text-2xl font-bold text-green-600">{currentEnergy}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/40 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Sequência</p>
                  <p className="text-2xl font-bold text-purple-600">7 dias</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/40 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Foco Total</p>
                  <p className="text-2xl font-bold text-orange-600">4h 25m</p>
                </div>
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Focus Blocks */}
          <div className="lg:col-span-2">
            <Card className="bg-white/40 backdrop-blur-sm border-white/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-500" />
                  Blocos de Foco Personalizados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {focusBlocks.map((block) => (
                  <FocusBlock
                    key={block.id}
                    block={block}
                    onToggle={() => toggleBlock(block.id)}
                  />
                ))}
                <Button 
                  variant="outline" 
                  className="w-full bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 transition-all duration-300"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Bloco de Foco
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <EnergyChart currentEnergy={currentEnergy} />
            <ReflectionPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
