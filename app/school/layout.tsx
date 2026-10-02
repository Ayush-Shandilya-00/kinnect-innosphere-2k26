import { DashboardLayout } from '@/components/dashboard-layout';

export default function SchoolLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="school">{children}</DashboardLayout>;
}
