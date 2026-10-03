/*
# Add school_id to system_users and student_id to parent_notifications

1. Purpose
   - Add `school_id` column to `system_users` so users can be properly linked to a school via foreign key (currently `school` is just a text name).
   - Add `student_id` column to `parent_notifications` so notifications can be linked to specific students for per-parent filtering.
   - Backfill `school_id` for existing rows based on the `school` text column.

2. Tables Modified
   - `system_users`: new column `school_id` (text, nullable, FK to schools.id ON DELETE SET NULL)
   - `parent_notifications`: new column `student_id` (text, nullable, FK to students.id ON DELETE CASCADE)

3. Important Notes
   - Uses DO $$ block to conditionally add columns only if they don't already exist (idempotent).
   - Backfill maps school names to school IDs for existing seed data.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'system_users' AND column_name = 'school_id'
  ) THEN
    ALTER TABLE system_users ADD COLUMN school_id text REFERENCES schools(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Backfill school_id from school name
UPDATE system_users SET school_id = 'sch-001' WHERE school = 'The Oriental School' AND school_id IS NULL;
UPDATE system_users SET school_id = 'sch-002' WHERE school = 'Greenwood International' AND school_id IS NULL;
UPDATE system_users SET school_id = 'sch-003' WHERE school = 'St. Xavier Academy' AND school_id IS NULL;
UPDATE system_users SET school_id = 'sch-004' WHERE school = 'Sunrise Public School' AND school_id IS NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'parent_notifications' AND column_name = 'student_id'
  ) THEN
    ALTER TABLE parent_notifications ADD COLUMN student_id text REFERENCES students(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Backfill student_id for existing parent notifications (all belong to stu-001 / Aarav Sharma)
UPDATE parent_notifications SET student_id = 'stu-001' WHERE student_id IS NULL;
