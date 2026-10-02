'use client';

import { useState } from 'react';
import { SYSTEM_USERS } from '@/lib/mock-data';
import { PageHeader, StatusBadge } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, User, Mail, Phone, GraduationCap, Users, Shield } from 'lucide-react';

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'School Admin' | 'Parent'>('all');

  const filtered = SYSTEM_USERS.filter(
    (u) =>
      (filter === 'all' || u.role === filter) &&
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.school.toLowerCase().includes(search.toLowerCase()))
  );

  const adminCount = SYSTEM_USERS.filter((u) => u.role === 'School Admin').length;
  const parentCount = SYSTEM_USERS.filter((u) => u.role === 'Parent').length;

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="User Management"
        description={`${SYSTEM_USERS.length} users across the platform`}
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{SYSTEM_USERS.length}</p>
              <p className="text-xs text-muted-foreground">Total Users</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <GraduationCap className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">{adminCount}</p>
              <p className="text-xs text-muted-foreground">School Admins</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
              <User className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{parentCount}</p>
              <p className="text-xs text-muted-foreground">Parents</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'School Admin', 'Parent'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                filter === f
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:bg-muted'
              }`}
            >
              {f === 'all' ? 'All Users' : f}
            </button>
          ))}
        </div>
      </div>

      {/* User cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((user) => (
          <Card key={user.id} className="transition-shadow hover:shadow-md">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                    {user.name.split(' ').map((w) => w[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="truncate font-semibold">{user.name}</p>
                    <StatusBadge status={user.status} variant={user.status === 'Active' ? 'success' : 'neutral'} />
                  </div>
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {user.role === 'School Admin' ? (
                      <><GraduationCap className="mr-1 h-3 w-3" />{user.role}</>
                    ) : (
                      <><User className="mr-1 h-3 w-3" />{user.role}</>
                    )}
                  </Badge>
                  <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5" />
                      {user.phone}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="h-3.5 w-3.5" />
                      {user.school}
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">Last login: {user.lastLogin}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table view */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>School</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{user.role}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{user.school}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{user.lastLogin}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
