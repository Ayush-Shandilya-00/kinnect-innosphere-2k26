/*
# SafeRide Database Schema

1. Purpose
   Creates the full database backing the SafeRide student transport safety platform.
   All data is fictional/demo for a competition prototype. The app uses frontend-only
   demo auth (localStorage), so policies are scoped to anon + authenticated to allow
   the anon-key client to read and write.

2. New Tables
   - `schools` — registered schools on the platform (id, name, address, phone, status, student count, bus count, admin name/email, joined date)
   - `buses` — school bus fleet (id, number, driver name/phone, route, capacity, occupied, status, GPS lat/lng, speed, next stop, ETA, school FK)
   - `students` — registered students (id, name, grade, section, bus FK, parent name/phone, status, pickup/drop stops, RFID ID)
   - `rfid_events` — RFID scan log (id, student FK, bus FK, type, timestamp, location, status)
   - `alerts` — safety alerts (id, type, title, message, bus FK, student FK, timestamp, resolved, source)
   - `system_users` — platform users: school admins and parents (id, name, email, phone, role, school, status, last login)
   - `login_activity` — login audit log (id, user, role, ip, timestamp, status)
   - `system_events` — system event log (id, event, category, timestamp, severity)
   - `parent_notifications` — notifications sent to parents (id, title, message, timestamp, type, read)

3. Security
   - RLS enabled on every table.
   - All policies use `TO anon, authenticated` with `USING (true)` / `WITH CHECK (true)`
     because this is a single-tenant demo prototype with frontend-only auth — the data
     is intentionally shared/public for the demo.

4. Important Notes
   - All IDs are text-based to match the existing frontend mock data IDs (e.g. 'sch-001', 'bus-001').
   - Timestamps are stored as text to match the frontend's string format.
   - Seed data mirrors the fictional mock data already used in the UI.
*/

-- Schools
CREATE TABLE IF NOT EXISTS schools (
  id text PRIMARY KEY,
  name text NOT NULL,
  address text NOT NULL,
  phone text NOT NULL,
  status text NOT NULL DEFAULT 'Active',
  students int NOT NULL DEFAULT 0,
  buses int NOT NULL DEFAULT 0,
  admin_name text NOT NULL,
  admin_email text NOT NULL,
  joined_date text NOT NULL,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_schools" ON schools;
CREATE POLICY "anon_select_schools" ON schools FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_schools" ON schools;
CREATE POLICY "anon_insert_schools" ON schools FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_schools" ON schools;
CREATE POLICY "anon_update_schools" ON schools FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_schools" ON schools;
CREATE POLICY "anon_delete_schools" ON schools FOR DELETE TO anon, authenticated USING (true);

-- Buses
CREATE TABLE IF NOT EXISTS buses (
  id text PRIMARY KEY,
  number text NOT NULL,
  driver_name text NOT NULL,
  driver_phone text NOT NULL,
  route text NOT NULL,
  capacity int NOT NULL DEFAULT 30,
  occupied int NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'Idle',
  lat double precision NOT NULL DEFAULT 0,
  lng double precision NOT NULL DEFAULT 0,
  speed double precision NOT NULL DEFAULT 0,
  next_stop text NOT NULL DEFAULT '—',
  eta text NOT NULL DEFAULT '—',
  school_id text REFERENCES schools(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE buses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_buses" ON buses;
CREATE POLICY "anon_select_buses" ON buses FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_buses" ON buses;
CREATE POLICY "anon_insert_buses" ON buses FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_buses" ON buses;
CREATE POLICY "anon_update_buses" ON buses FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_buses" ON buses;
CREATE POLICY "anon_delete_buses" ON buses FOR DELETE TO anon, authenticated USING (true);

-- Students
CREATE TABLE IF NOT EXISTS students (
  id text PRIMARY KEY,
  name text NOT NULL,
  grade text NOT NULL,
  section text NOT NULL,
  bus_id text REFERENCES buses(id) ON DELETE SET NULL,
  parent_id text,
  parent_name text NOT NULL,
  parent_phone text NOT NULL,
  status text NOT NULL DEFAULT 'Waiting',
  pickup_stop text NOT NULL,
  drop_stop text NOT NULL,
  photo text NOT NULL DEFAULT '',
  rfid_id text NOT NULL,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_students" ON students;
CREATE POLICY "anon_select_students" ON students FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_students" ON students;
CREATE POLICY "anon_insert_students" ON students FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_students" ON students;
CREATE POLICY "anon_update_students" ON students FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_students" ON students;
CREATE POLICY "anon_delete_students" ON students FOR DELETE TO anon, authenticated USING (true);

-- RFID Events
CREATE TABLE IF NOT EXISTS rfid_events (
  id text PRIMARY KEY,
  student_id text REFERENCES students(id) ON DELETE CASCADE,
  student_name text NOT NULL,
  bus_id text REFERENCES buses(id) ON DELETE CASCADE,
  bus_number text NOT NULL,
  type text NOT NULL,
  timestamp text NOT NULL,
  location text NOT NULL,
  status text NOT NULL DEFAULT 'success',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE rfid_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_rfid_events" ON rfid_events;
CREATE POLICY "anon_select_rfid_events" ON rfid_events FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_rfid_events" ON rfid_events;
CREATE POLICY "anon_insert_rfid_events" ON rfid_events FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_rfid_events" ON rfid_events;
CREATE POLICY "anon_update_rfid_events" ON rfid_events FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_rfid_events" ON rfid_events;
CREATE POLICY "anon_delete_rfid_events" ON rfid_events FOR DELETE TO anon, authenticated USING (true);

-- Alerts
CREATE TABLE IF NOT EXISTS alerts (
  id text PRIMARY KEY,
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  bus_id text REFERENCES buses(id) ON DELETE SET NULL,
  student_id text REFERENCES students(id) ON DELETE SET NULL,
  timestamp text NOT NULL,
  resolved boolean NOT NULL DEFAULT false,
  source text NOT NULL,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_alerts" ON alerts;
CREATE POLICY "anon_select_alerts" ON alerts FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_alerts" ON alerts;
CREATE POLICY "anon_insert_alerts" ON alerts FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_alerts" ON alerts;
CREATE POLICY "anon_update_alerts" ON alerts FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_alerts" ON alerts;
CREATE POLICY "anon_delete_alerts" ON alerts FOR DELETE TO anon, authenticated USING (true);

-- System Users
CREATE TABLE IF NOT EXISTS system_users (
  id text PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  role text NOT NULL,
  school text NOT NULL,
  status text NOT NULL DEFAULT 'Active',
  last_login text NOT NULL,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE system_users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_system_users" ON system_users;
CREATE POLICY "anon_select_system_users" ON system_users FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_system_users" ON system_users;
CREATE POLICY "anon_insert_system_users" ON system_users FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_system_users" ON system_users;
CREATE POLICY "anon_update_system_users" ON system_users FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_system_users" ON system_users;
CREATE POLICY "anon_delete_system_users" ON system_users FOR DELETE TO anon, authenticated USING (true);

-- Login Activity
CREATE TABLE IF NOT EXISTS login_activity (
  id text PRIMARY KEY,
  user_name text NOT NULL,
  role text NOT NULL,
  ip text NOT NULL,
  timestamp text NOT NULL,
  status text NOT NULL,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE login_activity ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_login_activity" ON login_activity;
CREATE POLICY "anon_select_login_activity" ON login_activity FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_login_activity" ON login_activity;
CREATE POLICY "anon_insert_login_activity" ON login_activity FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_login_activity" ON login_activity;
CREATE POLICY "anon_update_login_activity" ON login_activity FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_login_activity" ON login_activity;
CREATE POLICY "anon_delete_login_activity" ON login_activity FOR DELETE TO anon, authenticated USING (true);

-- System Events
CREATE TABLE IF NOT EXISTS system_events (
  id text PRIMARY KEY,
  event text NOT NULL,
  category text NOT NULL,
  timestamp text NOT NULL,
  severity text NOT NULL DEFAULT 'low',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE system_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_system_events" ON system_events;
CREATE POLICY "anon_select_system_events" ON system_events FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_system_events" ON system_events;
CREATE POLICY "anon_insert_system_events" ON system_events FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_system_events" ON system_events;
CREATE POLICY "anon_update_system_events" ON system_events FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_system_events" ON system_events;
CREATE POLICY "anon_delete_system_events" ON system_events FOR DELETE TO anon, authenticated USING (true);

-- Parent Notifications
CREATE TABLE IF NOT EXISTS parent_notifications (
  id text PRIMARY KEY,
  title text NOT NULL,
  message text NOT NULL,
  timestamp text NOT NULL,
  type text NOT NULL DEFAULT 'info',
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE parent_notifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_parent_notifications" ON parent_notifications;
CREATE POLICY "anon_select_parent_notifications" ON parent_notifications FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_parent_notifications" ON parent_notifications;
CREATE POLICY "anon_insert_parent_notifications" ON parent_notifications FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_parent_notifications" ON parent_notifications;
CREATE POLICY "anon_update_parent_notifications" ON parent_notifications FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_parent_notifications" ON parent_notifications;
CREATE POLICY "anon_delete_parent_notifications" ON parent_notifications FOR DELETE TO anon, authenticated USING (true);

-- Indexes for frequently queried columns
CREATE INDEX IF NOT EXISTS idx_buses_school_id ON buses(school_id);
CREATE INDEX IF NOT EXISTS idx_students_bus_id ON students(bus_id);
CREATE INDEX IF NOT EXISTS idx_rfid_events_student_id ON rfid_events(student_id);
CREATE INDEX IF NOT EXISTS idx_rfid_events_bus_id ON rfid_events(bus_id);
CREATE INDEX IF NOT EXISTS idx_alerts_bus_id ON alerts(bus_id);
CREATE INDEX IF NOT EXISTS idx_alerts_student_id ON alerts(student_id);
CREATE INDEX IF NOT EXISTS idx_alerts_resolved ON alerts(resolved);
CREATE INDEX IF NOT EXISTS idx_system_users_school ON system_users(school);
