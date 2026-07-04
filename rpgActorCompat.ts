export interface VeiledDominionStatsV1 {
  $type: "actor.rpg.stats";
  system: "veiled-dominion";
  schemaVersion: 1;
  updatedAt?: string; // ISO8601 preferred
  version?: number;   // monotonic fallback
  data: {
    restraintMetric: number;
    egoAnnihilationCount: number;
    matchesPlayed: number;
  };
}

export interface NormalizedProfile {
  did: string;
  system: "veiled-dominion";
  schemaVersion: number;
  stats: {
    restraintMetric: number;
    egoAnnihilationCount: number;
    matchesPlayed: number;
  };
  sourceCid: string;
  sourceUri: string;
  fetchedAt: string;
}
