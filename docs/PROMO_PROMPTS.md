# Prompts para Assets Promocionales — Dimensiones Correctas

Prompts actualizados para regenerar los assets promocionales en las dimensiones ideales para tiendas y redes sociales.

---

## 📐 Dimensiones Requeridas

| Asset | Dimensión ideal | Formato | Uso |
|-------|----------------|---------|-----|
| App Icon | 1024x1024 | PNG | itch.io, App Store, Google Play |
| Screenshot 1 | 1080x1920 | PNG/JPG | itch.io, tiendas de apps |
| Screenshot 2 | 1080x1920 | PNG/JPG | itch.io, tiendas de apps |
| Screenshot 3 | 1080x1920 | PNG/JPG | itch.io, tiendas de apps |
| Banner horizontal | 1920x600 | PNG/JPG | itch.io, Twitter header |
| Video thumbnail | 1280x720 | PNG/JPG | YouTube, video promo |

---

## 🎨 Estilo Visual Unificado

- **Paleta:** Verde terminal (#00ff00), rojo alerta (#ff3300), azul servidor (#0066ff), negro profundo (#050805)
- **Estilo:** Dark sci-fi, instalaciones subterráneas, iluminación tenue, atmósfera claustrofóbica
- **Formato:** PNG con transparencia donde aplique

---

## 📱 Screenshots Verticales (1080x1920)

Los screenshots actuales son horizontales (16:9). Estos prompts los regeneran en formato vertical (9:16) para llenar la pantalla del teléfono.

### Screenshot 1 — Pantalla de juego

```
Mobile game screenshot, dark terminal interface with green text on black background, CRT scanline overlay effect, a room description about waking up on a metal gurney with red lights, directional buttons at the bottom (N/S/E/O), sanity bar at the top showing green, map button, atmospheric horror game UI, 1080x1920 portrait --ar 9:16 --v 6.0
```

### Screenshot 2 — Momento de terror

```
Mobile game screenshot, dark terminal interface, the text describes the AI appearing, red warning effects on screen, glitch visual effects, sanity bar showing critical red level, the words "ENTITY DETECTED" in red, CRT distortion, atmospheric horror game UI, 1080x1920 portrait --ar 9:16 --v 6.0
```

### Screenshot 3 — Mapa

```
Mobile game screenshot, an interactive map overlay showing a dungeon-like layout of rooms connected by corridors, current room highlighted in green, AI position shown as red pulsing dot, item locations marked with yellow diamonds, locked rooms with padlock icons, dark sci-fi UI, 1080x1920 portrait --ar 9:16 --v 6.0
```

---

## 🖼️ Banner Horizontal (1920x600)

El banner actual es 16:9. Este prompt lo regenera en formato 3:1 ideal para itch.io y Twitter header.

```
Horizontal promotional banner, dark sci-fi horror game atmosphere, terminal green text reading "S.A.N.I.T.Y." with glitch effect, a silhouette of a person in an underground facility, red emergency lights, CRT scanline overlay, "PSYCHOLOGICAL HORROR" subtitle, 1920x600 --ar 3:1 --v 6.0
```

---

## 🎬 Video Thumbnail (1280x720)

```
Video thumbnail, dark terminal screen with green text, a red entity silhouette emerging from the darkness, glitch effect, "S.A.N.I.T.Y." title in terminal font, "CAN YOU SURVIVE?" subtitle, high contrast, eye-catching, 1280x720 --ar 16:9 --v 6.0
```

---

## 📱 App Icon (1024x1024)

El icono actual ya tiene las dimensiones correctas. Este prompt es por si necesitas regenerarlo.

```
App icon design, dark background with a stylized brain made of circuit board traces in terminal green, a red warning eye in the center, glitch effect on the edges, minimalist but striking, sci-fi horror aesthetic, centered composition, no text, 1024x1024 --v 6.0
```

---

## 📋 Instrucciones de Generación

### Con Midjourney v6 (Recomendado)

1. Ve a [midjourney.com](https://midjourney.com) o usa Discord
2. Copia cada prompt y pégalo en el chat
3. Espera ~30 segundos a que genere 4 variantes
4. Elige la mejor y descárgala
5. Guarda con el nombre correcto en `assets/images/promo/`

### Con DALL-E 3 (Gratis)

1. Ve a [bing.com/create](https://www.bing.com/create) (gratis) o [chat.openai.com](https://chat.openai.com)
2. Copia cada prompt y pégalo
3. Espera a que genere la imagen
4. Descarga y guarda con el nombre correcto

### Con Gemini (Imagen 3)

1. Ve a [gemini.google.com](https://gemini.google.com)
2. Copia cada prompt y pégalo
3. Espera a que genere la imagen
4. Descarga y guarda con el nombre correcto

---

## 📁 Nombres de Archivos

Guarda cada imagen con estos nombres exactos en `assets/images/promo/`:

| Prompt | Nombre del archivo |
|--------|-------------------|
| Screenshot 1 — Pantalla de juego | `screenshot_game.png` |
| Screenshot 2 — Momento de terror | `screenshot_horror.png` |
| Screenshot 3 — Mapa | `screenshot_map.png` |
| Banner horizontal | `banner_horizontal.png` |
| Video thumbnail | `video_thumbnail.png` |
| App icon | `app_icon.png` |

---

## ✅ Verificación

Después de generar las imágenes, verifica las dimensiones:

```bash
# En la terminal
sips -g pixelHeight -g pixelWidth assets/images/promo/*.png
```

Las dimensiones esperadas:
- `app_icon.png`: 1024x1024
- `screenshot_*.png`: 1080x1920
- `banner_horizontal.png`: 1920x600
- `video_thumbnail.png`: 1280x720

Si las dimensiones no coinciden, ajusta la imagen con una herramienta como [Photopea](https://photopea.com) (gratis online) o GIMP.
