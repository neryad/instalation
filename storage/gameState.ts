import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlayerState } from "../engine/player";

const SAVE_KEY = "GAME_SAVE_STATE";

export async function saveGame(state: PlayerState): Promise<void> {
  try {
    if (state.gameOver) return;

    const toSave = {
      currentRoom: state.currentRoom,
      sanity: state.sanity,
      inventory: state.inventory,
      entityAwareness: state.entityAwareness,
      entityRoom: state.entityRoom,
      lastDirections: state.lastDirections,
      visitedRooms: state.visitedRooms,
      roomHistory: state.roomHistory,
      collectedItems: state.collectedItems,
      gameOver: state.gameOver,
      hasSeenTutorial: state.hasSeenTutorial,
    };

    await AsyncStorage.setItem(SAVE_KEY, JSON.stringify(toSave));
  } catch (e) {
    console.error("Error saving game:", e);
  }
}

export async function loadGame(): Promise<PlayerState | null> {
  try {
    const json = await AsyncStorage.getItem(SAVE_KEY);
    if (!json) return null;

    const parsed = JSON.parse(json);

    if (parsed.gameOver) {
      await AsyncStorage.removeItem(SAVE_KEY);
      return null;
    }

    return parsed as PlayerState;
  } catch (e) {
    console.error("Error loading game:", e);
    return null;
  }
}

export async function clearSave(): Promise<void> {
  try {
    await AsyncStorage.removeItem(SAVE_KEY);
  } catch (e) {
    console.error("Error clearing save:", e);
  }
}
