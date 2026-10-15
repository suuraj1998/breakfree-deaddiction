import React, { useState } from 'react';
import { MapPin, Navigation, AlertTriangle, Plus, Bell, Compass, Volume2, ShieldAlert } from 'lucide-react';
import { DangerZone, HabitCategory } from '../types';

interface GeofenceRadarProps {
  dangerZones: DangerZone[];
  onTriggerGeofenceAlarm: (zone: DangerZone) => void;
  onAddDangerZone: (zone: DangerZone) => void;
}

export const GeofenceRadar: React.FC<GeofenceRadarProps> = ({
  dangerZones,
  onTriggerGeofenceAlarm,
  onAddDangerZone,
}) => {
  const [selectedZone, setSelectedZone] = useState<DangerZone | undefined>(dangerZones[0]);
  const [simulatedDistanceMeters, setSimulatedDistanceMeters] = useState(120);
  const [isAddingZone, setIsAddingZone] = useState(false);
  const [newZoneName, setNewZoneName] = useState('');
  const [newZoneAddress, setNewZoneAddress] = useState('');
  const [newZoneCategory, setNewZoneCategory] = useState<HabitCategory>('smoking');
  const [newZoneRadius, setNewZoneRadius] = useState(50);

  const currentZone: DangerZone = selectedZone || dangerZones[0] || {
    id: 'default-safe-perimeter',
    name: 'Perimeter Safe Boundary',
    address: 'Configured High-Risk Perimeter',
    category: 'smoking' as HabitCategory,
    latitude: 28.614,
    longitude: 77.209,
    radiusMeters: 50,
    isActive: true,
  };

  const isBreached = simulatedDistanceMeters <= currentZone.radiusMeters;

  const handleDistanceChange = (meters: number) => {
    setSimulatedDistanceMeters(meters);
    if (meters <= currentZone.radiusMeters) {
      onTriggerGeofenceAlarm(currentZone);
    }
  };

  const handleCreateZone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newZoneName) return;

    const newZone: DangerZone = {
      id: 'zone-' + Date.now(),
      name: newZoneName,
      address: newZoneAddress || 'Custom GPS Danger Point',
      category: newZoneCategory,
      latitude: 28.614 + (Math.random() - 0.5) * 0.01,
      longitude: 77.209 + (Math.random() - 0.5) * 0.01,
      radiusMeters: newZoneRadius,
      isActive: true,
    };

    onAddDangerZone(newZone);
    setSelectedZone(newZone);
    setNewZoneName('');
    setNewZoneAddress('');
    setIsAddingZone(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-900/90 border border-emerald-500/30 rounded-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Compass className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">High-Risk GPS Geofence Radar</h3>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30 uppercase">
                  Background Radar Armed
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Automatically plays a loud acoustic siren and alerts your guardian when you approach designated trigger locations.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAddingZone(!isAddingZone)}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 rounded-xl transition"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>{isAddingZone ? 'Cancel' : 'Add Danger Zone'}</span>
          </button>
        </div>
      </div>

      {/* Add Danger Zone Form */}
      {isAddingZone && (
        <form
          onSubmit={handleCreateZone}
          className="p-5 bg-slate-900 border border-emerald-500/40 rounded-2xl space-y-4 animate-in fade-in"
        >
          <h4 className="text-sm font-bold text-white">Create New Danger Zone Perimeter</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Zone Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Metro Smoke Corner or High Street Bar"
                value={newZoneName}
                onChange={(e) => setNewZoneName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Street Address or Landmark</label>
              <input
                type="text"
                placeholder="e.g. Opposite Sector 14 Gate"
                value={newZoneAddress}
                onChange={(e) => setNewZoneAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Associated Habit</label>
              <select
                value={newZoneCategory}
                onChange={(e) => setNewZoneCategory(e.target.value as HabitCategory)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="smoking">Smoking &amp; Vaping</option>
                <option value="alcohol">Alcohol &amp; Bars</option>
                <option value="sugar">Bakery &amp; Fast Food</option>
                <option value="porn">Private Motel / High Risk Spot</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">
                Trigger Radius: <span className="text-emerald-400 font-bold">{newZoneRadius} meters</span>
              </label>
              <input
                type="range"
                min="20"
                max="200"
                value={newZoneRadius}
                onChange={(e) => setNewZoneRadius(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingZone(false)}
              className="px-3.5 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs transition"
            >
              Save Danger Zone
            </button>
          </div>
        </form>
      )}

      {/* Main Radar Display & Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Zone Selection List */}
        <div className="lg:col-span-5 space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">
            Registered Danger Zones ({dangerZones.length})
          </h4>
          <div className="space-y-2">
            {dangerZones.map((zone) => {
              const isSelected = zone.id === currentZone.id;
              return (
                <button
                  key={zone.id}
                  onClick={() => {
                    setSelectedZone(zone);
                    setSimulatedDistanceMeters(120);
                  }}
                  className={`w-full p-3.5 rounded-xl border text-left transition flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-slate-800 border-emerald-500/60 shadow-lg'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{zone.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{zone.address}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 shrink-0">
                    Radius: {zone.radiusMeters}m
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Live Proximity Simulation & Perimeter Radar */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                Target Zone: {currentZone.name}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Breach Threshold: <strong>{currentZone.radiusMeters}m</strong>
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mt-2">Live Distance Radar</h3>
            <p className="text-xs text-slate-400 mt-1">
              Drag the proximity slider below to test walking towards this danger zone:
            </p>
          </div>

          {/* Visual Radar Rings */}
          <div className="flex flex-col items-center justify-center py-6">
            <div className="relative flex items-center justify-center w-52 h-52">
              {/* Outer Safe Ring (150m) */}
              <div className="absolute inset-0 rounded-full border border-slate-800 border-dashed" />
              {/* Middle Warning Ring (100m) */}
              <div className="absolute inset-4 rounded-full border border-slate-700/60" />
              {/* Danger Zone Radius Ring */}
              <div
                className={`absolute inset-10 rounded-full border-2 transition-colors duration-300 ${
                  isBreached
                    ? 'border-red-500 bg-red-500/20 animate-pulse'
                    : 'border-amber-500/40 bg-amber-500/5'
                }`}
              />

              {/* Central User Position Pulse */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <Navigation
                  className={`w-8 h-8 transition-all duration-300 ${
                    isBreached ? 'text-red-400 animate-bounce scale-110' : 'text-emerald-400'
                  }`}
                />
                <div className="text-3xl font-black font-mono text-white mt-1 tabular-nums">
                  {simulatedDistanceMeters}m
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    isBreached ? 'text-red-400' : 'text-emerald-400'
                  }`}
                >
                  {isBreached ? 'BREACH DETECTED!' : 'SAFE DISTANCE'}
                </span>
              </div>
            </div>
          </div>

          {/* Distance Slider Control */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-slate-400 font-medium">Simulated User Proximity:</span>
                <span className="font-mono font-bold text-white">{simulatedDistanceMeters} meters away</span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                value={simulatedDistanceMeters}
                onChange={(e) => handleDistanceChange(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>10m (At Front Door)</span>
                <span className="text-amber-400">{currentZone.radiusMeters}m (Breach Line)</span>
                <span>200m (Far Away)</span>
              </div>
            </div>

            {/* Manual Quick Action Button */}
            <div className="flex gap-2">
              <button
                onClick={() => handleDistanceChange(currentZone.radiusMeters - 10)}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 active:scale-95"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Simulate Walking Inside Danger Zone</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
