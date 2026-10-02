'use client';

import { useState, useEffect } from 'react';
import { BUSES } from '@/lib/mock-data';
import { PageHeader, StatusBadge, getBusStatusVariant } from '@/components/shared';
import { BhopalMap, type BhopalMapBus } from '@/components/bhopal-map';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bus as BusIcon, MapPin, Gauge, Clock, Navigation } from 'lucide-react';

// Bus positions on the 1000x600 map viewBox
const BUS_POSITIONS: Record<string, { x: number; y: number }> = {
  'bus-001': { x: 320, y: 420 },
  'bus-002': { x: 380, y: 200 },
  'bus-003': { x: 180, y: 310 },
  'bus-004': { x: 680, y: 290 },
  'bus-005': { x: 600, y: 350 },
};

export default function TrackingPage() {
  const [selectedBusId, setSelectedBusId] = useState('bus-001');
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(interval);
  }, []);

  const liveBuses = BUSES.map((b) =>
    b.status === 'On Route'
      ? {
          ...b,
          speed: Math.max(20, b.speed + Math.sin(tick * 0.5) * 5),
        }
      : b
  );

  const selectedBus = liveBuses.find((b) => b.id === selectedBusId) || liveBuses[0];

  const mapBuses: BhopalMapBus[] = liveBuses.map((b) => {
    const pos = BUS_POSITIONS[b.id] || { x: 500, y: 300 };
    const offset = b.status === 'On Route' ? Math.sin(tick + pos.x) * 15 : 0;
    const busLabel = b.id === 'bus-001' ? 'Bus #4' : b.id === 'bus-002' ? 'Bus #6' : b.id === 'bus-003' ? 'Bus #9' : b.id === 'bus-004' ? 'Bus #2' : 'Bus #5';
    return {
      id: b.id,
      label: busLabel,
      x: pos.x + offset,
      y: pos.y + offset * 0.3,
      status: b.status,
      isDelayed: b.id === 'bus-003',
      isSelected: b.id === selectedBusId,
    };
  });

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Live Tracking"
        description="Real-time GPS monitoring of all school buses across Bhopal"
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Bus list */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-muted-foreground">Active Buses</p>
          {liveBuses.map((bus) => (
            <button
              key={bus.id}
              onClick={() => setSelectedBusId(bus.id)}
              className={`w-full rounded-xl border-2 p-4 text-left transition-all ${
                selectedBusId === bus.id
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border hover:border-primary/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <BusIcon className="h-4.5 w-4.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{bus.number}</p>
                    <p className="text-xs text-muted-foreground">{bus.route}</p>
                  </div>
                </div>
                <StatusBadge status={bus.status} variant={getBusStatusVariant(bus.status)} />
              </div>
              {bus.status === 'On Route' && (
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Gauge className="h-3 w-3" />
                    {Math.round(bus.speed)} km/h
                  </span>
                  <span className="flex items-center gap-1">
                    <Navigation className="h-3 w-3" />
                    {bus.nextStop}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {bus.eta}
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Map + details */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="overflow-hidden">
            <BhopalMap
              buses={mapBuses}
              selectedBusId={selectedBusId}
              onBusClick={(id) => setSelectedBusId(id)}
              height="h-96"
            />
          </Card>

          {/* Selected bus details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-base">
                <span className="flex items-center gap-2">
                  <BusIcon className="h-4 w-4 text-primary" />
                  {selectedBus.number}
                </span>
                <StatusBadge status={selectedBus.status} variant={getBusStatusVariant(selectedBus.status)} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                <div>
                  <p className="text-xs text-muted-foreground">Driver</p>
                  <p className="font-medium">{selectedBus.driverName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Speed</p>
                  <p className="font-medium">{selectedBus.status === 'On Route' ? `${Math.round(selectedBus.speed)} km/h` : '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Next Stop</p>
                  <p className="font-medium">{selectedBus.nextStop}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">ETA</p>
                  <p className="font-medium">{selectedBus.eta}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-muted/50 p-3">
                <MapPin className="h-4 w-4 text-primary" />
                <p className="text-sm">
                  <span className="text-muted-foreground">Route: </span>
                  <span className="font-medium">{selectedBus.route}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
