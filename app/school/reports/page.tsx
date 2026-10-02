'use client';

import { BUSES, STUDENTS, RFID_EVENTS, ALERTS, WEEKLY_ATTENDANCE, HOURLY_RFID_SCANS } from '@/lib/mock-data';
import { PageHeader } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, TrendingUp, BarChart3, PieChart, Calendar } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Legend,
} from 'recharts';

const PIE_DATA = [
  { name: 'On Bus', value: 3, color: 'hsl(var(--primary))' },
  { name: 'Dropped Off', value: 2, color: 'hsl(var(--success))' },
  { name: 'Absent', value: 1, color: 'hsl(var(--destructive))' },
  { name: 'Waiting', value: 1, color: 'hsl(var(--warning))' },
];

export default function ReportsPage() {
  const totalStudents = STUDENTS.length;
  const boarded = STUDENTS.filter((s) => s.status === 'On Bus').length;
  const dropped = STUDENTS.filter((s) => s.status === 'Dropped Off').length;
  const absent = STUDENTS.filter((s) => s.status === 'Absent').length;
  const attendanceRate = Math.round(((boarded + dropped) / totalStudents) * 100);

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Reports"
        description="Transport analytics and operational insights for The Oriental School"
      >
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </PageHeader>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <p className="text-xs font-medium">Today's Date</p>
            </div>
            <p className="mt-1 font-poppins text-lg font-bold">Oct 2, 2026</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <p className="text-xs font-medium">Attendance Rate</p>
            </div>
            <p className="mt-1 font-poppins text-lg font-bold text-success">{attendanceRate}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <BarChart3 className="h-4 w-4" />
              <p className="text-xs font-medium">Total Scans Today</p>
            </div>
            <p className="mt-1 font-poppins text-lg font-bold">{RFID_EVENTS.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <FileText className="h-4 w-4" />
              <p className="text-xs font-medium">Active Alerts</p>
            </div>
            <p className="mt-1 font-poppins text-lg font-bold text-warning">
              {ALERTS.filter((a) => !a.resolved).length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Weekly Attendance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={WEEKLY_ATTENDANCE}>
                <defs>
                  <linearGradient id="colorAtt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="boarded" stroke="hsl(var(--primary))" fill="url(#colorAtt)" strokeWidth={2} name="Boarded" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Student Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <RePieChart>
                <Pie data={PIE_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={40}>
                  {PIE_DATA.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
              </RePieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Hourly RFID Scan Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={HOURLY_RFID_SCANS}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="hour" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
              <Bar dataKey="scans" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bus performance table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Bus Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bus Number</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Occupancy</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {BUSES.map((bus) => (
                <TableRow key={bus.id}>
                  <TableCell className="font-medium">{bus.number}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{bus.route}</TableCell>
                  <TableCell className="text-sm">{bus.driverName}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{bus.occupied}/{bus.capacity}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={bus.status === 'On Route' ? 'default' : 'secondary'}>
                      {bus.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
