import { Answer } from '@/types';

// Check if we're in a serverless environment (Vercel)
const isServerless = process.env.VERCEL === '1' || process.env.AWS_LAMBDA_FUNCTION_NAME;

// Database is disabled in serverless environments
let db: any = null;
let insertResponse: any = null;
let getAllResponses: any = null;
let getStats: any = null;

// Only initialize database in non-serverless environments
if (!isServerless) {
  try {
    const Database = require('better-sqlite3');
    const path = require('path');

    const dbPath = path.join(process.cwd(), 'responses.db');
    db = new Database(dbPath);

    db.exec(`
      CREATE TABLE IF NOT EXISTS responses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        answer TEXT NOT NULL CHECK(answer IN ('yes', 'no')),
        timestamp TEXT NOT NULL,
        session_id TEXT,
        metadata TEXT
      )
    `);

    insertResponse = db.prepare(`
      INSERT INTO responses (answer, timestamp, session_id, metadata)
      VALUES (?, ?, ?, ?)
    `);

    getAllResponses = db.prepare(`
      SELECT * FROM responses ORDER BY timestamp DESC
    `);

    getStats = db.prepare(`
      SELECT
        COUNT(*) as totalResponses,
        SUM(CASE WHEN answer = 'yes' THEN 1 ELSE 0 END) as yesCount,
        SUM(CASE WHEN answer = 'no' THEN 1 ELSE 0 END) as noCount
      FROM responses
    `);

    process.on('exit', () => {
      if (db) db.close();
    });

    console.log('Database initialized successfully');
  } catch (error) {
    console.log('Database initialization failed, continuing without DB');
  }
} else {
  console.log('Serverless environment detected, skipping database');
}

export function saveResponse(
  answer: Answer,
  sessionId?: string,
  metadata?: { dodgeCount?: number; timeToDecide?: number }
) {
  const timestamp = new Date().toISOString();

  if (!insertResponse) {
    return { id: 0, answer, timestamp, sessionId, metadata };
  }

  const metadataJson = metadata ? JSON.stringify(metadata) : null;
  const result = insertResponse.run(answer, timestamp, sessionId || null, metadataJson);

  return {
    id: Number(result.lastInsertRowid),
    answer,
    timestamp,
    sessionId,
    metadata,
  };
}

export function getResponseStats() {
  if (!getStats) {
    return {
      totalResponses: 0,
      yesCount: 0,
      noCount: 0,
      yesPercentage: 0,
      lastUpdated: new Date().toISOString(),
    };
  }

  const stats = getStats.get() as {
    totalResponses: number;
    yesCount: number;
    noCount: number;
  };

  return {
    totalResponses: stats.totalResponses,
    yesCount: stats.yesCount,
    noCount: stats.noCount,
    yesPercentage:
      stats.totalResponses > 0
        ? Math.round((stats.yesCount / stats.totalResponses) * 100)
        : 0,
    lastUpdated: new Date().toISOString(),
  };
}

export function getAllResponsesList() {
  if (!getAllResponses) {
    return [];
  }
  return getAllResponses.all();
}

export default db;
