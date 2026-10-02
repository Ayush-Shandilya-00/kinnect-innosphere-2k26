'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/app-context';
import { STUDENTS, BUSES, RFID_EVENTS, PARENT_NOTIFICATIONS, ALERTS } from '@/lib/mock-data';
import { PageHeader, StatusBadge, getStudentStatusVariant, getBusStatusVariant, getAlertVariant } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bus as BusIcon, MapPin, Clock, Radio, Bell, CheckCircle2, AlertTriangle, Info, ChevronRight, Phone, Heart } from 'lucide-react';

export default function ParentDashboard() {
  const { user } = useApp();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const child = STUDENTS.find((s) => s.id === user?.childId) || STUDENTS[0];
  const bus = BUSES.find((b) => b.id === child.busId) || BUSES[0];
  const childRFID = RFID_EVENTS.filter((e) => e.studentId === child.id);
  const childAlerts = ALERTS.filter((a) => a.studentId === child.id || a.busId === child.busId);

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title={`Welcome, ${user?.displayName?.split(' ')[0] || 'Parent'}`}
        description="Your child's transport safety at a glance"
      />

      {/* Child summary card */}
      <Card className="overflow-hidden">
        <div className="relative bg-gradient-to-r from-primary to-accent p-6 text-white">
          <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-4 border-white/30">
                <AvatarFallback className="bg-white/20 text-xl font-bold text-white">
                  {child.photo}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-poppins text-xl font-bold">{child.name}</h2>
                <p className="text-sm text-white/80">{child.grade} · Section {child.section}</p>
                <p className="mt-1 text-sm text-white/80">The Oriental School · Bhopal</p>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <StatusBadge status={child.status} variant={getStudentStatusVariant(child.status)} />
              <p className="text-sm text-white/80">RFID: {child.rfidId}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Today's journey timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Heart className="h-4 w-4 text-primary" />
            Today's Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative space-y-4 pl-6">
            <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-border" />
            {childRFID.map((event, i) => (
              <div key={event.id} className="relative">
                <div className={`absolute -left-[18px] flex h-5 w-5 items-center justify-center rounded-full ring-4 ring-background ${
                  event.status === 'success' ? 'bg-success' : 'bg-warning'
                }`}>
                  {event.status === 'success' ? (
                    <CheckCircle2 className="h-3 w-3 text-white" />
                  ) : (
                    <AlertTriangle className="h-3 w-3 text-white" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">{event.type} at {event.location}</p>
                    <p className="text-xs text-muted-foreground">{event.busNumber}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{event.timestamp.split(' ')[1]}</p>
                </div>
              </div>
            ))}
            {child.status === 'On Bus' && (
              <div className="relative">
                <div className="absolute -left-[18px] flex h-5 w-5 items-center justify-center rounded-full bg-primary ring-4 ring-background animate-pulse-slow">
                  <BusIcon className="h-3 w-3 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold">On the way to school</p>
                  <p className="text-xs text-muted-foreground">ETA: {bus.eta}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Bus status + Notifications */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Bus status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-base">
              <span className="flex items-center gap-2">
                <BusIcon className="h-4 w-4 text-primary" />
                Current Bus Status
              </span>
              <button onClick={() => router.push('/parent/tracking')} className="text-xs text-primary hover:underline">
                Track live
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 rounded-lg border border-border p-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <BusIcon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{bus.number}</p>
                <p className="text-sm text-muted-foreground">{bus.route}</p>
              </div>
              <StatusBadge status={bus.status} variant={getBusStatusVariant(bus.status)} />
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Next Stop</p>
                  <p className="font-medium">{bus.nextStop}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">ETA</p>
                  <p className="font-medium">{bus.eta}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <BusIcon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Driver</p>
                  <p className="font-medium">{bus.driverName}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Driver Phone</p>
                  <p className="font-medium">{bus.driverPhone}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Bell className="h-4 w-4 text-primary" />
              Recent Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {PARENT_NOTIFICATIONS.map((n) => (
              <div key={n.id} className="flex items-start gap-3 rounded-lg border border-border p-3">
                <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  n.type === 'info' ? 'bg-primary/10' : 'bg-success/10'
                }`}>
                  {n.type === 'info' ? (
                    <Info className="h-4 w-4 text-primary" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="text-xs text-muted-foreground">{n.message}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{n.timestamp}</p>
                </div>
                {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Safety alerts */}
      {childAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Safety Alerts for Your Child
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {childAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 rounded-lg border border-border p-3">
                <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  alert.type === 'critical' ? 'bg-destructive/10' :
                  alert.type === 'warning' ? 'bg-warning/10' : 'bg-primary/10'
                }`}>
                  {alert.type === 'critical' ? (
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  ) : alert.type === 'warning' ? (
                    <AlertTriangle className="h-4 w-4 text-warning" />
                  ) : (
                    <Info className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{alert.title}</p>
                  <p className="text-xs text-muted-foreground">{alert.message}</p>
                </div>
                <StatusBadge status={alert.type} variant={getAlertVariant(alert.type)} />
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
