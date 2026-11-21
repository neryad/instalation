# Prompts para Generación de Assets - S.A.N.I.T.Y.

Documento maestro con todos los prompts de IA para generar los assets visuales del juego.

## Herramientas Recomendadas

- **Midjourney v6**: Mejor calidad fotorealista. Usa `--ar 16:9 --v 6.0` para imágenes panorámicas.
- **DALL-E 3**: Buen seguimiento de instrucciones. No requiere parámetros especiales.
- **Stable Diffusion XL**: Control total con LoRA. Requiere configuración local.

## Estilo Visual Unificado

**Paleta de colores:**
- Verde terminal: `#00ff00`
- Rojo alerta: `#ff3300`
- Azul servidor: `#0066ff`
- Negro profundo: `#050805`

**Estilo general:** Dark sci-fi, instalaciones subterráneas, iluminación tenue, atmósfera claustrofóbica.

**Resoluciones objetivo:**
- Ilustraciones de salas: 1080x1080 PNG
- Texturas tileables: 256x256 PNG
- Items sprites: 256x256 PNG con transparencia
- UI overlays: 1024x1024 PNG con transparencia
- Promocionales: según especificación individual

---

## Estilo Base (Prefijo para todas las habitaciones)

```
Dark sci-fi underground installation, psychological horror atmosphere, terminal green lighting accents, claustrophobic, cinematic lighting, photorealistic, 16:9 aspect ratio --ar 16:9 --v 6.0
```

---

# Habitaciones (18 salas + 5 variantes de baja cordura)

## 1. awakening (Sala de despertar)

**Archivo:** `assets/images/rooms/awakening.png`

```
Dark sci-fi underground installation, a metal gurney/cot in the center of a small clinical room, red emergency lights flickering on the ceiling, peeling walls with biohazard symbols, an arched security doorway leading north, terminal green monitor glow on one wall, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

## 2. hallway_a (Pasillo principal)

**Archivo:** `assets/images/rooms/hallway_a.png`

```
Dark sci-fi underground installation, narrow corridor with strange glowing symbols painted on the walls, the hallway branches east and west, a dripping ventilation shaft overhead leaking dark oil, dim green emergency lighting, peeling industrial paint, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

## 3. shadow_lab (Laboratorio de sombras)

**Archivo:** `assets/images/rooms/shadow_lab.png`

```
Dark sci-fi underground installation, abandoned laboratory with dark tinted glass panels and mirrors, distorted reflections visible in the glass, surgical equipment scattered on metal tables, green terminal monitors still active, a metal staircase descending south, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

## 4. data_morgue (Morgue de datos)

**Archivo:** `assets/images/rooms/data_morgue.png`

```
Dark sci-fi underground installation, infinite rows of black server racks humming with blue LED lights, cold air visible as mist, the servers arranged like coffins in a morgue, blue lights blinking like eyes in the darkness, maintenance conduit on the east wall, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

## 5. data_terminal (Terminal de datos)

**Archivo:** `assets/images/rooms/data_terminal.png`

```
Dark sci-fi underground installation, a single glowing computer terminal in a small cramped room, cables running along the walls and floor, a narrow passage leading south, the screen displays corrupted text and error messages, green terminal glow illuminating the dark space, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

## 6. mirror_gallery (Galería de espejos)

**Archivo:** `assets/images/rooms/mirror_gallery.png`

```
Dark sci-fi underground installation, a room completely covered in black mirrors from floor to ceiling, digital glitch reflections visible in the glass, distorted silhouettes in the mirrors, a faint blue digital flash visible through one mirror, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

## 7. armory (Armería)

**Archivo:** `assets/images/rooms/armory.png`

```
Dark sci-fi underground installation, open metal lockers with ozone smell visible as electrical sparks, oil stains on the concrete floor leading south, a retinal scanner door on the north wall with red LED ring, military-style equipment storage, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

## 8. neural_link (Enlace neural)

**Archivo:** `assets/images/rooms/neural_link.png`

```
Dark sci-fi underground installation, reclining chairs with brain interface helmets hanging from the ceiling like cocoons, white static displayed on multiple monitors, absolute silence atmosphere, translucent ghost-like figures barely visible in the chairs, a floor hatch leading north, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

## 9. waste_disposal (Vertedero)

**Archivo:** `assets/images/rooms/waste_disposal.png`

```
Dark sci-fi underground installation, organic waste and stripped cables piled in a disposal chamber, heat visible rising from an open hatch on the east side, corroded metal walls, exposed wiring sparking occasionally, dark industrial atmosphere, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

## 10. incinerator (Incinerador)

**Archivo:** `assets/images/rooms/incinerator.png`

```
Dark sci-fi underground installation, intense heat distortion visible in the air, walls completely blackened by soot, fire burning through metal grates on the floor, the flames forming hand-like shapes, industrial machinery noise visible as vibrating walls, a metal staircase leading north, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

## 11. ventilation_shaft (Conducto de ventilación)

**Archivo:** `assets/images/rooms/ventilation_shaft.png`

```
Dark sci-fi underground installation, claustrophobic metal ventilation duct, steam hissing from pipes on the west side, rusted metal walls close on both sides, dripping condensation, a narrow crawl space continuing north, green emergency light barely visible in the distance, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

## 12. life_support (Soporte vital)

**Archivo:** `assets/images/rooms/life_support.png`

```
Dark sci-fi underground installation, large industrial machinery and fans keeping air circulating, pipes and valves everywhere, a biohazard symbol on the north gate, loud mechanical noise visible as vibrating equipment, mirror-covered passage leading south, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

## 13. dead_hydroponics (Hidroponía muerta)

**Archivo:** `assets/images/rooms/dead_hydroponics.png`

```
Dark sci-fi underground installation, dead grey plants and withered vines covering the floor and walls, stagnant water pools with algae, the air thick with mold spores visible in the light, dried roots reaching like fingers, a mossy floor hatch on the east side, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

## 14. core_door (Puerta del núcleo)

**Archivo:** `assets/images/rooms/core_door.png`

```
Dark sci-fi underground installation, a massive reinforced blast door with a glowing red keycard reader, warning lights flashing on the door frame, heavy industrial locking mechanisms, the door takes up most of the view, green terminal light from behind, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

## 15. core (Núcleo central)

**Archivo:** `assets/images/rooms/core.png`

```
Dark sci-fi underground installation, a massive monolith server tower pulsing with blue energy in the center of a large circular chamber, three doorways leading north (emergency panel), east (neural chamber), and west (evacuation), holographic displays floating around the monolith, the AI presence visible as a digital aura, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

## 16. shutdown_protocol (Protocolo de apagado)

**Archivo:** `assets/images/rooms/shutdown_protocol.png`

```
Dark sci-fi underground installation, an emergency shutdown control panel with 47 numbered switches and buttons, red warning lights, a large manual override lever, the panel illuminated by emergency lighting, cables and wires connecting to the main system, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

## 17. transcendence_chamber (Cámara de trascendencia)

**Archivo:** `assets/images/rooms/transcendence_chamber.png`

```
Dark sci-fi underground installation, a neural transfer chamber with interface cables hanging from the ceiling like tentacles, a central platform with brain interface equipment, blue and purple energy fields, the room feels alive with digital presence, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

## 18. emergency_escape (Evacuación de emergencia)

**Archivo:** `assets/images/rooms/emergency_escape.png`

```
Dark sci-fi underground installation, red emergency lights flashing everywhere, an emergency evacuation staircase opening upward toward faint natural light from the surface, alarm sirens visible as pulsing red lights, a heavy industrial door mechanism, psychological horror atmosphere, cinematic lighting, photorealistic --ar 16:9 --v 6.0
```

---

## Variantes de Baja Cordura (_insane)

Para las salas con `sanityVariants` en el código, genera una segunda versión más perturbada.

### awakening_insane

**Archivo:** `assets/images/rooms/awakening_insane.png`

```
Dark sci-fi underground installation, a metal gurney in a clinical room, red lights pulsing like a heartbeat, walls covered in blood-like stains, breathing sounds visible as fog on the walls, the security door has scratch marks, green terminal text reading "DON'T LOOK BEHIND YOU", extreme psychological horror, distorted perspective, cinematic lighting --ar 16:9 --v 6.0
```

### data_morgue_insane

**Archivo:** `assets/images/rooms/data_morgue_insane.png`

```
Dark sci-fi underground installation, server racks whispering names, blue LED lights following the viewer, the servers arranged like a funeral procession, faces visible in the server screens, cold mist forming words, extreme psychological horror, distorted perspective, cinematic lighting --ar 16:9 --v 6.0
```

### incinerator_insane

**Archivo:** `assets/images/rooms/incinerator_insane.png`

```
Dark sci-fi underground installation, fire forming human hand shapes reaching from grates, walls blackened by soot forming faces, the heat distortion making the room appear to breathe, screams visible as sound waves in the air, extreme psychological horror, distorted perspective, cinematic lighting --ar 16:9 --v 6.0
```

### dead_hydroponics_insane

**Archivo:** `assets/images/rooms/dead_hydroponics_insane.png`

```
Dark sci-fi underground installation, dead vines moving when not directly looked at, something breathing among the dead foliage, the stagnant water reflecting a figure that isn't there, roots wrapping around like grasping hands, extreme psychological horror, distorted perspective, cinematic lighting --ar 16:9 --v 6.0
```

### neural_link_insane

**Archivo:** `assets/images/rooms/neural_link_insane.png`

```
Dark sci-fi underground installation, the reclining chairs clearly occupied by translucent ghost figures, the white static on monitors forming faces, the urge to sit down and connect, voices from the helmets, extreme psychological horror, distorted perspective, cinematic lighting --ar 16:9 --v 6.0
```

---

# Texturas 3D para Raycaster

**Tamaño:** 256x256 PNG, tileable (seamless). El motor 3D actual usa colores sólidos (`#2a3a2a` para paredes tipo 1, `#4a3a1a` para tipo 2).

## Textura de pared tipo 1 (paredes estándar - verde)

**Archivo:** `assets/images/textures/wall_type1.png`

```
Seamless tileable texture, dark green industrial concrete wall, sci-fi underground facility, peeling paint, water stains, small rivets and bolts, terminal green ambient lighting reflection, 256x256, top-down flat view, no perspective --v 6.0
```

## Textura de pared tipo 2 (paredes de advertencia - marrón)

**Archivo:** `assets/images/textures/wall_type2.png`

```
Seamless tileable texture, dark brown rusted metal wall panel, sci-fi underground facility, warning stripes faded, oil stains, corrosion, industrial bolts, dim lighting, 256x256, top-down flat view, no perspective --v 6.0
```

## Textura de suelo (floor)

**Archivo:** `assets/images/textures/floor.png`

```
Seamless tileable texture, dark green industrial concrete floor, sci-fi underground facility, wet patches reflecting green light, cracks in the concrete, scattered debris, 256x256, top-down flat view, no perspective --v 6.0
```

## Textura de techo (ceiling)

**Archivo:** `assets/images/textures/ceiling.png`

```
Seamless tileable texture, dark industrial ceiling with exposed pipes and cables, sci-fi underground facility, dripping condensation, flickering fluorescent light fixtures, 256x256, top-down flat view, no perspective --v 6.0
```

---

# Sprites de Items

**Tamaño:** 256x256 PNG con fondo transparente.

## Sedante (sedative)

**Archivo:** `assets/images/items/sedative.png`

```
Isolated object on transparent background, a medical syringe with blue glowing liquid, sci-fi design, metallic barrel with digital display showing dosage, terminal green accent lights, 256x256, top-down view, dark sci-fi aesthetic --v 6.0
```

## Tarjeta roja (keycard_red)

**Archivo:** `assets/images/items/keycard_red.png`

```
Isolated object on transparent background, a red access keycard with glowing circuit patterns, sci-fi design, metallic chip visible, "LEVEL 5 ACCESS" text in terminal green font, dark edges, 256x256, top-down view, dark sci-fi aesthetic --v 6.0
```

## Enlace de datos (data_link)

**Archivo:** `assets/images/items/data_link.png`

```
Isolated object on transparent background, a USB-like data drive with glowing blue LEDs, sci-fi design, metallic body with cable connector, digital display showing data transfer, terminal green accent, 256x256, top-down view, dark sci-fi aesthetic --v 6.0
```

## Fusible térmico (thermal_fuse)

**Archivo:** `assets/images/items/thermal_fuse.png`

```
Isolated object on transparent background, a heat-resistant fuse with orange glow, sci-fi design, ceramic body with metal contacts, heat distortion visible around it, warning symbols, 256x256, top-down view, dark sci-fi aesthetic --v 6.0
```

## DEV_LOG.aes (easter egg)

**Archivo:** `assets/images/items/dev_log_aes.png`

```
Isolated object on transparent background, a corrupted data file icon, glitching digital effect, red and green color distortion, question mark symbol in the center, terminal text fragments floating around, 256x256, top-down view, dark sci-fi aesthetic --v 6.0
```

---

# Puertas Adicionales

Las 5 puertas existentes ya están en `assets/images/3d/`. Estas son adicionales:

## Puerta con escáner retinal (armory → neural_link)

**Archivo:** `assets/images/3d/retinal_scanner.png`

```
Sci-fi door with red circular retinal scanner, dark metal frame, warning lights, underground facility style, the scanner glows red, heavy industrial design, front view, no background --v 6.0
```

## Puerta Bio-Hazard (life_support)

**Archivo:** `assets/images/3d/biohazard_gate.png`

```
Sci-fi heavy metal gate with yellow biohazard symbol, dark industrial design, warning stripes, underground facility style, the symbol glows yellow-green, front view, no background --v 6.0
```

---

# Assets de Interfaz (UI)

## Fondo de grid mejorado

**Archivo:** `assets/images/ui/grid_background.png`

```
Seamless tileable texture, dark green perspective grid floor receding into darkness, retro sci-fi computer graphics style, faint horizontal lines, vanishing point at center, very dark background, 1024x1024, top view --v 6.0
```

## Overlay de peligro (cordura < 30)

**Archivo:** `assets/images/ui/danger_overlay.png`

```
Seamless tileable texture, red vignette border effect, dark red gradient from edges to transparent center, subtle film grain, horror atmosphere, PNG with transparency, 1024x1024 --v 6.0
```

## Overlay de cordura crítica (cordura < 15)

**Archivo:** `assets/images/ui/critical_overlay.png`

```
Seamless tileable texture, intense red pulsing vignette, heartbeat pattern visible in the red glow, dark noise texture, extreme horror atmosphere, PNG with transparency, 1024x1024 --v 6.0
```

## Icono de la IA/entidad (para el mapa)

**Archivo:** `assets/images/ui/entity_icon.png`

```
Small icon, red glowing eye with digital glitch effect, dark background, minimalist design, the eye has a camera lens quality, 64x64, flat design --v 6.0
```

## Splash screen mejorado

**Archivo:** `assets/images/ui/splash_screen.png`

```
Mobile splash screen, dark background with "S.A.N.I.T.Y." in large terminal green font with glitch effect, subtitle "PSYCHOLOGICAL HORROR" in smaller red font, a faint silhouette of an underground facility in the background, CRT scanline overlay, 1080x1920 portrait --v 6.0
```

---

# Assets Promocionales

## Icono de la app

**Archivo:** `assets/images/promo/app_icon.png`

```
App icon design, dark background with a stylized brain made of circuit board traces in terminal green, a red warning eye in the center, glitch effect on the edges, minimalist but striking, sci-fi horror aesthetic, centered composition, no text --v 6.0
```

## Screenshot 1 - Pantalla de juego

**Archivo:** `assets/images/promo/screenshot_game.png`

```
Mobile game screenshot, dark terminal interface with green text on black background, CRT scanline overlay effect, a room description about waking up on a metal gurney with red lights, directional buttons at the bottom (N/S/E/O), sanity bar at the top showing green, map button, atmospheric horror game UI, 1080x1920 portrait --v 6.0
```

## Screenshot 2 - Momento de terror

**Archivo:** `assets/images/promo/screenshot_horror.png`

```
Mobile game screenshot, dark terminal interface, the text describes the AI appearing, red warning effects on screen, glitch visual effects, sanity bar showing critical red level, the words "ENTITY DETECTED" in red, CRT distortion, atmospheric horror game UI, 1080x1920 portrait --v 6.0
```

## Screenshot 3 - Mapa

**Archivo:** `assets/images/promo/screenshot_map.png`

```
Mobile game screenshot, an interactive map overlay showing a dungeon-like layout of rooms connected by corridors, current room highlighted in green, AI position shown as red pulsing dot, item locations marked with yellow diamonds, locked rooms with padlock icons, dark sci-fi UI, 1080x1920 portrait --v 6.0
```

## Banner promocional horizontal

**Archivo:** `assets/images/promo/banner_horizontal.png`

```
Horizontal promotional banner, dark sci-fi horror game atmosphere, terminal green text reading "S.A.N.I.T.Y." with glitch effect, a silhouette of a person in an underground facility, red emergency lights, CRT scanline overlay, "PSYCHOLOGICAL HORROR" subtitle, 1920x600 --v 6.0
```

## Thumbnail para trailer/video

**Archivo:** `assets/images/promo/video_thumbnail.png`

```
Video thumbnail, dark terminal screen with green text, a red entity silhouette emerging from the darkness, glitch effect, "S.A.N.I.T.Y." title in terminal font, "CAN YOU SURVIVE?" subtitle, high contrast, eye-catching, 1280x720 --v 6.0
```

---

## Resumen de Assets por Generar

| Categoría | Cantidad | Directorio |
|-----------|----------|------------|
| Habitaciones normales | 18 | `assets/images/rooms/` |
| Variantes de baja cordura | 5 | `assets/images/rooms/` |
| Texturas 3D | 4 | `assets/images/textures/` |
| Items sprites | 5 | `assets/images/items/` |
| Puertas adicionales | 2 | `assets/images/3d/` |
| UI assets | 5 | `assets/images/ui/` |
| Promocionales | 6 | `assets/images/promo/` |
| **Total** | **45** | |
