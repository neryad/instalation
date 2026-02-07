# 📱 S.A.N.I.T.Y. (Systematic Analysis of Neural Integrity & Terminal Yield)

> Motor de juego narrativo de terror psicológico para móviles y web.

---

## 📖 Descripción General

**S.A.N.I.T.Y.** es una experiencia de terror inmersiva construida con **React Native** y **Expo**. El proyecto simula una terminal de comandos antigua conectada a una "Interfaz Neuronal", donde el jugador debe navegar por un complejo subterráneo infestado por una Inteligencia Artificial hostil.

A diferencia de las aventuras de texto tradicionales, S.A.N.I.T.Y. utiliza las capacidades del dispositivo móvil (vibración háptica, audio espacial, manipulación de pantalla) para romper la cuarta pared y generar tensión real.

---

## 🎯 Objetivo de la Aplicación

El objetivo principal es ofrecer una **plataforma de narrativa interactiva** donde el estado emocional y mental del jugador (representado por la variable "Cordura") altere directamente la mecánica del juego, la percepción del entorno y la interfaz de usuario.

---

## ✨ Funcionalidades Principales

*   **Terminal Interactiva:** Interfaz de línea de comandos (CLI) simulada con efectos CRT (Tube Ray Cathode) y glitches visuales.
*   **Sistema de Cordura (Sanity):** Mecánica central que afecta la legibilidad del texto, los sonidos y la estabilidad de la navegación.
*   **IA Stalker (Entidad):** Un antagonista dinámico que rastrea la posición del jugador y aumenta su "Conciencia" (Awareness) basada en el ruido generado por las acciones del usuario.
*   **Feedback Sensorial:** Uso intensivo de `expo-haptics` para simular latidos del corazón, impactos y errores del sistema.
*   **Audio Inmersivo:** Paisajes sonoros que evolucionan según el peligro y eventos de sonido posicional simulado.
*   **Finales Múltiples:** 6 desenlaces distintos basados en las decisiones, la cordura restante y los objetos recolectados.

---

## 🧱 Arquitectura y Enfoque Técnico

El proyecto sigue una arquitectura **Clean Architecture simplificada**, separando claramente la capa de presentación (UI) de la lógica de negocio (Engine).

### Tecnologías Clave:
*   **Framework:** React Native + Expo (SDK 50+)
*   **Navegación:** Expo Router (File-based routing)
*   **Lenguaje:** TypeScript (Strict Mode)
*   **Persistencia:** AsyncStorage (Logros y Ajustes)
*   **Audio/Haptics:** `expo-av`, `expo-haptics`

---

## 📁 Estructura de Carpetas

```text
/
├── app/                  # Rutas y Pantallas (Expo Router)
│   ├── game.tsx          # Pantalla principal del juego
│   ├── index.tsx         # Pantalla de título / Menú
│   └── ...               # Otros modales y pantallas
├── assets/               # Recursos estáticos (Fuentes, Imágenes, Sonidos)
├── components/           # Componentes UI Reutilizables
│   ├── game/             # Componentes específicos del juego (Terminal, HUD)
│   └── ...
├── engine/               # Lógica de Negocio (Puro TypeScript)
│   ├── engine.ts         # Orquestador de movimientos y acciones
│   ├── rooms.ts          # Datos y configuración de las habitaciones
│   └── ...
├── storage/              # Capa de Persistencia (AsyncStorage wrappers)
├── docs/                 # Documentación del proyecto
└── ...
```

---

## ⚙️ Requisitos Previos

*   **Node.js**: v18.0.0 o superior.
*   **npm** o **yarn**.
*   **Expo Go**: Instalado en tu dispositivo físico (Android/iOS) para pruebas rápidas.
*   **Simuladores**: Android Studio (Android) o Xcode (iOS/macOS) para desarrollo local.

---

## 🛠 Instalación

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/neryad/instalation.git
    cd instalation
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

---

## ▶️ Ejecución

### En Desarrollo

Para iniciar el servidor de desarrollo de Metro:

```bash
npx expo start
```

*   Presiona `a` para abrir en **Android Emulator**.
*   Presiona `i` para abrir en **iOS Simulator**.
*   Presiona `w` para abrir en **Web Browser**.
*   Escanea el código QR con la app **Expo Go** en tu dispositivo físico.

---

## 🧭 Flujo Principal de la App

1.  **Inicio (Splash & Menu):** El usuario es recibido por una pantalla de carga tipo BIOS y un menú principal con efectos glitch.
2.  **Introducción (`/intro`):** Secuencia narrativa que establece el contexto (Sujeto 00).
3.  **Bucle de Juego (`/game`):**
    *   El jugador introduce comandos (`norte`, `mirar`, `usar x`).
    *   El `Engine` procesa el comando y actualiza el estado (`PlayerState`).
    *   La UI se actualiza reflejando la nueva habitación, logs y efectos.
    *   Se verifican condiciones de victoria/derrota.
4.  **Final (`/FinalScreen`):** Se muestra el desenlace y se desbloquean logros.

---

## 🧩 Pantallas y Componentes Clave

### Pantallas (`app/`)
*   **`game.tsx`:** El corazón de la app. Gestiona el ciclo de vida del juego, los efectos de sonido y conecta la UI con el Engine.
*   **`SettingsScreen.tsx`:** Configuración de audio y accesibilidad.
*   **`ManualScreen.tsx`:** Guía de comandos para el jugador.

### Componentes (`components/game/`)
*   **`TerminalLog.tsx`:** Muestra el historial de acciones con un efecto de máquina de escribir.
*   **`CRTOverlay.tsx`:** Capa visual que simula las líneas de escaneo y curvatura de monitor antiguo. Interactúa con el nivel de "Glitch".
*   **`SanityBar.tsx`:** Visualización gráfica del estado mental del jugador.

---

## 🧠 Decisiones Técnicas Importantes

1.  **Motor Desacoplado:** La lógica del juego (`engine/`) es TypeScript puro, sin dependencias de React Native. Esto permite testear la lógica del juego de forma aislada e incluso portarla a otras plataformas (Web CLI, Discord Bot) en el futuro.
2.  **Estado Inmutable:** Las funciones del motor (`move`, `investigate`) reciben un estado y devuelven un *nuevo* estado, siguiendo principios de programación funcional para evitar efectos secundarios impredecibles.
3.  **Expo Router:** Se eligió para facilitar el manejo de navegación profunda y enlaces, preparando el terreno para una versión web robusta.

---

## ⚠️ Limitaciones Conocidas

*   **Persistencia de Partida:** Actualmente el juego no guarda el progreso a mitad de una partida (run). Si cierras la app, empiezas de cero. (Design Choice: Roguelike feel).
*   **Audio en Background:** El audio puede detenerse si la app pasa a segundo plano en algunos dispositivos Android agresivos con la batería.

---

## 🚀 Posibles Mejoras Futuras

*   [ ] **Generación Procedural:** Crear mapas aleatorios para aumentar la rejugabilidad.
*   [ ] **Sistema de Guardado:** Implementar "Puntos de Control" consumibles.
*   [ ] **Modo Hardcore:** Muerte permanente real (borrado de logros).
*   [ ] **Traducción:** Soporte completo i18n (Inglés/Español ya iniciado).

---

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor, abre un *Issue* para discutir cambios mayores antes de enviar un *Pull Request*.

1.  Haz un Fork del proyecto.
2.  Crea tu rama de funcionalidad (`git checkout -b feature/AmazingFeature`).
3.  Commit a tus cambios (`git commit -m 'Add some AmazingFeature'`).
4.  Push a la rama (`git push origin feature/AmazingFeature`).
5.  Abre un Pull Request.
