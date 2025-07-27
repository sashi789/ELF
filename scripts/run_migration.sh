#!/bin/bash

# Database migration script to add username and name fields
# This script should be run after updating the schema

echo "Running database migration to add username and name fields..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "DATABASE_URL not set, using default..."
    export DATABASE_URL="postgresql://user:password@localhost:5432/elf_automation"
fi

# Run the migration
psql $DATABASE_URL -f backend/shared/migration_add_username_name.sql

echo "Migration completed!" 