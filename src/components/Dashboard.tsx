
import React, { useState } from 'react';
import EnergyChart from './EnergyChart';
import FocusBlock from './FocusBlock';
import ReflectionPanel from './ReflectionPanel';
import UserMenu from './UserMenu';
import AddFocusBlock from './AddFocusBlock';
import StatsPanel from './StatsPanel';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Target, Heart, Zap } from 'lucide-react';

const Dashboard = () => {
  const {
    focusBlocks,
    currentEnergy,
    dailyReflection,
    loading,
    toggleFocusBlock,
    upsertFocusBlock,
    addEnergyLevel,
    saveDailyReflection,
  } = useSupabaseData();

  const [currentTab, setCurrentTab] = useState('focus');

  const handleAddFocusBlock = async (blockData: { title: string; duration: number; category: string; scheduled_time?: string }) => {
    await upsertFocusBlock({
      title: blockData.title,
      duration: blockData.duration,
      category: blockData.category,
      scheduled_time: blockData.scheduled_time,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl p-8 shadow-2xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando seu dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header with User Menu */}
      <header className="backdrop-blur-xl bg-white/30 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Focus Dashboard
              </h1>
              <p className="text-gray-600 text-sm">Organização Pessoal & Foco</p>
            </div>
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/40 backdrop-blur-sm border border-white/30 shadow-lg">
            <TabsTrigger 
              value="focus" 
              className="flex items-center gap-2 data-[state=active]:bg-white/60 data-[state=active]:text-purple-600"
            >
              <Target className="w-4 h-4" />
              Foco
            </TabsTrigger>
            <TabsTrigger 
              value="energy" 
              className="flex items-center gap-2 data-[state=active]:bg-white/60 data-[state=active]:text-purple-600"
            >
              <Zap className="w-4 h-4" />
              Energia
            </TabsTrigger>
            <TabsTrigger 
              value="stats" 
              className="flex items-center gap-2 data-[state=active]:bg-white/60 data-[state=active]:text-purple-600"
            >
              <BarChart3 className="w-4 h-4" />
              Estatísticas
            </TabsTrigger>
            <TabsTrigger 
              value="reflection" 
              className="flex items-center gap-2 data-[state=active]:bg-white/60 data-[state=active]:text-purple-600"
            >
              <Heart className="w-4 h-4" />
              Reflexão
            </TabsTrigger>
          </TabsList>

          <TabsContent value="focus" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Add Focus Block */}
              <div className="lg:col-span-1">
                <AddFocusBlock onAdd={handleAddFocusBlock} />
              </div>

              {/* Focus Sessions */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Sessões de Foco</h2>
                {focusBlocks.length === 0 ? (
                  <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl p-8 shadow-xl text-center">
                    <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Nenhuma sessão de foco criada ainda.</p>
                    <p className="text-gray-400 text-sm mt-2">Crie sua primeira sessão para começar!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {focusBlocks.map(block => (
                      <FocusBlock
                        key={block.id}
                        block={{
                          id: parseInt(block.id),
                          title: block.title,
                          duration: block.duration,
                          category: block.category,
                          completed: block.completed,
                          time: block.scheduled_time || '00:00'
                        }}
                        onToggle={() => toggleFocusBlock(block.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="energy" className="space-y-6">
            <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Níveis de Energia
              </h2>
              <EnergyChart 
                currentEnergy={currentEnergy} 
                onEnergyUpdate={addEnergyLevel}
              />
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <StatsPanel focusBlocks={focusBlocks} currentEnergy={currentEnergy} />
          </TabsContent>

          <TabsContent value="reflection" className="space-y-6">
            <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-500" />
                Reflexão Diária
              </h2>
              <ReflectionPanel 
                reflection={dailyReflection}
                onSave={saveDailyReflection}
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
