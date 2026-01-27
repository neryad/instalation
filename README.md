````
        _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _
      |                                                                 |
      |   ███████╗ █████╗ ███╗   ██╗██╗████████╗██╗   ██╗               |
      |   ██╔════╝██╔══██╗████╗  ██║██║╚══██╔══╝╚██╗ ██╔╝               |
      |   ███████╗███████║██╔██╗ ██║██║   ██║    ╚████╔╝                |
      |   ╚════██║██╔══██║██║╚██╗██║██║   ██║     ╚██╔╝                 |
      |   ███████║██║  ██║██║ ╚████║██║   ██║      ██║                  |
      |   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝      ╚═╝                  |
      |                                                                 |
      |   > PROTOCOLO DE CORDURA ACTIVADO...                            |
      |   > INTERFAZ NEURONAL ESTABLECIDA...                            |
      |_  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _ |

**S A N I T Y** es un motor de juego narrativo de terror psicológico construido con **React Native** y **Expo**. El proyecto explora cómo la lógica de estado y la "cordura" del jugador pueden manipular directamente el sistema de navegación y la percepción del entorno.

## 🕹️ Demo en Vivo
**Juega ahora:** [https://sanity-demo.netlify.app/](https://sanity-demo.netlify.app/)

---

## ⚙️ Arquitectura Técnica

El proyecto se basa en una separación clara entre la interfaz de usuario y la lógica de simulación:

### 1. Game Engine (`/engine`)
El núcleo del juego gestiona:
* **Manejo de Comandos:** Un sistema de procesamiento de lenguaje natural simplificado que traduce entradas de texto en acciones de juego o botones contextuales inteligentes.
* **Sistema de Cordura (Sanity):** Una variable de estado global que actúa como multiplicador de dificultad. A menor cordura, el motor altera las descripciones de las salas y activa eventos de "corrupción".
* **Entidad Predictiva (IA):** Lógica que rastrea el historial de movimientos del jugador. El motor penaliza patrones repetitivos, simulando una inteligencia que acecha y bloquea al usuario.
* **Sistema de 6 Finales:** Los desenlaces dependen de decisiones activas en el núcleo y del estado mental acumulado.

### 2. UI & Experience (`/app` & `/components`)
* **Terminal de Texto Dinámica:** Un sistema de logs que renderiza el progreso de la historia con efectos de glitch.
* **Responsive Design:** Optimizado con layouts centrados y `maxWidth` para una experiencia perfecta en móviles, tablets y PC.
* **Galería de Archivos (Logros):** Sistema de persistencia para coleccionar los distintos finales alcanzados.
* **Manual Interactivo:** Pantalla de protocolos de misión integrada en la interfaz.
* **Personalización (Ajustes):** Control total sobre efectos de Glitch, Filtro CRT y Audio para accesibilidad y confort. [NUEVO]

---

## 🛠️ Stack Tecnológico
* **Framework:** React Native + Expo (SDK 50+)
* **Persistence:** @react-native-async-storage/async-storage para guardado local (Web/Native).
* **Audio & Haptics:** Expo-AV y Expo-Haptics. Incluye 7 efectos de sonido generados por IA para acciones tácticas y atmósferas de final. [NUEVO]
* **Lenguaje:** TypeScript (Tipado estricto para la definición de salas e ítems)

## 📂 Estructura del Proyecto
```text
├── app/               # Pantallas (Index, Intro, Game, Manual, Achievements, Settings)
├── engine/            # Lógica central (Engine, Rooms, Entity Logic)
├── storage/           # Manejo de persistencia de logros y ajustes
├── assets/            # Audios (IA SFX) y fuentes retro
└── README.md          # Documentación técnica
```

## ⌨️ Protocolos de Acción

El sistema utiliza una interfaz de botones contextuales que aparecen según la situación del jugador:

| Acción                           | Impacto en el Juego                    | Audio IA Asociado                      |
| :------------------------------- | :------------------------------------- | :------------------------------------- |
| `MOVIMIENTO (N, S, E, W)`        | Gasta -2% de Cordura.                  | Puerta Hidráulica Pesada               |
| `INVESTIGAR`                     | Revela ítems o genera ruido (IA).      | Feedback de Terminal                   |
| `FORZAR PUERTA`                  | Atajo táctico a cambio de Cordura.     | Crujido de Metal Forzado               |
| `USAR SEDANTE`                   | Recupera estabilidad y reduce ruido.   | Inyector Neumático Médico              |

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/M4M31DTPAL)

## 🚀 Instalación y Uso Local

1.  **Clonar el repo:**
    ```bash
    git clone https://github.com/neryad/instalation.git
    cd instalation
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Iniciar Expo:**
    ```bash
    npx expo start
    ```

---

## 🧬 Hoja de Ruta (Roadmap)

- [x] Motor de movimiento base.
- [x] IA Predictiva con aprendizaje de patrones.
- [x] Capa de Inmersión: Sonido y Vibración.
- [x] Sistema de Finales Múltiples (6 rutas).
- [x] Persistencia de Logros y Ajustes (Web/Móvil).
- [x] Diseño Centrado Responsivo (PC/Tablets).
- [x] Atmósferas Sonora de Finales y Acciones (7 IA SFX). [LOGRADO]
- [ ] Generación procedimental de salas basada en el nivel de cordura.

---

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/M4M31DTPAL)

Desarrollado por [neryad](https://github.com/neryad) como un experimento de narrativa técnica y desarrollo multiplataforma.
