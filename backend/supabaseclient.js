import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://qaysxuifkrgytszwpedv.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFheXN4dWlma3JneXRzendwZWR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyMTQxNzgsImV4cCI6MjA5Mjc5MDE3OH0.EYkbU6x9modhgvV0UpuIe_8PCecw9Xsy5EZ_IL-Jl9k"

export const supabase = createClient(supabaseUrl, supabaseKey)