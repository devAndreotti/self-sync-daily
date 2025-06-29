
import React, { useState } from 'react';
import EnergyChart from './EnergyChart';
import FocusBlock from './FocusBlock';
import ReflectionPanel from './ReflectionPanel';
import UserMenu from './UserMenu';

const Dashboard = () => {
  // State for energy level
  const [currentEnergy, setCurrentEnergy] = useState(75);

  // State for focus blocks
  const [focusBlocks, setFocusBlocks] = useState([
    {
      id: 1,
      title: 'Morning Reading',
      duration: 30,
      category: 'conhecimento',
      completed: false,
      time: '09:00'
    },
    {
      id: 2,
      title: 'Creative Writing',
      duration: 45,
      category: 'criatividade',
      completed: false,
      time: '14:00'
    },
    {
      id: 3,
      title: 'Exercise',
      duration: 60,
      category: 'saude',
      completed: true,
      time: '07:00'
    }
  ]);

  // Function to toggle completion status of a focus block
  const handleToggleFocusBlock = (blockId: number) => {
    setFocusBlocks(blocks =>
      blocks.map(block =>
        block.id === blockId
          ? { ...block, completed: !block.completed }
          : block
      )
    );
  };

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
              <p className="text-gray-600 text-sm">Personal Organization & Focus</p>
            </div>
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Energy Chart Section */}
          <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Energy Levels</h2>
            <EnergyChart currentEnergy={currentEnergy} />
          </div>

          {/* Focus Block Section */}
          <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Focus Sessions</h2>
            <div className="space-y-4">
              {focusBlocks.map(block => (
                <FocusBlock
                  key={block.id}
                  block={block}
                  onToggle={() => handleToggleFocusBlock(block.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Reflection Panel */}
        <div className="mt-8 backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Daily Reflection</h2>
          <ReflectionPanel />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
