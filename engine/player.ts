export interface PlayerState {
  currentRoom: string;
  sanity: number;
  inventory: string[];
  lastEvent?: string;
}

export const initialPlayerState: PlayerState = {
  currentRoom: "awakening",
  sanity: 100,
  inventory: [],
  lastEvent: undefined,
};
