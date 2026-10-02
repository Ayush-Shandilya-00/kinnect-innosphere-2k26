'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/lib/app-context';
import { STUDENTS, BUSES } from '@/lib/mock-data';
import { PageHeader, StatusBadge, getBusStatusVariant } from '@/components/shared';
import { BhopalMap, type BhopalMapBus } from '@/components/bhopal-map';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bus as BusIcon, MapPin, Gauge, Clock, Navigation, Phone } from 'lucide-react';

const BUS_POSITIONS: Record<string, { x: number; y: number }> = {
  'bus-001': { x: 320, y: 420 },
  'bus-002': { x: 380, y: 200 },
  'bus-003': { x: 180, y: 310 },
  'bus-004': { x: 680, y: 290 },
  'bus-005': { x: 600, y: 350 },
};

export default function ParentTrackingPage() {
  const { user } = useApp();
  const child = STUDENTS.find((s) => s.id === user?.childId) || STUDENTS[0];
  const bus = BUSES.find((b) => b.id === child.busId) || BUSES[0];
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(interval);
  }, []);

  const liveBus = bus.status === 'On Route'
    ? {
        ...bus,
        speed: Math.max(20, bus.speed + Math.sin(tick * 0.5) * 5),
      }
    : bus;

  const pos = BUS_POSITIONS[bus.id] || { x: 500, y: 300 };
  const offset = bus.status === 'On Route' ? Math.sin(tick + pos.x) * 15 : 0;
  const busLabel = bus.id === 'bus-001' ? 'Bus #4' : bus.id === 'bus-002' ? 'Bus #6' : bus.id === 'bus-003' ? 'Bus #9' : 'Bus #2';

  const mapBuses: BhopalMapBus[] = [
    {
      id: bus.id,
      label: busLabel,
      x: pos.x + offset,
      y: pos.y + offset * 0.3,
      status: bus.status,
      isDelayed: bus.id === 'bus-003',
      isSelected: true,
    },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Bus Tracking"
        description={`Live tracking for ${child.name}'s bus across Bhopal`}
      />

      {/* Map */}
      <Card className="overflow-hidden">
        <BhopalMap
          buses={mapBuses}
          selectedBusId={bus.id}
          height="h-96"
        />
      </Card>

      {/* Bus details */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-base">
              <span className="flex items-center gap-2">
                <BusIcon className="h-4 w-4 text-primary" />
                {liveBus.number}
              </span>
              <StatusBadge status={liveBus.status} variant={getBusStatusVariant(liveBus.status)} />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 rounded-lg border border-border p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Navigation className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Current Route</p>
                <p className="text-sm font-medium">{liveBus.route}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <MapPin className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Next Stop</p>
                <p className="text-sm font-medium">{liveBus.nextStop} ({liveBus.eta})</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Driver Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 rounded-lg border border-border p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <span className="text-sm font-bold text-primary">
                  {liveBus.driverName.split(' ').map((w) => w[0]).join('')}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium">{liveBus.driverName}</p>
                <p className="text-xs text-muted-foreground">Assigned Driver</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Phone className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Driver Phone</p>
                <p className="text-sm font-medium">{liveBus.driverPhone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Gauge className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Current Speed</p>
                <p className="text-sm font-medium">{liveBus.status === 'On Route' ? `${Math.round(liveBus.speed)} km/h` : '—'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
