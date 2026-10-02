'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/app-context';
import { BUSES, STUDENTS, RFID_EVENTS, ALERTS, WEEKLY_ATTENDANCE, HOURLY_RFID_SCANS } from '@/lib/mock-data';
import { StatCard, PageHeader, StatusBadge, getBusStatusVariant, getStudentStatusVariant, getAlertVariant } from '@/components/shared';
import { Bus, Users, MapPin, Bell, Radio, Clock, TrendingUp, ChevronRight, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function SchoolDashboard() {
  const { user } = useApp();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const activeBuses = BUSES.filter((b) => b.status === 'On Route').length;
  const studentsOnBus = STUDENTS.filter((s) => s.status === 'On Bus').length;
  const studentsDropped = STUDENTS.filter((s) => s.status === 'Dropped Off').length;
  const activeAlerts = ALERTS.filter((a) => !a.resolved).length;

  const recentRFID = RFID_EVENTS.slice(0, 5);
  const recentAlerts = ALERTS.filter((a) => !a.resolved).slice(0, 4);

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="The Oriental School"
        description="Here's the live transport overview for The Oriental School, Bhopal."
      />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard title="Active Buses" value={activeBuses} icon={Bus} color="primary" trend="up" trendValue="2 en route" />
        <StatCard title="Students On Bus" value={studentsOnBus} icon={Users} color="accent" trend="up" trendValue="boarding active" />
        <StatCard title="Students Dropped Off" value={studentsDropped} icon={MapPin} color="success" trend="up" trendValue="safely arrived" />
        <StatCard title="Active Alerts" value={activeAlerts} icon={Bell} color="warning" trend="down" trendValue="needs attention" />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-primary" />
              Weekly Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={WEEKLY_ATTENDANCE}>
                <defs>
                  <linearGradient id="colorBoarded" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="boarded" stroke="hsl(var(--primary))" fill="url(#colorBoarded)" strokeWidth={2} name="Boarded" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="h-4 w-4 text-primary" />
              RFID Scans by Hour
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={HOURLY_RFID_SCANS}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="scans" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Scans" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Live Buses + Recent RFID */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Live buses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-base">
              <span className="flex items-center gap-2">
                <Bus className="h-4 w-4 text-primary" />
                Live Bus Monitoring
              </span>
              <button onClick={() => router.push('/school/tracking')} className="text-xs text-primary hover:underline">
                View all
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {BUSES.filter((b) => b.status === 'On Route').map((bus) => (
              <div
                key={bus.id}
                className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Bus className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{bus.number}</p>
                    <p className="text-xs text-muted-foreground">{bus.route}</p>
                  </div>
                </div>
                <div className="text-right">
                  <StatusBadge status={bus.status} variant={getBusStatusVariant(bus.status)} />
                  <p className="mt-1 text-xs text-muted-foreground">Next: {bus.nextStop} ({bus.eta})</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent RFID */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-base">
              <span className="flex items-center gap-2">
                <Radio className="h-4 w-4 text-primary" />
                Recent RFID Activity
              </span>
              <button onClick={() => router.push('/school/rfid')} className="text-xs text-primary hover:underline">
                View all
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentRFID.map((event) => (
              <div key={event.id} className="flex items-center gap-3 rounded-lg border border-border p-2.5">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                    {event.studentName.split(' ').map((w) => w[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium">{event.studentName}</p>
                  <p className="text-xs text-muted-foreground">
                    {event.type} · {event.location}
                  </p>
                </div>
                <div className="text-right">
                  <Badge variant={event.status === 'success' ? 'default' : 'secondary'} className={event.status === 'warning' ? 'border-warning/20 bg-warning/10 text-warning' : ''}>
                    {event.type}
                  </Badge>
                  <p className="mt-0.5 text-xs text-muted-foreground">{event.timestamp.split(' ')[1]}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-base">
            <span className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" />
              Active Safety Alerts
            </span>
            <button onClick={() => router.push('/school/alerts')} className="text-xs text-primary hover:underline">
              View all
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentAlerts.length === 0 && (
            <p className="py-4 text-center text-sm text-muted-foreground">No active alerts. All clear!</p>
          )}
          {recentAlerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start gap-3 rounded-lg border border-border p-3 hover:bg-muted/50"
            >
              <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                alert.type === 'critical' ? 'bg-destructive/10' : 'bg-warning/10'
              }`}>
                <Bell className={`h-4 w-4 ${alert.type === 'critical' ? 'text-destructive' : 'text-warning'}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{alert.title}</p>
                  <StatusBadge status={alert.type} variant={getAlertVariant(alert.type)} />
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{alert.message}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {alert.timestamp} · {alert.source}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
