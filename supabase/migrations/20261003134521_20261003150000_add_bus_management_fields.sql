/*
# Add bus management details

1. Purpose
   - Extend the existing `buses` table so administrators can manage registration details, transport stops, and RFID/GPS device identification.
   - Preserve all existing bus records and values.

2. Modified Tables
   - `buses.registration_number` (text, optional): vehicle registration number.
   - `buses.pickup_stops` (text, optional): pickup stop list or route stop description.
   - `buses.drop_stops` (text, optional): drop stop list or route stop description.
   - `buses.device_id` (text, optional): RFID/GPS device identifier.

3. Security
   - Existing anon/authenticated CRUD policies on `buses` remain in place.
   - No new table or access policy is introduced.

4. Important Notes
   - Uses conditional column creation so the migration is safe to apply once.
   - No columns are removed, renamed, or type-changed.
*/

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'buses' AND column_name = 'registration_number') THEN
    ALTER TABLE buses ADD COLUMN registration_number text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'buses' AND column_name = 'pickup_stops') THEN
    ALTER TABLE buses ADD COLUMN pickup_stops text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'buses' AND column_name = 'drop_stops') THEN
    ALTER TABLE buses ADD COLUMN drop_stops text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'buses' AND column_name = 'device_id') THEN
    ALTER TABLE buses ADD COLUMN device_id text;
  END IF;
END $$;