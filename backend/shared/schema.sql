-- ELF Automation Initial Database Schema (Phase 1)

-- Enable pgcrypto for field-level encryption
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Users (role-based access)
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) NOT NULL, -- e.g., 'intake', 'attorney', 'client', 'admin'
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Cases
CREATE TABLE cases (
    case_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_info BYTEA NOT NULL, -- Encrypted JSON (PII)
    case_details JSONB NOT NULL,
    documents JSONB,
    referral_status VARCHAR(50) DEFAULT 'pending',
    timeline JSONB,
    created_by UUID REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Attorneys
CREATE TABLE attorneys (
    attorney_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile JSONB NOT NULL,
    specialties TEXT[],
    jurisdiction TEXT[],
    performance JSONB,
    availability JSONB,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Referrals
CREATE TABLE referrals (
    referral_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES cases(case_id),
    attorney_id UUID REFERENCES attorneys(attorney_id),
    status VARCHAR(50) DEFAULT 'sent', -- sent, opened, responded, selected, rejected
    sent_at TIMESTAMP,
    opened_at TIMESTAMP,
    responded_at TIMESTAMP,
    selected_at TIMESTAMP,
    contract_signed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Audit Logs (compliance)
CREATE TABLE audit_logs (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id),
    action VARCHAR(255) NOT NULL,
    target_table VARCHAR(50),
    target_id UUID,
    details JSONB,
    created_at TIMESTAMP DEFAULT NOW()
); 