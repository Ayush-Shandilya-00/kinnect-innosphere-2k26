'use client';

import { Bus as BusIcon, MapPin, Navigation } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BhopalMapBus {
  id: string;
  label: string;
  x: number;
  y: number;
  status: 'On Route' | 'At School' | 'Idle' | 'Maintenance';
  isDelayed?: boolean;
  isSelected?: boolean;
}

export function BhopalMap({
  buses = [],
  selectedBusId,
  onBusClick,
  showRoutes = true,
  height = 'h-96',
}: {
  buses?: BhopalMapBus[];
  selectedBusId?: string;
  onBusClick?: (id: string) => void;
  showRoutes?: boolean;
  height?: string;
}) {
  // Map coordinate system: 1000 x 600 viewBox
  // School is at center-right (Patel Nagar / Raisen Road area)
  const SCHOOL_X = 680;
  const SCHOOL_Y = 290;
  const ISKCON_X = 640;
  const ISKCON_Y = 240;

  // Route paths — each bus approaches the school from a different Bhopal area
  const routes = [
    { d: 'M 80,520 L 200,480 L 320,420 L 450,360 L 560,320 L 680,290', color: '#10b981', label: 'Route A — Anand Nagar', delayed: false },
    { d: 'M 120,80 L 250,140 L 380,200 L 520,250 L 680,290', color: '#10b981', label: 'Route B — Patel Nagar', delayed: false },
    { d: 'M 900,500 L 820,420 L 740,360 L 680,290', color: '#10b981', label: 'Route D — Shahpura', delayed: false },
    { d: 'M 60,300 L 180,310 L 320,300 L 460,295 L 560,292 L 680,290', color: '#f97316', label: 'Route C — Bairagarh (Delayed)', delayed: true },
  ];

  return (
    <div className={cn('relative overflow-hidden rounded-xl bg-[#0a1410]', height)}>
      <svg viewBox="0 0 1000 600" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        {/* Background land mass */}
        <rect width="1000" height="600" fill="#0a1410" />

        {/* Water bodies — Upper Lake (Bhojtal) silhouette */}
        <path
          d="M 780,50 Q 850,80 880,140 Q 900,200 860,250 Q 820,280 760,260 Q 720,230 730,170 Q 740,100 780,50 Z"
          fill="#0d1f2d"
          opacity="0.6"
        />
        <text x="830" y="160" fill="#1a3a4a" fontSize="9" fontStyle="italic" textAnchor="middle">
          Upper Lake
        </text>

        {/* Green areas / parks */}
        <ellipse cx="300" cy="180" rx="70" ry="40" fill="#0d1f15" opacity="0.5" />
        <ellipse cx="500" cy="450" rx="60" ry="35" fill="#0d1f15" opacity="0.5" />

        {/* Major roads — thick dark strokes */}
        {/* Raisen Road (horizontal main artery) */}
        <path d="M 0,290 L 1000,290" stroke="#1a2a22" strokeWidth="22" fill="none" />
        <path d="M 0,290 L 1000,290" stroke="#243530" strokeWidth="18" fill="none" />
        <path d="M 0,290 L 1000,290" stroke="#1a2a22" strokeWidth="1" fill="none" strokeDasharray="8 6" />

        {/* Vertical road — Patel Nagar road */}
        <path d="M 380,0 L 380,600" stroke="#1a2a22" strokeWidth="18" fill="none" />
        <path d="M 380,0 L 380,600" stroke="#243530" strokeWidth="14" fill="none" />

        {/* Diagonal road — Kolar Road */}
        <path d="M 0,600 L 200,480 L 400,340 L 680,290" stroke="#1a2a22" strokeWidth="16" fill="none" />
        <path d="M 0,600 L 200,480 L 400,340 L 680,290" stroke="#243530" strokeWidth="12" fill="none" />

        {/* MP Nagar connector */}
        <path d="M 120,80 L 250,140 L 380,200 L 520,250 L 680,290" stroke="#1a2a22" strokeWidth="14" fill="none" />
        <path d="M 120,80 L 250,140 L 380,200 L 520,250 L 680,290" stroke="#243530" strokeWidth="10" fill="none" />

        {/* Shahpura road from right */}
        <path d="M 1000,500 L 820,420 L 740,360 L 680,290" stroke="#1a2a22" strokeWidth="14" fill="none" />
        <path d="M 1000,500 L 820,420 L 740,360 L 680,290" stroke="#243530" strokeWidth="10" fill="none" />

        {/* Secondary roads — thinner */}
        <path d="M 380,290 L 380,600" stroke="#152020" strokeWidth="8" fill="none" />
        <path d="M 0,150 L 380,150" stroke="#152020" strokeWidth="6" fill="none" />
        <path d="M 380,150 L 680,150" stroke="#152020" strokeWidth="6" fill="none" />
        <path d="M 680,290 L 680,600" stroke="#152020" strokeWidth="6" fill="none" />
        <path d="M 520,290 L 520,450" stroke="#152020" strokeWidth="5" fill="none" />
        <path d="M 250,290 L 250,500" stroke="#152020" strokeWidth="5" fill="none" />

        {/* Small neighborhood streets */}
        <path d="M 100,400 L 250,400" stroke="#101a18" strokeWidth="4" fill="none" />
        <path d="M 450,200 L 550,200" stroke="#101a18" strokeWidth="4" fill="none" />
        <path d="M 600,350 L 750,350" stroke="#101a18" strokeWidth="4" fill="none" />

        {/* Route lines */}
        {showRoutes && routes.map((route, i) => (
          <g key={i}>
            <path
              d={route.d}
              stroke={route.color}
              strokeWidth="3"
              fill="none"
              strokeDasharray={route.delayed ? '10 6' : '0'}
              opacity="0.6"
            />
            <path
              d={route.d}
              stroke={route.color}
              strokeWidth="1.5"
              fill="none"
              opacity="0.9"
            />
          </g>
        ))}

        {/* Area labels */}
        <text x="120" y="540" fill="#3a5a4a" fontSize="11" fontWeight="600">Anand Nagar</text>
        <text x="40" y="280" fill="#3a5a4a" fontSize="11" fontWeight="600">Bairagarh</text>
        <text x="150" y="70" fill="#3a5a4a" fontSize="11" fontWeight="600">Kolar Road</text>
        <text x="390" y="140" fill="#3a5a4a" fontSize="11" fontWeight="600">Patel Nagar</text>
        <text x="530" y="470" fill="#3a5a4a" fontSize="11" fontWeight="600">Ward 6</text>
        <text x="850" y="530" fill="#3a5a4a" fontSize="11" fontWeight="600">Shahpura</text>
        <text x="250" y="260" fill="#3a5a4a" fontSize="10" fontWeight="500">MP Nagar</text>
        <text x="450" y="270" fill="#3a5a4a" fontSize="10" fontWeight="500">Raisen Road</text>
        <text x="560" y="370" fill="#3a5a4a" fontSize="10" fontWeight="500">Arera Colony</text>

        {/* ISKCON Bhopal landmark */}
        <g>
          <circle cx={ISKCON_X} cy={ISKCON_Y} r="14" fill="#1a2a22" stroke="#10b981" strokeWidth="2" />
          <text x={ISKCON_X} y={ISKCON_Y + 4} fill="#10b981" fontSize="9" fontWeight="700" textAnchor="middle">ISK</text>
          <text x={ISKCON_X} y={ISKCON_Y - 20} fill="#10b981" fontSize="9" fontWeight="600" textAnchor="middle">ISKCON Bhopal</text>
        </g>
      </svg>

      {/* School marker (HTML overlay for crisp text) */}
      <div
        className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${(SCHOOL_X / 1000) * 100}%`, top: `${(SCHOOL_Y / 600) * 100}%` }}
      >
        <div className="flex flex-col items-center">
          <div className="relative">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-success" />
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-emerald-300/40 bg-success shadow-lg shadow-success/30">
              <MapPin className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="mt-1.5 rounded-md bg-[#0d1f15] px-2 py-0.5 text-[10px] font-semibold text-emerald-400 shadow-md ring-1 ring-emerald-500/20">
            The Oriental School
          </div>
        </div>
      </div>

      {/* Bus markers (HTML overlay) */}
      {buses.map((bus) => {
        const isSelected = bus.id === selectedBusId;
        const isDelayed = bus.isDelayed;
        const onRoute = bus.status === 'On Route';
        if (!onRoute) return null;

        return (
          <div
            key={bus.id}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-linear"
            style={{ left: `${(bus.x / 1000) * 100}%`, top: `${(bus.y / 600) * 100}%` }}
            onClick={() => onBusClick?.(bus.id)}
          >
            <div className="flex flex-col items-center cursor-pointer group">
              <div className="relative">
                {isSelected && (
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-primary" />
                )}
                <div
                  className={cn(
                    'relative flex h-8 w-8 items-center justify-center rounded-full border-2 shadow-lg transition-transform group-hover:scale-110',
                    isDelayed
                      ? 'border-orange-300/40 bg-orange-500 shadow-orange-500/30'
                      : 'border-emerald-300/40 bg-primary shadow-primary/30'
                  )}
                >
                  <BusIcon className="h-4 w-4 text-white" />
                </div>
              </div>
              <div
                className={cn(
                  'mt-0.5 rounded px-1.5 py-0.5 text-[9px] font-bold shadow-md ring-1',
                  isDelayed
                    ? 'bg-orange-950/80 text-orange-400 ring-orange-500/20'
                    : 'bg-[#0d1f15] text-emerald-400 ring-emerald-500/20'
                )}
              >
                {bus.label}
              </div>
            </div>
          </div>
        );
      })}

      {/* Legend overlay */}
      <div className="absolute bottom-3 left-3 rounded-lg bg-[#0d1f15]/90 p-2.5 shadow-lg backdrop-blur ring-1 ring-emerald-900/30">
        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-500/60">Bhopal · Live Map</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-5 rounded bg-emerald-500" />
            <span className="text-[10px] text-emerald-300/70">Active route</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-5 rounded border-t border-dashed border-orange-500" />
            <span className="text-[10px] text-orange-300/70">Delayed route</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-success" />
            <span className="text-[10px] text-emerald-300/70">School</span>
          </div>
        </div>
      </div>

      {/* Live badge */}
      <div className="absolute right-3 top-3 flex items-center gap-2 rounded-lg bg-[#0d1f15]/90 px-2.5 py-1.5 shadow-lg backdrop-blur ring-1 ring-emerald-900/30">
        <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
        <p className="text-[10px] font-bold text-red-400">LIVE</p>
      </div>
    </div>
  );
}
