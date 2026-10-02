'use client';

import { useApp } from '@/lib/app-context';
import { RFID_EVENTS, STUDENTS } from '@/lib/mock-data';
import { PageHeader } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Radio, CheckCircle2, AlertTriangle, Clock, MapPin, Bus as BusIcon } from 'lucide-react';

export default function ParentRFIDPage() {
  const { user } = useApp();
  const child = STUDENTS.find((s) => s.id === user?.childId) || STUDENTS[0];
  const events = RFID_EVENTS.filter((e) => e.studentId === child.id);

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="RFID Activity"
        description={`Boarding and exit scans for ${child.name}`}
      />

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
              <CheckCircle2 className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{events.filter((e) => e.status === 'success').length}</p>
              <p className="text-xs text-muted-foreground">Successful</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
              <AlertTriangle className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{events.filter((e) => e.status === 'warning').length}</p>
              <p className="text-xs text-muted-foreground">Warnings</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Radio className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{events.length}</p>
              <p className="text-xs text-muted-foreground">Total Scans</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Radio className="h-4 w-4 text-primary" />
            Scan History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No RFID scans recorded yet today.</p>
          ) : (
            <div className="relative space-y-4 pl-6">
              <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-border" />
              {events.map((event) => (
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
                  <div className="rounded-lg border border-border p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">{event.type}</p>
                      <Badge variant="secondary" className={
                        event.type === 'Boarded' ? 'border-primary/20 bg-primary/10 text-primary' :
                        event.type === 'Exited' ? 'border-success/20 bg-success/10 text-success' :
                        'border-warning/20 bg-warning/10 text-warning'
                      }>
                        {event.type}
                      </Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BusIcon className="h-3 w-3" />
                        {event.busNumber}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {event.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
