export type Role = 'school' | 'parent' | 'admin';

export interface User {
  username: string;
  password: string;
  role: Role;
  displayName: string;
  schoolId?: string;
  childId?: string;
}

export const DEMO_USERS: Record<string, User> = {
  school: {
    username: 'school',
    password: '1111',
    role: 'school',
    displayName: 'Ritu',
    schoolId: 'sch-001',
  },
  parent: {
    username: 'parent',
    password: '2222',
    role: 'parent',
    displayName: 'Neha Sharma',
    childId: 'stu-001',
  },
  admin: {
    username: 'admin',
    password: '0000',
    role: 'admin',
    displayName: 'Kinnect Administrator',
  },
};

export interface School {
  id: string;
  name: string;
  address: string;
  phone: string;
  status: 'Active' | 'Inactive';
  students: number;
  buses: number;
  adminName: string;
  adminEmail: string;
  joinedDate: string;
}

export const SCHOOLS: School[] = [
  {
    id: 'sch-001',
    name: 'The Oriental School',
    address: 'Opp. Patel Nagar, Raisen Road, Bhopal, MP 462016',
    phone: '+91 9XXX XXX 001',
    status: 'Active',
    students: 248,
    buses: 8,
    adminName: 'Rajesh Kumar',
    adminEmail: 'admin@orientalschool.edu',
    joinedDate: '2024-06-15',
  },
  {
    id: 'sch-002',
    name: 'Greenwood International',
    address: '45 Park Street, Mumbai, MH 400001',
    phone: '+91 9XXX XXX 002',
    status: 'Active',
    students: 312,
    buses: 10,
    adminName: 'Priya Mehta',
    adminEmail: 'admin@greenwood.edu',
    joinedDate: '2024-07-02',
  },
  {
    id: 'sch-003',
    name: 'St. Xavier Academy',
    address: '78 Church Road, Delhi, DL 110001',
    phone: '+91 9XXX XXX 003',
    status: 'Active',
    students: 186,
    buses: 6,
    adminName: 'Father Thomas',
    adminEmail: 'admin@stxavier.edu',
    joinedDate: '2024-08-19',
  },
  {
    id: 'sch-004',
    name: 'Sunrise Public School',
    address: '23 Lake View, Chennai, TN 600001',
    phone: '+91 9XXX XXX 004',
    status: 'Inactive',
    students: 0,
    buses: 0,
    adminName: 'Anita Reddy',
    adminEmail: 'admin@sunrise.edu',
    joinedDate: '2024-09-10',
  },
];

export interface Student {
  id: string;
  name: string;
  grade: string;
  section: string;
  busId: string;
  parentId: string;
  parentName: string;
  parentPhone: string;
  status: 'On Bus' | 'Dropped Off' | 'Absent' | 'Waiting';
  pickupStop: string;
  dropStop: string;
  photo: string;
  rfidId: string;
}

export const STUDENTS: Student[] = [
  {
    id: 'stu-001',
    name: 'Aarav Sharma',
    grade: 'Grade 5',
    section: 'B',
    busId: 'bus-001',
    parentId: 'par-001',
    parentName: 'Neha Sharma',
    parentPhone: '+91 9XXX XXX 001',
    status: 'On Bus',
    pickupStop: 'Anand Nagar',
    dropStop: 'The Oriental School',
    photo: 'AS',
    rfidId: 'RFID-A001',
  },
  {
    id: 'stu-002',
    name: 'Diya Patel',
    grade: 'Grade 3',
    section: 'A',
    busId: 'bus-001',
    parentId: 'par-002',
    parentName: 'Vikram Patel',
    parentPhone: '+91 9XXX XXX 002',
    status: 'On Bus',
    pickupStop: 'Kolar Road',
    dropStop: 'The Oriental School',
    photo: 'DP',
    rfidId: 'RFID-A002',
  },
  {
    id: 'stu-003',
    name: 'Arjun Nair',
    grade: 'Grade 6',
    section: 'C',
    busId: 'bus-002',
    parentId: 'par-003',
    parentName: 'Lakshmi Nair',
    parentPhone: '+91 9XXX XXX 003',
    status: 'Dropped Off',
    pickupStop: 'Patel Nagar',
    dropStop: 'The Oriental School',
    photo: 'AN',
    rfidId: 'RFID-A003',
  },
  {
    id: 'stu-004',
    name: 'Saanvi Gupta',
    grade: 'Grade 4',
    section: 'A',
    busId: 'bus-001',
    parentId: 'par-004',
    parentName: 'Manish Gupta',
    parentPhone: '+91 9XXX XXX 004',
    status: 'On Bus',
    pickupStop: 'Ward 6',
    dropStop: 'The Oriental School',
    photo: 'SG',
    rfidId: 'RFID-A004',
  },
  {
    id: 'stu-005',
    name: 'Vihaan Reddy',
    grade: 'Grade 7',
    section: 'B',
    busId: 'bus-002',
    parentId: 'par-005',
    parentName: 'Sneha Reddy',
    parentPhone: '+91 9XXX XXX 005',
    status: 'Dropped Off',
    pickupStop: 'Shahpura',
    dropStop: 'The Oriental School',
    photo: 'VR',
    rfidId: 'RFID-A005',
  },
  {
    id: 'stu-006',
    name: 'Ananya Iyer',
    grade: 'Grade 2',
    section: 'A',
    busId: 'bus-003',
    parentId: 'par-006',
    parentName: 'Karthik Iyer',
    parentPhone: '+91 9XXX XXX 006',
    status: 'Absent',
    pickupStop: 'Arera Colony',
    dropStop: 'The Oriental School',
    photo: 'AI',
    rfidId: 'RFID-A006',
  },
  {
    id: 'stu-007',
    name: 'Reyansh Singh',
    grade: 'Grade 5',
    section: 'A',
    busId: 'bus-002',
    parentId: 'par-007',
    parentName: 'Pooja Singh',
    parentPhone: '+91 9XXX XXX 007',
    status: 'On Bus',
    pickupStop: 'MP Nagar',
    dropStop: 'The Oriental School',
    photo: 'RS',
    rfidId: 'RFID-A007',
  },
  {
    id: 'stu-008',
    name: 'Ishita Verma',
    grade: 'Grade 3',
    section: 'B',
    busId: 'bus-003',
    parentId: 'par-008',
    parentName: 'Rohit Verma',
    parentPhone: '+91 9XXX XXX 008',
    status: 'Waiting',
    pickupStop: 'Bairagarh',
    dropStop: 'The Oriental School',
    photo: 'IV',
    rfidId: 'RFID-A008',
  },
];

export interface Bus {
  id: string;
  number: string;
  driverName: string;
  driverPhone: string;
  route: string;
  capacity: number;
  occupied: number;
  status: 'On Route' | 'At School' | 'Idle' | 'Maintenance';
  lat: number;
  lng: number;
  speed: number;
  nextStop: string;
  eta: string;
  schoolId: string;
  registrationNumber?: string;
  pickupStops?: string;
  dropStops?: string;
  deviceId?: string;
}

export const BUSES: Bus[] = [
  {
    id: 'bus-001',
    number: 'MP-04-KA-1234',
    driverName: 'Suresh Yadav',
    driverPhone: '+91 9XXX XXX 101',
    route: 'Route A — Anand Nagar → The Oriental School',
    capacity: 30,
    occupied: 22,
    status: 'On Route',
    lat: 23.2586,
    lng: 77.4750,
    speed: 32,
    nextStop: 'Kolar Road',
    eta: '8 min',
    schoolId: 'sch-001',
  },
  {
    id: 'bus-002',
    number: 'MP-04-CD-5678',
    driverName: 'Mohan Das',
    driverPhone: '+91 9XXX XXX 102',
    route: 'Route B — Patel Nagar → The Oriental School',
    capacity: 30,
    occupied: 18,
    status: 'On Route',
    lat: 23.2420,
    lng: 77.4480,
    speed: 28,
    nextStop: 'MP Nagar',
    eta: '12 min',
    schoolId: 'sch-001',
  },
  {
    id: 'bus-003',
    number: 'MP-04-EF-9012',
    driverName: 'Ramesh Pillai',
    driverPhone: '+91 9XXX XXX 103',
    route: 'Route C — Bairagarh → The Oriental School',
    capacity: 25,
    occupied: 15,
    status: 'On Route',
    lat: 23.2850,
    lng: 77.4100,
    speed: 35,
    nextStop: 'Arera Colony',
    eta: '18 min',
    schoolId: 'sch-001',
  },
  {
    id: 'bus-004',
    number: 'MP-04-GH-3456',
    driverName: 'Anil Kumar',
    driverPhone: '+91 9XXX XXX 104',
    route: 'Route D — Shahpura → The Oriental School',
    capacity: 30,
    occupied: 0,
    status: 'At School',
    lat: 23.2600,
    lng: 77.4700,
    speed: 0,
    nextStop: '—',
    eta: '—',
    schoolId: 'sch-001',
  },
  {
    id: 'bus-005',
    number: 'MP-04-IJ-7890',
    driverName: 'Gopal Swamy',
    driverPhone: '+91 9XXX XXX 105',
    route: 'Route E — Ward 6 → The Oriental School',
    capacity: 25,
    occupied: 0,
    status: 'Maintenance',
    lat: 23.2300,
    lng: 77.4900,
    speed: 0,
    nextStop: '—',
    eta: '—',
    schoolId: 'sch-001',
  },
];

export interface RFIDEvent {
  id: string;
  studentId: string;
  studentName: string;
  busId: string;
  busNumber: string;
  type: 'Boarded' | 'Exited' | 'Missed Scan';
  timestamp: string;
  location: string;
  status: 'success' | 'warning' | 'error';
}

export const RFID_EVENTS: RFIDEvent[] = [
  {
    id: 'rfid-001',
    studentId: 'stu-001',
    studentName: 'Aarav Sharma',
    busId: 'bus-001',
    busNumber: 'MP-04-KA-1234',
    type: 'Boarded',
    timestamp: '2026-10-02 07:42:15',
    location: 'Anand Nagar',
    status: 'success',
  },
  {
    id: 'rfid-002',
    studentId: 'stu-002',
    studentName: 'Diya Patel',
    busId: 'bus-001',
    busNumber: 'MP-04-KA-1234',
    type: 'Boarded',
    timestamp: '2026-10-02 07:38:22',
    location: 'Kolar Road',
    status: 'success',
  },
  {
    id: 'rfid-003',
    studentId: 'stu-004',
    studentName: 'Saanvi Gupta',
    busId: 'bus-001',
    busNumber: 'MP-04-KA-1234',
    type: 'Boarded',
    timestamp: '2026-10-02 07:31:08',
    location: 'Ward 6',
    status: 'success',
  },
  {
    id: 'rfid-004',
    studentId: 'stu-003',
    studentName: 'Arjun Nair',
    busId: 'bus-002',
    busNumber: 'MP-04-CD-5678',
    type: 'Exited',
    timestamp: '2026-10-02 08:15:45',
    location: 'The Oriental School',
    status: 'success',
  },
  {
    id: 'rfid-005',
    studentId: 'stu-005',
    studentName: 'Vihaan Reddy',
    busId: 'bus-002',
    busNumber: 'MP-04-CD-5678',
    type: 'Exited',
    timestamp: '2026-10-02 08:16:02',
    location: 'The Oriental School',
    status: 'success',
  },
  {
    id: 'rfid-006',
    studentId: 'stu-007',
    studentName: 'Reyansh Singh',
    busId: 'bus-002',
    busNumber: 'MP-04-CD-5678',
    type: 'Boarded',
    timestamp: '2026-10-02 07:25:30',
    location: 'MP Nagar',
    status: 'success',
  },
  {
    id: 'rfid-007',
    studentId: 'stu-006',
    studentName: 'Ananya Iyer',
    busId: 'bus-003',
    busNumber: 'MP-04-EF-9012',
    type: 'Missed Scan',
    timestamp: '2026-10-02 07:50:00',
    location: 'Arera Colony',
    status: 'warning',
  },
  {
    id: 'rfid-008',
    studentId: 'stu-008',
    studentName: 'Ishita Verma',
    busId: 'bus-003',
    busNumber: 'MP-04-EF-9012',
    type: 'Boarded',
    timestamp: '2026-10-02 07:20:15',
    location: 'Bairagarh',
    status: 'success',
  },
];

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  busId?: string;
  studentId?: string;
  timestamp: string;
  resolved: boolean;
  source: string;
}

export const ALERTS: Alert[] = [
  {
    id: 'alert-001',
    type: 'warning',
    title: 'Missed RFID Scan',
    message: 'Ananya Iyer (Grade 2-A) boarded Bus MP-04-EF-9012 without a valid RFID scan at Arera Colony.',
    studentId: 'stu-006',
    busId: 'bus-003',
    timestamp: '2026-10-02 07:50:00',
    resolved: false,
    source: 'RFID System',
  },
  {
    id: 'alert-002',
    type: 'critical',
    title: 'Bus Delayed',
    message: 'Bus MP-04-EF-9012 (Route C) is running 15+ minutes behind schedule due to heavy traffic on Raisen Road.',
    busId: 'bus-003',
    timestamp: '2026-10-02 08:05:00',
    resolved: false,
    source: 'GPS Tracking',
  },
  {
    id: 'alert-003',
    type: 'info',
    title: 'All Students Boarded',
    message: 'Bus MP-04-KA-1234 (Route A) has completed all pickups. 22 students on board, heading to The Oriental School.',
    busId: 'bus-001',
    timestamp: '2026-10-02 07:45:00',
    resolved: true,
    source: 'Fleet Management',
  },
  {
    id: 'alert-004',
    type: 'warning',
    title: 'Speed Limit Exceeded',
    message: 'Bus MP-04-CD-5678 exceeded the speed limit (40 km/h) on Patel Nagar road. Current speed: 48 km/h.',
    busId: 'bus-002',
    timestamp: '2026-10-02 07:55:00',
    resolved: false,
    source: 'GPS Tracking',
  },
  {
    id: 'alert-005',
    type: 'info',
    title: 'Bus Arrived at School',
    message: 'Bus MP-04-CD-5678 arrived at The Oriental School. All 18 students safely dropped off.',
    busId: 'bus-002',
    timestamp: '2026-10-02 08:15:00',
    resolved: true,
    source: 'Fleet Management',
  },
];

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'School Admin' | 'Parent';
  school: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
}

export const SYSTEM_USERS: SystemUser[] = [
  {
    id: 'usr-001',
    name: 'Rajesh Kumar',
    email: 'admin@orientalschool.edu',
    phone: '+91 9XXX XXX 001',
    role: 'School Admin',
    school: 'The Oriental School',
    status: 'Active',
    lastLogin: '2026-10-02 08:30',
  },
  {
    id: 'usr-002',
    name: 'Neha Sharma',
    email: 'neha.sharma@email.com',
    phone: '+91 9XXX XXX 001',
    role: 'Parent',
    school: 'The Oriental School',
    status: 'Active',
    lastLogin: '2026-10-02 08:15',
  },
  {
    id: 'usr-003',
    name: 'Vikram Patel',
    email: 'vikram.patel@email.com',
    phone: '+91 9XXX XXX 002',
    role: 'Parent',
    school: 'The Oriental School',
    status: 'Active',
    lastLogin: '2026-10-02 07:45',
  },
  {
    id: 'usr-004',
    name: 'Priya Mehta',
    email: 'admin@greenwood.edu',
    phone: '+91 9XXX XXX 002',
    role: 'School Admin',
    school: 'Greenwood International',
    status: 'Active',
    lastLogin: '2026-10-02 08:20',
  },
  {
    id: 'usr-005',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@email.com',
    phone: '+91 9XXX XXX 005',
    role: 'Parent',
    school: 'The Oriental School',
    status: 'Active',
    lastLogin: '2026-10-02 07:30',
  },
  {
    id: 'usr-006',
    name: 'Anita Reddy',
    email: 'admin@sunrise.edu',
    phone: '+91 9XXX XXX 004',
    role: 'School Admin',
    school: 'Sunrise Public School',
    status: 'Inactive',
    lastLogin: '2026-09-28 16:00',
  },
  {
    id: 'usr-007',
    name: 'Father Thomas',
    email: 'admin@stxavier.edu',
    phone: '+91 9XXX XXX 003',
    role: 'School Admin',
    school: 'St. Xavier Academy',
    status: 'Active',
    lastLogin: '2026-10-02 08:10',
  },
  {
    id: 'usr-008',
    name: 'Lakshmi Nair',
    email: 'lakshmi.nair@email.com',
    phone: '+91 9XXX XXX 003',
    role: 'Parent',
    school: 'The Oriental School',
    status: 'Active',
    lastLogin: '2026-10-02 07:50',
  },
];

export interface LoginActivity {
  id: string;
  user: string;
  role: string;
  ip: string;
  timestamp: string;
  status: 'Success' | 'Failed';
}

export const LOGIN_ACTIVITY: LoginActivity[] = [
  { id: 'la-001', user: 'The Oriental School', role: 'School', ip: '103.21.xxx.xx', timestamp: '2026-10-02 08:30:15', status: 'Success' },
  { id: 'la-002', user: 'Neha Sharma', role: 'Parent', ip: '106.51.xxx.xx', timestamp: '2026-10-02 08:15:42', status: 'Success' },
  { id: 'la-003', user: 'Kinnect Administrator', role: 'Admin', ip: '49.207.xx.xx', timestamp: '2026-10-02 09:00:01', status: 'Success' },
  { id: 'la-004', user: 'Priya Mehta', role: 'School', ip: '14.139.xxx.xx', timestamp: '2026-10-02 08:20:33', status: 'Success' },
  { id: 'la-005', user: 'unknown', role: 'School', ip: '103.21.xxx.xx', timestamp: '2026-10-02 08:28:10', status: 'Failed' },
  { id: 'la-006', user: 'Vikram Patel', role: 'Parent', ip: '106.51.xxx.xx', timestamp: '2026-10-02 07:45:22', status: 'Success' },
  { id: 'la-007', user: 'Father Thomas', role: 'School', ip: '59.144.xx.xx', timestamp: '2026-10-02 08:10:05', status: 'Success' },
];

export interface SystemEvent {
  id: string;
  event: string;
  category: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
}

export const SYSTEM_EVENTS: SystemEvent[] = [
  { id: 'ev-001', event: 'RFID scanner firmware updated on 12 devices', category: 'Maintenance', timestamp: '2026-10-02 06:00:00', severity: 'low' },
  { id: 'ev-002', event: 'New school registered: Sunrise Public School', category: 'Registration', timestamp: '2026-09-10 14:30:00', severity: 'low' },
  { id: 'ev-003', event: 'Bus MP-04-IJ-7890 marked for maintenance', category: 'Fleet', timestamp: '2026-10-01 18:00:00', severity: 'medium' },
  { id: 'ev-004', event: 'Speed alert threshold updated to 40 km/h', category: 'Configuration', timestamp: '2026-09-28 10:00:00', severity: 'low' },
  { id: 'ev-005', event: 'Database backup completed successfully', category: 'System', timestamp: '2026-10-02 02:00:00', severity: 'low' },
  { id: 'ev-006', event: 'Failed login attempt from unknown IP', category: 'Security', timestamp: '2026-10-02 08:28:10', severity: 'high' },
];

export const SCHOOL_STATS = {
  totalSchools: 4,
  activeSchools: 3,
  totalBuses: 24,
  totalStudents: 746,
  activeAlerts: 3,
  activeUsers: 7,
  totalUsers: 8,
};

export const PARENT_NOTIFICATIONS = [
  {
    id: 'n-001',
    title: 'Aarav boarded the bus',
    message: 'Aarav Sharma boarded Bus MP-04-KA-1234 at Anand Nagar at 07:42 AM.',
    timestamp: '2026-10-02 07:42',
    type: 'info' as const,
    read: false,
  },
  {
    id: 'n-002',
    title: 'Bus on the way to school',
    message: 'Bus MP-04-KA-1234 is on route to The Oriental School. ETA: 8 minutes.',
    timestamp: '2026-10-02 07:45',
    type: 'info' as const,
    read: false,
  },
  {
    id: 'n-003',
    title: 'Speed alert resolved',
    message: 'The bus driver has reduced speed to within the limit. No further action needed.',
    timestamp: '2026-10-02 07:50',
    type: 'success' as const,
    read: true,
  },
];

export const WEEKLY_ATTENDANCE = [
  { day: 'Mon', boarded: 240, total: 248 },
  { day: 'Tue', boarded: 245, total: 248 },
  { day: 'Wed', boarded: 238, total: 248 },
  { day: 'Thu', boarded: 242, total: 248 },
  { day: 'Fri', boarded: 246, total: 248 },
  { day: 'Sat', boarded: 180, total: 200 },
  { day: 'Sun', boarded: 0, total: 0 },
];

export const HOURLY_RFID_SCANS = [
  { hour: '7:00', scans: 45 },
  { hour: '7:30', scans: 120 },
  { hour: '8:00', scans: 180 },
  { hour: '8:30', scans: 95 },
  { hour: '14:30', scans: 60 },
  { hour: '15:00', scans: 150 },
  { hour: '15:30', scans: 200 },
  { hour: '16:00', scans: 110 },
];
