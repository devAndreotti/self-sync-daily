
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Clock, Target } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AddFocusBlockProps {
  onAdd: (block: { title: string; duration: number; category: string; scheduled_time?: string }) => void;
}

const AddFocusBlock: React.FC<AddFocusBlockProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(25);
  const [category, setCategory] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { value: 'trabalho', label: 'Trabalho', color: 'from-blue-500 to-cyan-500' },
    { value: 'estudo', label: 'Estudo', color: 'from-purple-500 to-pink-500' },
    { value: 'criatividade', label: 'Criatividade', color: 'from-orange-500 to-red-500' },
    { value: 'saude', label: 'Saúde', color: 'from-green-500 to-emerald-500' },
    { value: 'pessoal', label: 'Pessoal', color: 'from-indigo-500 to-purple-500' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !category) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    onAdd({
      title: title.trim(),
      duration,
      category,
      scheduled_time: scheduledTime || undefined,
    });

    // Reset form
    setTitle('');
    setDuration(25);
    setCategory('');
    setScheduledTime('');
    setIsOpen(false);

    toast({
      title: "Sucesso!",
      description: "Sessão de foco criada com sucesso.",
    });
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200"
      >
        <Plus className="w-4 h-4 mr-2" />
        Nova Sessão de Foco
      </Button>
    );
  }

  return (
    <div className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-2xl p-6 shadow-xl animate-fade-in">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Target className="w-5 h-5 text-purple-500" />
        Nova Sessão de Foco
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title" className="text-gray-700 font-medium">
            Título da Sessão
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Estudar React, Escrever relatório..."
            className="bg-white/50 backdrop-blur-sm border-white/30 focus:border-purple-400 focus:ring-purple-400/20"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="duration" className="text-gray-700 font-medium flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Duração (min)
            </Label>
            <Input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              min="1"
              max="180"
              className="bg-white/50 backdrop-blur-sm border-white/30 focus:border-purple-400 focus:ring-purple-400/20"
            />
          </div>

          <div>
            <Label htmlFor="time" className="text-gray-700 font-medium">
              Horário (opcional)
            </Label>
            <Input
              id="time"
              type="time"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="bg-white/50 backdrop-blur-sm border-white/30 focus:border-purple-400 focus:ring-purple-400/20"
            />
          </div>
        </div>

        <div>
          <Label className="text-gray-700 font-medium">Categoria</Label>
          <Select value={category} onValueChange={setCategory} required>
            <SelectTrigger className="bg-white/50 backdrop-blur-sm border-white/30 focus:border-purple-400 focus:ring-purple-400/20">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent className="bg-white/90 backdrop-blur-xl border-white/30">
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${cat.color}`}></div>
                    {cat.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="flex-1 bg-white/30 backdrop-blur-sm border-white/40 hover:bg-white/40"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Criar Sessão
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddFocusBlock;
