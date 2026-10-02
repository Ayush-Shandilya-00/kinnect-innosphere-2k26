'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  color = 'primary',
}: {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: 'primary' | 'success' | 'warning' | 'destructive' | 'accent';
}) {
  const colorClasses: Record<string, string> = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    destructive: 'bg-destructive/10 text-destructive',
    accent: 'bg-accent/10 text-accent',
  };

  return (
    <Card className="animate-slide-up overflow-hidden transition-shadow hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="font-poppins text-2xl font-bold tracking-tight">{value}</p>
            {trend && (
              <p
                className={cn(
                  'flex items-center gap-1 text-xs font-medium',
                  trend === 'up' && 'text-success',
                  trend === 'down' && 'text-destructive',
                  trend === 'neutral' && 'text-muted-foreground'
                )}
              >
                {trend === 'up' && '↑'}
                {trend === 'down' && '↓'}
                {trendValue}
              </p>
            )}
          </div>
          <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl', colorClasses[color])}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-poppins text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}

export function StatusBadge({
  status,
  variant,
}: {
  status: string;
  variant?: 'success' | 'warning' | 'destructive' | 'info' | 'neutral';
}) {
  const variantClasses: Record<string, string> = {
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    destructive: 'bg-destructive/10 text-destructive border-destructive/20',
    info: 'bg-primary/10 text-primary border-primary/20',
    neutral: 'bg-muted text-muted-foreground border-border',
  };

  const dotClasses: Record<string, string> = {
    success: 'bg-success',
    warning: 'bg-warning',
    destructive: 'bg-destructive',
    info: 'bg-primary',
    neutral: 'bg-muted-foreground',
  };

  const v = variant || 'neutral';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        variantClasses[v]
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', dotClasses[v])} />
      {status}
    </span>
  );
}

export function getAlertVariant(type: string): 'success' | 'warning' | 'destructive' | 'info' | 'neutral' {
  if (type === 'critical') return 'destructive';
  if (type === 'warning') return 'warning';
  if (type === 'info') return 'info';
  return 'neutral';
}

export function getBusStatusVariant(status: string): 'success' | 'warning' | 'destructive' | 'info' | 'neutral' {
  if (status === 'On Route') return 'info';
  if (status === 'At School') return 'success';
  if (status === 'Maintenance') return 'destructive';
  return 'neutral';
}

export function getStudentStatusVariant(status: string): 'success' | 'warning' | 'destructive' | 'info' | 'neutral' {
  if (status === 'On Bus') return 'info';
  if (status === 'Dropped Off') return 'success';
  if (status === 'Absent') return 'destructive';
  if (status === 'Waiting') return 'warning';
  return 'neutral';
}
