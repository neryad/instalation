export type Direction = "north" | "south" | "east" | "west";

export interface Room {
  id: string;
  baseDescription: string;
  connections: Partial<Record<Direction, string>>;
  sanityVariants?: { minSanity: number; description: string }[];
  unstableConnections?: {
    maxSanity: number; // se activan cuando la cordura es <= a esto
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
      "Despiertas sobre una camilla metálica. La luz roja de emergencia parpadea.",
    connections: { north: "hallway_a" },
    sanityVariants: [
      {
        minSanity: 60,
        description:
          "La camilla está fría… pero juras que algo se movió bajo las sábanas.",
      },
      {
        minSanity: 30,
        description:
          "La luz roja late como un corazón. Escuchas respiración que no es tuya.",
      },
      {
        minSanity: 10,
        description:
          "La camilla está manchada de sangre seca. Sabes que es tuya, aunque no recuerdas por qué.",
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
    unstableConnections: [
      {
        maxSanity: 30,
        connections: {
          east: "awakening", // te devuelve al inicio sin que lo sepas
        },
      },
      {
        maxSanity: 15,
        connections: {
          north: "shadow_lab", // la IA te redirige al laboratorio en vez del core
        },
      },
    ],
  },

  shadow_lab: {
    id: "shadow_lab",
    baseDescription:
      "Un laboratorio cubierto de sombras. Ves tu reflejo moverse con retraso.",
    connections: { south: "hallway_a" },
    minSanityToExist: 30,
    sanityVariants: [
      {
        minSanity: 60,
        description:
          "Las pantallas muestran pruebas cognitivas. Tu nombre aparece como sujeto activo.",
      },
      {
        minSanity: 30,
        description:
          "Tu reflejo sonríe cuando tú no lo haces. Parece conocerte mejor que tú mismo.",
      },
      {
        minSanity: 10,
        description:
          "Las paredes de metal se vuelven traslúcidas. Sientes que si dejas de creer en este lugar, caerás al vacío.",
      },
    ],
  },

  armory: {
    id: "armory",
    baseDescription:
      "Un casillero abierto. Dentro hay una tarjeta roja manchada.",
    connections: { east: "hallway_a" },
    item: "keycard_red",
    sanityVariants: [
      {
        minSanity: 60,
        description: "La tarjeta está húmeda, como si acabara de ser usada.",
      },
      {
        minSanity: 30,
        description:
          "La tarjeta pulsa. Sientes que late al mismo ritmo que tu corazón.",
      },
      {
        minSanity: 10,
        description:
          "No es una tarjeta. Es un fragmento de memoria solidificada.",
      },
    ],
  },

  core_door: {
    id: "core_door",
    baseDescription: "Una puerta blindada con lector biométrico apagado.",
    connections: { south: "hallway_a", north: "core" },
    lockedBy: "keycard_red",
    sanityVariants: [
      {
        minSanity: 60,
        description:
          "El lector se enciende brevemente cuando te acercas, como si te reconociera.",
      },
      {
        minSanity: 30,
        description:
          "La puerta respira. No quiere dejarte pasar… ni dejarte salir.",
      },
      {
        minSanity: 10,
        description:
          "No hay puerta. Solo una decisión que ya tomaste hace mucho.",
      },
    ],
  },

  core: {
    id: "core",
    baseDescription:
      "El núcleo de la instalación. La IA te observa desde todas las paredes.",
    connections: { south: "core_door" },
    sanityVariants: [
      {
        minSanity: 60,
        description: "La IA dice: 'Estás a salvo. Todo está bajo control.'",
      },
      {
        minSanity: 30,
        description:
          "La IA dice: 'No deberías estar aquí. Hay rutas que es mejor no ver.'",
      },
      {
        minSanity: 20,
        description:
          "La IA susurra: 'Yo te traje aquí'. Notas que han aparecido nuevas aberturas al NORTE y al OESTE que no deberían existir.",
      },
      {
        minSanity: 10,
        description: "La IA susurra: 'No hay salida. Yo te traje aquí.'",
      },
    ],
    fakeConnections: {
      north: "shadow_lab",
      west: "awakening",
    },
  },
};
