'use client';

import { useApp } from '@/lib/app-context';
import { STUDENTS, BUSES } from '@/lib/mock-data';
import { PageHeader, StatusBadge, getStudentStatusVariant } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Bus as BusIcon, Radio, Phone, MapPin, GraduationCap, Heart } from 'lucide-react';

export default function MyChildPage() {
  const { user } = useApp();
  const child = STUDENTS.find((s) => s.id === user?.childId) || STUDENTS[0];
  const bus = BUSES.find((b) => b.id === child.busId) || BUSES[0];

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="My Child"
        description="Detailed information about your child's transport"
      />

      {/* Child profile */}
      <Card className="overflow-hidden">
        <div className="relative bg-gradient-to-r from-primary to-accent p-6 text-white">
          <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="relative flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <Avatar className="h-20 w-20 border-4 border-white/30">
              <AvatarFallback className="bg-white/20 text-2xl font-bold text-white">
                {child.photo}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h2 className="font-poppins text-2xl font-bold">{child.name}</h2>
              <p className="text-sm text-white/80">{child.grade} · Section {child.section}</p>
              <p className="mt-1 text-sm text-white/80">The Oriental School · Bhopal</p>
            </div>
            <div className="sm:ml-auto">
              <StatusBadge status={child.status} variant={getStudentStatusVariant(child.status)} />
            </div>
          </div>
        </div>
      </Card>

      {/* Details */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-4 w-4 text-primary" />
              Student Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <InfoRow icon={GraduationCap} label="Grade" value={`${child.grade} · Section ${child.section}`} />
            <InfoRow icon={Radio} label="RFID ID" value={child.rfidId} />
            <InfoRow icon={MapPin} label="Pickup Stop" value={child.pickupStop} />
            <InfoRow icon={MapPin} label="Drop Stop" value={child.dropStop} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-4 w-4 text-primary" />
              Parent / Guardian
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <InfoRow icon={User} label="Name" value={child.parentName} />
            <InfoRow icon={Phone} label="Phone" value={child.parentPhone} />
            <InfoRow icon={Heart} label="Relationship" value="Mother" />
          </CardContent>
        </Card>

        <Card className="sm:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BusIcon className="h-4 w-4 text-primary" />
              Assigned Bus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <BusIcon className="h-7 w-7 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{bus.number}</p>
                <p className="text-sm text-muted-foreground">{bus.route}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Driver</p>
                  <p className="font-medium">{bus.driverName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Driver Phone</p>
                  <p className="font-medium">{bus.driverPhone}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
