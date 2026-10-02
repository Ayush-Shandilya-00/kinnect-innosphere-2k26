'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/app-context';
import type { Role } from '@/lib/mock-data';
import { Shield, Eye, EyeOff, AlertCircle, Bus, Users, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ROLE_OPTIONS: { value: Role; label: string; icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
  { value: 'school', label: 'School', icon: GraduationCap, desc: 'School Administrator' },
  { value: 'parent', label: 'Parent', icon: Users, desc: 'Parent / Guardian' },
  { value: 'admin', label: 'Admin', icon: Shield, desc: 'Kinnect Platform Admin' },
];

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, user, isLoading } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('school');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      router.replace(`/${user.role}`);
    }
  }, [isLoading, isAuthenticated, user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      const success = login(username, password, role);
      if (success) {
        router.push(`/${role}`);
      } else {
        setError('Invalid credentials. Please check your username, password, and role.');
        setIsSubmitting(false);
      }
    }, 400);
  };

  const fillDemo = (r: Role) => {
    const creds: Record<Role, { u: string; p: string }> = {
      school: { u: 'school', p: '1111' },
      parent: { u: 'parent', p: '2222' },
      admin: { u: 'admin', p: '0000' },
    };
    setUsername(creds[r].u);
    setPassword(creds[r].p);
    setRole(r);
    setError('');
  };

  if (!mounted || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left: Brand panel */}
      <div className="relative flex flex-1 flex-col justify-between overflow-hidden bg-sidebar p-8 lg:p-12">
        {/* Decorative elements */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-10 top-1/3 h-40 w-40 rounded-full bg-primary/15 blur-2xl" />
        </div>

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="font-poppins text-xl font-bold text-white">Kinnect</p>
            <p className="text-xs uppercase tracking-wider text-white/50">Team Kindred</p>
          </div>
        </div>

        {/* Hero text */}
        <div className="relative my-12 hidden lg:block">
          <h1 className="font-poppins text-4xl font-bold leading-tight text-white">
            Student Transport
            <br />
            Safety, Reimagined.
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/60">
            Real-time RFID tracking, live bus monitoring, and instant safety alerts — all in one platform built for schools and parents.
          </p>

          {/* Features */}
          <div className="mt-8 space-y-3">
            {[
              { icon: Shield, text: 'RFID-based student boarding & exit tracking' },
              { icon: Bus, text: 'Live GPS bus monitoring with route alerts' },
              { icon: Users, text: 'Instant parent notifications on safety events' },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 text-white/80">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                  <f.icon className="h-4 w-4" />
                </div>
                <span className="text-sm">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Demo badge */}
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
            Prototype · Demo Environment
          </div>
        </div>
      </div>

      {/* Right: Login form */}
      <div className="flex flex-1 items-center justify-center bg-card p-6 lg:p-12">
        <div className="w-full max-w-md animate-scale-in">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="font-poppins text-2xl font-bold tracking-tight">Welcome to Kinnect</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to access your dashboard
            </p>
          </div>

          {/* Role selector */}
          <div className="mb-6">
            <Label className="mb-2.5 block text-sm font-medium">Select your role</Label>
            <div className="grid grid-cols-3 gap-2">
              {ROLE_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const active = role === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setRole(opt.value)}
                    className={cn(
                      'flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 transition-all',
                      active
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-border hover:border-primary/30 hover:bg-muted'
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-lg transition-colors',
                        active ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                      )}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <span
                      className={cn(
                        'text-xs font-semibold',
                        active ? 'text-primary' : 'text-foreground'
                      )}
                    >
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-11"
                autoComplete="off"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 pr-10"
                  autoComplete="off"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2.5 text-sm text-destructive animate-fade-in">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="h-11 w-full text-base font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 rounded-xl border border-border bg-muted/50 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Demo Credentials — Click to fill
            </p>
            <div className="space-y-2">
              {ROLE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => fillDemo(opt.value)}
                  className="flex w-full items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-left transition-colors hover:border-primary/30 hover:bg-primary/5"
                >
                  <div className="flex items-center gap-2">
                    <opt.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{opt.label}</span>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    {opt.value === 'school' && 'school / 1111'}
                    {opt.value === 'parent' && 'parent / 2222'}
                    {opt.value === 'admin' && 'admin / 0000'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
