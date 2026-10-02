'use client';

import { useState } from 'react';
import { RFID_EVENTS, STUDENTS } from '@/lib/mock-data';
import { PageHeader, StatusBadge } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Radio, ScanLine, CheckCircle2, AlertTriangle, XCircle, Zap } from 'lucide-react';

export default function RFIDPage() {
  const [events, setEvents] = useState(RFID_EVENTS);
  const [simulating, setSimulating] = useState(false);

  const simulateScan = () => {
    setSimulating(true);
    setTimeout(() => {
      const student = STUDENTS[Math.floor(Math.random() * STUDENTS.length)];
      const newEvent = {
        id: `rfid-${Date.now()}`,
        studentId: student.id,
        studentName: student.name,
        busId: student.busId,
        busNumber: 'KA-01-AB-1234',
        type: 'Boarded' as const,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        location: student.pickupStop,
        status: 'success' as const,
      };
      setEvents((prev) => [newEvent, ...prev]);
      setSimulating(false);
    }, 1500);
  };

  const successCount = events.filter((e) => e.status === 'success').length;
  const warningCount = events.filter((e) => e.status === 'warning').length;
  const errorCount = events.filter((e) => e.status === 'error').length;

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="RFID Activity"
        description="Real-time student boarding and exit scans"
      >
        <Button onClick={simulateScan} disabled={simulating} className="gap-2">
          {simulating ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Scanning...
            </>
          ) : (
            <>
              <ScanLine className="h-4 w-4" />
              Simulate RFID Scan
            </>
          )}
        </Button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
              <CheckCircle2 className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{successCount}</p>
              <p className="text-xs text-muted-foreground">Successful Scans</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
              <AlertTriangle className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{warningCount}</p>
              <p className="text-xs text-muted-foreground">Missed Scans</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
              <XCircle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold">{errorCount}</p>
              <p className="text-xs text-muted-foreground">Failed Scans</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event log */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Radio className="h-4 w-4 text-primary" />
            Scan History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50 animate-fade-in"
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  event.status === 'success' ? 'bg-success/10' :
                  event.status === 'warning' ? 'bg-warning/10' : 'bg-destructive/10'
                }`}>
                  {event.status === 'success' ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : event.status === 'warning' ? (
                    <AlertTriangle className="h-5 w-5 text-warning" />
                  ) : (
                    <XCircle className="h-5 w-5 text-destructive" />
                  )}
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                    {event.studentName.split(' ').map((w) => w[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{event.studentName}</p>
                  <p className="text-xs text-muted-foreground">
                    {event.type} · {event.busNumber} · {event.location}
                  </p>
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
