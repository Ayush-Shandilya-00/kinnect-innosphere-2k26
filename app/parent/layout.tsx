import { DashboardLayout } from '@/components/dashboard-layout';

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="parent">{children}</DashboardLayout>;
}
