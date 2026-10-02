'use client';

import { PageHeader } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Shield, Bell, Globe, Server, Save, KeyRound } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Platform Settings"
        description="Manage Kinnect platform configuration"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Admin Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Shield className="h-4 w-4 text-primary" />
              Admin Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Administrator Name</Label>
              <Input defaultValue="Kinnect Administrator" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue="admin@Kinnect.com" />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input defaultValue="+91 9XXX XXX 000" />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <KeyRound className="h-4 w-4 text-primary" />
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
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground">Required for admin accounts</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">IP Whitelist</p>
                <p className="text-xs text-muted-foreground">Restrict admin access to specific IPs</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Platform Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Globe className="h-4 w-4 text-primary" />
              Platform Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Allow New School Registrations</p>
                <p className="text-xs text-muted-foreground">Schools can self-register on the platform</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Default Speed Limit</p>
                <p className="text-xs text-muted-foreground">Global speed limit for all buses</p>
              </div>
              <Badge variant="secondary">40 km/h</Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">RFID Required</p>
                <p className="text-xs text-muted-foreground">Mandatory RFID scans for all students</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Auto-Resolve Alerts</p>
                <p className="text-xs text-muted-foreground">Automatically resolve info-level alerts after 24h</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* System & Maintenance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Server className="h-4 w-4 text-primary" />
              System & Maintenance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">System Status</p>
                <p className="text-xs text-muted-foreground">All systems operational</p>
              </div>
              <Badge variant="default" className="border-success/20 bg-success/10 text-success">
                Operational
              </Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Database Backup</p>
                <p className="text-xs text-muted-foreground">Last backup: Oct 2, 2026 02:00 AM</p>
              </div>
              <Badge variant="secondary">Daily</Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Maintenance Mode</p>
                <p className="text-xs text-muted-foreground">Temporarily disable user access</p>
              </div>
              <Switch />
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
