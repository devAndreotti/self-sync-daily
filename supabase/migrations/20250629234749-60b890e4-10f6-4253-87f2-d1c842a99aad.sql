
-- Create table for energy levels tracking
CREATE TABLE public.energy_levels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  energy_value INTEGER NOT NULL CHECK (energy_value >= 0 AND energy_value <= 100),
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT
);

-- Create table for focus blocks
CREATE TABLE public.focus_blocks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  duration INTEGER NOT NULL CHECK (duration > 0),
  category TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  scheduled_time TIME,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create table for daily reflections
CREATE TABLE public.daily_reflections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  reflection_date DATE NOT NULL DEFAULT CURRENT_DATE,
  gratitude TEXT,
  achievements TEXT,
  challenges TEXT,
  tomorrow_goals TEXT,
  mood_rating INTEGER CHECK (mood_rating >= 1 AND mood_rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, reflection_date)
);

-- Enable Row Level Security on all tables
ALTER TABLE public.energy_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.focus_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_reflections ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for energy_levels
CREATE POLICY "Users can view their own energy levels" 
  ON public.energy_levels 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own energy levels" 
  ON public.energy_levels 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own energy levels" 
  ON public.energy_levels 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own energy levels" 
  ON public.energy_levels 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for focus_blocks
CREATE POLICY "Users can view their own focus blocks" 
  ON public.focus_blocks 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own focus blocks" 
  ON public.focus_blocks 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own focus blocks" 
  ON public.focus_blocks 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own focus blocks" 
  ON public.focus_blocks 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for daily_reflections
CREATE POLICY "Users can view their own reflections" 
  ON public.daily_reflections 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own reflections" 
  ON public.daily_reflections 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reflections" 
  ON public.daily_reflections 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reflections" 
  ON public.daily_reflections 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER focus_blocks_updated_at
  BEFORE UPDATE ON public.focus_blocks
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER daily_reflections_updated_at
  BEFORE UPDATE ON public.daily_reflections
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
