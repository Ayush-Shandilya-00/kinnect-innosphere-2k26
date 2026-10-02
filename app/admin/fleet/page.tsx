'use client';

import { BUSES, SCHOOLS } from '@/lib/mock-data';
import { PageHeader, StatusBadge, getBusStatusVariant } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Bus as BusIcon, User, Phone, MapPin, Gauge, Navigation } from 'lucide-react';

export default function AdminFleetPage() {
  // Expand buses to simulate all buses across all schools
  const allBuses = [
    ...BUSES,
    ...BUSES.slice(0, 5).map((b, i) => ({
      ...b,
      id: `bus-${6 + i}`,
      number: `MH-02-XY-${1000 + i * 111}`,
      schoolId: 'sch-002',
      route: `Route ${String.fromCharCode(70 + i)} — Mumbai Route ${i + 1}`,
      driverName: ['Deepak Rao', 'Suresh Patil', 'Naresh Joshi', 'Vinod Shah', 'Mahesh Desai'][i],
      driverPhone: `+91 9XXX XXX ${106 + i}`,
    })),
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Fleet Overview"
        description={`${allBuses.length} buses across all schools`}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <BusIcon className="h-4 w-4" />
              <p className="text-xs font-medium">Total Buses</p>
            </div>
            <p className="mt-1 font-poppins text-2xl font-bold">{allBuses.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Navigation className="h-4 w-4" />
              <p className="text-xs font-medium">On Route</p>
            </div>
            <p className="mt-1 font-poppins text-2xl font-bold text-primary">
              {allBuses.filter((b) => b.status === 'On Route').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <p className="text-xs font-medium">At School</p>
            </div>
            <p className="mt-1 font-poppins text-2xl font-bold text-success">
              {allBuses.filter((b) => b.status === 'At School').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Gauge className="h-4 w-4" />
              <p className="text-xs font-medium">Maintenance</p>
            </div>
            <p className="mt-1 font-poppins text-2xl font-bold text-destructive">
              {allBuses.filter((b) => b.status === 'Maintenance').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Buses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bus Number</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>School</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allBuses.map((bus) => {
                const school = SCHOOLS.find((s) => s.id === bus.schoolId);
                return (
                  <TableRow key={bus.id}>
                    <TableCell className="font-medium">{bus.number}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{bus.route}</TableCell>
                    <TableCell className="text-sm">{bus.driverName}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{bus.driverPhone}</TableCell>
                    <TableCell className="text-sm">{school?.name || '—'}</TableCell>
                    <TableCell>
                      <StatusBadge status={bus.status} variant={getBusStatusVariant(bus.status)} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
