'use client';

import { useState } from 'react';
import { STUDENTS } from '@/lib/mock-data';
import { PageHeader, StatusBadge, getStudentStatusVariant } from '@/components/shared';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Users, Bus as BusIcon, Radio } from 'lucide-react';

export default function StudentsPage() {
  const [search, setSearch] = useState('');

  const filtered = STUDENTS.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.grade.toLowerCase().includes(search.toLowerCase()) ||
      s.rfidId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Students"
        description={`${STUDENTS.length} students registered at The Oriental School`}
      />

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, Grade, or RFID ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((student) => (
          <Card key={student.id} className="transition-shadow hover:shadow-md">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                    {student.photo}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="truncate font-semibold">{student.name}</p>
                    <StatusBadge status={student.status} variant={getStudentStatusVariant(student.status)} />
                  </div>
                  <p className="text-sm text-muted-foreground">{student.grade} · Section {student.section}</p>
                  <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <BusIcon className="h-3.5 w-3.5" />
                      {student.busId.toUpperCase()}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Radio className="h-3.5 w-3.5" />
                      {student.rfidId}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" />
                      {student.parentName} · {student.parentPhone}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          No students found matching your search.
        </div>
      )}
    </div>
  );
}
