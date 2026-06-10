export type Direction = "norte" | "sur" | "este" | "oeste";

export interface Room {
  id: string;
  baseDescription: string;
  connections: Partial<Record<Direction, string>>;
  sanityVariants?: { minSanity: number; description: string }[];
  unstableConnections?: {
    maxSanity: number;
    connections: Partial<Record<Direction, string>>;
  }[];
  maxSanityToExist?: number;
  item?: string;
  lockedBy?: string;
  unbreakable?: boolean;
  fakeConnections?: Partial<Record<Direction, string>>;
}

export const rooms: Record<string, Room> = {
  awakening: {
    id: "awakening",
    baseDescription:
      "Despiertas sobre una camilla metálica. La luz roja parpadea. La única salida es un arco de seguridad hacia el **norte**.",
    connections: { norte: "hallway_a" },
    sanityVariants: [
      {
        minSanity: 30,
        description:
          "La luz roja late como un corazón. Escuchas respiración ajena tras la puerta al **norte**.",
      },
    ],
  },

  hallway_a: {
    id: "hallway_a",
    baseDescription:
      "Un pasillo estrecho con símbolos extraños. Se bifurca hacia el **este** y **oeste**. Al **norte**, un conducto de ventilación gotea aceite. Al **sur** queda la sala de despertar.",
    connections: {
      sur: "awakening",
      este: "shadow_lab", // Directo (eliminamos observation_ward)
      oeste: "armory",
      norte: "ventilation_shaft",
    },
    unstableConnections: [
      { maxSanity: 30, connections: { este: "awakening" } },
      { maxSanity: 15, connections: { norte: "mirror_gallery" } },
    ],
  },

  // ELIMINADA: observation_ward

  shadow_lab: {
    id: "shadow_lab",
    baseDescription:
      "Un laboratorio de sombras. Tu reflejo se mueve con retraso en los cristales. La salida principal es al **oeste**. Un pasillo técnico va al **norte**. Una escalera metálica desciende al **sur**.",
    connections: { 
      oeste: "hallway_a", 
      norte: "data_morgue",
      sur: "incinerator" // NUEVO: acceso directo
    },
    // Ya no requiere thermal_fuse para entrar
  },

  data_morgue: {
    id: "data_morgue",
    baseDescription:
      "Filas infinitas de servidores zumban con un tono grave. El aire está helado. Cientos de luces azules parpadean como ojos en la oscuridad. Un conducto de mantenimiento va al **este**. La salida está al **sur**.",
    connections: { 
      sur: "shadow_lab",
      este: "data_terminal" // NUEVO: crea loop
    },
    sanityVariants: [
      {
        minSanity: 20,
        description:
          "Los servidores susurran tu nombre. Las luces azules te siguen. Saben lo que hiciste.",
      },
    ],
    item: "keycard_red",
  },

  data_terminal: {
    id: "data_terminal",
    baseDescription:
      "Una terminal zumba constantemente. Cables van hacia el **oeste**. Un pasadizo estrecho lleva al **sur**.",
    connections: { 
      oeste: "data_morgue",     // NUEVO: completa loop
      sur: "mirror_gallery"     // Mantiene conexión
    },
    lockedBy: "data_link",
    item: "DEV_LOG.aes",
  },

  mirror_gallery: {
    id: "mirror_gallery",
    baseDescription:
      "Una sala llena de espejos negros. Ves un destello digital al **norte**. La salida lógica es el **sur**. Un conducto cubierto de espejos va al **oeste**.",
    connections: { 
      sur: "hallway_a",
      norte: "data_terminal",
      oeste: "life_support" // NUEVO: conecta con zona oeste
    },
    unstableConnections: [
      {
        maxSanity: 20,
        connections: { 
          este: "core",
          oeste: "awakening"
        },
      },
    ],
  },

  armory: {
    id: "armory",
    baseDescription:
      "Un casillero abierto con olor a ozono. Hay un rastro de aceite hacia el **sur**. El pasillo queda al **este**. Una puerta con escáner retinal está al **norte**.",
    connections: {
      este: "hallway_a",
      sur: "waste_disposal",
      norte: "neural_link", // Cambio: neural_link al norte
    },
  },

  neural_link: {
    id: "neural_link",
    baseDescription:
      "Sillones reclinables con interfaces cerebrales cuelgan del techo. Monitores muestran estática blanca. Es un lugar de silencio absoluto. Una trampilla va al **norte**. La salida es al **sur**.",
    connections: { 
      sur: "armory",
      norte: "dead_hydroponics" // NUEVO: conecta zonas
    },
    sanityVariants: [
      {
        minSanity: 40,
        description:
          "Los sillones parecen ocupados por figuras traslúcidas. Sientes el impulso de sentarte y conectarte.",
      },
    ],
  },

  waste_disposal: {
    id: "waste_disposal",
    baseDescription:
      "Un vertedero de chatarra orgánica y cables pelados. El calor emana de una escotilla abierta hacia el **este**. El camino seguro es volver al **norte**.",
    connections: { 
      norte: "armory", 
      este: "incinerator" // Cambio: ahora es al este
    },
    item: "data_link",
  },

  incinerator: {
    id: "incinerator",
    baseDescription:
      "El calor es insoportable. Las paredes están negras por el hollín. El ruido de la maquinaria golpea tu pecho. Puedes salir al **oeste** o subir una escalera al **norte**.",
    connections: { 
      oeste: "waste_disposal",
      norte: "shadow_lab" // NUEVO: cierra loop
    },
    item: "thermal_fuse",
    sanityVariants: [
      {
        minSanity: 25,
        description:
          "El fuego en las rejillas parece tener formas de manos. Escuchas gritos ahogados entre el rugido del fuego.",
      },
    ],
  },

  ventilation_shaft: {
    id: "ventilation_shaft",
    baseDescription:
      "Un conducto claustrofóbico. Hay un silbido de vapor hacia el **oeste**. El camino principal sigue al **norte** o regresa al **sur**.",
    connections: {
      sur: "hallway_a",
      norte: "core_door",
      oeste: "life_support",
    },
  },

  life_support: {
    id: "life_support",
    baseDescription:
      "Maquinaria ruidosa mantiene el aire circulando. Una compuerta con el símbolo de 'Bio-Hazard' lleva al **norte**. El conducto está al **este**. Un pasillo con espejos va al **sur**.",
    connections: { 
      este: "ventilation_shaft", 
      norte: "dead_hydroponics",
      sur: "mirror_gallery" // NUEVO: atajo desde mirror_gallery
    },
  },

  dead_hydroponics: {
    id: "dead_hydroponics",
    baseDescription:
      "Plantas secas y grises crujen bajo tus pies. El aire huele a agua estancada y moho. Es un cementerio vegetal. La salida es al **sur** (life_support). Una trampilla mohosa lleva al **este**.",
    connections: { 
      sur: "life_support",
      este: "neural_link" // NUEVO: cierra loop oeste
    },
    item: "sedative",
    sanityVariants: [
      {
        minSanity: 30,
        description:
          "Las viñas secas parecen moverse cuando no las miras. Sientes que algo respira entre el follaje muerto.",
      },
    ],
  },

  core_door: {
    id: "core_door",
    baseDescription:
      "Una puerta blindada con un lector rojo bloquea el **norte**. El conducto queda al **sur**.",
    connections: { 
      sur: "ventilation_shaft", 
      norte: "core" 
    },
    lockedBy: "keycard_red",
    unbreakable: true,
  },

  core: {
    id: "core",
    baseDescription:
      "El núcleo central. Un monolito de servidores palpita con energía azul. La IA ya no susurra. HABLA:\n\n'Has llegado, Sujeto 00. Pero aún no has terminado.'\n\nTres caminos te esperan:\n**norte**: Panel de apagado de emergencia.\n**este**: Cámara de transferencia neural.\n**oeste**: Compuerta de evacuación rápida.",
    connections: {
      sur: "core_door",
      norte: "shutdown_protocol",
      este: "transcendence_chamber",
      oeste: "emergency_escape",
    },
  },

  shutdown_protocol: {
    id: "shutdown_protocol",
    baseDescription:
      "Accedes al panel de apagado. Requiere secuencia manual de 47 pasos. Tu mano tiembla sobre los controles.\n\n[FINAL: APAGADO TOTAL]",
    connections: {},
  },

  transcendence_chamber: {
    id: "transcendence_chamber",
    baseDescription:
      "Entras a la cámara de transferencia. Interfaces neuronales cuelgan del techo como tentáculos. La IA te espera.\n\n[FINAL: FUSIÓN]",
    connections: {},
  },

  emergency_escape: {
    id: "emergency_escape",
    baseDescription:
      "Activas la evacuación. Luces rojas parpadean. Una escalera de emergencia se abre hacia la superficie. Puedes huir... pero la IA seguirá aquí.\n\n[FINAL: ESCAPE COBARDE]",
    connections: {},
  },
};


