'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageHeader, StatusBadge, getBusStatusVariant, getStudentStatusVariant } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  GraduationCap, Users, Bus as BusIcon, MapPin, Phone, Mail, ArrowLeft,
  Plus, Pencil, Trash2, X, Loader2, Radio, User, Gauge, Navigation
} from 'lucide-react';
import {
  getSchools, getStudents, getBuses, addStudent, updateStudent, deleteStudent,
  addBus, updateBus, deleteBus,
} from '@/lib/data-access';
import type { School, Student, Bus } from '@/lib/mock-data';

export default function SchoolDetailPage() {
  const params = useParams();
  const router = useRouter();
  const schoolId = params.id as string;

  const [school, setSchool] = useState<School | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);

  // Student modal state
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [studentForm, setStudentForm] = useState({
    name: '', grade: '', section: '', busId: '', parentName: '', parentPhone: '',
    rfidId: '', pickupStop: '', dropStop: '',
  });
  const [savingStudent, setSavingStudent] = useState(false);

  // Bus modal state
  const [showBusModal, setShowBusModal] = useState(false);
  const [editBus, setEditBus] = useState<Bus | null>(null);
  const [busForm, setBusForm] = useState({
    number: '', driverName: '', driverPhone: '', route: '', capacity: 30, status: 'Idle',
  });
  const [savingBus, setSavingBus] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [allSchools, allStudents, allBuses] = await Promise.all([
      getSchools(), getStudents(), getBuses(),
    ]);
    const s = allSchools.find((sc) => sc.id === schoolId) || null;
    setSchool(s);
    setStudents(allStudents.filter((st) => st.busId && allBuses.some((b) => b.id === st.busId && b.schoolId === schoolId)));
    setBuses(allBuses.filter((b) => b.schoolId === schoolId));
    setLoading(false);
  }, [schoolId]);

  useEffect(() => { loadData(); }, [loadData]);

  // Student handlers
  const openAddStudent = () => {
    setStudentForm({ name: '', grade: '', section: '', busId: buses[0]?.id || '', parentName: '', parentPhone: '', rfidId: '', pickupStop: '', dropStop: '' });
    setEditStudent(null);
    setShowStudentModal(true);
  };

  const openEditStudent = (s: Student) => {
    setStudentForm({
      name: s.name, grade: s.grade, section: s.section, busId: s.busId,
      parentName: s.parentName, parentPhone: s.parentPhone, rfidId: s.rfidId,
      pickupStop: s.pickupStop, dropStop: s.dropStop,
    });
    setEditStudent(s);
    setShowStudentModal(true);
  };

  const handleSaveStudent = async () => {
    if (!studentForm.name) return;
    setSavingStudent(true);
    if (editStudent) {
      await updateStudent(editStudent.id, studentForm);
    } else {
      await addStudent(studentForm);
    }
    setSavingStudent(false);
    setShowStudentModal(false);
    await loadData();
  };

  const handleDeleteStudent = async (id: string) => {
    if (!confirm('Remove this student?')) return;
    await deleteStudent(id);
    await loadData();
  };

  // Bus handlers
  const openAddBus = () => {
    setBusForm({ number: '', driverName: '', driverPhone: '', route: '', capacity: 30, status: 'Idle' });
    setEditBus(null);
    setShowBusModal(true);
  };

  const openEditBus = (b: Bus) => {
    setBusForm({ number: b.number, driverName: b.driverName, driverPhone: b.driverPhone, route: b.route, capacity: b.capacity, status: b.status });
    setEditBus(b);
    setShowBusModal(true);
  };

  const handleSaveBus = async () => {
    if (!busForm.number) return;
    setSavingBus(true);
    if (editBus) {
      await updateBus(editBus.id, busForm);
    } else {
      await addBus({ ...busForm, schoolId });
    }
    setSavingBus(false);
    setShowBusModal(false);
    await loadData();
  };

  const handleDeleteBus = async (id: string) => {
    if (!confirm('Remove this bus?')) return;
    await deleteBus(id);
    await loadData();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!school) {
    return (
      <div className="animate-fade-in space-y-6">
        <Button variant="ghost" onClick={() => router.push('/admin/schools')} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Schools
        </Button>
        <p className="text-center text-muted-foreground py-12">School not found.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      <Button variant="ghost" onClick={() => router.push('/admin/schools')} className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Back to Schools
      </Button>

      {/* School header */}
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="font-poppins text-2xl font-bold">{school.name}</h1>
                <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {school.address}
                </div>
                <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{school.phone}</span>
                  <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{school.adminEmail}</span>
                </div>
              </div>
            </div>
            <StatusBadge status={school.status} variant={school.status === 'Active' ? 'success' : 'neutral'} />
          </div>
        </CardContent>
      </Card>

      {/* Students Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-poppins text-lg font-bold flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Students
            <Badge variant="secondary" className="ml-1">{students.length}</Badge>
          </h2>
          <Button onClick={openAddStudent} size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> Add Student
          </Button>
        </div>

        {students.length === 0 ? (
          <Card><CardContent className="py-8 text-center text-muted-foreground">No students enrolled yet.</CardContent></Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {students.map((s) => (
              <Card key={s.id} className="transition-shadow hover:shadow-md">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 font-semibold text-primary">{s.photo}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="truncate font-semibold">{s.name}</p>
                        <StatusBadge status={s.status} variant={getStudentStatusVariant(s.status)} />
                      </div>
                      <p className="text-sm text-muted-foreground">{s.grade} · Section {s.section}</p>
                      <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5"><BusIcon className="h-3.5 w-3.5" />{buses.find((b) => b.id === s.busId)?.number || 'Unassigned'}</div>
                        <div className="flex items-center gap-1.5"><Radio className="h-3.5 w-3.5" />{s.rfidId}</div>
                        <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{s.pickupStop}</div>
                        <div className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />{s.parentName} · {s.parentPhone}</div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => openEditStudent(s)}><Pencil className="h-3.5 w-3.5" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDeleteStudent(s.id)}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Bus Fleet Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-poppins text-lg font-bold flex items-center gap-2">
            <BusIcon className="h-5 w-5 text-primary" />
            Bus Fleet
            <Badge variant="secondary" className="ml-1">{buses.length}</Badge>
          </h2>
          <Button onClick={openAddBus} size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> Add Bus
          </Button>
        </div>

        {buses.length === 0 ? (
          <Card><CardContent className="py-8 text-center text-muted-foreground">No buses registered yet.</CardContent></Card>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {buses.map((bus) => {
              const busStudents = students.filter((s) => s.busId === bus.id);
              const occupancy = bus.capacity > 0 ? Math.round((bus.occupied / bus.capacity) * 100) : 0;
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
                      <div className="flex items-center gap-2"><User className="h-4 w-4 text-muted-foreground" /><div><p className="text-xs text-muted-foreground">Driver</p><p className="font-medium">{bus.driverName}</p></div></div>
                      <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" /><div><p className="text-xs text-muted-foreground">Phone</p><p className="font-medium">{bus.driverPhone}</p></div></div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1 text-muted-foreground"><Users className="h-3.5 w-3.5" /> Occupancy</span>
                        <span className="font-medium">{bus.occupied}/{bus.capacity} ({occupancy}%)</span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                        <div className={`h-full rounded-full ${occupancy > 80 ? 'bg-destructive' : occupancy > 50 ? 'bg-warning' : 'bg-success'}`} style={{ width: `${occupancy}%` }} />
                      </div>
                    </div>
                    {busStudents.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {busStudents.map((s) => <Badge key={s.id} variant="secondary" className="text-xs">{s.name}</Badge>)}
                      </div>
                    )}
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => openEditBus(bus)}><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDeleteBus(bus.id)}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Student Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in" onClick={() => setShowStudentModal(false)}>
          <Card className="max-w-lg w-full animate-scale-in max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" />{editStudent ? 'Edit Student' : 'Add Student'}</span>
                <button onClick={() => setShowStudentModal(false)}><X className="h-5 w-5 text-muted-foreground" /></button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Student Name</Label><Input value={studentForm.name} onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })} placeholder="Full name" /></div>
                <div className="space-y-2"><Label>RFID ID</Label><Input value={studentForm.rfidId} onChange={(e) => setStudentForm({ ...studentForm, rfidId: e.target.value })} placeholder="RFID-A001" /></div>
                <div className="space-y-2"><Label>Class/Grade</Label><Input value={studentForm.grade} onChange={(e) => setStudentForm({ ...studentForm, grade: e.target.value })} placeholder="Grade 5" /></div>
                <div className="space-y-2"><Label>Section</Label><Input value={studentForm.section} onChange={(e) => setStudentForm({ ...studentForm, section: e.target.value })} placeholder="A" /></div>
              </div>
              <div className="space-y-2">
                <Label>Assigned Bus</Label>
                <select className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm" value={studentForm.busId} onChange={(e) => setStudentForm({ ...studentForm, busId: e.target.value })}>
                  <option value="">Unassigned</option>
                  {buses.map((b) => <option key={b.id} value={b.id}>{b.number} — {b.route}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Pickup Stop</Label><Input value={studentForm.pickupStop} onChange={(e) => setStudentForm({ ...studentForm, pickupStop: e.target.value })} placeholder="Anand Nagar" /></div>
                <div className="space-y-2"><Label>Drop Stop</Label><Input value={studentForm.dropStop} onChange={(e) => setStudentForm({ ...studentForm, dropStop: e.target.value })} placeholder="The Oriental School" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Parent/Guardian Name</Label><Input value={studentForm.parentName} onChange={(e) => setStudentForm({ ...studentForm, parentName: e.target.value })} placeholder="Parent name" /></div>
                <div className="space-y-2"><Label>Parent Contact</Label><Input value={studentForm.parentPhone} onChange={(e) => setStudentForm({ ...studentForm, parentPhone: e.target.value })} placeholder="+91 9XXX XXX XXX" /></div>
              </div>
              <Button onClick={handleSaveStudent} disabled={savingStudent || !studentForm.name} className="w-full">
                {savingStudent ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : editStudent ? 'Update Student' : 'Add Student'}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Bus Modal */}
      {showBusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in" onClick={() => setShowBusModal(false)}>
          <Card className="max-w-md w-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2"><BusIcon className="h-5 w-5 text-primary" />{editBus ? 'Edit Bus' : 'Add Bus'}</span>
                <button onClick={() => setShowBusModal(false)}><X className="h-5 w-5 text-muted-foreground" /></button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label>Bus Number / Registration</Label><Input value={busForm.number} onChange={(e) => setBusForm({ ...busForm, number: e.target.value })} placeholder="MP-04-KA-1234" /></div>
              <div className="space-y-2"><Label>Route</Label><Input value={busForm.route} onChange={(e) => setBusForm({ ...busForm, route: e.target.value })} placeholder="Route A — Anand Nagar → School" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Driver Name</Label><Input value={busForm.driverName} onChange={(e) => setBusForm({ ...busForm, driverName: e.target.value })} placeholder="Driver name" /></div>
                <div className="space-y-2"><Label>Driver Phone</Label><Input value={busForm.driverPhone} onChange={(e) => setBusForm({ ...busForm, driverPhone: e.target.value })} placeholder="+91 9XXX XXX XXX" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Capacity</Label><Input type="number" value={busForm.capacity} onChange={(e) => setBusForm({ ...busForm, capacity: parseInt(e.target.value) || 30 })} /></div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <select className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm" value={busForm.status} onChange={(e) => setBusForm({ ...busForm, status: e.target.value })}>
                    <option value="Idle">Idle</option>
                    <option value="On Route">On Route</option>
                    <option value="At School">At School</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>
              <Button onClick={handleSaveBus} disabled={savingBus || !busForm.number} className="w-full">
                {savingBus ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : editBus ? 'Update Bus' : 'Add Bus'}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
