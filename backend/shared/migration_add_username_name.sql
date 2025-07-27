-- Migration: Add username and name fields to users table
-- Run this script to update existing databases

-- Add username and name columns to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS username VARCHAR(100);
ALTER TABLE users ADD COLUMN IF NOT EXISTS name VARCHAR(255);

-- Create unique index on username
CREATE UNIQUE INDEX IF NOT EXISTS users_username_idx ON users(username);

-- Update existing users with default values
-- This will set a default username and name for existing users
UPDATE users 
SET 
    username = COALESCE(username, 'user_' || user_id::text),
    name = COALESCE(name, 'User')
WHERE username IS NULL OR name IS NULL;

-- Make username and name NOT NULL after setting default values
ALTER TABLE users ALTER COLUMN username SET NOT NULL;
ALTER TABLE users ALTER COLUMN name SET NOT NULL; 