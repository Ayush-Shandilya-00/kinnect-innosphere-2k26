'use client';

import { useState } from 'react';
import { ALERTS } from '@/lib/mock-data';
import { PageHeader, StatusBadge, getAlertVariant } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Clock, CheckCircle2, AlertTriangle, AlertOctagon, Info } from 'lucide-react';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(ALERTS);

  const resolveAlert = (id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, resolved: true } : a)));
  };

  const active = alerts.filter((a) => !a.resolved);
  const resolved = alerts.filter((a) => a.resolved);

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Safety Alerts"
        description={`${active.length} active alerts requiring attention`}
      />

      {/* Active alerts */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground">Active Alerts</h3>
        {active.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle2 className="h-10 w-10 text-success" />
              <p className="mt-2 font-medium">All clear!</p>
              <p className="text-sm text-muted-foreground">No active safety alerts.</p>
            </CardContent>
          </Card>
        )}
        {active.map((alert) => (
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
                  <div className="mt-2 flex items-center justify-between">
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {alert.timestamp} · {alert.source}
                    </p>
                    <Button size="sm" variant="outline" onClick={() => resolveAlert(alert.id)} className="h-7 text-xs">
                      <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                      Resolve
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resolved alerts */}
      {resolved.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground">Resolved Alerts</h3>
          {resolved.map((alert) => (
            <Card key={alert.id} className="opacity-60">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-success/10">
                    <Info className="h-5 w-5 text-success" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{alert.title}</p>
                      <Badge variant="secondary" className="border-success/20 bg-success/10 text-success">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Resolved
                      </Badge>
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
          ))}
        </div>
      )}
    </div>
  );
}
