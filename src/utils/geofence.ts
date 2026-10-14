import { DangerZone } from '../types';

/**
 * Calculates distance between two GPS coordinates in meters using the Haversine formula
 */
export function calculateDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

/**
 * Checks if current coordinates are within any active danger zone's radius
 */
export function evaluateDangerZones(
  currentLat: number,
  currentLon: number,
  zones: DangerZone[]
): { inDanger: boolean; breachedZone: DangerZone | null; distanceMeters: number } {
  for (const zone of zones) {
    if (!zone.isActive) continue;
    const distance = calculateDistanceMeters(
      currentLat,
      currentLon,
      zone.latitude,
      zone.longitude
    );
    if (distance <= zone.radiusMeters) {
      return { inDanger: true, breachedZone: zone, distanceMeters: distance };
    }
  }
  return { inDanger: false, breachedZone: null, distanceMeters: 99999 };
}
