'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader, StatusBadge } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { GraduationCap, Users, Bus, MapPin, Phone, Mail, Search, Eye, Building2, Plus, Pencil, Trash2, X, Loader2 } from 'lucide-react';
import { getSchools, addSchool, updateSchool, deleteSchool } from '@/lib/data-access';
import type { School } from '@/lib/mock-data';

export default function AdminSchoolsPage() {
  const router = useRouter();
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editSchool, setEditSchool] = useState<School | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: '', address: '', phone: '', adminName: '', adminEmail: '' });

  const loadSchools = useCallback(async () => {
    setLoading(true);
    const data = await getSchools();
    setSchools(data);
    setLoading(false);
  }, []);

  useEffect(() => { loadSchools(); }, [loadSchools]);

  const filtered = schools.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.address.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setForm({ name: '', address: '', phone: '', adminName: '', adminEmail: '' });
    setEditSchool(null);
    setShowAddModal(true);
  };

  const openEdit = (school: School) => {
    setForm({ name: school.name, address: school.address, phone: school.phone, adminName: school.adminName, adminEmail: school.adminEmail });
    setEditSchool(school);
    setShowAddModal(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.address) return;
    setSaving(true);
    if (editSchool) {
      await updateSchool(editSchool.id, form);
    } else {
      await addSchool(form);
    }
    setSaving(false);
    setShowAddModal(false);
    await loadSchools();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this school? This will also remove its buses and students.')) return;
    await deleteSchool(id);
    await loadSchools();
  };

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="School Management" description={`${schools.length} registered schools on the platform`}>
        <Button onClick={openAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          Add School
        </Button>
      </PageHeader>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search schools..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((school) => (
              <Card key={school.id} className="transition-shadow hover:shadow-md cursor-pointer" onClick={() => router.push(`/admin/schools/${school.id}`)}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <GraduationCap className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{school.name}</p>
                        <p className="text-xs text-muted-foreground">{school.id}</p>
                      </div>
                    </div>
                    <StatusBadge status={school.status} variant={school.status === 'Active' ? 'success' : 'neutral'} />
                  </div>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="truncate">{school.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-3.5 w-3.5" />
                      {school.phone}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                    <div className="flex gap-4">
                      <div>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground"><Users className="h-3 w-3" /> Students</p>
                        <p className="font-semibold">{school.students}</p>
                      </div>
                      <div>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground"><Bus className="h-3 w-3" /> Buses</p>
                        <p className="font-semibold">{school.buses}</p>
                      </div>
                    </div>
                    <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                      <Button size="sm" variant="ghost" onClick={() => openEdit(school)}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(school.id)}>
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader><CardTitle className="text-base">All Schools</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>School Name</TableHead>
                    <TableHead>Admin</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Buses</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((school) => (
                    <TableRow key={school.id} className="cursor-pointer" onClick={() => router.push(`/admin/schools/${school.id}`)}>
                      <TableCell className="font-medium">{school.name}</TableCell>
                      <TableCell>{school.adminName}</TableCell>
                      <TableCell>{school.students}</TableCell>
                      <TableCell>{school.buses}</TableCell>
                      <TableCell><Badge variant={school.status === 'Active' ? 'default' : 'secondary'}>{school.status}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{school.joinedDate}</TableCell>
                      <TableCell>
                        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                          <Button size="sm" variant="ghost" onClick={() => openEdit(school)}><Pencil className="h-3.5 w-3.5" /></Button>
                          <Button size="sm" variant="ghost" onClick={() => handleDelete(school.id)}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}

      {/* Add/Edit School Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in" onClick={() => setShowAddModal(false)}>
          <Card className="max-w-md w-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2"><Building2 className="h-5 w-5 text-primary" />{editSchool ? 'Edit School' : 'Add School'}</span>
                <button onClick={() => setShowAddModal(false)}><X className="h-5 w-5 text-muted-foreground" /></button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>School Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter school name" />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Enter school address" />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 9XXX XXX XXX" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Admin Name</Label>
                  <Input value={form.adminName} onChange={(e) => setForm({ ...form, adminName: e.target.value })} placeholder="Admin name" />
                </div>
                <div className="space-y-2">
                  <Label>Admin Email</Label>
                  <Input value={form.adminEmail} onChange={(e) => setForm({ ...form, adminEmail: e.target.value })} placeholder="admin@school.edu" />
                </div>
              </div>
              <Button onClick={handleSave} disabled={saving || !form.name} className="w-full">
                {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : editSchool ? 'Update School' : 'Create School'}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
