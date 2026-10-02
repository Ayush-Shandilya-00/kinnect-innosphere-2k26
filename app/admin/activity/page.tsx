'use client';

import { RFID_EVENTS, LOGIN_ACTIVITY, SYSTEM_EVENTS } from '@/lib/mock-data';
import { PageHeader } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Radio, Activity, Server, Clock, CheckCircle2, AlertTriangle, XCircle, Monitor } from 'lucide-react';
import {
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const HOURLY_DATA = [
  { hour: '7:00', scans: 45, logins: 8 },
  { hour: '7:30', scans: 120, logins: 12 },
  { hour: '8:00', scans: 180, logins: 5 },
  { hour: '8:30', scans: 95, logins: 3 },
  { hour: '14:30', scans: 60, logins: 1 },
  { hour: '15:00', scans: 150, logins: 2 },
  { hour: '15:30', scans: 200, logins: 0 },
  { hour: '16:00', scans: 110, logins: 1 },
];

export default function AdminActivityPage() {
  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="System Activity"
        description="Platform-wide activity monitoring and audit trail"
      />

      {/* Activity chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Activity className="h-4 w-4 text-primary" />
            Hourly Activity Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={HOURLY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="hour" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
              <Bar dataKey="scans" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="RFID Scans" />
              <Bar dataKey="logins" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} name="Logins" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* RFID scans + Login activity */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Radio className="h-4 w-4 text-primary" />
              Recent RFID Scans
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {RFID_EVENTS.map((event) => (
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
                <div className="text-right">
                  <Badge variant="secondary" className={
                    event.type === 'Boarded' ? 'border-primary/20 bg-primary/10 text-primary' :
                    event.type === 'Exited' ? 'border-success/20 bg-success/10 text-success' :
                    'border-warning/20 bg-warning/10 text-warning'
                  }>
                    {event.type}
                  </Badge>
                  <p className="mt-0.5 text-xs text-muted-foreground">{event.timestamp.split(' ')[1]}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Monitor className="h-4 w-4 text-primary" />
              Login Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {LOGIN_ACTIVITY.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 rounded-lg border border-border p-2.5">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  activity.status === 'Success' ? 'bg-success/10' : 'bg-destructive/10'
                }`}>
                  {activity.status === 'Success' ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <XCircle className="h-4 w-4 text-destructive" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium">{activity.user}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.role} · {activity.ip}
                  </p>
                </div>
                <div className="text-right">
                  <Badge variant={activity.status === 'Success' ? 'default' : 'destructive'} className="text-xs">
                    {activity.status}
                  </Badge>
                  <p className="mt-0.5 text-xs text-muted-foreground">{activity.timestamp.split(' ')[1]}</p>
                </div>
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
            System Events Log
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {SYSTEM_EVENTS.map((event) => (
            <div key={event.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                event.severity === 'high' ? 'bg-destructive/10' :
                event.severity === 'medium' ? 'bg-warning/10' : 'bg-primary/10'
              }`}>
                {event.severity === 'high' ? (
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                ) : event.severity === 'medium' ? (
                  <AlertTriangle className="h-4 w-4 text-warning" />
                ) : (
                  <Server className="h-4 w-4 text-primary" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{event.event}</p>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {event.timestamp} · {event.category}
                </p>
              </div>
              <Badge
                variant={event.severity === 'high' ? 'destructive' : event.severity === 'medium' ? 'secondary' : 'default'}
                className="text-xs capitalize"
              >
                {event.severity}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
