export interface PlayerState {
  currentRoom: string;
  sanity: number;
  inventory: string[];
}

export const initialPlayerState: PlayerState = {
  currentRoom: "awakening",
  sanity: 100,
  inventory: [],
};
