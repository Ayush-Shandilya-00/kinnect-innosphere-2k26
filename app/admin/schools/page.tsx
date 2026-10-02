'use client';

import { useState } from 'react';
import { SCHOOLS } from '@/lib/mock-data';
import { PageHeader, StatusBadge } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { GraduationCap, Users, Bus, MapPin, Phone, Mail, Search, Eye, Building2 } from 'lucide-react';

export default function AdminSchoolsPage() {
  const [search, setSearch] = useState('');
  const [selectedSchool, setSelectedSchool] = useState<typeof SCHOOLS[0] | null>(null);

  const filtered = SCHOOLS.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="School Management"
        description={`${SCHOOLS.length} registered schools on the platform`}
      />

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search schools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Cards grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((school) => (
          <Card key={school.id} className="transition-shadow hover:shadow-md">
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
                <StatusBadge
                  status={school.status}
                  variant={school.status === 'Active' ? 'success' : 'neutral'}
                />
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
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      Students
                    </p>
                    <p className="font-semibold">{school.students}</p>
                  </div>
                  <div>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Bus className="h-3 w-3" />
                      Buses
                    </p>
                    <p className="font-semibold">{school.buses}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => setSelectedSchool(school)}>
                  <Eye className="mr-1 h-3.5 w-3.5" />
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detail table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Schools</CardTitle>
        </CardHeader>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((school) => (
                <TableRow key={school.id}>
                  <TableCell className="font-medium">{school.name}</TableCell>
                  <TableCell>{school.adminName}</TableCell>
                  <TableCell>{school.students}</TableCell>
                  <TableCell>{school.buses}</TableCell>
                  <TableCell>
                    <Badge variant={school.status === 'Active' ? 'default' : 'secondary'}>
                      {school.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{school.joinedDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* School detail modal */}
      {selectedSchool && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in"
          onClick={() => setSelectedSchool(null)}
        >
          <Card className="max-w-md w-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                {selectedSchool.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <StatusBadge status={selectedSchool.status} variant={selectedSchool.status === 'Active' ? 'success' : 'neutral'} />
                <span className="text-sm text-muted-foreground">{selectedSchool.id}</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <span>{selectedSchool.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedSchool.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedSchool.adminEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Admin: {selectedSchool.adminName}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-border pt-3">
                <div>
                  <p className="text-xs text-muted-foreground">Total Students</p>
                  <p className="font-poppins text-xl font-bold">{selectedSchool.students}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Buses</p>
                  <p className="font-poppins text-xl font-bold">{selectedSchool.buses}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Joined: {selectedSchool.joinedDate}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
