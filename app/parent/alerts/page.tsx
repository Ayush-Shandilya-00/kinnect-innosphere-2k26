'use client';

import { useApp } from '@/lib/app-context';
import { ALERTS, PARENT_NOTIFICATIONS, STUDENTS, BUSES } from '@/lib/mock-data';
import { PageHeader, StatusBadge, getAlertVariant } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, AlertTriangle, AlertOctagon, Info, Clock, CheckCircle2, Shield } from 'lucide-react';

export default function ParentAlertsPage() {
  const { user } = useApp();
  const child = STUDENTS.find((s) => s.id === user?.childId) || STUDENTS[0];
  const childAlerts = ALERTS.filter((a) => a.studentId === child.id || a.busId === child.busId);

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Safety Updates"
        description={`Safety alerts and notifications for ${child.name}`}
      />

      {/* Safety status banner */}
      <Card className="border-l-4 border-success">
        <CardContent className="flex items-center gap-4 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
            <Shield className="h-6 w-6 text-success" />
          </div>
          <div>
            <p className="font-semibold text-success">Your child is safe</p>
            <p className="text-sm text-muted-foreground">
              {child.status === 'On Bus'
                ? `${child.name} is currently on the bus heading to The Oriental School.`
                : child.status === 'Dropped Off'
                ? `${child.name} has been safely dropped off at school.`
                : `${child.name}'s current status: ${child.status}.`}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="h-4 w-4 text-primary" />
            Recent Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {PARENT_NOTIFICATIONS.map((n) => (
            <div key={n.id} className="flex items-start gap-3 rounded-lg border border-border p-3">
              <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                n.type === 'info' ? 'bg-primary/10' : 'bg-success/10'
              }`}>
                {n.type === 'info' ? (
                  <Info className="h-4 w-4 text-primary" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{n.title}</p>
                <p className="text-xs text-muted-foreground">{n.message}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{n.timestamp}</p>
              </div>
              {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Safety alerts */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground">Safety Alerts</h3>
        {childAlerts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle2 className="h-10 w-10 text-success" />
              <p className="mt-2 font-medium">No safety alerts</p>
              <p className="text-sm text-muted-foreground">Your child's transport has been incident-free today.</p>
            </CardContent>
          </Card>
        ) : (
          childAlerts.map((alert) => (
            <Card key={alert.id} className="border-l-4" style={{
              borderLeftColor: alert.type === 'critical' ? 'hsl(var(--destructive))' : 'hsl(var(--warning))'
            }}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    alert.type === 'critical' ? 'bg-destructive/10' : 'bg-warning/10'
                  }`}>
                    {alert.type === 'critical' ? (
                      <AlertOctagon className="h-5 w-5 text-destructive" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-warning" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{alert.title}</p>
                      <StatusBadge status={alert.type} variant={getAlertVariant(alert.type)} />
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{alert.message}</p>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {alert.timestamp} · {alert.source}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
