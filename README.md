````
# S A N I T Y 👁️💻

**S A N I T Y** es un motor de juego narrativo de terror psicológico construido con **React Native** y **Expo**. El proyecto explora cómo la lógica de estado y la "cordura" del jugador pueden manipular directamente el sistema de navegación y la percepción del entorno.

## 🕹️ Demo en Vivo
**Juega ahora:** [https://sanity-demo.netlify.app/](https://sanity-demo.netlify.app/)

---

## ⚙️ Arquitectura Técnica

El proyecto se basa en una separación clara entre la interfaz de usuario y la lógica de simulación:

### 1. Game Engine (`/engine`)
El núcleo del juego gestiona:
* **Manejo de Comandos:** Un sistema de procesamiento de lenguaje natural simplificado que traduce entradas de texto en acciones de juego (`north`, `south`, `east`, `west`, `grab`, `use`).
* **Sistema de Cordura (Sanity):** Una variable de estado global que actúa como multiplicador de dificultad. A menor cordura, el motor altera las descripciones de las salas y activa eventos de "corrupción".
* **Entidad Predictiva (IA):** Lógica que rastrea el historial de movimientos del jugador. El motor penaliza patrones repetitivos, simulando una inteligencia que acecha y bloquea al usuario.

### 2. UI & Experience (`/app` & `/components`)
* **Terminal de Texto Dinámica:** Un sistema de logs que renderiza el progreso de la historia con efectos de glitch.
* **Responsive Design:** Optimizado para funcionar tanto en dispositivos móviles (iOS/Android) como en navegadores web mediante **Expo Web**.

---

## 🛠️ Stack Tecnológico
* **Framework:** React Native + Expo (SDK 50+)
* **Lenguaje:** TypeScript (Tipado estricto para la definición de salas e ítems)
* **Navegación:** Expo Router utilizando **Hash Routing** para compatibilidad con hosting estático.
* **Deployment:** Automatizado en Netlify.

## 📂 Estructura del Proyecto
```text
├── app/               # Sistema de rutas (Index, Game, GameOver)
├── engine/            # Lógica central (GameEngine, Rooms, Items)
├── components/        # UI Reutilizable (Botones, Terminal, GlitchText)
├── hooks/             # Custom hooks para manejar el estado persistente
└── assets/            # Configuración visual y fuentes retro

````

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/M4M31DTPAL)

## 🚀 Instalación y Uso Local

1.  **Clonar el repo:**

    Bash

    ```
    git clone [https://github.com/neryad/instalation.git](https://github.com/neryad/instalation.git)
    cd instalation

    ```

2.  **Instalar dependencias:**

    Bash

    ```
    npm install

    ```

3.  **Iniciar Expo:**

    Bash

    ```
    npx expo start

    ```

4.  **Exportar para Web:**

    Bash

    ```
    npx expo export:web

    ```

---

## 🧬 Hoja de Ruta (Roadmap)

- [x] Motor de movimiento base.
- [x] Sistema de inventario y objetos clave (tarjeta de acceso).
- [x] IA Predictiva inicial.
- [ ] Generación procedimental de salas basada en el nivel de cordura.
- [ ] Efectos de sonido ambientales generativos.

---

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/M4M31DTPAL)

Desarrollado por [neryad](https://github.com/neryad) como un experimento de narrativa técnica y desarrollo multiplataforma.\
