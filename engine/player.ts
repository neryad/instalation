export interface PlayerState {
  currentRoom: string;
  sanity: number;
  inventory: string[];
  lastEvent?: string;
  entityRoom?: string; // dónde “cree” estar la entidad
  entityAwareness: number;
}

export const initialPlayerState: PlayerState = {
  currentRoom: "awakening",
  sanity: 100,
  inventory: [],
  lastEvent: undefined,
  entityRoom: undefined,
  entityAwareness: 0,
};
