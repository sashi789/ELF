import { Router } from 'express';
import pool from '../db';

const router = Router();

// NOTE: In production, use a secure key management system for the encryption key
const ENCRYPTION_KEY = process.env.PII_ENCRYPTION_KEY || 'dev_secret_key';

// Simulated attorney matching (replace with real service call later)
async function matchAttorneys(caseDetails: any): Promise<string[]> {
  // In production, call attorney-service and return matched attorney IDs
  // For now, return a fixed list of UUIDs (simulate)
  return [
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222'
  ];
}

router.post('/', async (req, res) => {
  try {
    const { client_info, case_details, documents, created_by } = req.body;
    if (!client_info || !case_details) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    // Encrypt client_info JSON
    const encryptedClientInfoQuery = `pgp_sym_encrypt($1::text, $2)`;
    const encryptedClientInfoResult = await pool.query(
      `SELECT ${encryptedClientInfoQuery} AS encrypted`,
      [JSON.stringify(client_info), ENCRYPTION_KEY]
    );
    const encryptedClientInfo = encryptedClientInfoResult.rows[0].encrypted;

    // Insert case
    const insertQuery = `
      INSERT INTO cases (client_info, case_details, documents, created_by)
      VALUES ($1, $2, $3, $4)
      RETURNING case_id, created_at
    `;
    const result = await pool.query(insertQuery, [
      encryptedClientInfo,
      case_details,
      documents || null,
      created_by || null
    ]);
    res.status(201).json({ case_id: result.rows[0].case_id, created_at: result.rows[0].created_at });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET / - list all cases, optionally filter by client email
router.get('/', async (req, res) => {
  try {
    const ENCRYPTION_KEY = process.env.PII_ENCRYPTION_KEY || 'dev_secret_key';
    const { client_email } = req.query;
    
    let query = `
      SELECT 
        case_id,
        pgp_sym_decrypt(client_info::bytea, $1) AS client_info,
        case_details,
        documents,
        referral_status,
        timeline,
        created_by,
        created_at,
        updated_at
      FROM cases
    `;
    let params = [ENCRYPTION_KEY];
    
    if (typeof client_email === 'string' && client_email) {
      // For filtering by email, we need to decrypt all records and filter in the application
      // This is not efficient for large datasets, but works for now
      query += ' ORDER BY created_at DESC';
    } else {
      query += ' ORDER BY created_at DESC';
    }
    
    const result = await pool.query(query, params);
    
    // Parse decrypted client_info JSON for each row
    let cases = result.rows.map(row => ({
      ...row,
      client_info: (() => { 
        try { 
          return JSON.parse(row.client_info); 
        } catch { 
          return row.client_info; 
        } 
      })()
    }));
    
    // Filter by email if specified (after decryption)
    if (typeof client_email === 'string' && client_email) {
      cases = cases.filter(c => c.client_info && c.client_info.email === client_email);
    }
    
    res.json({ cases });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ENCRYPTION_KEY = process.env.PII_ENCRYPTION_KEY || 'dev_secret_key';
    const query = `
      SELECT 
        case_id,
        pgp_sym_decrypt(client_info::bytea, $2) AS client_info,
        case_details,
        documents,
        referral_status,
        timeline,
        created_by,
        created_at,
        updated_at
      FROM cases WHERE case_id = $1
    `;
    const result = await pool.query(query, [id, ENCRYPTION_KEY]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Case not found' });
    }
    const row = result.rows[0];
    // Parse decrypted client_info JSON
    let client_info = null;
    try {
      client_info = JSON.parse(row.client_info);
    } catch (e) {
      client_info = row.client_info;
    }
    res.json({
      ...row,
      client_info
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /cases/:id/referrals - dispatch referrals to matched attorneys
router.post('/:id/referrals', async (req, res) => {
  try {
    const { id } = req.params;
    // Fetch case details
    const caseResult = await pool.query('SELECT case_id, case_details FROM cases WHERE case_id = $1', [id]);
    if (caseResult.rows.length === 0) {
      return res.status(404).json({ error: 'Case not found' });
    }
    const caseDetails = caseResult.rows[0].case_details;
    // Simulate attorney matching
    const matchedAttorneyIds = await matchAttorneys(caseDetails);
    // Create referral records
    const values = matchedAttorneyIds.map((attorneyId) => `('${id}', '${attorneyId}', 'sent', NOW(), NOW())`).join(',');
    const insertQuery = `
      INSERT INTO referrals (case_id, attorney_id, status, sent_at, created_at, updated_at)
      VALUES ${values}
      RETURNING referral_id, attorney_id, status, sent_at
    `;
    const result = await pool.query(insertQuery);
    res.status(201).json({ referrals: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /cases/:id/referrals - list all referrals for a case
router.get('/:id/referrals', async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT 
        referral_id,
        attorney_id,
        status,
        sent_at,
        opened_at,
        responded_at,
        selected_at,
        contract_signed_at,
        created_at,
        updated_at
      FROM referrals
      WHERE case_id = $1
      ORDER BY sent_at ASC
    `;
    const result = await pool.query(query, [id]);
    res.json({ referrals: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 