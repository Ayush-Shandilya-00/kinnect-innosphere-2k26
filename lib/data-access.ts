import { supabase } from '@/lib/supabase';
import {
  SCHOOLS, BUSES, STUDENTS, RFID_EVENTS, ALERTS,
  SYSTEM_USERS, LOGIN_ACTIVITY, SYSTEM_EVENTS,
  PARENT_NOTIFICATIONS, WEEKLY_ATTENDANCE, HOURLY_RFID_SCANS,
  type School, type Bus, type Student, type RFIDEvent,
  type Alert, type SystemUser, type LoginActivity,
  type SystemEvent,
} from '@/lib/mock-data';

export interface ParentNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success';
  read: boolean;
}

export async function getSchools(): Promise<School[]> {
  try {
    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .order('name');
    if (error || !data || data.length === 0) return SCHOOLS;
    return data.map((s: Record<string, unknown>) => ({
      id: s.id as string,
      name: s.name as string,
      address: s.address as string,
      phone: s.phone as string,
      status: s.status as 'Active' | 'Inactive',
      students: s.students as number,
      buses: s.buses as number,
      adminName: s.admin_name as string,
      adminEmail: s.admin_email as string,
      joinedDate: s.joined_date as string,
    }));
  } catch {
    return SCHOOLS;
  }
}

export async function getBuses(): Promise<Bus[]> {
  try {
    const { data, error } = await supabase
      .from('buses')
      .select('*')
      .order('number');
    if (error || !data || data.length === 0) return BUSES;
    return data.map((b: Record<string, unknown>) => ({
      id: b.id as string,
      number: b.number as string,
      driverName: b.driver_name as string,
      driverPhone: b.driver_phone as string,
      route: b.route as string,
      capacity: b.capacity as number,
      occupied: b.occupied as number,
      status: b.status as Bus['status'],
      lat: b.lat as number,
      lng: b.lng as number,
      speed: b.speed as number,
      nextStop: b.next_stop as string,
      eta: b.eta as string,
      schoolId: b.school_id as string,
    }));
  } catch {
    return BUSES;
  }
}

export async function getStudents(): Promise<Student[]> {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('name');
    if (error || !data || data.length === 0) return STUDENTS;
    return data.map((s: Record<string, unknown>) => ({
      id: s.id as string,
      name: s.name as string,
      grade: s.grade as string,
      section: s.section as string,
      busId: s.bus_id as string,
      parentId: s.parent_id as string,
      parentName: s.parent_name as string,
      parentPhone: s.parent_phone as string,
      status: s.status as Student['status'],
      pickupStop: s.pickup_stop as string,
      dropStop: s.drop_stop as string,
      photo: s.photo as string,
      rfidId: s.rfid_id as string,
    }));
  } catch {
    return STUDENTS;
  }
}

export async function getRFIDEvents(): Promise<RFIDEvent[]> {
  try {
    const { data, error } = await supabase
      .from('rfid_events')
      .select('*')
      .order('timestamp', { ascending: false });
    if (error || !data || data.length === 0) return RFID_EVENTS;
    return data.map((e: Record<string, unknown>) => ({
      id: e.id as string,
      studentId: e.student_id as string,
      studentName: e.student_name as string,
      busId: e.bus_id as string,
      busNumber: e.bus_number as string,
      type: e.type as RFIDEvent['type'],
      timestamp: e.timestamp as string,
      location: e.location as string,
      status: e.status as RFIDEvent['status'],
    }));
  } catch {
    return RFID_EVENTS;
  }
}

export async function getAlerts(): Promise<Alert[]> {
  try {
    const { data, error } = await supabase
      .from('alerts')
      .select('*')
      .order('timestamp', { ascending: false });
    if (error || !data || data.length === 0) return ALERTS;
    return data.map((a: Record<string, unknown>) => ({
      id: a.id as string,
      type: a.type as Alert['type'],
      title: a.title as string,
      message: a.message as string,
      busId: (a.bus_id as string) || undefined,
      studentId: (a.student_id as string) || undefined,
      timestamp: a.timestamp as string,
      resolved: a.resolved as boolean,
      source: a.source as string,
    }));
  } catch {
    return ALERTS;
  }
}

export async function getSystemUsers(): Promise<SystemUser[]> {
  try {
    const { data, error } = await supabase
      .from('system_users')
      .select('*')
      .order('name');
    if (error || !data || data.length === 0) return SYSTEM_USERS;
    return data.map((u: Record<string, unknown>) => ({
      id: u.id as string,
      name: u.name as string,
      email: u.email as string,
      phone: u.phone as string,
      role: u.role as SystemUser['role'],
      school: u.school as string,
      status: u.status as SystemUser['status'],
      lastLogin: u.last_login as string,
    }));
  } catch {
    return SYSTEM_USERS;
  }
}

export async function getLoginActivity(): Promise<LoginActivity[]> {
  try {
    const { data, error } = await supabase
      .from('login_activity')
      .select('*')
      .order('timestamp', { ascending: false });
    if (error || !data || data.length === 0) return LOGIN_ACTIVITY;
    return data.map((l: Record<string, unknown>) => ({
      id: l.id as string,
      user: l.user_name as string,
      role: l.role as string,
      ip: l.ip as string,
      timestamp: l.timestamp as string,
      status: l.status as LoginActivity['status'],
    }));
  } catch {
    return LOGIN_ACTIVITY;
  }
}

export async function getSystemEvents(): Promise<SystemEvent[]> {
  try {
    const { data, error } = await supabase
      .from('system_events')
      .select('*')
      .order('timestamp', { ascending: false });
    if (error || !data || data.length === 0) return SYSTEM_EVENTS;
    return data.map((e: Record<string, unknown>) => ({
      id: e.id as string,
      event: e.event as string,
      category: e.category as string,
      timestamp: e.timestamp as string,
      severity: e.severity as SystemEvent['severity'],
    }));
  } catch {
    return SYSTEM_EVENTS;
  }
}

export async function getParentNotifications(): Promise<ParentNotification[]> {
  try {
    const { data, error } = await supabase
      .from('parent_notifications')
      .select('*')
      .order('timestamp', { ascending: false });
    if (error || !data || data.length === 0) {
      return PARENT_NOTIFICATIONS as ParentNotification[];
    }
    return data.map((n: Record<string, unknown>) => ({
      id: n.id as string,
      title: n.title as string,
      message: n.message as string,
      timestamp: n.timestamp as string,
      type: n.type as 'info' | 'success',
      read: n.read as boolean,
    }));
  } catch {
    return PARENT_NOTIFICATIONS as ParentNotification[];
  }
}

export async function insertRFIDEvent(event: {
  studentId: string;
  studentName: string;
  busId: string;
  busNumber: string;
  type: 'Boarded' | 'Exited' | 'Missed Scan';
  timestamp: string;
  location: string;
  status: 'success' | 'warning' | 'error';
}): Promise<void> {
  try {
    await supabase.from('rfid_events').insert({
      id: `rfid-${Date.now()}`,
      student_id: event.studentId,
      student_name: event.studentName,
      bus_id: event.busId,
      bus_number: event.busNumber,
      type: event.type,
      timestamp: event.timestamp,
      location: event.location,
      status: event.status,
    });
  } catch {
    // Silently fail — the UI already has the event in local state
  }
}

export async function resolveAlert(alertId: string): Promise<void> {
  try {
    await supabase
      .from('alerts')
      .update({ resolved: true })
      .eq('id', alertId);
  } catch {
    // Silently fail — the UI already updated local state
  }
}

export { WEEKLY_ATTENDANCE, HOURLY_RFID_SCANS };
