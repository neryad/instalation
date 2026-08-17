import { PlayerState } from "../engine/player";

export interface SpriteProjection {
  visible: boolean;
  y1: number; // borde superior en px
  y2: number; // borde inferior en px
  halfWidth: number; // medio ancho en "columnas"
  xCenter: number; // columna central (centro de pantalla)
}

export interface SpriteParams {
  visible: boolean;
  distance: number;
}

const SPRITE_HEIGHT = 1.7; // unidades de mundo (más alto que una casilla)
const SPRITE_WIDTH = 0.7;

export function entitySpriteParams(state: PlayerState): SpriteParams {
  if (state.gameOver) return { visible: false, distance: 0 };
  if (state.entityRoom === state.currentRoom) {
    return { visible: true, distance: 1.6 };
  }
  if (state.entityAwareness > 70) {
    return { visible: true, distance: 4 };
  }
  return { visible: false, distance: 0 };
}

export function projectSprite(
  params: SpriteParams,
  numColumns: number,
  heightPx: number,
  fovDeg = 66,
): SpriteProjection {
  if (!params.visible || params.distance <= 0) {
    return { visible: false, y1: 0, y2: 0, halfWidth: 0, xCenter: 0 };
  }
  const projectionPlane =
    numColumns / 2 / Math.tan(((fovDeg / 2) * Math.PI) / 180);
  const screenHeight = (SPRITE_HEIGHT / params.distance) * projectionPlane;
  const screenWidth = (SPRITE_WIDTH / params.distance) * projectionPlane;
  const y1 = heightPx / 2 - screenHeight / 2;
  const y2 = heightPx / 2 + screenHeight / 2;
  return {
    visible: true,
    y1,
    y2,
    halfWidth: screenWidth / 2,
    xCenter: numColumns / 2,
  };
}