---
sessionId: session-261121-105127-ua9o
---

# Contexto y Objetivos

### Contexto

**S.A.N.I.T.Y.** es un juego de terror psicológico narrativo con terminal. Tiene 18 habitaciones, un motor raycast 3D parcial (con 5 puertas ya generadas con IA), y efectos CRT/terminal. El problema principal identificado es la **falta de assets visuales** que hagan el juego más atractivo y reduzcan la barrera de entrada.

### Objetivo

Crear una rama git (`feature/visual-assets`) con todos los nuevos assets visuales necesarios para:
1. Ilustraciones de cada una de las 18 habitaciones
2. Texturas de paredes para el motor 3D (raycaster)
3. Sprites de items coleccionables
4. Assets promocionales (iconos, screenshots, trailer)
5. UI mejorada (logros, intro visual)

### Estrategia

Como no puedo generar imágenes directamente, proporcionaré **prompts detallados para IA** (Midjourney/DALL-E/Stable Diffusion) que el usuario puede ejecutar para generar cada asset. Los prompts están diseñados para mantener coherencia visual en todo el juego.

### Estilo Visual Unificado

- **Paleta**: Verde terminal (#00ff00), rojo alerta (#ff3300), azul servidor (#0066ff), negro profundo (#050805)
- **Estilo**: Dark sci-fi, instalaciones subterráneas, iluminación tenue, atmósfera claustrofóbica
- **Resolución objetivo**: 1080x1080 para ilustraciones de salas, 512x512 para texturas, 256x256 para items
- **Formato**: PNG con transparencia donde aplique

# Prompts para Habitaciones (18 salas)

### Prompts de IA para las 18 habitaciones

Cada prompt está diseñado para Midjourney v6 o DALL-E 3. Se recomienda usar el mismo seed o estilo base para coherencia.

---

#### Estilo base (prefijo para todos)
```
Dark sci-fi underground installation, psychological horror atmosphere, terminal green lighting accents, claustrophobic, cinematic lighting, photorealistic, 16:9 aspect ratio --ar 16:9 --v 6.0
```

---

#### 1. awakening (Sala de despertar)
```
Dark sci-fi underground installation, a metal gurney/cot in the center of a small clinical room, red emergency lights flickering on the ceiling, peeling walls with biohazard symbols, an arched security doorway leading north, terminal green monitor glow on one wall, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

#### 2. hallway_a (Pasillo principal)
```
Dark sci-fi underground installation, narrow corridor with strange glowing symbols painted on the walls, the hallway branches east and west, a dripping ventilation shaft overhead leaking dark oil, dim green emergency lighting, peeling industrial paint, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

#### 3. shadow_lab (Laboratorio de sombras)
```
Dark sci-fi underground installation, abandoned laboratory with dark tinted glass panels and mirrors, distorted reflections visible in the glass, surgical equipment scattered on metal tables, green terminal monitors still active, a metal staircase descending south, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

#### 4. data_morgue (Morgue de datos)
```
Dark sci-fi underground installation, infinite rows of black server racks humming with blue LED lights, cold air visible as mist, the servers arranged like coffins in a morgue, blue lights blinking like eyes in the darkness, maintenance conduit on the east wall, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

#### 5. data_terminal (Terminal de datos)
```
Dark sci-fi underground installation, a single glowing computer terminal in a small cramped room, cables running along the walls and floor, a narrow passage leading south, the screen displays corrupted text and error messages, green terminal glow illuminating the dark space, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

#### 6. mirror_gallery (Galería de espejos)
```
Dark sci-fi underground installation, a room completely covered in black mirrors from floor to ceiling, digital glitch reflections visible in the glass, distorted silhouettes in the mirrors, a faint blue digital flash visible through one mirror, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

#### 7. armory (Armería)
```
Dark sci-fi underground installation, open metal lockers with ozone smell visible as electrical sparks, oil stains on the concrete floor leading south, a retinal scanner door on the north wall with red LED ring, military-style equipment storage, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

#### 8. neural_link (Enlace neural)
```
Dark sci-fi underground installation, reclining chairs with brain interface helmets hanging from the ceiling like cocoons, white static displayed on multiple monitors, absolute silence atmosphere, translucent ghost-like figures barely visible in the chairs, a floor hatch leading north, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

#### 9. waste_disposal (Vertedero)
```
Dark sci-fi underground installation, organic waste and stripped cables piled in a disposal chamber, heat visible rising from an open hatch on the east side, corroded metal walls, exposed wiring sparking occasionally, dark industrial atmosphere, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

#### 10. incinerator (Incinerador)
```
Dark sci-fi underground installation, intense heat distortion visible in the air, walls completely blackened by soot, fire burning through metal grates on the floor, the flames forming hand-like shapes, industrial machinery noise visible as vibrating walls, a metal staircase leading north, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

#### 11. ventilation_shaft (Conducto de ventilación)
```
Dark sci-fi underground installation, claustrophobic metal ventilation duct, steam hissing from pipes on the west side, rusted metal walls close on both sides, dripping condensation, a narrow crawl space continuing north, green emergency light barely visible in the distance, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

#### 12. life_support (Soporte vital)
```
Dark sci-fi underground installation, large industrial machinery and fans keeping air circulating, pipes and valves everywhere, a biohazard symbol on the north gate, loud mechanical noise visible as vibrating equipment, mirror-covered passage leading south, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

#### 13. dead_hydroponics (Hidroponía muerta)
```
Dark sci-fi underground installation, dead grey plants and withered vines covering the floor and walls, stagnant water pools with algae, the air thick with mold spores visible in the light, dried roots reaching like fingers, a mossy floor hatch on the east side, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

#### 14. core_door (Puerta del núcleo)
```
Dark sci-fi underground installation, a massive reinforced blast door with a glowing red keycard reader, warning lights flashing on the door frame, heavy industrial locking mechanisms, the door takes up most of the view, green terminal light from behind, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

#### 15. core (Núcleo central)
```
Dark sci-fi underground installation, a massive monolith server tower pulsing with blue energy in the center of a large circular chamber, three doorways leading north (emergency panel), east (neural chamber), and west (evacuation), holographic displays floating around the monolith, the AI presence visible as a digital aura, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

#### 16. shutdown_protocol (Protocolo de apagado)
```
Dark sci-fi underground installation, an emergency shutdown control panel with 47 numbered switches and buttons, red warning lights, a large manual override lever, the panel illuminated by emergency lighting, cables and wires connecting to the main system, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

#### 17. transcendence_chamber (Cámara de trascendencia)
```
Dark sci-fi underground installation, a neural transfer chamber with interface cables hanging from the ceiling like tentacles, a central platform with brain interface equipment, blue and purple energy fields, the room feels alive with digital presence, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

#### 18. emergency_escape (Evacuación de emergencia)
```
Dark sci-fi underground installation, red emergency lights flashing everywhere, an emergency evacuation staircase opening upward toward faint natural light from the surface, alarm sirens visible as pulsing red lights, a heavy industrial door mechanism, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

---

### Variantes de baja cordura (para las salas con sanityVariants)

Para las salas que tienen variantes de cordura, generar una segunda versión con el sufijo `_insane`:

**awakening_insane:**
```
Dark sci-fi underground installation, a metal gurney in a clinical room, red lights pulsing like a heartbeat, walls covered in blood-like stains, breathing sounds visible as fog on the walls, the security door has scratch marks, green terminal text reading "DON'T LOOK BEHIND YOU", extreme psychological horror, distorted perspective, cinematic lighting --ar 16:9 --v 6.0
```

**data_morgue_insane:**
```
Dark sci-fi underground installation, server racks whispering names, blue LED lights following the viewer, the servers arranged like a funeral procession, faces visible in the server screens, cold mist forming words, extreme psychological horror, distorted perspective, cinematic lighting --ar 16:9 --v 6.0
```

**incinerator_insane:**
```
Dark sci-fi underground installation, fire forming human hand shapes reaching from grates, walls blackened by soot forming faces, the heat distortion making the room appear to breathe, screams visible as sound waves in the air, extreme psychological horror, distorted perspective, cinematic lighting --ar 16:9 --v 6.0
```

**dead_hydroponics_insane:**
```
Dark sci-fi underground installation, dead vines moving when not directly looked at, something breathing among the dead foliage, the stagnant water reflecting a figure that isn't there, roots wrapping around like grasping hands, extreme psychological horror, distorted perspective, cinematic lighting --ar 16:9 --v 6.0
```

**neural_link_insane:**
```
Dark sci-fi underground installation, the reclining chairs clearly occupied by translucent ghost figures, the white static on monitors forming faces, the urge to sit down and connect, voices from the helmets, extreme psychological horror, distorted perspective, cinematic lighting --ar 16:9 --v 6.0
```

# Prompts para Texturas 3D, Items y UI

### Texturas de paredes para el motor Raycaster

El motor 3D actual usa colores sólidos (`#2a3a2a` para paredes tipo 1, `#4a3a1a` para tipo 2). Se necesitan texturas tileables para reemplazarlos.

**Tamaño recomendado:** 256x256 PNG, tileable (seamless)

---

#### Textura de pared tipo 1 (paredes estándar - verde)
```
Seamless tileable texture, dark green industrial concrete wall, sci-fi underground facility, peeling paint, water stains, small rivets and bolts, terminal green ambient lighting reflection, 256x256, top-down flat view, no perspective --v 6.0
```

#### Textura de pared tipo 2 (paredes de advertencia - marrón)
```
Seamless tileable texture, dark brown rusted metal wall panel, sci-fi underground facility, warning stripes faded, oil stains, corrosion, industrial bolts, dim lighting, 256x256, top-down flat view, no perspective --v 6.0
```

#### Textura de suelo (floor)
```
Seamless tileable texture, dark green industrial concrete floor, sci-fi underground facility, wet patches reflecting green light, cracks in the concrete, scattered debris, 256x256, top-down flat view, no perspective --v 6.0
```

#### Textura de techo (ceiling)
```
Seamless tileable texture, dark industrial ceiling with exposed pipes and cables, sci-fi underground facility, dripping condensation, flickering fluorescent light fixtures, 256x256, top-down flat view, no perspective --v 6.0
```

---

### Sprites de items (256x256 PNG con fondo transparente)

#### Sedante (sedative)
```
Isolated object on transparent background, a medical syringe with blue glowing liquid, sci-fi design, metallic barrel with digital display showing dosage, terminal green accent lights, 256x256, top-down view, dark sci-fi aesthetic --v 6.0
```

#### Tarjeta roja (keycard_red)
```
Isolated object on transparent background, a red access keycard with glowing circuit patterns, sci-fi design, metallic chip visible, "LEVEL 5 ACCESS" text in terminal green font, dark edges, 256x256, top-down view, dark sci-fi aesthetic --v 6.0
```

#### Enlace de datos (data_link)
```
Isolated object on transparent background, a USB-like data drive with glowing blue LEDs, sci-fi design, metallic body with cable connector, digital display showing data transfer, terminal green accent, 256x256, top-down view, dark sci-fi aesthetic --v 6.0
```

#### Fusible térmico (thermal_fuse)
```
Isolated object on transparent background, a heat-resistant fuse with orange glow, sci-fi design, ceramic body with metal contacts, heat distortion visible around it, warning symbols, 256x256, top-down view, dark sci-fi aesthetic --v 6.0
```

#### DEV_LOG.aes (easter egg)
```
Isolated object on transparent background, a corrupted data file icon, glitching digital effect, red and green color distortion, question mark symbol in the center, terminal text fragments floating around, 256x256, top-down view, dark sci-fi aesthetic --v 6.0
```

---

### Assets de interfaz

#### Fondo de grid mejorado
```
Seamless tileable texture, dark green perspective grid floor receding into darkness, retro sci-fi computer graphics style, faint horizontal lines, vanishing point at center, very dark background, 1024x1024, top view --v 6.0
```

#### Overlay de peligro (cordura < 30)
```
Seamless tileable texture, red vignette border effect, dark red gradient from edges to transparent center, subtle film grain, horror atmosphere, PNG with transparency, 1024x1024 --v 6.0
```

#### Overlay de cordura crítica (cordura < 15)
```
Seamless tileable texture, intense red pulsing vignette, heartbeat pattern visible in the red glow, dark noise texture, extreme horror atmosphere, PNG with transparency, 1024x1024 --v 6.0
```

#### Icono de la IA/entidad (para el mapa)
```
Small icon, red glowing eye with digital glitch effect, dark background, minimalist design, the eye has a camera lens quality, 64x64, flat design --v 6.0
```

#### Splash screen mejorado (1080x1920)
```
Mobile splash screen, dark background with "S.A.N.I.T.Y." in large terminal green font with glitch effect, subtitle "PSYCHOLOGICAL HORROR" in smaller red font, a faint silhouette of an underground facility in the background, CRT scanline overlay, 1080x1920 portrait --v 6.0
```

# Prompts para Assets Promocionales

### Assets para marketing y tiendas de apps

---

#### Icono de la app (1024x1024)
```
App icon design, dark background with a stylized brain made of circuit board traces in terminal green, a red warning eye in the center, glitch effect on the edges, minimalist but striking, sci-fi horror aesthetic, centered composition, no text --v 6.0
```

#### Screenshot 1 - Pantalla de juego (1080x1920)
```
Mobile game screenshot, dark terminal interface with green text on black background, CRT scanline overlay effect, a room description about waking up on a metal gurney with red lights, directional buttons at the bottom (N/S/E/O), sanity bar at the top showing green, map button, atmospheric horror game UI, 1080x1920 portrait --v 6.0
```

#### Screenshot 2 - Momento de terror (1080x1920)
```
Mobile game screenshot, dark terminal interface, the text describes the AI appearing, red warning effects on screen, glitch visual effects, sanity bar showing critical red level, the words "ENTITY DETECTED" in red, CRT distortion, atmospheric horror game UI, 1080x1920 portrait --v 6.0
```

#### Screenshot 3 - Mapa (1080x1920)
```
Mobile game screenshot, an interactive map overlay showing a dungeon-like layout of rooms connected by corridors, current room highlighted in green, AI position shown as red pulsing dot, item locations marked with yellow diamonds, locked rooms with padlock icons, dark sci-fi UI, 1080x1920 portrait --v 6.0
```

#### Banner promocional horizontal (1920x600)
```
Horizontal promotional banner, dark sci-fi horror game atmosphere, terminal green text reading "S.A.N.I.T.Y." with glitch effect, a silhouette of a person in an underground facility, red emergency lights, CRT scanline overlay, "PSYCHOLOGICAL HORROR" subtitle, 1920x600 --v 6.0
```

#### Thumbnail para trailer/video (1280x720)
```
Video thumbnail, dark terminal screen with green text, a red entity silhouette emerging from the darkness, glitch effect, "S.A.N.I.T.Y." title in terminal font, "CAN YOU SURVIVE?" subtitle, high contrast, eye-catching, 1280x720 --v 6.0
```

# Estructura de Rama y Archivos

### Rama git recomendada

```
git checkout -b feature/visual-assets
```

### Estructura de archivos propuesta

```
assets/
├── images/
│   ├── rooms/                    # NUEVO: ilustraciones de habitaciones
│   │   ├── awakening.png
│   │   ├── awakening_insane.png
│   │   ├── hallway_a.png
│   │   ├── shadow_lab.png
│   │   ├── data_morgue.png
│   │   ├── data_morgue_insane.png
│   │   ├── data_terminal.png
│   │   ├── mirror_gallery.png
│   │   ├── armory.png
│   │   ├── neural_link.png
│   │   ├── neural_link_insane.png
│   │   ├── waste_disposal.png
│   │   ├── incinerator.png
│   │   ├── incinerator_insane.png
│   │   ├── ventilation_shaft.png
│   │   ├── life_support.png
│   │   ├── dead_hydroponics.png
│   │   ├── dead_hydroponics_insane.png
│   │   ├── core_door.png
│   │   ├── core.png
│   │   ├── shutdown_protocol.png
│   │   ├── transcendence_chamber.png
│   │   └── emergency_escape.png
│   ├── textures/                 # NUEVO: texturas tileables para raycaster
│   │   ├── wall_type1.png
│   │   ├── wall_type2.png
│   │   ├── floor.png
│   │   └── ceiling.png
│   ├── items/                    # NUEVO: sprites de items
│   │   ├── sedative.png
│   │   ├── keycard_red.png
│   │   ├── data_link.png
│   │   ├── thermal_fuse.png
│   │   └── dev_log_aes.png
│   ├── ui/                       # NUEVO: assets de interfaz
│   │   ├── grid_background.png
│   │   ├── danger_overlay.png
│   │   ├── critical_overlay.png
│   │   ├── entity_icon.png
│   │   └── splash_screen.png
│   └── promo/                    # NUEVO: assets promocionales
│       ├── app_icon.png
│       ├── screenshot_game.png
│       ├── screenshot_horror.png
│       ├── screenshot_map.png
│       ├── banner_horizontal.png
│       └── video_thumbnail.png
│   ├── 3d/                       # EXISTENTE: puertas 3D actuales
│   └── (iconos existentes...)
```

### Script de organización

```bash

# En la raíz del proyecto

mkdir -p assets/images/{rooms,textures,items,ui,promo}
```

# Delivery Steps

### ✓ Step 1: Crear rama git y estructura de directorios
Preparar el terreno para los nuevos assets.
- Crear la rama `feature/visual-assets` desde main
- Ejecutar el script para crear los directorios: `assets/images/rooms/`, `textures/`, `items/`, `ui/`, `promo/`
- Actualizar `.gitignore` si es necesario para excluir archivos temporales de generación de IA
- Crear un archivo `assets/ASSETS_README.md` con instrucciones de cómo generar los assets con los prompts

### ✓ Step 2: Documentar prompts y generar assets de habitaciones
Crear el documento maestro de prompts y generar las 18 ilustraciones de salas + 5 variantes de baja cordura.
- Crear `docs/ASSET_PROMPTS.md` con todos los prompts organizados por categoría
- El usuario ejecuta los prompts en Midjourney/DALL-E para generar las 23 imágenes (18 salas + 5 variantes insane)
- Las imágenes se guardan en `assets/images/rooms/` con los nombres especificados
- Validar que todas las imágenes mantengan coherencia visual (paleta de colores, estilo, resolución)

### ✓ Step 3: Generar texturas 3D, items y puertas adicionales
Crear los assets funcionales para el motor de juego.
- Generar 4 texturas tileables (wall_type1, wall_type2, floor, ceiling) y guardar en `assets/images/textures/`
- Generar 5 sprites de items (sedative, keycard_red, data_link, thermal_fuse, dev_log_aes) y guardar en `assets/images/items/`
- Generar 2 puertas adicionales (retinal_scanner, biohazard_gate) y guardar en `assets/images/doors/`
- Validar que las texturas sean tileables (sin bordes visibles al repetir)

### ✓ Step 4: Integrar assets en el código del juego
Hacer que los nuevos assets visuales se muestren en el juego.
- Crear `components/game/RoomVisual.tsx` para mostrar ilustraciones de habitaciones como fondo
- Integrar RoomVisual en `app/game.tsx` — ilustraciones visibles en contenedor con aspectRatio 16:9
- Las variantes insane se activan automáticamente cuando cordura < 30
- Integrar texturas 3D en `components/game3d/RaycastCanvas.tsx` — paredes, suelo y techo usan texturas tileables con overlays de niebla
- Los assets de items, UI y promo están listos para uso futuro en el motor 3D y marketing

### ✓ Step 5: Mejorar motor 3D (MODO 3D)
Reescribir el motor raycaster para movimiento fluido y renderizado mejorado.
- Player3D: cambiar `dir` (4 direcciones fijas) por `angle` (rotación libre en radianes)
- Movimiento suave: pasos de 0.15 unidades con colisión por esquinas y deslizamiento por paredes
- Rotación libre: 30° por turno en lugar de 90° fijos
- Raycaster: 240 columnas (doblado), coordenadas UV (wallX) para texturizado por columna
- Floor/ceiling perspective mapping: franjas horizontales convergentes con alternancia de color
- Entidad IA: silueta oscura con ojos rojos y aura en lugar de rectángulo plano
- Puertas: mejor sombreado y fallback visual cuando no hay imagen
- Tests actualizados para nuevo sistema de ángulos