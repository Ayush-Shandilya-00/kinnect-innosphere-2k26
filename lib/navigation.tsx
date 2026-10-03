import { LayoutDashboard, Users, Bus, MapPin, Radio, Bell, FileText, Settings, LogOut, GraduationCap, Shield, Activity } from 'lucide-react';
import type { Role } from '@/lib/mock-data';

export interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

export const NAV_ITEMS: Record<Role, NavItem[]> = {
  school: [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/school' },
    { label: 'Students', icon: Users, href: '/school/students' },
    { label: 'Bus Fleet', icon: Bus, href: '/school/buses' },
    { label: 'Live Tracking', icon: MapPin, href: '/school/tracking' },
    { label: 'RFID Activity', icon: Radio, href: '/school/rfid' },
    { label: 'Alerts', icon: Bell, href: '/school/alerts' },
    { label: 'Reports', icon: FileText, href: '/school/reports' },
    { label: 'Settings', icon: Settings, href: '/school/settings' },
  ],
  parent: [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/parent' },
    { label: 'My Child', icon: Users, href: '/parent/child' },
    { label: 'Bus Tracking', icon: MapPin, href: '/parent/tracking' },
    { label: 'RFID Activity', icon: Radio, href: '/parent/rfid' },
    { label: 'Safety Updates', icon: Bell, href: '/parent/alerts' },
  ],
  admin: [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { label: 'Schools', icon: GraduationCap, href: '/admin/schools' },
    { label: 'Fleet', icon: Bus, href: '/admin/fleet' },
    { label: 'Alerts', icon: Bell, href: '/admin/alerts' },
    { label: 'System Activity', icon: Activity, href: '/admin/activity' },
    { label: 'Settings', icon: Settings, href: '/admin/settings' },
  ],
};

export const ROLE_LABELS: Record<Role, string> = {
  school: 'School Admin',
  parent: 'Parent',
  admin: 'Super Admin',
};

export const ROLE_ICONS: Record<Role, React.ComponentType<{ className?: string }>> = {
  school: GraduationCap,
  parent: Users,
  admin: Shield,
};
