import { Canvas, Image, Rect, useImage } from "@shopify/react-native-skia";
import { memo, useMemo, type ReactNode } from "react";
import type { Player3D } from "../../engine3d/controls";
import { castRays, facingAngle } from "../../engine3d/raycaster";
import { groupDoorRuns } from "../../engine3d/doorRuns";
import { doorSpriteKey, DoorSpriteKey } from "../../engine3d/scene";
import type { Grid, RoomScene } from "../../engine3d/scene";
import { projectSprite } from "../../engine3d/sprite";

const NUM_COLUMNS = 120;
const FOV = 66;

const DOOR_IMAGES: Record<DoorSpriteKey, number> = {
  estandar: require("../../assets/images/3d/puerta-estandar-(abierta:usable).jpeg"),
  cerrada: require("../../assets/images/3d/puerta-cerrada-sin-llave.jpeg"),
  forzable: require("../../assets/images/3d/puerta-bloqueada-forzable.jpeg"),
  nucleo: require("../../assets/images/3d/puerta-del-nucleo-(core_door-blindada).jpeg"),
  inestable: require("../../assets/images/3d/puert-inestable:ilusion.jpeg"),
};

interface RaycastCanvasProps {
  grid: Grid;
  doors: RoomScene["doors"];
  player: Player3D;
  entityDist: number;
  sanity: number;
  width: number;
  height: number;
}

function shade(hex: string, t: number): string {
  const r = Math.round(parseInt(hex.slice(1, 3), 16) * t);
  const g = Math.round(parseInt(hex.slice(3, 5), 16) * t);
  const b = Math.round(parseInt(hex.slice(5, 7), 16) * t);
  return `rgb(${r},${g},${b})`;
}

function RawRaycastCanvas({
  grid,
  doors,
  player,
  entityDist,
  sanity,
  width,
  height,
}: RaycastCanvasProps) {
  const columns = useMemo(
    () =>
      castRays(grid, player.x, player.y, facingAngle(player.dir), {
        numColumns: NUM_COLUMNS,
        fovDeg: FOV,
      }),
    [grid, player],
  );

  const doorImgs = {
    estandar: useImage(DOOR_IMAGES.estandar),
    cerrada: useImage(DOOR_IMAGES.cerrada),
    forzable: useImage(DOOR_IMAGES.forzable),
    nucleo: useImage(DOOR_IMAGES.nucleo),
    inestable: useImage(DOOR_IMAGES.inestable),
  };

  const sprite = useMemo(
    () =>
      projectSprite(
        { visible: entityDist > 0, distance: entityDist || 0 },
        NUM_COLUMNS,
        height,
        FOV,
      ),
    [entityDist, height],
  );

  const wallFactor = height / 2 / Math.tan(((FOV / 2) * Math.PI) / 180);
  const colW = width / NUM_COLUMNS;
  const isGlitch = sanity < 25;

  const rects: ReactNode[] = [];

  columns.forEach((c, i) => {
    const dist = Math.max(0.05, c.perpDist);
    const fog = Math.max(0.3, 1 - dist * 0.12);
    const wallH = Math.min(height * 2, wallFactor / dist);
    const startY = Math.max(0, (height - wallH) / 2);
    const endY = Math.min(height, (height + wallH) / 2);
    const x = i * colW - (isGlitch && i % 13 === 0 ? 3 : 0);

    const sideShade = c.side === "S" ? 0.7 : c.side === "N" ? 1 : 0.85;
    const base = c.type === 2 ? "#4a3a1a" : "#2a3a2a";
    const color = shade(base, fog * sideShade);

    rects.push(
      <Rect key={`ce-${i}`} x={x} y={0} width={colW + 1} height={startY} color="#050805" />,
      <Rect key={`wa-${i}`} x={x} y={startY} width={colW + 1} height={endY - startY} color={color} />,
      <Rect key={`fl-${i}`} x={x} y={endY} width={colW + 1} height={height - endY} color="#141a14" />,
    );
  });

  for (const run of groupDoorRuns(columns)) {
    const dist = Math.max(0.05, columns[run.start].perpDist);
    const wallH = Math.min(height * 2, wallFactor / dist);
    const startY = Math.max(0, (height - wallH) / 2);
    const endY = Math.min(height, (height + wallH) / 2);
    const fog = Math.max(0.3, 1 - dist * 0.12);
    const key = doorSpriteKey(
      run.doorDir ? doors[run.doorDir] : undefined,
      isGlitch,
    );
    const img = doorImgs[key];
    const x0 = run.start * colW;
    const x1 = (run.end + 1) * colW;
    const sideShade = columns[run.start].side === "S" ? 0.7 : 1;
    if (img) {
      rects.push(
        <Image
          key={`door-${run.start}`}
          image={img}
          x={x0}
          y={startY}
          width={x1 - x0}
          height={endY - startY}
          fit="fill"
        />,
        <Rect
          key={`door-shade-${run.start}`}
          x={x0}
          y={startY}
          width={x1 - x0}
          height={endY - startY}
          color={`rgba(0,0,0,${((1 - sideShade * fog) * 0.6).toFixed(2)})`}
        />,
      );
    }
  }

  if (sprite.visible) {
    const sLeft = sprite.xCenter * colW - sprite.halfWidth * colW;
    rects.push(
      <Rect
        key="entity"
        x={sLeft}
        y={sprite.y1}
        width={sprite.halfWidth * 2 * colW}
        height={Math.max(1, sprite.y2 - sprite.y1)}
        color={isGlitch ? "#ff0000" : "#000000"}
      />,
    );
  }

  if (isGlitch) {
    rects.push(<Rect key="gl1" x={0} y={height * 0.25} width={width} height={4} color="#000" />);
    rects.push(<Rect key="gl2" x={0} y={height * 0.55} width={width} height={8} color="#000" />);
    rects.push(<Rect key="gl3" x={0} y={height * 0.8} width={width} height={3} color="#000" />);
  }

  return <Canvas style={{ width, height }}>{rects}</Canvas>;
}

export const RaycastCanvas = memo(RawRaycastCanvas);