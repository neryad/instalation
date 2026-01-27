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
* **Terminal de Texto Dinámica:** Sistema de logs optimizado (límite de 50 registros) con efecto de escritura gradual y cursor parpadeante.
* **Responsive Design:** Layouts centrados y `maxWidth` para una experiencia fluida en cualquier dispositivo.
* **Mastery Feedback:** Tinte rojo dinámico (Peligro) y latido háptico (Pánico) para inmersión sensorial máxima.
* **Personalización (Ajustes):** Control total sobre efectos de Glitch, Filtro CRT y Audio.

---

## 🛠️ Stack Tecnológico
* **Framework:** React Native + Expo (SDK 50+)
* **Persistence:** AsyncStorage para logros y ajustes.
* **Audio & Haptics:** Pack de 7 audios IA y feedback táctil rítmico.
* **Lenguaje:** TypeScript (Tipado estricto)

## 📂 Estructura del Proyecto
```text
├── app/               # Pantallas (Index, Intro, Game, Manual, Achievements, Settings)
├── engine/            # Lógica central (Acciones, Entidad, Habitaciones)
├── storage/           # Persistencia de datos local
├── assets/            # Audios IA, Iconografía y Fuentes
└── README.md          # Documentación técnica
```

## ⌨️ Protocolos de Acción

| Acción                           | Impacto en el Juego                    | Inmersión Sensorial                    |
| :------------------------------- | :------------------------------------- | :------------------------------------- |
| `MOVIMIENTO (N, S, E, W)`        | Gasta -2% de Cordura.                  | Audio Hidráulico                       |
| `INVESTIGAR`                     | Revela ítems o alerta a la IA.         | Feedback de Terminal                   |
| `FORZAR PUERTA`                  | Atajo táctico por Cordura.             | Audio de Crujido Metálico              |
| `USAR SEDANTE`                   | Restaura Sanity y reduce Awareness.    | Audio Inyector Neumático               |

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

- [x] IA Predictiva con aprendizaje de patrones.
- [x] Sistema de Finales Múltiples (6 rutas).
- [x] Diseño Centrado Responsivo (PC/Tablets).
- [x] Atmósferas Sonora de Finales y Acciones (7 IA SFX).
- [x] **Pulido de Maestría:** Feedback sensorial de peligro y optimización de memoria. [LOGRADO]
- [ ] Generación procedimental de salas basada en el nivel de cordura.

---

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/M4M31DTPAL)

Desarrollado por [neryad](https://github.com/neryad) como un experimento de narrativa técnica y desarrollo multiplataforma.
