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
      "Despiertas sobre una camilla metálica. La luz roja parpadea. La única salida es un arco de seguridad hacia el **north**.",
    connections: { north: "hallway_a" },
    sanityVariants: [
      {
        minSanity: 30,
        description:
          "La luz roja late como un corazón. Escuchas respiración ajena tras la puerta al **north**.",
      },
    ],
  },
  hallway_a: {
    id: "hallway_a",
    baseDescription:
      "Un pasillo estrecho con símbolos extraños. Se bifurca hacia el **east** y **west**. Al **north**, un conducto de ventilación gotea aceite. Al **south** queda la sala de despertar.",
    connections: {
      south: "awakening",
      east: "shadow_lab",
      west: "armory",
      north: "ventilation_shaft",
    },
    unstableConnections: [
      { maxSanity: 30, connections: { east: "awakening" } },
      { maxSanity: 15, connections: { north: "mirror_gallery" } },
    ],
  },
  shadow_lab: {
    id: "shadow_lab",
    baseDescription:
      "Un laboratorio de sombras. Tu reflejo se mueve con retraso en los cristales del **north**. El pasillo principal queda al **south**.",
    connections: { south: "hallway_a", north: "data_terminal" },
    minSanityToExist: 45,
    item: "sedative",
  },
  armory: {
    id: "armory",
    baseDescription:
      "Un casillero abierto con olor a ozono. No hay más salida que el pasillo al **east**.",
    connections: { east: "hallway_a" },
    item: "keycard_red",
  },
  ventilation_shaft: {
    id: "ventilation_shaft",
    baseDescription:
      "Un conducto claustrofóbico. El aire es denso. Puedes gatear hacia adelante al **north** o regresar al **south**.",
    connections: { south: "hallway_a", north: "core_door" },
  },
  mirror_gallery: {
    id: "mirror_gallery",
    baseDescription:
      "Una sala llena de espejos negros. Ves un destello digital al **east**. La salida lógica es el **south**.",
    connections: { south: "hallway_a", east: "data_terminal" },
    unstableConnections: [
      {
        maxSanity: 20,
        connections: { north: "core", west: "awakening" },
      },
    ],
  },
  data_terminal: {
    id: "data_terminal",
    baseDescription:
      "Una terminal zumba constantemente. Hay cables que van hacia el **west** y una puerta pesada al **south**.",
    connections: { west: "mirror_gallery", south: "shadow_lab" },
    lockedBy: "data_link",
    item: "ia_log",
  },
  core_door: {
    id: "core_door",
    baseDescription:
      "Una puerta blindada con un lector rojo bloquea el **north**. El conducto queda al **south**.",
    connections: { south: "ventilation_shaft", north: "core" },
    lockedBy: "keycard_red",
  },
  core: {
    id: "core",
    baseDescription:
      "El núcleo palpita. La IA te observa. El único camino real es volver al **south**, aunque jurarías ver sombras al **north** y **west**.",
    connections: { south: "core_door" },
    fakeConnections: { north: "shadow_lab", west: "awakening" },
  },
};
