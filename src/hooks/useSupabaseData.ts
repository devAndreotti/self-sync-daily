
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface FocusBlock {
  id: string;
  title: string;
  duration: number;
  category: string;
  completed: boolean;
  scheduled_time: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface EnergyLevel {
  id: string;
  energy_value: number;
  recorded_at: string;
  notes: string | null;
}

export interface DailyReflection {
  id: string;
  reflection_date: string;
  gratitude: string | null;
  achievements: string | null;
  challenges: string | null;
  tomorrow_goals: string | null;
  mood_rating: number | null;
  created_at: string;
  updated_at: string;
}

export const useSupabaseData = () => {
  const { user } = useAuth();
  const [focusBlocks, setFocusBlocks] = useState<FocusBlock[]>([]);
  const [energyLevels, setEnergyLevels] = useState<EnergyLevel[]>([]);
  const [currentEnergy, setCurrentEnergy] = useState(75);
  const [dailyReflection, setDailyReflection] = useState<DailyReflection | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch focus blocks
  const fetchFocusBlocks = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('focus_blocks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching focus blocks:', error);
      return;
    }

    setFocusBlocks(data || []);
  };

  // Fetch energy levels
  const fetchEnergyLevels = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('energy_levels')
      .select('*')
      .eq('user_id', user.id)
      .order('recorded_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching energy levels:', error);
      return;
    }

    setEnergyLevels(data || []);
    if (data && data.length > 0) {
      setCurrentEnergy(data[0].energy_value);
    }
  };

  // Fetch today's reflection
  const fetchDailyReflection = async () => {
    if (!user) return;
    
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('daily_reflections')
      .select('*')
      .eq('user_id', user.id)
      .eq('reflection_date', today)
      .maybeSingle();

    if (error) {
      console.error('Error fetching daily reflection:', error);
      return;
    }

    setDailyReflection(data);
  };

  // Create or update focus block
  const upsertFocusBlock = async (block: Partial<FocusBlock>) => {
    if (!user) return;

    const blockData = {
      ...block,
      user_id: user.id,
      updated_at: new Date().toISOString(),
    };

    if (block.id) {
      const { error } = await supabase
        .from('focus_blocks')
        .update(blockData)
        .eq('id', block.id);

      if (error) {
        console.error('Error updating focus block:', error);
        return;
      }
    } else {
      const { error } = await supabase
        .from('focus_blocks')
        .insert([blockData]);

      if (error) {
        console.error('Error creating focus block:', error);
        return;
      }
    }

    await fetchFocusBlocks();
  };

  // Toggle focus block completion
  const toggleFocusBlock = async (blockId: string) => {
    const block = focusBlocks.find(b => b.id === blockId);
    if (!block) return;

    const updatedBlock = {
      ...block,
      completed: !block.completed,
      completed_at: !block.completed ? new Date().toISOString() : null,
    };

    await upsertFocusBlock(updatedBlock);
  };

  // Add energy level
  const addEnergyLevel = async (energyValue: number, notes?: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('energy_levels')
      .insert([{
        user_id: user.id,
        energy_value: energyValue,
        notes: notes || null,
      }]);

    if (error) {
      console.error('Error adding energy level:', error);
      return;
    }

    setCurrentEnergy(energyValue);
    await fetchEnergyLevels();
  };

  // Save daily reflection
  const saveDailyReflection = async (reflection: Partial<DailyReflection>) => {
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];
    
    const reflectionData = {
      ...reflection,
      user_id: user.id,
      reflection_date: today,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('daily_reflections')
      .upsert([reflectionData], {
        onConflict: 'user_id,reflection_date',
      });

    if (error) {
      console.error('Error saving daily reflection:', error);
      return;
    }

    await fetchDailyReflection();
  };

  // Load all data
  const loadData = async () => {
    if (!user) return;
    
    setLoading(true);
    await Promise.all([
      fetchFocusBlocks(),
      fetchEnergyLevels(),
      fetchDailyReflection(),
    ]);
    setLoading(false);
  };

  // Load data when user changes
  useEffect(() => {
    if (user) {
      loadData();
    } else {
      setFocusBlocks([]);
      setEnergyLevels([]);
      setDailyReflection(null);
      setCurrentEnergy(75);
      setLoading(false);
    }
  }, [user]);

  return {
    focusBlocks,
    energyLevels,
    currentEnergy,
    dailyReflection,
    loading,
    toggleFocusBlock,
    upsertFocusBlock,
    addEnergyLevel,
    saveDailyReflection,
    refreshData: loadData,
  };
};
