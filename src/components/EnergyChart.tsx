
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Battery, TrendingUp } from 'lucide-react';

interface EnergyChartProps {
  currentEnergy: number;
}

const EnergyChart: React.FC<EnergyChartProps> = ({ currentEnergy }) => {
  const getEnergyColor = (energy: number) => {
    if (energy >= 70) return 'from-green-400 to-emerald-500';
    if (energy >= 40) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-pink-500';
  };

  const getEnergyMessage = (energy: number) => {
    if (energy >= 70) return 'Energia alta! Ideal para tarefas complexas.';
    if (energy >= 40) return 'Energia moderada. Foque em tarefas médias.';
    return 'Energia baixa. Que tal um descanso?';
  };

  return (
    <Card className="bg-white/40 backdrop-blur-sm border-white/50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Battery className="w-5 h-5 text-green-500" />
          Nível de Energia
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Energy Bar */}
          <div className="relative">
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${getEnergyColor(currentEnergy)} transition-all duration-500 ease-out`}
                style={{ width: `${currentEnergy}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span className="font-medium">{currentEnergy}%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Energy Message */}
          <div className="p-3 rounded-lg bg-white/40 backdrop-blur-sm">
            <p className="text-sm text-gray-700">{getEnergyMessage(currentEnergy)}</p>
          </div>

          {/* Energy Timeline */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Picos de Energia Hoje</h4>
            <div className="space-y-1">
              {[
                { time: '09:00', level: 85, label: 'Manhã Produtiva' },
                { time: '14:00', level: 60, label: 'Pós-Almoço' },
                { time: '19:00', level: 70, label: 'Segunda Onda' },
              ].map((peak, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">{peak.time}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${getEnergyColor(peak.level)}`}
                        style={{ width: `${peak.level}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-500 w-20">{peak.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnergyChart;
