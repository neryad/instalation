export type Direction = "north" | "south" | "east" | "west";

export interface Room {
  id: string;
  baseDescription: string;
  connections: Partial<Record<Direction, string>>;
  sanityVariants?: { minSanity: number; description: string }[];
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
    connections: {
      south: "awakening",
      east: "shadow_lab",
      west: "armory",
      north: "core_door",
    },
  },

  shadow_lab: {
    id: "shadow_lab",
    baseDescription:
      "Un laboratorio cubierto de sombras. Ves tu reflejo moverse con retraso.",
    connections: { south: "hallway_a" },
    minSanityToExist: 30,
  },

  armory: {
    id: "armory",
    baseDescription:
      "Un casillero abierto. Dentro hay una tarjeta roja manchada.",
    connections: { east: "hallway_a" },
    item: "keycard_red",
  },

  core_door: {
    id: "core_door",
    baseDescription: "Una puerta blindada con lector biométrico apagado.",
    connections: { south: "hallway_a", north: "core" },
    lockedBy: "keycard_red",
  },
  core: {
    id: "core",
    baseDescription:
      "El núcleo de la instalación. La IA te observa desde todas las paredes.",
    connections: { south: "core_door" },
  },
};
