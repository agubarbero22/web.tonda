-- Schema inicial para la migración desde Supabase
-- Ejecutar en Postgres local: psql $DATABASE_URL -f backend/schema/001_initial.sql

CREATE TABLE IF NOT EXISTS users (
  id        TEXT PRIMARY KEY,
  email     TEXT NOT NULL UNIQUE,
  password  TEXT NOT NULL,
  fullname  TEXT NOT NULL,
  address   TEXT,
  number    TEXT
);

CREATE TABLE IF NOT EXISTS reviews (
  id                     SERIAL PRIMARY KEY,
  rating                 INTEGER NOT NULL,
  enjoyed_most           TEXT NOT NULL,
  improvement_suggestion TEXT,
  would_recommend        BOOLEAN NOT NULL,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
