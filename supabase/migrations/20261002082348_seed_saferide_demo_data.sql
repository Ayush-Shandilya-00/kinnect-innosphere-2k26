/*
# Seed Kinnect Demo Data

1. Purpose
   Populates all tables with the fictional demo data matching the existing frontend mock data.
   All names, phone numbers, and emails are fictional — for competition prototype use only.

2. Tables Seeded
   - schools: 4 schools (The Oriental School in Bhopal + 3 others)
   - buses: 5 buses with MP plates, Bhopal routes
   - students: 8 fictional students with Bhopal pickup stops
   - rfid_events: 8 RFID scan events
   - alerts: 5 safety alerts
   - system_users: 8 platform users (school admins + parents)
   - login_activity: 7 login records
   - system_events: 6 system events
   - parent_notifications: 3 parent notifications

3. Important Notes
   - Uses ON CONFLICT DO NOTHING so re-running is safe.
   - All data is fictional for demo/competition purposes.
*/

INSERT INTO schools (id, name, address, phone, status, students, buses, admin_name, admin_email, joined_date) VALUES
  ('sch-001', 'The Oriental School', 'Opp. Patel Nagar, Raisen Road, Bhopal, MP 462016', '+91 9XXX XXX 001', 'Active', 248, 8, 'Rajesh Kumar', 'admin@orientalschool.edu', '2024-06-15'),
  ('sch-002', 'Greenwood International', '45 Park Street, Mumbai, MH 400001', '+91 9XXX XXX 002', 'Active', 312, 10, 'Priya Mehta', 'admin@greenwood.edu', '2024-07-02'),
  ('sch-003', 'St. Xavier Academy', '78 Church Road, Delhi, DL 110001', '+91 9XXX XXX 003', 'Active', 186, 6, 'Father Thomas', 'admin@stxavier.edu', '2024-08-19'),
  ('sch-004', 'Sunrise Public School', '23 Lake View, Chennai, TN 600001', '+91 9XXX XXX 004', 'Inactive', 0, 0, 'Anita Reddy', 'admin@sunrise.edu', '2024-09-10')
ON CONFLICT (id) DO NOTHING;

INSERT INTO buses (id, number, driver_name, driver_phone, route, capacity, occupied, status, lat, lng, speed, next_stop, eta, school_id) VALUES
  ('bus-001', 'MP-04-KA-1234', 'Suresh Yadav', '+91 9XXX XXX 101', 'Route A — Anand Nagar → The Oriental School', 30, 22, 'On Route', 23.2586, 77.4750, 32, 'Kolar Road', '8 min', 'sch-001'),
  ('bus-002', 'MP-04-CD-5678', 'Mohan Das', '+91 9XXX XXX 102', 'Route B — Patel Nagar → The Oriental School', 30, 18, 'On Route', 23.2420, 77.4480, 28, 'MP Nagar', '12 min', 'sch-001'),
  ('bus-003', 'MP-04-EF-9012', 'Ramesh Pillai', '+91 9XXX XXX 103', 'Route C — Bairagarh → The Oriental School', 25, 15, 'On Route', 23.2850, 77.4100, 35, 'Arera Colony', '18 min', 'sch-001'),
  ('bus-004', 'MP-04-GH-3456', 'Anil Kumar', '+91 9XXX XXX 104', 'Route D — Shahpura → The Oriental School', 30, 0, 'At School', 23.2600, 77.4700, 0, '—', '—', 'sch-001'),
  ('bus-005', 'MP-04-IJ-7890', 'Gopal Swamy', '+91 9XXX XXX 105', 'Route E — Ward 6 → The Oriental School', 25, 0, 'Maintenance', 23.2300, 77.4900, 0, '—', '—', 'sch-001')
ON CONFLICT (id) DO NOTHING;

INSERT INTO students (id, name, grade, section, bus_id, parent_id, parent_name, parent_phone, status, pickup_stop, drop_stop, photo, rfid_id) VALUES
  ('stu-001', 'Aarav Sharma', 'Grade 5', 'B', 'bus-001', 'par-001', 'Neha Sharma', '+91 9XXX XXX 001', 'On Bus', 'Anand Nagar', 'The Oriental School', 'AS', 'RFID-A001'),
  ('stu-002', 'Diya Patel', 'Grade 3', 'A', 'bus-001', 'par-002', 'Vikram Patel', '+91 9XXX XXX 002', 'On Bus', 'Kolar Road', 'The Oriental School', 'DP', 'RFID-A002'),
  ('stu-003', 'Arjun Nair', 'Grade 6', 'C', 'bus-002', 'par-003', 'Lakshmi Nair', '+91 9XXX XXX 003', 'Dropped Off', 'Patel Nagar', 'The Oriental School', 'AN', 'RFID-A003'),
  ('stu-004', 'Saanvi Gupta', 'Grade 4', 'A', 'bus-001', 'par-004', 'Manish Gupta', '+91 9XXX XXX 004', 'On Bus', 'Ward 6', 'The Oriental School', 'SG', 'RFID-A004'),
  ('stu-005', 'Vihaan Reddy', 'Grade 7', 'B', 'bus-002', 'par-005', 'Sneha Reddy', '+91 9XXX XXX 005', 'Dropped Off', 'Shahpura', 'The Oriental School', 'VR', 'RFID-A005'),
  ('stu-006', 'Ananya Iyer', 'Grade 2', 'A', 'bus-003', 'par-006', 'Karthik Iyer', '+91 9XXX XXX 006', 'Absent', 'Arera Colony', 'The Oriental School', 'AI', 'RFID-A006'),
  ('stu-007', 'Reyansh Singh', 'Grade 5', 'A', 'bus-002', 'par-007', 'Pooja Singh', '+91 9XXX XXX 007', 'On Bus', 'MP Nagar', 'The Oriental School', 'RS', 'RFID-A007'),
  ('stu-008', 'Ishita Verma', 'Grade 3', 'B', 'bus-003', 'par-008', 'Rohit Verma', '+91 9XXX XXX 008', 'Waiting', 'Bairagarh', 'The Oriental School', 'IV', 'RFID-A008')
ON CONFLICT (id) DO NOTHING;

INSERT INTO rfid_events (id, student_id, student_name, bus_id, bus_number, type, timestamp, location, status) VALUES
  ('rfid-001', 'stu-001', 'Aarav Sharma', 'bus-001', 'MP-04-KA-1234', 'Boarded', '2026-10-02 07:42:15', 'Anand Nagar', 'success'),
  ('rfid-002', 'stu-002', 'Diya Patel', 'bus-001', 'MP-04-KA-1234', 'Boarded', '2026-10-02 07:38:22', 'Kolar Road', 'success'),
  ('rfid-003', 'stu-004', 'Saanvi Gupta', 'bus-001', 'MP-04-KA-1234', 'Boarded', '2026-10-02 07:31:08', 'Ward 6', 'success'),
  ('rfid-004', 'stu-003', 'Arjun Nair', 'bus-002', 'MP-04-CD-5678', 'Exited', '2026-10-02 08:15:45', 'The Oriental School', 'success'),
  ('rfid-005', 'stu-005', 'Vihaan Reddy', 'bus-002', 'MP-04-CD-5678', 'Exited', '2026-10-02 08:16:02', 'The Oriental School', 'success'),
  ('rfid-006', 'stu-007', 'Reyansh Singh', 'bus-002', 'MP-04-CD-5678', 'Boarded', '2026-10-02 07:25:30', 'MP Nagar', 'success'),
  ('rfid-007', 'stu-006', 'Ananya Iyer', 'bus-003', 'MP-04-EF-9012', 'Missed Scan', '2026-10-02 07:50:00', 'Arera Colony', 'warning'),
  ('rfid-008', 'stu-008', 'Ishita Verma', 'bus-003', 'MP-04-EF-9012', 'Boarded', '2026-10-02 07:20:15', 'Bairagarh', 'success')
ON CONFLICT (id) DO NOTHING;

INSERT INTO alerts (id, type, title, message, bus_id, student_id, timestamp, resolved, source) VALUES
  ('alert-001', 'warning', 'Missed RFID Scan', 'Ananya Iyer (Grade 2-A) boarded Bus MP-04-EF-9012 without a valid RFID scan at Arera Colony.', 'bus-003', 'stu-006', '2026-10-02 07:50:00', false, 'RFID System'),
  ('alert-002', 'critical', 'Bus Delayed', 'Bus MP-04-EF-9012 (Route C) is running 15+ minutes behind schedule due to heavy traffic on Raisen Road.', 'bus-003', NULL, '2026-10-02 08:05:00', false, 'GPS Tracking'),
  ('alert-003', 'info', 'All Students Boarded', 'Bus MP-04-KA-1234 (Route A) has completed all pickups. 22 students on board, heading to The Oriental School.', 'bus-001', NULL, '2026-10-02 07:45:00', true, 'Fleet Management'),
  ('alert-004', 'warning', 'Speed Limit Exceeded', 'Bus MP-04-CD-5678 exceeded the speed limit (40 km/h) on Patel Nagar road. Current speed: 48 km/h.', 'bus-002', NULL, '2026-10-02 07:55:00', false, 'GPS Tracking'),
  ('alert-005', 'info', 'Bus Arrived at School', 'Bus MP-04-CD-5678 arrived at The Oriental School. All 18 students safely dropped off.', 'bus-002', NULL, '2026-10-02 08:15:00', true, 'Fleet Management')
ON CONFLICT (id) DO NOTHING;

INSERT INTO system_users (id, name, email, phone, role, school, status, last_login) VALUES
  ('usr-001', 'Rajesh Kumar', 'admin@orientalschool.edu', '+91 9XXX XXX 001', 'School Admin', 'The Oriental School', 'Active', '2026-10-02 08:30'),
  ('usr-002', 'Neha Sharma', 'neha.sharma@email.com', '+91 9XXX XXX 001', 'Parent', 'The Oriental School', 'Active', '2026-10-02 08:15'),
  ('usr-003', 'Vikram Patel', 'vikram.patel@email.com', '+91 9XXX XXX 002', 'Parent', 'The Oriental School', 'Active', '2026-10-02 07:45'),
  ('usr-004', 'Priya Mehta', 'admin@greenwood.edu', '+91 9XXX XXX 002', 'School Admin', 'Greenwood International', 'Active', '2026-10-02 08:20'),
  ('usr-005', 'Sneha Reddy', 'sneha.reddy@email.com', '+91 9XXX XXX 005', 'Parent', 'The Oriental School', 'Active', '2026-10-02 07:30'),
  ('usr-006', 'Anita Reddy', 'admin@sunrise.edu', '+91 9XXX XXX 004', 'School Admin', 'Sunrise Public School', 'Inactive', '2026-09-28 16:00'),
  ('usr-007', 'Father Thomas', 'admin@stxavier.edu', '+91 9XXX XXX 003', 'School Admin', 'St. Xavier Academy', 'Active', '2026-10-02 08:10'),
  ('usr-008', 'Lakshmi Nair', 'lakshmi.nair@email.com', '+91 9XXX XXX 003', 'Parent', 'The Oriental School', 'Active', '2026-10-02 07:50')
ON CONFLICT (id) DO NOTHING;

INSERT INTO login_activity (id, user_name, role, ip, timestamp, status) VALUES
  ('la-001', 'The Oriental School', 'School', '103.21.xxx.xx', '2026-10-02 08:30:15', 'Success'),
  ('la-002', 'Neha Sharma', 'Parent', '106.51.xxx.xx', '2026-10-02 08:15:42', 'Success'),
  ('la-003', 'Kinnect Administrator', 'Admin', '49.207.xx.xx', '2026-10-02 09:00:01', 'Success'),
  ('la-004', 'Priya Mehta', 'School', '14.139.xxx.xx', '2026-10-02 08:20:33', 'Success'),
  ('la-005', 'unknown', 'School', '103.21.xxx.xx', '2026-10-02 08:28:10', 'Failed'),
  ('la-006', 'Vikram Patel', 'Parent', '106.51.xxx.xx', '2026-10-02 07:45:22', 'Success'),
  ('la-007', 'Father Thomas', 'School', '59.144.xx.xx', '2026-10-02 08:10:05', 'Success')
ON CONFLICT (id) DO NOTHING;

INSERT INTO system_events (id, event, category, timestamp, severity) VALUES
  ('ev-001', 'RFID scanner firmware updated on 12 devices', 'Maintenance', '2026-10-02 06:00:00', 'low'),
  ('ev-002', 'New school registered: Sunrise Public School', 'Registration', '2026-09-10 14:30:00', 'low'),
  ('ev-003', 'Bus MP-04-IJ-7890 marked for maintenance', 'Fleet', '2026-10-01 18:00:00', 'medium'),
  ('ev-004', 'Speed alert threshold updated to 40 km/h', 'Configuration', '2026-09-28 10:00:00', 'low'),
  ('ev-005', 'Database backup completed successfully', 'System', '2026-10-02 02:00:00', 'low'),
  ('ev-006', 'Failed login attempt from unknown IP', 'Security', '2026-10-02 08:28:10', 'high')
ON CONFLICT (id) DO NOTHING;

INSERT INTO parent_notifications (id, title, message, timestamp, type, read) VALUES
  ('n-001', 'Aarav boarded the bus', 'Aarav Sharma boarded Bus MP-04-KA-1234 at Anand Nagar at 07:42 AM.', '2026-10-02 07:42', 'info', false),
  ('n-002', 'Bus on the way to school', 'Bus MP-04-KA-1234 is on route to The Oriental School. ETA: 8 minutes.', '2026-10-02 07:45', 'info', false),
  ('n-003', 'Speed alert resolved', 'The bus driver has reduced speed to within the limit. No further action needed.', '2026-10-02 07:50', 'success', true)
ON CONFLICT (id) DO NOTHING;
