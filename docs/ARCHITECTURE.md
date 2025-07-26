# ELF Automation Architecture Overview

## High-Level System Design

- **Client Intake**: Google Forms/Gmail → Ingest to backend (Node.js) → Store in PostgreSQL/S3
- **AI Memo Drafting**: Python FastAPI service integrates with Claude AI for OCR, memo drafting, and PII anonymization
- **Referral Dispatch**: Node.js service matches attorneys (Elasticsearch), sends bulk personalized emails, tracks responses
- **Attorney Response**: Replies parsed, scored, and contract triggered via DocuSign
- **Case Monitoring**: Monthly check-ins, milestone tracking, feedback, and notifications

## Services
- **case-service** (Node.js): Case management, intake, notifications, referral status
- **ai-service** (Python): Document ingestion, OCR, memo drafting, PII anonymization
- **attorney-service** (Python): Attorney search, ranking, dispatch, and response parsing

## Data Flow
1. Intake data arrives (Google Forms/Gmail)
2. Backend ingests, stores in PostgreSQL/S3
3. AI service processes documents, drafts memo
4. Human reviews/edits memo in dashboard
5. Referral dispatched to matched attorneys
6. Attorney responses parsed, scored, and selected
7. Case lifecycle tracked, notifications sent

## Security & Compliance
- Field-level encryption for PII
- HIPAA, GDPR, CCPA compliance
- Automated audit trails
- Role-based access control

## Infra
- Docker, Kubernetes, Terraform for deployment
- CI/CD via GitHub Actions
- Monitoring: Datadog, Sentry, ELK Stack 