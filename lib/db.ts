import fs from "node:fs"
import path from "node:path"

import Database from "better-sqlite3"

/**
 * Local storage for /studio. Both the database and the image directory live
 * under `./data`, which is gitignored.
 */
export const DATA_DIR = path.join(process.cwd(), "data")
export const IMAGES_DIR = path.join(DATA_DIR, "images")

const DB_PATH = path.join(DATA_DIR, "studio.db")

/** `status` for a row whose prompt is ready but whose image does not exist yet. */
export const STATUS_PROMPT_READY = "prompt_ready"

export type GenerationRequest = {
  id: number
  userPrompt: string
  generatedPrompt: string | null
  /** Relative or absolute path to the image, once a drawing model writes one. */
  imagePath: string | null
  status: string
  createdAt: string
}

type Row = {
  id: number
  user_prompt: string
  generated_prompt: string | null
  image_path: string | null
  status: string
  created_at: string
}

function toGenerationRequest(row: Row): GenerationRequest {
  return {
    id: row.id,
    userPrompt: row.user_prompt,
    generatedPrompt: row.generated_prompt,
    imagePath: row.image_path,
    status: row.status,
    createdAt: row.created_at,
  }
}

function openDatabase() {
  fs.mkdirSync(IMAGES_DIR, { recursive: true })

  const db = new Database(DB_PATH)
  db.pragma("journal_mode = WAL")
  db.exec(`
    CREATE TABLE IF NOT EXISTS generation_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_prompt TEXT NOT NULL,
      generated_prompt TEXT,
      image_path TEXT,
      status TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `)

  return db
}

// Held on globalThis so a Fast Refresh in dev reuses the handle instead of
// opening a new connection on every edit.
const globalForDb = globalThis as typeof globalThis & {
  studioDb?: Database.Database
}

export function getDb() {
  globalForDb.studioDb ??= openDatabase()
  return globalForDb.studioDb
}

export function insertGenerationRequest(input: {
  userPrompt: string
  generatedPrompt: string
  status: string
}): GenerationRequest {
  const info = getDb()
    .prepare(
      `INSERT INTO generation_requests (user_prompt, generated_prompt, status, created_at)
       VALUES (?, ?, ?, ?)`
    )
    .run(
      input.userPrompt,
      input.generatedPrompt,
      input.status,
      new Date().toISOString()
    )

  const row = getDb()
    .prepare(`SELECT * FROM generation_requests WHERE id = ?`)
    .get(Number(info.lastInsertRowid)) as Row | undefined

  if (!row) {
    throw new Error("the generation_requests row vanished right after insert")
  }

  return toGenerationRequest(row)
}

export function listGenerationRequests(limit = 20): GenerationRequest[] {
  const rows = getDb()
    .prepare(`SELECT * FROM generation_requests ORDER BY id DESC LIMIT ?`)
    .all(limit) as Row[]

  return rows.map(toGenerationRequest)
}
