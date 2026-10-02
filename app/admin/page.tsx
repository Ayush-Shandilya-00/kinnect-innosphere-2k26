'use client';

import { SCHOOL_STATS, SCHOOLS, SYSTEM_USERS, BUSES, ALERTS, RFID_EVENTS, LOGIN_ACTIVITY, SYSTEM_EVENTS } from '@/lib/mock-data';
import { StatCard, PageHeader, StatusBadge, getAlertVariant } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { GraduationCap, Bus, Users, Bell, Activity, Shield, Radio, Clock, AlertOctagon, AlertTriangle, Info, Server } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const GROWTH_DATA = [
  { month: 'Jul', schools: 1, students: 180 },
  { month: 'Aug', schools: 2, students: 420 },
  { month: 'Sep', schools: 3, students: 600 },
  { month: 'Oct', schools: 4, students: 746 },
];

export default function AdminDashboard() {
  const activeAlerts = ALERTS.filter((a) => !a.resolved);
  const recentEvents = RFID_EVENTS.slice(0, 5);
  const recentActivity = LOGIN_ACTIVITY.slice(0, 5);
  const recentSystemEvents = SYSTEM_EVENTS.slice(0, 4);

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Platform Overview"
        description="SafeRide system-wide monitoring and management"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard title="Total Schools" value={SCHOOL_STATS.totalSchools} icon={GraduationCap} color="primary" trend="up" trendValue={`${SCHOOL_STATS.activeSchools} active`} />
        <StatCard title="Total Buses" value={SCHOOL_STATS.totalBuses} icon={Bus} color="accent" trend="up" trendValue="across all schools" />
        <StatCard title="Total Students" value={SCHOOL_STATS.totalStudents} icon={Users} color="primary" trend="up" trendValue="enrolled" />
        <StatCard title="Active Alerts" value={SCHOOL_STATS.activeAlerts} icon={Bell} color="warning" trend="down" trendValue="needs attention" />
        <StatCard title="Active Users" value={SCHOOL_STATS.activeUsers} icon={Activity} color="success" trend="up" trendValue={`of ${SCHOOL_STATS.totalUsers} total`} />
      </div>

      {/* Growth charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <GraduationCap className="h-4 w-4 text-primary" />
              School Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={GROWTH_DATA}>
                <defs>
                  <linearGradient id="colorSchools" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="schools" stroke="hsl(var(--primary))" fill="url(#colorSchools)" strokeWidth={2} name="Schools" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-4 w-4 text-primary" />
              Student Enrollment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={GROWTH_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="students" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Students" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* System-wide alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="h-4 w-4 text-primary" />
            System-Wide Safety Alerts
            <Badge variant="secondary" className="ml-auto">{activeAlerts.length} unresolved</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {activeAlerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-3 rounded-lg border border-border p-3">
              <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                alert.type === 'critical' ? 'bg-destructive/10' : 'bg-warning/10'
              }`}>
                {alert.type === 'critical' ? (
                  <AlertOctagon className="h-4 w-4 text-destructive" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-warning" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{alert.title}</p>
                  <StatusBadge status={alert.type} variant={getAlertVariant(alert.type)} />
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{alert.message}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {alert.timestamp} · {alert.source}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent RFID + Login activity */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Radio className="h-4 w-4 text-primary" />
              Recent RFID Scans
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentEvents.map((event) => (
              <div key={event.id} className="flex items-center gap-3 rounded-lg border border-border p-2.5">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                    {event.studentName.split(' ').map((w) => w[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium">{event.studentName}</p>
                  <p className="text-xs text-muted-foreground">{event.type} · {event.busNumber}</p>
                </div>
                <p className="text-xs text-muted-foreground">{event.timestamp.split(' ')[1]}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="h-4 w-4 text-primary" />
              Recent Login Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 rounded-lg border border-border p-2.5">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  activity.status === 'Success' ? 'bg-success/10' : 'bg-destructive/10'
                }`}>
                  {activity.status === 'Success' ? (
                    <Info className="h-4 w-4 text-success" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium">{activity.user}</p>
                  <p className="text-xs text-muted-foreground">{activity.role} · {activity.ip}</p>
                </div>
                <Badge variant={activity.status === 'Success' ? 'default' : 'destructive'} className="text-xs">
                  {activity.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* System events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Server className="h-4 w-4 text-primary" />
            Important System Events
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {recentSystemEvents.map((event) => (
            <div key={event.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                event.severity === 'high' ? 'bg-destructive/10' :
                event.severity === 'medium' ? 'bg-warning/10' : 'bg-primary/10'
              }`}>
                <Server className={`h-4 w-4 ${
                  event.severity === 'high' ? 'text-destructive' :
                  event.severity === 'medium' ? 'text-warning' : 'text-primary'
                }`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{event.event}</p>
                <p className="text-xs text-muted-foreground">{event.category} · {event.timestamp}</p>
              </div>
              <Badge variant={event.severity === 'high' ? 'destructive' : event.severity === 'medium' ? 'secondary' : 'default'} className="text-xs capitalize">
                {event.severity}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
