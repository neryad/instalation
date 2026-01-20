import { Direction } from "./rooms";

export interface PlayerState {
  currentRoom: string;
  sanity: number;
  inventory: string[];
  lastEvent?: string;

  // Entidad
  entityRoom?: string; // dónde “cree” estar la entidad
  entityAwareness: number; // qué tan consciente está de ti (0-100)

  // Memoria del jugador (para predicción futura)
  lastDirections: Direction[];

  gameOver?: boolean;
  endingType?: "good" | "bad";
}

export const initialPlayerState: PlayerState = {
  currentRoom: "awakening",
  sanity: 100,
  inventory: [],
  lastEvent: undefined,

  entityRoom: undefined,
  entityAwareness: 0,

  lastDirections: [],
  gameOver: false,
};
