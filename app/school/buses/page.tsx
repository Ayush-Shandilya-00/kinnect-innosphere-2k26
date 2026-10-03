'use client';

import { useState, useEffect, useCallback } from 'react';
import { useApp } from '@/lib/app-context';
import { getBuses, getStudents, addBus, updateBus, deleteBus } from '@/lib/data-access';
import type { Bus, Student } from '@/lib/mock-data';
import { PageHeader, StatusBadge, getBusStatusVariant } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bus as BusIcon, User, Phone, MapPin, Users, Plus, Pencil, Trash2, X, Loader2, Radio } from 'lucide-react';

interface BusForm {
  number: string;
  registrationNumber: string;
  driverName: string;
  driverPhone: string;
  route: string;
  pickupStops: string;
  dropStops: string;
  deviceId: string;
  capacity: number;
  status: string;
}

const EMPTY_FORM: BusForm = {
  number: '', registrationNumber: '', driverName: '', driverPhone: '', route: '',
  pickupStops: '', dropStops: '', deviceId: '', capacity: 30, status: 'Idle',
};

export default function BusesPage() {
  const { user } = useApp();
  const schoolId = user?.schoolId || 'sch-001';
  const [buses, setBuses] = useState<Bus[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Bus | null>(null);
  const [form, setForm] = useState<BusForm>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [allBuses, allStudents] = await Promise.all([getBuses(), getStudents()]);
    const schoolBuses = allBuses.filter((bus) => bus.schoolId === schoolId);
    setBuses(schoolBuses);
    const ids = new Set(schoolBuses.map((bus) => bus.id));
    setStudents(allStudents.filter((student) => ids.has(student.busId)));
    setLoading(false);
  }, [schoolId]);

  useEffect(() => { loadData(); }, [loadData]);

  const openAdd = () => {
    setEditing(null);
    setForm({ ...EMPTY_FORM });
    setShowModal(true);
  };

  const openEdit = (bus: Bus) => {
    setEditing(bus);
    setForm({
      number: bus.number, registrationNumber: bus.registrationNumber || '',
      driverName: bus.driverName, driverPhone: bus.driverPhone, route: bus.route,
      pickupStops: bus.pickupStops || '', dropStops: bus.dropStops || '',
      deviceId: bus.deviceId || '', capacity: bus.capacity, status: bus.status,
    });
    setShowModal(true);
  };

  const saveBus = async () => {
    if (!form.number || !form.driverName || !form.route) return;
    setSaving(true);
    if (editing) {
      await updateBus(editing.id, form);
    } else {
      await addBus({ ...form, schoolId });
    }
    setSaving(false);
    setShowModal(false);
    await loadData();
  };

  const removeBus = async (id: string) => {
    if (!confirm('Remove this bus from the school fleet?')) return;
    await deleteBus(id);
    await loadData();
  };

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Bus Fleet" description={`${buses.length} buses registered at your school`}>
        <Button onClick={openAdd} className="gap-2"><Plus className="h-4 w-4" /> Add Bus</Button>
      </PageHeader>

      {loading ? <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div> : (
        <div className="grid gap-4 lg:grid-cols-2">
          {buses.map((bus) => {
            const busStudents = students.filter((student) => student.busId === bus.id);
            const occupancy = bus.capacity > 0 ? Math.round((bus.occupied / bus.capacity) * 100) : 0;
            return (
              <Card key={bus.id} className="transition-shadow hover:shadow-md">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10"><BusIcon className="h-6 w-6 text-primary" /></div><div><p className="font-semibold">{bus.number}</p><p className="text-sm text-muted-foreground">{bus.route}</p>{bus.registrationNumber && <p className="text-xs text-muted-foreground">Reg: {bus.registrationNumber}</p>}</div></div>
                    <StatusBadge status={bus.status} variant={getBusStatusVariant(bus.status)} />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2"><User className="h-4 w-4 text-muted-foreground" /><div><p className="text-xs text-muted-foreground">Driver</p><p className="font-medium">{bus.driverName}</p></div></div>
                    <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" /><div><p className="text-xs text-muted-foreground">Contact</p><p className="font-medium">{bus.driverPhone}</p></div></div>
                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" /><div><p className="text-xs text-muted-foreground">Stops</p><p className="font-medium truncate">{bus.pickupStops || 'Not set'}</p></div></div>
                    <div className="flex items-center gap-2"><Radio className="h-4 w-4 text-muted-foreground" /><div><p className="text-xs text-muted-foreground">Device ID</p><p className="font-medium">{bus.deviceId || 'Not set'}</p></div></div>
                  </div>
                  <div className="mt-4"><div className="flex items-center justify-between text-xs"><span className="flex items-center gap-1 text-muted-foreground"><Users className="h-3.5 w-3.5" /> Occupancy</span><span className="font-medium">{bus.occupied}/{bus.capacity} ({occupancy}%)</span></div><div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted"><div className={`h-full rounded-full ${occupancy > 80 ? 'bg-destructive' : occupancy > 50 ? 'bg-warning' : 'bg-success'}`} style={{ width: `${occupancy}%` }} /></div></div>
                  {busStudents.length > 0 && <div className="mt-3 flex flex-wrap gap-1.5">{busStudents.map((student) => <Badge key={student.id} variant="secondary" className="text-xs">{student.name}</Badge>)}</div>}
                  <div className="mt-3 flex gap-2"><Button size="sm" variant="ghost" onClick={() => openEdit(bus)}><Pencil className="h-3.5 w-3.5" /></Button><Button size="sm" variant="ghost" onClick={() => removeBus(bus.id)}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button></div>
                </CardContent>
              </Card>
            );
          })}
          {!buses.length && <Card className="lg:col-span-2"><CardContent className="py-12 text-center text-muted-foreground">No buses have been added to your school yet.</CardContent></Card>}
        </div>
      )}

      {showModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in" onClick={() => setShowModal(false)}><Card className="max-h-[90vh] w-full max-w-lg overflow-y-auto animate-scale-in" onClick={(event) => event.stopPropagation()}><CardHeader><CardTitle className="flex items-center justify-between"><span className="flex items-center gap-2"><BusIcon className="h-5 w-5 text-primary" />{editing ? 'Edit Bus' : 'Add Bus'}</span><button onClick={() => setShowModal(false)}><X className="h-5 w-5 text-muted-foreground" /></button></CardTitle></CardHeader><CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label>Bus Number</Label><Input value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} placeholder="Bus #4" /></div><div className="space-y-2"><Label>Registration Number</Label><Input value={form.registrationNumber} onChange={(e) => setForm({ ...form, registrationNumber: e.target.value })} placeholder="MP-04-KA-1234" /></div></div>
        <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label>Driver Name</Label><Input value={form.driverName} onChange={(e) => setForm({ ...form, driverName: e.target.value })} placeholder="Driver name" /></div><div className="space-y-2"><Label>Driver Contact</Label><Input value={form.driverPhone} onChange={(e) => setForm({ ...form, driverPhone: e.target.value })} placeholder="+91 9XXX XXX XXX" /></div></div>
        <div className="space-y-2"><Label>Route</Label><Input value={form.route} onChange={(e) => setForm({ ...form, route: e.target.value })} placeholder="Route A" /></div>
        <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label>Pickup Stops</Label><Input value={form.pickupStops} onChange={(e) => setForm({ ...form, pickupStops: e.target.value })} placeholder="Anand Nagar, Kolar Road" /></div><div className="space-y-2"><Label>Drop Stops</Label><Input value={form.dropStops} onChange={(e) => setForm({ ...form, dropStops: e.target.value })} placeholder="School, MP Nagar" /></div></div>
        <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label>RFID/GPS Device ID</Label><Input value={form.deviceId} onChange={(e) => setForm({ ...form, deviceId: e.target.value })} placeholder="DEVICE-004" /></div><div className="space-y-2"><Label>Capacity</Label><Input type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) || 30 })} /></div></div>
        <div className="space-y-2"><Label>Bus Status</Label><select className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>Idle</option><option>On Route</option><option>At School</option><option>Maintenance</option></select></div>
        <Button onClick={saveBus} disabled={saving || !form.number || !form.driverName || !form.route} className="w-full">{saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : editing ? 'Update Bus' : 'Add Bus'}</Button>
      </CardContent></Card></div>}
    </div>
  );
}
