---
sessionId: session-261121-100532-vv6f
---

# Requirements

### Overview & Goals
Crear un juego de escape de bosque 3D jugable en web (laptops, tablets, celulares) como Progressive Web App (PWA). El jugador debe navegar un bosque denso, resolver puzzles, encontrar objetos clave, evitar trampas y enemigos, y descubrir secretos ambientales para escapar. Estilo visual low-poly estilizado.

### Scope

#### In Scope
- Proyecto React + Three.js independiente (separado de Sanity)
- Motor 3D con Three.js para renderizado del bosque low-poly
- Navegación en primera persona (WASD + mouse/touch)
- Sistema de supervivencia (salud, energía, cordura)
- Puzzles ambientales para desbloquear caminos
- Objetos clave coleccionables
- Enemigos pasivos y activos en el bosque
- Trampas ambientales (raíces, pozos, etc.)
- Secretos ambientales ocultos (campos, caminos, mensajes)
- Easter egg que referencia al juego Sanity
- Controles táctiles para móviles y tablets
- PWA para instalación en dispositivos

#### Out of Scope
- Multijugador
- Narrativa compleja con diálogos extensos
- Gráficos realistas o texturas fotorealistas
- Sonido 3D avanzado (solo efectos básicos)

### User Stories
1. Como jugador en laptop, quiero moverme con WASD y rotar con el mouse para explorar el bosque
2. Como jugador en móvil, quiero controles táctiles para moverme y girar la cámara
3. Como jugador, quiero encontrar objetos clave que me ayuden a resolver puzzles y avanzar
4. Como jugador, quiero evitar trampas y enemigos que reduzcan mi salud
5. Como jugador curioso, quiero descubrir secretos ocultos en el bosque
6. Como jugador de Sanity, quiero encontrar una referencia al juego anterior como easter egg

### Functional Requirements
- **Navegación**: Movimiento en primera persona con colisiones contra árboles y terreno
- **Supervivencia**: Barras de salud, energía y cordura que afectan la experiencia
- **Puzzles**: Al menos 3 puzzles ambientales que requieran objetos específicos
- **Inventario**: Sistema simple para recoger y usar objetos
- **Enemigos**: Criaturas del bosque que patrullan o persiguen al jugador
- **Trampas**: Elementos del terreno que causan daño si se tocan
- **Objetivos**: Marcadores visuales que guían al jugador hacia el siguiente objetivo
- **Final**: Múltiples finales basados en las decisiones y objetos recolectados

### Non-Functional Requirements
- **Performance**: 30-60 FPS en laptops, 30 FPS en móviles medianos
- **Carga**: Tiempo de carga inicial menor a 10 segundos
- **PWA**: Instalable en Android, iOS y desktop
- **Responsive**: Controles adaptativos según dispositivo
- **Accesibilidad**: Controles táctiles grandes, contraste adecuado

# Delivery Steps

### ✓ Step 1: Set up React + Three.js project with Vite and PWA config
Crear la estructura base del proyecto forest-escape como una app React con Vite, Three.js, y configuración PWA.

- Inicializar proyecto con Vite + React + TypeScript en `/Users/neryad/dev/forest-escape`
- Instalar dependencias: @react-three/fiber, @react-three/drei, three, @vitejs/plugin-react
- Configurar PWA con vite-plugin-pwa (manifest, service worker, icons)
- Crear estructura de carpetas: src/scenes (Three.js), src/game (engine), src/ui (React components), src/assets (modelos low-poly)
- Configurar tsconfig.json y vite.config.ts
- Crear el componente App.tsx con el Canvas de Three.js como base

### ✓ Step 2: Implement forest scene with low-poly terrain and environment
Construir la escena 3D del bosque con terreno, árboles, niebla, y atmósfera low-poly.

- Crear ForestScene.tsx con un terreno procedural (plano con variaciones de altura)
- Generar árboles low-poly procedurales (conos + cilindros) distribuidos aleatoriamente
- Añadir niebla (FogExp2) para atmósfera y ocultar límites del mapa
- Configurar iluminación: luz ambiental suave + luz direccional (sol) con sombras
- Crear SkyBox o gradiente de cielo para el fondo
- Añadir elementos ambientales: rocas, arbustos, hongos brillantes
- Implementar colisiones básicas con el terreno y objetos estáticos usando @react-three/rapier o colisiones simples

### ✓ Step 3: Build first-person camera controls for keyboard and touch
Implementar controles de cámara en primera persona para navegación del bosque.

- Crear CameraController.tsx con PointerLockControls para desktop (mouse + WASD)
- Implementar VirtualJoystick.tsx para controles táctiles en móviles/tablets
- Añadir rotación de cámara con touch (swipe) en móviles
- Configurar velocidad de movimiento y sensibilidad de cámara
- Implementar sistema de colisiones para evitar atravesar árboles y paredes del terreno
- Crear GameUI.tsx con overlay de controles táctiles (visible solo en móvil)
- Añadir minimapa básico en esquina superior

### ✓ Step 4: Create survival system with health, energy, and sanity mechanics
Implementar el sistema de supervivencia que gestiona los estados del jugador.

- Crear PlayerState.ts con interfaz: health, energy, sanity, inventory, position
- Implementar SurvivalContext.tsx con React Context para estado global
- Crear HealthBar.tsx, EnergyBar.tsx, SanityBar.tsx como componentes UI
- Añadir efectos de cordura baja: distorsión visual, sonidos, efectos de post-procesado
- Implementar regeneración pasiva de energía y mecánicas de descanso
- Crear sistema de eventos aleatorios (como en Sanity) que afectan cordura
- Añadir efectos visuales de daño (flash rojo, screen shake)

### ✓ Step 5: Implement inventory, items, and puzzle system
Crear el sistema de inventario, objetos coleccionables, y puzzles ambientales.

- Crear Item.ts con tipos: key, tool, clue, consumable
- Implementar Inventory.tsx como panel UI deslizable
- Crear PickupItem.tsx como componente 3D interactuable (brilla, tiene indicador)
- Diseñar 3 puzzles ambientales:
  - Puzzle 1: Encuentra 3 runas dispersas para abrir un paso bloqueado
  - Puzzle 2: Usa una antorcha para iluminar un camino oculto en cueva
  - Puzzle 3: Resuelve un mecanismo de palancas en orden correcto
- Crear PuzzleTrigger.tsx que detecta cuando el jugador tiene los objetos necesarios
- Añadir animaciones de resolución de puzzles (partículas, sonidos)

### ✓ Step 6: Add enemies, traps, and environmental hazards
Implementar enemigos, trampas y peligros ambientales en el bosque.

- Crear Enemy.ts con tipos: wanderer (patrulla), stalker (persigue), ambient (pasivo)
- Implementar WolfEnemy.tsx como enemigo low-poly con IA simple (patrulla + persecución)
- Crear ShadowCreature.tsx como enemigo de cordura baja (aparece/desaparece)
- Diseñar trampas: raíces (ralentizan), pozos (daño), ramas (daño al pasar)
- Crear TrapZone.tsx como zona invisible que activa efectos al entrar
- Implementar sistema de detección: enemigos reaccionan al ruido/movimiento
- Añadir efectos de persecución: screen shake, aumento de ritmo cardíaco visual

### ✓ Step 7: Design forest layout with zones, paths, and escape route
Diseñar el layout del bosque con zonas temáticas, caminos, y la ruta de escape.

- Crear ForestMap.ts con definición de zonas:
  - Zona 1: Bosque claro (inicio, tutorial)
  - Zona 2: Bosque denso (enemigos, trampas)
  - Zona 3: Claro misterioso (puzzles, objetos clave)
  - Zona 4: Cueva oscura (puzzle de luz, secretos)
  - Zona 5: Monte final (escape, boss o desafío final)
- Implementar PathSystem.tsx con caminos visibles (piedras, huellas)
- Crear CheckpointSystem.tsx con puntos de guardado y respawn
- Diseñar la ruta de escape: requiere completar puzzles y recoger objetos clave
- Añadir teletransportación entre zonas para optimizar carga
- Crear transiciones suaves entre zonas (niebla, fade)

### ✓ Step 8: Implement secrets, easter eggs, and multiple endings
Añadir secretos ambientales, easter egg de Sanity, y múltiples finales.

- Crear SecretSystem.ts con lista de secretos:
  - Campo oculto detrás de árboles (requiere explorar fuera de camino)
  - Mensaje grabado en árbol antiguo (historia del bosque)
  - Criatura rara que aparece solo de noche (ciclo día/noche)
  - Cueva secreta con item especial
- Implementar EasterEggSanity.tsx: encontrar una terminal de la instalación Sanity escondida en el bosque, con mensajes de la IA y referencias al juego anterior
- Crear EndingSystem.ts con finales:
  - Final bueno: escapaste con todos los objetos clave
  - Final normal: escapaste pero perdiste algunos objetos
  - Final malo: moriste en el bosque
  - Final secreto: descubriste todos los secretos y encontraste la verdad del bosque
- Añadir pantalla de final con estadísticas y desbloqueables

### ✓ Step 9: Add PWA features, responsive design, and polish
Finalizar la PWA, diseño responsive, y pulido general del juego.

- Configurar manifest.json con nombre, iconos, y tema
- Optimizar service worker para cachear assets del juego
- Implementar pantalla de carga con progreso
- Crear menú principal con opciones: Jugar, Continuar, Créditos
- Añadir sistema de guardado con localStorage (progreso, inventario, secretos)
- Optimizar performance: LOD para árboles, frustum culling, instancing
- Añadir efectos de sonido básicos con Howler.js o Web Audio API
- Implementar ciclo día/noche con transición suave
- Testing en desktop, tablet y móvil
- Pulido final: partículas, efectos visuales, transiciones

### ✓ Step 10: Transform forest into scary maze with dark zones and Zelda-style navigation
Transformar el bosque en un laberinto aterrador con zonas oscuras, caminos laberínticos como el Bosque Perdido de Zelda, y atmósfera de terror tipo Sanity.

- **ForestScene.tsx**: Reemplazar bosque abierto por zonas oscuras conectadas por caminos
- **Árboles retorcidos**: Cambiar árboles verdes por árboles oscuros con ramas retorcidas
- **Niebla densa**: Niebla oscura que limita la visibilidad a 10-15 metros
- **Iluminación dramática**: Luz de luna, faroles, y áreas oscuras sin iluminación
- **Sistema de zonas**: Claros iluminados conectados por caminos oscuros y laberínticos
- **Efectos de terror**: Sombras que se mueven, ojos brillantes en la oscuridad, partículas oscuras
- **Navegación tipo Zelda**: Caminos que se bifurcan, algunos llevan a callejones sin salida
- **Atmósfera de Sanity**: Susurros, sombras, y efectos de cordura baja más intensos
- **Cielo nocturno**: Cielo oscuro con luna y estrellas en lugar de cielo azul
- **Terreno oscuro**: Colores oscuros para el terreno, musgo, y elementos ambientales

### * Step 11: Optimize performance and fix visibility issues
Optimizar el rendimiento del juego para que corra fluido y sea visible correctamente.

- **Reducir objetos**: Árboles de 300 a 80, rocas de 50 a 20, arbustos de 80 a 30, hongos de 50 a 15
- **Simplificar geometría**: Árboles de 6 mallas a 2, eliminar animaciones de hongos y faroles
- **Reducir partículas**: De 300 a 50 partículas flotantes
- **Reducir efectos**: Sombras de 5 a 3, ojos de 8 a 4 pares (estáticos)
- **Ajustar niebla**: De [5, 20] a [8, 35] para mejor visibilidad
- **Optimizar colisiones**: Solo verificar árboles cercanos en lugar de todos
- **Eliminar useFrame innecesarios**: Hongos y faroles sin animación