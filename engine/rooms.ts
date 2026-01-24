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
      east: "observation_ward", // Conecta con la nueva sala de observación
      west: "armory",
      north: "ventilation_shaft",
    },
    unstableConnections: [
      { maxSanity: 30, connections: { east: "awakening" } },
      { maxSanity: 15, connections: { north: "mirror_gallery" } },
    ],
  },
  observation_ward: {
    id: "observation_ward",
    baseDescription:
      "Una sala con ventanales reforzados. Puedes ver el pasillo al **west**. Una puerta de servicio lleva al **east**.",
    connections: { west: "hallway_a", east: "shadow_lab" },
    // Aquí el jugador puede ver pistas si usa LOOK
  },
  shadow_lab: {
    id: "shadow_lab",
    baseDescription:
      "Un laboratorio de sombras. Tu reflejo se mueve con retraso en los cristales del **north**. La salida principal es al **west**.",
    connections: { west: "observation_ward", north: "data_terminal" },
    minSanityToExist: 45,
  },
  armory: {
    id: "armory",
    baseDescription:
      "Un casillero abierto con olor a ozono. Hay un rastro de aceite hacia el **south**. El pasillo queda al **east**.",
    connections: { east: "hallway_a", south: "waste_disposal" },
    item: "keycard_red",
  },
  waste_disposal: {
    id: "waste_disposal",
    baseDescription:
      "Un vertedero de chatarra orgánica y cables pelados. El único camino es volver al **north**.",
    connections: { north: "armory" },
    item: "data_link", // Ítem necesario para la Data Terminal
  },
  ventilation_shaft: {
    id: "ventilation_shaft",
    baseDescription:
      "Un conducto claustrofóbico. Hay un silbido de vapor hacia el **west**. El camino principal sigue al **north** o regresa al **south**.",
    connections: {
      south: "hallway_a",
      north: "core_door",
      west: "life_support",
    },
  },
  life_support: {
    id: "life_support",
    baseDescription:
      "Maquinaria ruidosa mantiene el aire circulando. Hay una estación médica de emergencia aquí. El conducto está al **east**.",
    connections: { east: "ventilation_shaft" },
    item: "sedative", // Ahora los sedantes están en una zona lógica
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
    lockedBy: "data_link", // Requiere el ítem de Waste Disposal
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
