import { Direction } from "./rooms";

export interface PlayerState {
  currentRoom: string;
  sanity: number;
  inventory: string[];
  lastEvent?: string;
  entityRoom?: string;
  entityAwareness: number;
  lastDirections: Direction[];
  visitedRooms: string[];
  roomHistory: string[];
  collectedItems: string[];
  gameOver?: boolean;
  endingType?: "good" | "bad" | "insane" | "captured" | "transcend" | "escape";
}

export const initialPlayerState: PlayerState = {
  currentRoom: "awakening",
  sanity: 100,
  inventory: [],
  entityAwareness: 0,
  lastDirections: [],
  visitedRooms: ["awakening"],
  roomHistory: ["awakening"],
  collectedItems: [],
  gameOver: false,
};
