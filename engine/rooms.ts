export type Direction = "north" | "south" | "east" | "west";

export interface Room {
  id: string;
  baseDescription: string;
  connections: Partial<Record<Direction, string>>;
  sanityVariants?: { minSanity: number; description: string }[];
  unstableConnections?: {
    maxSanity: number;
    connections: Partial<Record<Direction, string>>;
  }[];
  minSanityToExist?: number;
  item?: string;
  lockedBy?: string;
  fakeConnections?: Partial<Record<Direction, string>>;
}

export const rooms: Record<string, Room> = {
  awakening: {
    id: "awakening",
    baseDescription:
      "Despiertas sobre una camilla metálica. La luz roja parpadea.",
    connections: { north: "hallway_a" },
    sanityVariants: [
      {
        minSanity: 30,
        description:
          "La luz roja late como un corazón. Escuchas respiración ajena.",
      },
    ],
  },
  hallway_a: {
    id: "hallway_a",
    baseDescription: "Un pasillo estrecho con símbolos extraños.",
    connections: {
      south: "awakening",
      east: "shadow_lab",
      west: "armory",
      north: "core_door",
    },
    unstableConnections: [
      { maxSanity: 30, connections: { east: "awakening" } },
      { maxSanity: 15, connections: { north: "shadow_lab" } },
    ],
  },
  shadow_lab: {
    id: "shadow_lab",
    baseDescription:
      "Un laboratorio de sombras. Tu reflejo se mueve con retraso.",
    connections: { south: "hallway_a" },
    minSanityToExist: 40, // Solo visible para los que pierden la cordura
  },
  armory: {
    id: "armory",
    baseDescription: "Un casillero abierto.",
    connections: { east: "hallway_a" },
    item: "keycard_red",
  },
  core_door: {
    id: "core_door",
    baseDescription: "Una puerta blindada.",
    connections: { south: "hallway_a", north: "core" },
    lockedBy: "keycard_red",
  },
  core: {
    id: "core",
    baseDescription: "El núcleo. La IA te observa.",
    connections: { south: "core_door" },
    fakeConnections: { north: "shadow_lab", west: "awakening" },
  },
};
