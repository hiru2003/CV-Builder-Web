-- Create the resumes table
CREATE TABLE IF NOT EXISTS public.resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    template TEXT NOT NULL DEFAULT 'modern',
    data JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    
    -- Ensure each user has at most one saved resume
    CONSTRAINT resumes_user_id_key UNIQUE (user_id)
);

-- Create a trigger to automatically update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_resumes_updated_at
    BEFORE UPDATE ON public.resumes
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
-- 1. Allow authenticated users to view their own resume
CREATE POLICY "Users can view their own resume" 
    ON public.resumes 
    FOR SELECT 
    TO authenticated 
    USING (auth.uid() = user_id);

-- 2. Allow authenticated users to insert their own resume
CREATE POLICY "Users can insert their own resume" 
    ON public.resumes 
    FOR INSERT 
    TO authenticated 
    WITH CHECK (auth.uid() = user_id);

-- 3. Allow authenticated users to update their own resume
CREATE POLICY "Users can update their own resume" 
    ON public.resumes 
    FOR UPDATE 
    TO authenticated 
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- 4. Allow authenticated users to delete their own resume
CREATE POLICY "Users can delete their own resume" 
    ON public.resumes 
    FOR DELETE 
    TO authenticated 
    USING (auth.uid() = user_id);
