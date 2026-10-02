'use client';

import { BUSES, STUDENTS } from '@/lib/mock-data';
import { PageHeader, StatusBadge, getBusStatusVariant } from '@/components/shared';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bus as BusIcon, User, Phone, MapPin, Gauge, Users } from 'lucide-react';

export default function BusesPage() {
  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Bus Fleet"
        description={`${BUSES.length} buses registered at The Oriental School`}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {BUSES.map((bus) => {
          const busStudents = STUDENTS.filter((s) => s.busId === bus.id);
          const occupancy = Math.round((bus.occupied / bus.capacity) * 100);

          return (
            <Card key={bus.id} className="transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <BusIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{bus.number}</p>
                      <p className="text-sm text-muted-foreground">{bus.route}</p>
                    </div>
                  </div>
                  <StatusBadge status={bus.status} variant={getBusStatusVariant(bus.status)} />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Driver</p>
                      <p className="font-medium">{bus.driverName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="font-medium">{bus.driverPhone}</p>
                    </div>
                  </div>
                  {bus.status === 'On Route' && (
                    <>
                      <div className="flex items-center gap-2">
                        <Gauge className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Speed</p>
                          <p className="font-medium">{bus.speed} km/h</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Next Stop</p>
                          <p className="font-medium">{bus.nextStop} ({bus.eta})</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Occupancy bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      Occupancy
                    </span>
                    <span className="font-medium">{bus.occupied}/{bus.capacity} ({occupancy}%)</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full transition-all ${
                        occupancy > 80 ? 'bg-destructive' : occupancy > 50 ? 'bg-warning' : 'bg-success'
                      }`}
                      style={{ width: `${occupancy}%` }}
                    />
                  </div>
                </div>

                {/* Students */}
                {busStudents.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {busStudents.map((s) => (
                      <Badge key={s.id} variant="secondary" className="text-xs">
                        {s.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
