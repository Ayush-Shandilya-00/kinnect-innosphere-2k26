'use client';

import { useApp } from '@/lib/app-context';
import { PageHeader } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Building2, Bell, Shield, Globe, Save } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useApp();

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your school's Kinnect configuration"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* School Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Building2 className="h-4 w-4 text-primary" />
              School Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>School Name</Label>
              <Input defaultValue="The Oriental School" />
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Input defaultValue="Opp. Patel Nagar, Raisen Road, Bhopal, MP 462016" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input defaultValue="+91 9XXX XXX 001" />
              </div>
              <div className="space-y-2">
                <Label>Admin Email</Label>
                <Input defaultValue="admin@orientalschool.edu" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Bell className="h-4 w-4 text-primary" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'RFID scan alerts', desc: 'Get notified on each student scan', on: true },
              { label: 'Safety alerts', desc: 'Critical and warning alerts', on: true },
              { label: 'Bus delay notifications', desc: 'Alerts for delayed buses', on: true },
              { label: 'Daily attendance report', desc: 'Email summary at end of day', on: false },
              { label: 'Speed limit violations', desc: 'Alerts when buses exceed speed limit', on: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch defaultChecked={item.on} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Shield className="h-4 w-4 text-primary" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Current Password</Label>
              <Input type="password" placeholder="••••••" />
            </div>
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input type="password" placeholder="Enter new password" />
            </div>
            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <Input type="password" placeholder="Confirm new password" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* System */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Globe className="h-4 w-4 text-primary" />
              System Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Speed Limit Threshold</p>
                <p className="text-xs text-muted-foreground">Alert when buses exceed this speed</p>
              </div>
              <Badge variant="secondary">40 km/h</Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">RFID Scanner Sensitivity</p>
                <p className="text-xs text-muted-foreground">Scanner detection range</p>
              </div>
              <Badge variant="secondary">High</Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Auto-notify Parents</p>
                <p className="text-xs text-muted-foreground">Send notifications on board/exit</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">GPS Update Interval</p>
                <p className="text-xs text-muted-foreground">Bus location refresh rate</p>
              </div>
              <Badge variant="secondary">10 sec</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
