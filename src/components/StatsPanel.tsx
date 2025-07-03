
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Target, Clock, Award } from 'lucide-react';
import { FocusBlock } from '@/hooks/useSupabaseData';

interface StatsPanelProps {
  focusBlocks: FocusBlock[];
  currentEnergy: number;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ focusBlocks, currentEnergy }) => {
  const completedBlocks = focusBlocks.filter(block => block.completed);
  const totalMinutes = completedBlocks.reduce((acc, block) => acc + block.duration, 0);
  const averageSession = completedBlocks.length > 0 ? Math.round(totalMinutes / completedBlocks.length) : 0;
  
  // Stats por categoria
  const categoryStats = focusBlocks.reduce((acc, block) => {
    if (!acc[block.category]) {
      acc[block.category] = { total: 0, completed: 0 };
    }
    acc[block.category].total++;
    if (block.completed) {
      acc[block.category].completed++;
    }
    return acc;
  }, {} as Record<string, { total: number; completed: number }>);

  const categoryData = Object.entries(categoryStats).map(([category, stats]) => ({
    name: category,
    completed: stats.completed,
    total: stats.total,
    percentage: Math.round((stats.completed / stats.total) * 100),
  }));

  const pieData = categoryData.map(item => ({
    name: item.name,
    value: item.completed,
  }));

  const colors = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];

  // Stats da semana (mock data para demonstração)
  const weekData = [
    { day: 'Seg', sessions: 3, minutes: 75 },
    { day: 'Ter', sessions: 5, minutes: 125 },
    { day: 'Qua', sessions: 2, minutes: 50 },
    { day: 'Qui', sessions: 4, minutes: 100 },
    { day: 'Sex', sessions: 6, minutes: 150 },
    { day: 'Sáb', sessions: 1, minutes: 25 },
    { day: 'Dom', sessions: 2, minutes: 50 },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border-white/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sessões Completas</p>
                <p className="text-2xl font-bold text-gray-800">{completedBlocks.length}</p>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border-white/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Minutos</p>
                <p className="text-2xl font-bold text-gray-800">{totalMinutes}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border-white/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Média por Sessão</p>
                <p className="text-2xl font-bold text-gray-800">{averageSession}min</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm border-white/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Energia Atual</p>
                <p className="text-2xl font-bold text-gray-800">{currentEnergy}%</p>
              </div>
              <Award className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress */}
        <Card className="bg-white/40 backdrop-blur-sm border-white/30">
          <CardHeader>
            <CardTitle className="text-gray-800">Progresso Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weekData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Bar dataKey="sessions" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="bg-white/40 backdrop-blur-sm border-white/30">
          <CardHeader>
            <CardTitle className="text-gray-800">Distribuição por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-4">
              {pieData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  ></div>
                  <span className="text-xs text-gray-600 capitalize">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Performance */}
      <Card className="bg-white/40 backdrop-blur-sm border-white/30">
        <CardHeader>
          <CardTitle className="text-gray-800">Performance por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryData.map((category, index) => (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 capitalize">{category.name}</span>
                  <span className="text-sm text-gray-600">
                    {category.completed}/{category.total} ({category.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${category.percentage}%`,
                      background: `linear-gradient(to right, ${colors[index % colors.length]}80, ${colors[index % colors.length]})`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsPanel;
