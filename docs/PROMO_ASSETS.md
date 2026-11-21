# Assets Promocionales — S.A.N.I.T.Y.

## Ubicación

Todos los assets están en `assets/images/promo/`.

## Inventario de assets

| Archivo | Dimensiones actuales | Dimensiones ideales | Estado |
|---------|---------------------|---------------------|--------|
| `app_icon.png` | 1024x1024 | 1024x1024 | ✅ Correcto |
| `screenshot_game.png` | 1584x672 (horizontal) | 1080x1920 (vertical) | ⚠️ Formato incorrecto |
| `screenshot_horror.png` | 1376x768 (horizontal) | 1080x1920 (vertical) | ⚠️ Formato incorrecto |
| `screenshot_map.png` | 768x1376 (vertical) | 1080x1920 (vertical) | ✅ Vertical, pero resolución baja |
| `banner_horizontal.png` | 768x1376 (vertical) | 1920x600 (horizontal) | ⚠️ Formato incorrecto |
| `video_thumbnail.png` | 768x1376 (vertical) | 1280x720 (horizontal) | ⚠️ Formato incorrecto |

## Problema detectado

La mayoría de las imágenes promocionales fueron generadas en formato horizontal (16:9) en lugar de las dimensiones ideales para cada plataforma. Solo el icono de la app tiene las dimensiones correctas.

## Cómo corregir

Regenera estos assets con las dimensiones correctas usando los prompts de `docs/ASSET_PROMPTS.md` sección "Assets Promocionales". Los prompts ya incluyen las dimensiones ideales, pero al generar con IA, asegúrate de especificar la relación de aspecto correcta:

- **Screenshots**: `--ar 9:16` (vertical, para teléfono)
- **Banner**: `--ar 3:1` (horizontal ancho)
- **Thumbnail**: `--ar 16:9` (horizontal estándar)

## Instrucciones para subir a tiendas

### App Store (iOS)

1. Ve a [App Store Connect](https://appstoreconnect.apple.com)
2. En tu app, ve a "Pantallas de la App"
3. Sube los screenshots verticales (1080x1920 o mayor)
4. Necesitas screenshots para iPhone 6.7" y 5.5" mínimo
5. El icono debe ser 1024x1024 PNG sin transparencia

### Google Play (Android)

1. Ve a [Google Play Console](https://play.google.com/console)
2. En "Gráficos" > "Capturas de pantalla"
3. Sube al menos 2 screenshots verticales (1080x1920 recomendado)
4. Icono adaptable: 1024x1024 PNG con fondo transparente
5. Icono tradicional: 512x512 PNG

### itch.io

1. Ve a tu proyecto en itch.io
2. En "Game" > "Cover image": sube `banner_horizontal.png` (regenerado en 1920x600)
3. En "Game" > "Screenshots": sube los 3 screenshots
4. En "Game" > "Thumbnail": sube `video_thumbnail.png` (regenerado en 1280x720)

### Redes sociales

- **Twitter/X**: Banner 1500x500, posts con screenshots verticales
- **TikTok/Reels/Shorts**: Usa `video_thumbnail.png` como portada del video
- **Discord**: Banner 960x540, icono 512x512

## Notas

- Los archivos `.png` en `promo/` son en realidad JPEG (la IA los generó como JPEG con extensión .png). Para las tiendas, conviértelos a PNG real si es necesario.
- El archivo `sanity_promo_assets.zip` contiene los originales descargados de la IA. Puedes eliminarlo del repositorio si lo deseas.
