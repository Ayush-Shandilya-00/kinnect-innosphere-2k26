'use client';

import { useState, useEffect, useCallback } from 'react';
import { PageHeader, StatusBadge, getStudentStatusVariant } from '@/components/shared';
import { Card, CardContent } from '@/components/ui/card';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Users, Bus as BusIcon, Radio, Plus, Pencil, Trash2, X, Loader2, MapPin, User } from 'lucide-react';
import { getStudents, getBuses, addStudent, updateStudent, deleteStudent } from '@/lib/data-access';
import type { Student, Bus } from '@/lib/mock-data';

const SCHOOL_ID = 'sch-001';

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '', grade: '', section: '', busId: '', parentName: '', parentPhone: '',
    rfidId: '', pickupStop: '', dropStop: '',
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    const [allStudents, allBuses] = await Promise.all([getStudents(), getBuses()]);
    const schoolBuses = allBuses.filter((b) => b.schoolId === SCHOOL_ID);
    setBuses(schoolBuses);
    const busIds = new Set(schoolBuses.map((b) => b.id));
    setStudents(allStudents.filter((s) => busIds.has(s.busId)));
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const filtered = students.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.grade.toLowerCase().includes(search.toLowerCase()) ||
      s.rfidId.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setForm({ name: '', grade: '', section: '', busId: buses[0]?.id || '', parentName: '', parentPhone: '', rfidId: '', pickupStop: '', dropStop: '' });
    setEditStudent(null);
    setShowModal(true);
  };

  const openEdit = (s: Student) => {
    setForm({ name: s.name, grade: s.grade, section: s.section, busId: s.busId, parentName: s.parentName, parentPhone: s.parentPhone, rfidId: s.rfidId, pickupStop: s.pickupStop, dropStop: s.dropStop });
    setEditStudent(s);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name) return;
    setSaving(true);
    if (editStudent) {
      await updateStudent(editStudent.id, form);
    } else {
      await addStudent(form);
    }
    setSaving(false);
    setShowModal(false);
    await loadData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this student?')) return;
    await deleteStudent(id);
    await loadData();
  };

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Students" description={`${students.length} students registered at The Oriental School`}>
        <Button onClick={openAdd} className="gap-2"><Plus className="h-4 w-4" /> Add Student</Button>
      </PageHeader>

      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by name, Grade, or RFID ID..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((student) => (
            <Card key={student.id} className="transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary/10 font-semibold text-primary">{student.photo}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="truncate font-semibold">{student.name}</p>
                      <StatusBadge status={student.status} variant={getStudentStatusVariant(student.status)} />
                    </div>
                    <p className="text-sm text-muted-foreground">{student.grade} · Section {student.section}</p>
                    <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5"><BusIcon className="h-3.5 w-3.5" />{buses.find((b) => b.id === student.busId)?.number || 'Unassigned'}</div>
                      <div className="flex items-center gap-1.5"><Radio className="h-3.5 w-3.5" />{student.rfidId}</div>
                      <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{student.pickupStop}</div>
                      <div className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />{student.parentName} · {student.parentPhone}</div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => openEdit(student)}><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(student.id)}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filtered.length === 0 && !loading && (
        <div className="py-12 text-center text-muted-foreground">No students found matching your search.</div>
      )}

      {/* Add/Edit Student Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in" onClick={() => setShowModal(false)}>
          <Card className="max-w-lg w-full animate-scale-in max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" />{editStudent ? 'Edit Student' : 'Add Student'}</span>
                <button onClick={() => setShowModal(false)}><X className="h-5 w-5 text-muted-foreground" /></button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Student Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" /></div>
                <div className="space-y-2"><Label>RFID ID</Label><Input value={form.rfidId} onChange={(e) => setForm({ ...form, rfidId: e.target.value })} placeholder="RFID-A001" /></div>
                <div className="space-y-2"><Label>Class/Grade</Label><Input value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} placeholder="Grade 5" /></div>
                <div className="space-y-2"><Label>Section</Label><Input value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })} placeholder="A" /></div>
              </div>
              <div className="space-y-2">
                <Label>Assigned Bus</Label>
                <select className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm" value={form.busId} onChange={(e) => setForm({ ...form, busId: e.target.value })}>
                  <option value="">Unassigned</option>
                  {buses.map((b) => <option key={b.id} value={b.id}>{b.number} — {b.route}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Pickup Stop</Label><Input value={form.pickupStop} onChange={(e) => setForm({ ...form, pickupStop: e.target.value })} placeholder="Anand Nagar" /></div>
                <div className="space-y-2"><Label>Drop Stop</Label><Input value={form.dropStop} onChange={(e) => setForm({ ...form, dropStop: e.target.value })} placeholder="The Oriental School" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Parent/Guardian Name</Label><Input value={form.parentName} onChange={(e) => setForm({ ...form, parentName: e.target.value })} placeholder="Parent name" /></div>
                <div className="space-y-2"><Label>Parent Contact</Label><Input value={form.parentPhone} onChange={(e) => setForm({ ...form, parentPhone: e.target.value })} placeholder="+91 9XXX XXX XXX" /></div>
              </div>
              <Button onClick={handleSave} disabled={saving || !form.name} className="w-full">
                {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : editStudent ? 'Update Student' : 'Add Student'}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
