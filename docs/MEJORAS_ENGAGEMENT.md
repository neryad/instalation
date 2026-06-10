# Mejoras para Engagement de S.A.N.I.T.Y.

> Documento para que cualquier agente/IA retome el trabajo sin contexto previo.
> Estado actual: mapa implementado con IA, items y rastro. Pendiente lo siguiente.

---

## Stack del proyecto

- **Framework:** React Native / Expo SDK 54
- **Lenguaje:** TypeScript
- **Routing:** expo-router (file-based)
- **Navegación:** expo-router `router.replace()`
- **Estado:** `PlayerState` en useState dentro de `app/game.tsx`
- **Persistencia:** AsyncStorage (solo para logros hoy)
- **Audio:** expo-av
- **Hápticos:** expo-haptics
- **Estilo:** StyleSheet, sin librería UI externa

---

## Pendiente: Mejoras ordenadas por impacto

### 1. Guardado automático de partida (Alto impacto, ~30 min)

**Problema:** Si el usuario cierra la app, pierde todo el progreso. Para un juego de 20-30 min, esto mata el engagement.

**Solución:**
- Crear `storage/gameState.ts`
- Función `saveGame(state: PlayerState)` que serializa a JSON y guarda en AsyncStorage
- Función `loadGame(): PlayerState | null` que carga y deserializa
- En `app/game.tsx`, en un `useEffect` que corre tras cada `setState`, llamar a `saveGame`
- En el `useEffect` de inicio, intentar `loadGame()` primero; si hay partida guardada, preguntar "¿Continuar partida anterior?" o simplemente cargarla

**Campos a guardar:** `currentRoom`, `sanity`, `inventory`, `entityAwareness`, `entityRoom`, `lastDirections`, `visitedRooms`, `roomHistory`, `collectedItems`, `gameOver`

**No guardar:** `lastEvent` (es temporal), `endingType`

**Advertencia:** No guardar si `gameOver === true` (o limpiar el save al llegar a un final)

**Archivos a tocar:**
- Nuevo: `storage/gameState.ts`
- Modificar: `app/game.tsx` (useEffect de carga/guardado)
- Opcional: `app/index.tsx` (diálogo de continuar)

---

### 2. Tutorial temprano (Alto impacto, ~15 min)

**Problema:** El jugador llega a una terminal sin saber qué hacer. El comando "ayuda" existe pero no es obvio.

**Solución:**
- En `app/game.tsx`, en el `useEffect` de inicio (línea ~462), añadir lógica:
  - Si han pasado 5 segundos desde el último log y el jugador no ha escrito nada, mostrar mensaje de ayuda automático
  - O mejor: la primera vez, mostrar secuencia de 3 logs tutoriales:
    1. `"USA LOS BOTONES N/S/E/O PARA MOVERTE"`
    2. `"TOCA 'INVESTIGAR' PARA BUSCAR OBJETOS"`
    3. `"CADA MOVIMIENTO CONSUME CORDURA. ELIGE CON CUIDADO."`

**Detectores simples:**
- Variable `hasSeenTutorial: boolean` en PlayerState (solo se muestra una vez)
- O usar `AsyncStorage` para recordar si ya vio el tutorial

**Archivos a tocar:**
- `engine/player.ts` (añadir `hasSeenTutorial?`)
- `app/game.tsx` (lógica de tutorial)
- Opcional: `storage/settings.ts` (para persistir)

---

### 3. Acelerar intro (Impacto medio, ~5 min)

**Problema:** La pantalla de intro (`app/intro.tsx`) muestra 7 líneas a 600ms cada una + 1500ms final = ~6s viendo texto antes de poder jugar.

**Solución:**
- Bajar delay de 600ms a 250ms
- Bajar delay final de 1500ms a 500ms
- Añadir detector de tap: si el usuario toca la pantalla, saltar la intro inmediatamente (`router.replace("/game")`)

**Archivos a tocar:**
- `app/intro.tsx` (cambiar constantes, añadir `Pressable`)

---

### 4. Typewriter más rápido (Impacto medio, ~5 min)

**Problema:** El efecto typewriter en `TerminalLog.tsx` es de 10ms por carácter. Para descripciones largas (30-50 palabras), el jugador espera 2-3 segundos viendo texto aparecer.

**Solución:**
- Reducir de 10ms a 3ms
- O mejor: solo aplicar typewriter al primer mensaje de cada sala; el resto aparecen instantáneos
- O: si el texto tiene más de 80 caracteres, mostrarlo instantáneo en lugar de typewriter

**Archivos a tocar:**
- `components/game/TerminalLog.tsx` (constante en el TypewriterText)

---

### 5. Feedback visual al perder cordura (Impacto medio, ~10 min)

**Problema:** Cuando la cordura baja, la SanityBar tiembla pero es muy sutil. El jugador puede no darse cuenta de que está en peligro.

**Solución:**
- En `app/game.tsx`, donde ya se maneja `isGlitchActive`:
  - Cuando `sanity < 30`, activar un overlay rojo intermitente (ya existe `dangerLevel` en CRTOverlay, solo falta pasarlo correctamente)
  - Cuando `sanity < 15`, el overlay rojo se vuelve permanente + efecto de "latido" visual
  - Cuando `entityAwareness > 70`, bordes de pantalla que parpadean en rojo

**Archivos a tocar:**
- `app/game.tsx` (pasar dangerLevel más agresivo)
- `components/game/CRTOverlay.tsx` (mejorar efecto de peligro)

---

### 6. Notificación de logros (Impacto medio, ~10 min)

**Problema:** Los finales y el easter egg se guardan en silencio. El jugador no sabe que desbloqueó algo.

**Solución:**
- Crear componente `AchievementToast` que muestra un mensaje tipo "LOGRO: SISTEMA APAGADO" con fade in/out
- Llamarlo desde `game.tsx` cuando se detecte un nuevo ending desbloqueado
- Usar el sistema de logros existente en `storage/achievements.ts`

**Archivos a tocar:**
- Nuevo: `components/game/AchievementToast.tsx`
- Modificar: `app/game.tsx` (detectar desbloqueo y mostrar toast)
- Modificar: `app/FinalScreen.tsx` (ya guarda logros, solo añadir toast visual)

---

### 7. Mini-tutorial al conseguir objetos (Bajo impacto, ~10 min)

**Problema:** Cuando el jugador encuentra un sedante o una llave, no sabe cómo usarlo.

**Solución:**
- En `engine/engine.ts`, función `investigate()`: si el objeto tiene un uso específico, añadir pista
- Ejemplo: al recoger sedante, log adicional: `"PISTA: USA 'usar sedante' CUANDO LA CORDURA ESTÉ BAJA"`
- Al recoger `keycard_red`: `"PISTA: BUSCA UNA PUERTA CON LECTOR ROJO"`
- Al recoger `data_link`: `"PISTA: HAY UNA TERMINAL BLOQUEADA EN LA ZONA DE DATOS"`

**Pero esto ya existe parcialmente** en los nombres de los items. Mejor integración en el mapa (ya implementado).

---

### 8. Versión Web: click en direcciones (Bajo impacto, ~15 min)

**Problema:** En web, el jugador podría hacer clic en las direcciones resaltadas en el texto (`norte`, `sur`, etc.) pero no son interactivas.

**Solución:**
- En `TerminalLog.tsx`, donde se renderizan las direcciones resaltadas, convertirlas en `Pressable` que ejecute el comando
- Pasar callback `onDirectionPress` desde `game.tsx`

**Archivos a tocar:**
- `components/game/TerminalLog.tsx` (convertir `highlightedDirection` en Pressable)
- `app/game.tsx` (pasar callback)

---

## Resumen de prioridad

| # | Mejora | Esfuerzo | Impacto |
|---|---|---|---|
| 1 | Guardado automático | ~30 min | Alto |
| 2 | Tutorial temprano | ~15 min | Alto |
| 3 | Acelerar intro | ~5 min | Medio |
| 4 | Typewriter rápido | ~5 min | Medio |
| 5 | Feedback visual cordura | ~10 min | Medio |
| 6 | Notificación logros | ~10 min | Medio |
| 7 | Pistas al recoger items | ~10 min | Bajo |
| 8 | Click en direcciones web | ~15 min | Bajo |

**Orden recomendado:** 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8

---

## Lo que ya está implementado (no tocar)

- Botón "MAPA" en QuickActions
- Modal del mapa con nodos de salas visitadas
- Salas bloqueadas (🔒/🔓) con indicación del ítem necesario
- Líneas de conexión entre salas (tenues para bloqueadas)
- Indicador de posición de la IA (punto rojo pulsante)
- Indicador de items disponibles (◆ amarillo)
- Rastro del jugador (últimas 4 salas atenuadas)
- Escalado automático a pantalla portrait
- Pulsación en sala actual
