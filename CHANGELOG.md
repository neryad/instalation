# Changelog

## [1.1.0] — 2026-06-10

### Added
- 🗺️ **Mapa interactivo**: Modal con grid de habitaciones visitadas, items disponibles, conexiones bloqueadas, ubicación de la IA y trail de últimas salas
- 🏆 **Sistema de logros**: Desbloquea ending `secret_log` al leer DEV_LOG.aes; notificación toast en pantalla
- 🔊 **Paisaje sonoro completo**: Música ambiental looping, SFX de movimiento, sedante, IA, puerta forzada y beep de terminal
- 🌫️ **Atmósfera reactiva**: Efectos visuales (CRTOverlay con glitch, pulsos rojos) y de sonido (volumen/ritmo) que evolucionan con cordura y awareness de la IA
- 📜 **Tutorial**: 3 mensajes guiados al iniciar partida (movimiento, investigar, cordura), con persistencia en save state
- 📄 **Pantalla de final**: Animaciones, colores dinámicos por tipo de ending
- 🔗 **Direcciones cliqueables**: Textos con `norte/sur/este/oeste` son tocables en el TerminalLog
- 💡 **Pistas en items**: Cada item obtenido muestra una pista de uso
- 🎬 **Pantalla de introducción**: Skip al tocar la pantalla
- 🧪 **DEV_LOG.aes**: Easter egg en data_terminal con metahistoria
- 🔄 **Transiciones**: Animación fade entre pantallas
- 🎯 **Estados atmosféricos**: Archivo HTML con variantes de descripción según cordura
- 📱 **Opciones de layout**: Configuraciones de botones con recomendaciones

### Changed
- 🧠 **Sedante**: Ahora también reduce el rastro de la IA (-40 awareness) además de recuperar cordura
- ⚡ **Typewriter**: Textos >80 chars se muestran instantáneamente sin animación
- 🗃️ **Data terminal**: Nueva conexión a data_morgue (crea loop), requiere data_link
- 🔀 **Conexiones de salas**: Varios loops y atajos añadidos; eliminada observation_ward
- ⬇️ **Cordura**: Se reduce 2pts por movimiento (consistente)
- 🔄 **Eventos mentales**: room_memory gateado por cordura (2% si ≥70, 20% si <70)
- 🎯 **Eventos de items**: Ahora referencian el último item obtenido, no el primero
- 📏 **minSanityToExist → maxSanityToExist**: Nombre consistente con unstableConnections
- 🔮 **Predicción de IA**: Detecta patrón circular (N-E-S → O) además de ida-vuelta y repetitivo

### Fixed
- 🐛 **forceDoor**: Mensaje "CRACK" ya no se pierde cuando la IA interviene (se mergea)
- 🐛 **iOS franjas blancas**: Eliminadas stripes superior/inferior causadas por fondo blanco del Stack navigator
- 🐛 **IA sentinel "void"**: Cambiado a `undefined` para evitar crashes si algún código hace `rooms["void"]`
- 🐛 **getRoomDescription**: Ahora elige la variante de cordura más severa, no la última en el array
- 🐛 **Stale closure**: handleCommand usa refs para evitar estado desactualizado
- 🧹 **Código muerto**: Eliminadas ~440 líneas de versiones antiguas de salas en rooms.ts
- 🧹 **applySanity**: Eliminada función nunca utilizada
- 🧹 **Comentarios muertos**: Limpiados estilos y lógica comentada en game.tsx y sanity.ts

### Known Issues
- Al forzar una puerta, el feedback de "CRACK" y el evento de IA se muestran en el mismo mensaje separados por salto de línea (por diseño)

## [1.0.0] — 2026-05

### Added
- Motor de juego base con navegación por habitaciones
- Sistema de cordura con variantes de descripción
- Entidad IA con predicción de movimientos y eventos de acecho
- 5 finales: apagado, fusión, escape, capturado, locura
- Inventario con items: keycard_red, data_link, thermal_fuse, sedative
- Sistema de puertas bloqueadas (lockedBy/unbreakable)
- Conexiones inestables que se activan con cordura baja
- Persistencia de partida (AsyncStorage)
- Pantalla de configuración con ajustes de sonido y CRT
- Pantalla de logros
- Pantalla de manual de operaciones
- Pantalla About
- Documentación completa en /docs
