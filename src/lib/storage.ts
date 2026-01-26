import { get, set } from 'idb-keyval';

export interface UserStats {
  totalPoints: number;
  itemsRecycled: number;
  plasticItems: number;
  paperItems: number;
  metalItems: number;
  glassItems: number;
  barcodeScans: number;
  lastActivity: string;
}

const DEFAULT_STATS: UserStats = {
  totalPoints: 0,
  itemsRecycled: 0,
  plasticItems: 0,
  paperItems: 0,
  metalItems: 0,
  glassItems: 0,
  barcodeScans: 0,
  lastActivity: new Date().toISOString(),
};

const STATS_KEY = 'ecosnap-stats';

export async function getUserStats(): Promise<UserStats> {
  try {
    const stats = await get<UserStats>(STATS_KEY);
    return stats || DEFAULT_STATS;
  } catch {
    // Fallback to localStorage
    const stored = localStorage.getItem(STATS_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_STATS;
  }
}

export async function updateUserStats(updates: Partial<UserStats>): Promise<UserStats> {
  const current = await getUserStats();
  const newStats: UserStats = {
    ...current,
    ...updates,
    lastActivity: new Date().toISOString(),
  };
  
  try {
    await set(STATS_KEY, newStats);
  } catch {
    localStorage.setItem(STATS_KEY, JSON.stringify(newStats));
  }
  
  return newStats;
}

export async function addClassificationPoints(
  material: 'plastic' | 'paper' | 'metal' | 'glass',
  isBarcodeScan: boolean = false
): Promise<UserStats> {
  const current = await getUserStats();
  const points = isBarcodeScan ? 5 : 10;
  
  const updates: Partial<UserStats> = {
    totalPoints: current.totalPoints + points,
    itemsRecycled: current.itemsRecycled + 1,
  };

  // Update material-specific count
  switch (material) {
    case 'plastic':
      updates.plasticItems = current.plasticItems + 1;
      break;
    case 'paper':
      updates.paperItems = current.paperItems + 1;
      break;
    case 'metal':
      updates.metalItems = current.metalItems + 1;
      break;
    case 'glass':
      updates.glassItems = current.glassItems + 1;
      break;
  }

  if (isBarcodeScan) {
    updates.barcodeScans = current.barcodeScans + 1;
  }

  return updateUserStats(updates);
}

export function calculateEnvironmentalImpact(stats: UserStats) {
  return {
    co2Saved: (stats.itemsRecycled * 0.23).toFixed(1), // kg CO2
    waterSaved: (stats.itemsRecycled * 1.5).toFixed(0), // liters
    energySaved: (stats.itemsRecycled * 0.1).toFixed(1), // kWh
    treesEquivalent: (stats.itemsRecycled * 0.01).toFixed(2),
  };
}
