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
  loreDiscovered: string[];
  gameOver?: boolean;
  endingType?: "good" | "bad" | "insane" | "captured" | "transcend" | "escape";
  hasSeenTutorial?: boolean;
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
  loreDiscovered: [],
  gameOver: false,
};
