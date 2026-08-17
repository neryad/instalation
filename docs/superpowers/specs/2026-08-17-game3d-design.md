# S.A.N.I.T.Y. — Modo 3D en primera persona (`/game3d`)

> Fecha: 2026-08-17
> Estado: aprobado

## Resumen

Transformar la experiencia de texto de **S.A.N.I.T.Y.** en una vista 3D en primera persona estilo **2.5D / raycasting** (estilo *Wolfenstein* retro), manteniendo intacta toda la lógica narrativa del motor actual.

## Objetivos

- **Reusar el motor al 100%** (`engine/`): cordura, items, IA stalker, 6 finales, descripciones y eventos.
- Rendimiento fluido en móvil (Expo, React Native).
- Estética CRT/retro coherente con el juego original.
- Campaña "simple": sin assets 3D, sin modelos, sin física compleja.

## Decisiones tomadas (brainstorming)

| Tema | Decisión |
|---|---|
| Plataforma | Móvil (Expo / React Native) |
| Render | Raycasting 2.5D (uso de Skia) |
| Interacción | Híbrida: botón adelante + girar 90° + prompt de elección en puertas |
| Narrativa | Panel de log tipo terminal en la franja inferior |
| Ubicación | Nueva pantalla `/game3d` en el mismo proyecto |
| IA stalker | Silueta/sombra proyectada al fondo del pasillo |
| Renderizado | `@shopify/react-native-skia` |
| Mundo | Escena por habitación + transición |

## Arquitectura

### Nueva dependencia

- `@shopify/react-native-skia` — canvas 2D acelerado por GPU para dibujar el raycasting.

### Módulo `engine3d/` (TypeScript puro)

Desacoplado de la UI, igual que `engine/`. Traduce estado del engine → mundo visual y acciones del usuario → comandos del engine.

| Archivo | Responsabilidad |
|---|---|
| `scene.ts` | Convierte `rooms.ts` (conexiones normales, inestables y falsas) en un mapa de casillas 7x7 por habitación, con paredes, aperturas y puertas. Responde a la cordura actual para decidir qué vecina existe. |
| `raycaster.ts` | DDA: por cada columna de píxel dispara un rayo contra el mapa; devuelve distancia, altura y sombreado de cada pared, marca 2D del suelo/techo, niebla por distancia y nivel de glitch según cordura. No dibuja; solo calcula. |
| `sprite.ts` | Proyecta el sprite (silueta/sombra) de la IA en el pasillo cuando su `awareness` está alta, escalado según la distancia real de `entity.ts`. |
| `controls.ts` | Detecta qué aperturas/de puertas son visibles según la dirección del jugador; emite el estado para `DoorPrompt`. |

### Componentes `components/game3d/`

| Componente | Uso |
|---|---|
| `RaycastCanvas.tsx` | Consume la salida de `raycaster.ts` y `sprite.ts`; dibuja en Skia a 60fps (paredes, suelo/techo, niebla, glitch, silueta de la IA). |
| `ControlPad.tsx` | Botones: **adelante**, **girar izq/der** (pasos de 90°), e **interactuar** (contextual). |
| `DoorPrompt.tsx` | Overlay al llegar a una apertura con las opciones (norte/sur/este/oeste); transición negra breve al cruzar. |
| `LogPanel.tsx` | Reutiliza el log/estilo del juego 2D en la franja inferior (descripciones, eventos, finales). |

### Pantalla `app/game3d.tsx`

Orquesta todo: canvas arriba, `LogPanel` abajo, `ControlPad` superpuesto y `DoorPrompt` en transiciones. Accesible desde el menú principal junto al modo 2D actual.

## Flujo de datos

```
engine (estado inmutable, único dueño de la lógica)
   │
   ├── engine3d/scene   → mapa de casillas por cordura
   │
   ├── engine3d/raycaster + sprite + controls → render y contexto visual
   │
   └── acciones del jugador (buttons/prompt) → engine.move / investigate / ...
```

- El estado sigue viviendo en `engine` (inmutable, sin efectos secundarios).
- `engine3d` no conoce React Native; solo datos.
- Los componentes (`game3d/*`) consumen `engine3d` y pintan con Skia.

## Detalles de implementación clave

- **Cada habitación = celda 7x7**: el jugador inicia frente a la puerta de entrada. Aperturas en los muros donde el grafo conecta.
- **Puertas y bloqueos**: las puertas bloqueadas (`lockedBy`, p. ej. `core_door`) se muestran cerradas; el botón interactuar o el prompt indican "bloqueada" y activan la lógica de llaves/forzar.
- **Conexiones inestables/falsas**: `scene.ts` decide la vecina según `sanity`; al entrar la nueva habitación es la correspondiente al estado actual.
- **IA**: el sprite se escala según la distancia real derivada de `entity.ts`; cuando está muy cerca se agranda hasta llenar el pasillo y el log avisa del peligro.
- **Transición entre habitaciones**: pantalla negra breve (100–200 ms) para ocultar el cambio de mundo. Sin coste de assets.
- **Cordura baja**: el glitch del canvas se intensifica (líneas de escaneo, distorsión de color) reutilizando la misma lógica visual que ya existe en el modo 2D.

## Alcance explícito (no incluido)

- No hay assets 3D, modelos ni animaciones esqueléticas.
- No hay movimiento libre con joystick ni cámara libre (giro por pasos de 90°).
- No se modifica `engine/` ni el modo 2D actual; conviven ambas pantallas.
- Sin multijugador, sin persistencia de partida (igual que la 2D).

## Testing

- **Unidad (engine3d):** `raycaster.ts` (DDA sobre mapa conocido → distancias esperadas), `scene.ts` (7x7 correcto, aperturas según conexiones, vecinas por cordura), `controls.ts` (puertas visibles → opciones del prompt).
- **Manual (Expo Go):** recorrido completo del grafo, bloqueo de puertas, huida de la IA, finales.

## Referencias

- Motor actual: `engine/` (engine.ts, rooms.ts, sanity.ts, entity.ts, player.ts, events.ts).
- Juego 2D actual: `app/game.tsx`, `components/game/`.