export type Direction = "north" | "south" | "east" | "west";

export interface Room {
  id: string;
  baseDescription: string;
  connections: Partial<Record<Direction, string>>;
  sanityVariants?: {
    minSanity: number;
    description: string;
  }[];
  minSanityToExist?: number;
  item?: string;
  lockedBy?: string; // id de ítem necesario
}

export const rooms: Record<string, Room> = {
  awakening: {
    id: "awakening",
    baseDescription:
      "Despiertas sobre una camilla metálica. La luz roja de emergencia parpadea.",
    connections: { north: "hallway_a" },
    sanityVariants: [
      {
        minSanity: 40,
        description:
          "Las sombras parecen moverse solas alrededor de la camilla.",
      },
    ],
  },

  hallway_a: {
    id: "hallway_a",
    baseDescription:
      "Un pasillo estrecho. Las paredes están cubiertas de símbolos que no recuerdas haber visto.",
    connections: { south: "awakening", east: "shadow_lab" },
  },

  shadow_lab: {
    id: "shadow_lab",
    baseDescription:
      "Un laboratorio cubierto de sombras. Ves tu reflejo moverse con retraso.",
    connections: { south: "hallway_a" },
    minSanityToExist: 30,
  },
};
