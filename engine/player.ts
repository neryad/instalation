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
  endingType?: "good" | "bad" | "insane" | "captured" | "transcend" | "escape";
}

export const initialPlayerState: PlayerState = {
  currentRoom: "awakening",
  sanity: 100,
  inventory: [],
  entityAwareness: 0,
  lastDirections: [],
  gameOver: false,
};
