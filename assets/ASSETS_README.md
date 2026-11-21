# Assets Visuales - S.A.N.I.T.Y.

Este directorio contiene los assets visuales del juego. Los subdirectorios organizan los diferentes tipos de assets.

## Estructura

```
assets/images/
├── rooms/       # Ilustraciones de las 18 habitaciones del juego
├── textures/    # Texturas tileables para el motor 3D (raycaster)
├── items/       # Sprites de items coleccionables (256x256 PNG)
├── ui/          # Assets de interfaz de usuario
├── promo/       # Assets promocionales (iconos, screenshots, banners)
└── 3d/          # Puertas 3D existentes
```

## Generando Assets con IA

Los prompts para generar todos los assets están documentados en `docs/ASSET_PROMPTS.md`.

### Herramientas recomendadas

- **Midjourney v6**: Mejor calidad fotorealista, usa `--ar 16:9 --v 6.0`
- **DALL-E 3**: Buen seguimiento de instrucciones, sin necesidad de parámetros especiales
- **Stable Diffusion XL**: Control total con LoRA, requiere configuración local

### Pasos para generar

1. Abre `docs/ASSET_PROMPTS.md` y encuentra la sección del asset que necesitas generar
2. Copia el prompt completo (incluyendo el estilo base si aplica)
3. Pega el prompt en tu herramienta de IA preferida
4. Genera la imagen y guárdala en el directorio correspondiente con el nombre especificado
5. Verifica que la imagen mantenga coherencia visual con los demás assets

### Estilo Visual Unificado

- **Paleta de colores**:
  - Verde terminal: `#00ff00`
  - Rojo alerta: `#ff3300`
  - Azul servidor: `#0066ff`
  - Negro profundo: `#050805`

- **Estilo**: Dark sci-fi, instalaciones subterráneas, iluminación tenue, atmósfera claustrofóbica

- **Resoluciones**:
  - Ilustraciones de salas: 1080x1080 PNG
  - Texturas tileables: 256x256 PNG
  - Items sprites: 256x256 PNG con transparencia
  - UI overlays: 1024x1024 PNG con transparencia
  - Promocionales: según especificación individual

### Notas importantes

- Para las salas con variantes de cordura (awakening, data_morgue, incinerator, dead_hydroponics, neural_link), genera dos versiones: una normal y una con sufijo `_insane`
- Las texturas deben ser tileables (seamless) para que no se vean bordes al repetirse en el motor 3D
- Los items deben tener fondo transparente (PNG con canal alpha)
- Mantén el mismo seed o estilo base en todas las generaciones para coherencia visual
