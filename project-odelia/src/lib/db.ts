import Database from 'better-sqlite3';
import path from 'path';
import { Answer } from '@/types';

// Create database instance
const dbPath = path.join(process.cwd(), 'responses.db');
const db = new Database(dbPath);

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    answer TEXT NOT NULL CHECK(answer IN ('yes', 'no')),
    timestamp TEXT NOT NULL,
    session_id TEXT,
    metadata TEXT
  )
`);

// Prepared statements for better performance
const insertResponse = db.prepare(`
  INSERT INTO responses (answer, timestamp, session_id, metadata)
  VALUES (?, ?, ?, ?)
`);

const getAllResponses = db.prepare(`
  SELECT * FROM responses ORDER BY timestamp DESC
`);

const getStats = db.prepare(`
  SELECT
    COUNT(*) as totalResponses,
    SUM(CASE WHEN answer = 'yes' THEN 1 ELSE 0 END) as yesCount,
    SUM(CASE WHEN answer = 'no' THEN 1 ELSE 0 END) as noCount
  FROM responses
`);

// Database operations
export function saveResponse(
  answer: Answer,
  sessionId?: string,
  metadata?: { dodgeCount?: number; timeToDecide?: number }
) {
  const timestamp = new Date().toISOString();
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
  return getAllResponses.all();
}

// Close database on process exit
process.on('exit', () => {
  db.close();
});

export default db;
