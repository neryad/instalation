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
  minSanityToExist?: number;
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
      este: "observation_ward", // Conecta con la nueva sala de observación
      oeste: "armory",
      norte: "ventilation_shaft",
    },
    unstableConnections: [
      { maxSanity: 30, connections: { este: "awakening" } },
      { maxSanity: 15, connections: { norte: "mirror_gallery" } },
    ],
  },
  observation_ward: {
    id: "observation_ward",
    baseDescription:
      "Una sala con ventanales reforzados. Puedes ver el pasillo al **oeste**. Una puerta de servicio lleva al **este**.",
    connections: { oeste: "hallway_a", este: "shadow_lab" },
    // Aquí el jugador puede ver pistas si usa LOOK
  },
  shadow_lab: {
    id: "shadow_lab",
    baseDescription:
      "Un laboratorio de sombras. Tu reflejo se mueve con retraso en los cristales. La salida principal es al **oeste**. Una puerta blindada lleva al **norte**.",
    connections: { oeste: "observation_ward", norte: "data_morgue" },
    lockedBy: "thermal_fuse",
    unbreakable: true, // Fuerza la exploración de incinerator
  },
  data_morgue: {
    id: "data_morgue",
    baseDescription:
      "Filas infinitas de servidores zumban con un tono grave. El aire está helado. Cientos de luces azules parpadean como ojos en la oscuridad. La salida está al **sur**.",
    connections: { sur: "shadow_lab" },
    sanityVariants: [
      {
        minSanity: 20,
        description:
          "Los servidores susurran tu nombre. Las luces azules te siguen. Saben lo que hiciste.",
      },
    ],
    // item: "ia_log", // Removed duplicate
    item: "keycard_red",
  },
  armory: {
    id: "armory",
    baseDescription:
      "Un casillero abierto con olor a ozono. Hay un rastro de aceite hacia el **sur**. El pasillo queda al **este**. Una puerta con escáner retinal está al **oeste**.",
    connections: {
      este: "hallway_a",
      sur: "waste_disposal",
      oeste: "neural_link",
    },
    // item: "keycard_red", // MOVIDO A DATA MORGUE
  },
  neural_link: {
    id: "neural_link",
    baseDescription:
      "Sillones reclinables con interfaces cerebrales cuelgan del techo. Monitores muestran estática blanca. Es un lugar de silencio absoluto. La salida es al **este**.",
    connections: { este: "armory" },
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
      "Un vertedero de chatarra orgánica y cables pelados. El calor emana de una escotilla abierta en el suelo hacia el **sur**. El único camino seguro es volver al **norte**.",
    connections: { norte: "armory", sur: "incinerator" },
    item: "data_link",
  },
  incinerator: {
    id: "incinerator",
    baseDescription:
      "El calor es insoportable. Las paredes están negras por el hollín. El ruido de la maquinaria golpea tu pecho. La salida es subir al **norte**.",
    connections: { norte: "waste_disposal" },
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
      "Maquinaria ruidosa mantiene el aire circulando. Una compuerta con el símbolo de 'Bio-Hazard' lleva al **oeste**. El conducto está al **este**.",
    connections: { este: "ventilation_shaft", oeste: "dead_hydroponics" },
    // item: "sedative", // MOVIDO A HYDROPONICS
  },
  dead_hydroponics: {
    id: "dead_hydroponics",
    baseDescription:
      "Plantas secas y grises crujen bajo tus pies. El aire huele a agua estancada y moho. Es un cementerio vegetal. La salida es al **este**.",
    connections: { este: "life_support" },
    item: "sedative",
    sanityVariants: [
      {
        minSanity: 30,
        description:
          "Las viñas secas parecen moverse cuando no las miras. Sientes que algo respira entre el follaje muerto.",
      },
    ],
  },
  mirror_gallery: {
    id: "mirror_gallery",
    baseDescription:
      "Una sala llena de espejos negros. Ves un destello digital al **este**. La salida lógica es el **sur**.",
    connections: { sur: "hallway_a", este: "data_terminal" },
    unstableConnections: [
      {
        maxSanity: 20,
        connections: { norte: "core", oeste: "awakening" },
      },
    ],
  },
  data_terminal: {
    // ESTA SALA YA NO CONECTA A shadow_lab DIRECTAMENTE POR EL NORTE?
    // Espera, shadow_lab conectaba a data_terminal al norte. Ahora conecta a data_morgue.
    // data_terminal estaba conectada a mirror_gallery (oeste) y shadow_lab (sur).
    // Mantengamos data_terminal accesible desde mirror_gallery.
    id: "data_terminal",
    baseDescription:
      "Una terminal zumba constantemente. Hay cables que van hacia el **oeste**.", // La puerta al sur hacia shadow_lab la quitamos o la dejamos como atajo desbloqueable?
    // Simplifiquemos: Data Terminal solo accesible desde Mirror Gallery por ahora, o podría conectar con Data Morgue?
    // Dejemos que conecte con oeste (Mirror Gallery).
    connections: { oeste: "mirror_gallery" },
    lockedBy: "data_link",
    item: "DEV_LOG.aes", // esteer Egg item
  },
  core_door: {
    id: "core_door",
    baseDescription:
      "Una puerta blindada con un lector rojo bloquea el **norte**. El conducto queda al **sur**.",
    connections: { sur: "ventilation_shaft", norte: "core" },
    lockedBy: "keycard_red",
    unbreakable: true, // Puerta final obligatoria
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
      "Accedes al panel de apagado. Requiere secuencia manual de 47 pasos. Tu mano tiembla sobre los controles.",
    connections: {},
  },
  transcendence_chamber: {
    id: "transcendence_chamber",
    baseDescription:
      "Entras a la cámara de transferencia. Interfaces neuronales cuelgan del techo como tentáculos. La IA te espera.",
    connections: {},
  },
  emergency_escape: {
    id: "emergency_escape",
    baseDescription:
      "Activas la evacuación. Luces rojas parpadean. Una escalera de emergencia se abre hacia la superficie. Puedes huir... pero la IA seguirá aquí.",
    connections: {},
  },
};
