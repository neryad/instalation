# Diseño: interfaz web responsive

## Intención

Hacer que el menú y la partida se sientan cómodos en laptops y en el iframe de itch.io, evitando que el menú ocupe una columna alta y que el registro parezca relegado. La interfaz nativa móvil debe conservar su composición actual.

## Enfoques considerados

- **A · Rejilla 2×2:** compacta las acciones, pero mantiene un bloque visual más alto.
- **B · Barra horizontal (elegido):** centra título y contexto, y coloca los cuatro accesos en una fila debajo; ocupa menos altura y conserva la jerarquía del menú.
- **C · Barra lateral:** libera el centro, pero añade navegación lateral y no reduce la altura del contenido principal.

## Diseño

- En web amplia, agrupar título, subtítulo y advertencias en el centro; presentar iniciar, archivos, ajustes y sistema como una barra horizontal compacta. Adaptar el espaciado/tamaño a etiquetas largas y usar una distribución de reserva en ventanas web estrechas para evitar desbordamiento.
- En partida web, mantener el HUD arriba; situar el panel narrativo inmediatamente debajo, alineado desde arriba y con la mayor parte del ancho. Mantener la ilustración a la derecha y los controles en una franja inferior compacta. Conservar el desplazamiento automático al mensaje más reciente.
- Mantener intactos el menú y la composición vertical de la aplicación nativa. No cambiar navegación, textos, mecánicas ni estética CRT.

## Implementación y validación

Usar estilos de React Native existentes y aplicar las variantes solo a web. Validar export web en tamaños de laptop y ventana estrecha, comprobar que no haya desbordamiento y confirmar visualmente que la versión móvil sigue vertical.