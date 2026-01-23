import { Direction } from "./rooms";

export interface PlayerState {
  currentRoom: string;
  sanity: number;
  inventory: string[];
  lastEvent?: string;
  entityRoom?: string;
  entityAwareness: number;
  lastDirections: Direction[];
  gameOver?: boolean;
  endingType?: "good" | "bad";
}

export const initialPlayerState: PlayerState = {
  currentRoom: "awakening",
  sanity: 32,
  inventory: [],
  entityAwareness: 0,
  lastDirections: [],
  gameOver: false,
};
