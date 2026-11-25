# Guía de Builds para S.A.N.I.T.Y.

## 📋 Requisitos previos

### Cuentas de desarrollador

| Plataforma | Costo | Link |
|------------|-------|------|
| **Google Play** | $25 (único) | [developer.android.com/register](https://developer.android.com/register) |
| **App Store** | $99/año | [developer.apple.com/programs/](https://developer.apple.com/programs/) |

### Software necesario

```bash
# Node.js 18+ (ya instalado)
node --version

# EAS CLI (ya instalado)
eas --version

# Cuenta Expo (ya configurada)
eas whoami
```

### Certificados

**Android:** EAS Build genera automáticamente los certificados de firma. Solo necesitas:
- Cuenta de Google Play Developer
- `eas build:android` genera el `.aab` firmado automáticamente

**iOS:** Necesitas:
- Apple Developer Account ($99/año)
- Mac con Xcode (para builds locales) O usar EAS Build en la nube
- Certificados de distribución configurados en EAS

---

## 🚀 Builds rápidos

### Build web para itch.io

```bash
npm run build:itch
```

Esto genera `itchio-build.zip` con `index.html` en la raíz. El build conserva la ruta relativa de los recursos y normaliza la ruta inicial que itch.io asigna al iframe para que Expo Router abra el menú en lugar de mostrar `Unmatched Route`. Sube el ZIP como juego HTML5 y selecciona que se ejecute en el navegador.

### Build de Android (Google Play)

```bash
cd /Users/neryad/dev/instalation

# Build en la nube con EAS (recomendado)
eas build --platform android --profile production
```

Esto genera un archivo `.aab` (Android App Bundle) listo para Google Play.

**Para probar antes de subir:**
```bash
# Build APK para instalar directamente en el teléfono
eas build --platform android --profile production-preview
```

### Build de iOS (App Store)

```bash
cd /Users/neryad/dev/instalation

# Build en la nube con EAS (recomendado)
eas build --platform ios --profile production
```

Esto genera un archivo `.ipa` listo para App Store Connect.

**Para probar en simulator:**
```bash
eas build --platform ios --profile production-preview
```

---

## 📱 Subir a las tiendas

### Google Play

1. **Después del build exitoso:**
```bash
# Subir automáticamente a Internal Testing
eas submit --platform android
```

2. **O subir manualmente:**
   - Ve a [play.google.com/console](https://play.google.com/console)
   - Crea una nueva app: "S.A.N.I.T.Y. — Psychological Horror"
   - Sube el `.aab` generado
   - Llena la información de la tienda (ver sección abajo)

3. **Track recomendado:** `Internal Testing` → `Closed Testing` → `Production`

### App Store

1. **Después del build exitoso:**
```bash
# Subir automáticamente a App Store Connect
eas submit --platform ios
```

2. **O subir manualmente:**
   - Ve a [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
   - Crea una nueva app: "S.A.N.I.T.Y."
   - Sube el `.ipa` generado
   - Llena la información de la tienda (ver sección abajo)

---

## 📝 Información de la tienda

### Google Play Console

**Título:** S.A.N.I.T.Y. — Psychological Horror

**Descripción corta:**
```
You wake up without memory. An AI watches you. Your sanity fades.
```

**Descripción completa:**
```
🧠 S.A.N.I.T.Y. — Psychological Horror

You wake up without memory in an underground installation. An AI watches you. Your sanity fades. Can you escape before it finds you?

S.A.N.I.T.Y. is a psychological horror narrative game where every decision affects your mental state. Explore 18 rooms, discover the truth behind the experiment, and choose your fate among 6 possible endings.

Features:
🧠 Sanity system — Your mental state changes descriptions, connections, and atmosphere
👁️ AI antagonist — It chases you, deceives you, and learns from your patterns
🗺️ 18 rooms — Each with secrets and story fragments
🎯 6 endings — Your salvation or your destruction
🌐 Bilingual — Spanish and English
📖 Deep narrative — Discover the truth about Project S.A.N.I.T.Y.

How to Play:
Use directional buttons (N/S/E/W) or type commands to navigate. Investigate rooms to discover lore. Find items to unlock new areas. Keep your sanity above zero.

Open source on GitHub.
```

**Categoría:** Juegos → Aventura

**Tags:** horror, psychological, narrative, text-adventure, indie, spanish, english

**Contenido para adultos:** Selecciona las opciones apropiadas para terror (violencia ficticia, sangre sugerida)

**Privacy Policy:** https://neryad.itch.io/sanity (o URL de tu política)

---

### App Store Connect

**Nombre:** S.A.N.I.T.Y.

**Subtítulo:** Psychological Horror

**Descripción:**
```
🧠 S.A.N.I.T.Y. — Psychological Horror

You wake up without memory in an underground installation. An AI watches you. Your sanity fades. Can you escape before it finds you?

S.A.N.I.T.Y. is a psychological horror narrative game where every decision affects your mental state. Explore 18 rooms, discover the truth behind the experiment, and choose your fate among 6 possible endings.

Features:
🧠 Sanity system — Your mental state changes descriptions, connections, and atmosphere
👁️ AI antagonist — It chases you, deceives you, and learns from your patterns
🗺️ 18 rooms — Each with secrets and story fragments
🎯 6 endings — Your salvation or your destruction
🌐 Bilingual — Spanish and English
📖 Deep narrative — Discover the truth about Project S.A.N.I.T.Y.

Open source on GitHub.
```

**Categoría:** Juegos → Aventura

**Clasificación de edad:** 12+ (terror/ficción)

**Keywords:** horror, psychological, narrative, text, adventure, indie, spanish, terror, ai, mystery

**Privacy Policy:** https://neryad.itch.io/sanity (o URL de tu política)

**Soporte URL:** https://github.com/neryad/sanity (o tu email)

---

## 🖼️ Assets requeridos para las tiendas

### Google Play

| Asset | Dimensiones | Archivo actual | Estado |
|-------|-------------|----------------|--------|
| Icono | 512x512 | `assets/images/icon.png` (1024x1024) | ✅ Expo lo redimensiona |
| Feature graphic | 1024x500 | `assets/images/promo/banner_horizontal.png` | ⚠️ Regenerar |
| Screenshots (phone) | 1080x1920 | `assets/images/promo/screenshot_*.png` | ⚠️ Regenerar |
| Screenshots (tablet) | 1600x2560 | — | ❌ Opcional |

### App Store

| Asset | Dimensiones | Archivo actual | Estado |
|-------|-------------|----------------|--------|
| App icon | 1024x1024 | `assets/images/icon.png` | ✅ Listo |
| Screenshots (iPhone) | 1170x2532 o 1290x2796 | `assets/images/promo/screenshot_*.png` | ⚠️ Regenerar |
| Screenshots (iPad) | 2048x2732 | — | ❌ No soporta tablet |

**Para regenerar los assets:** Usa los prompts en `docs/PROMO_PROMPTS.md`.

---

## 🔧 Solución de problemas

### Error: "No Apple Developer Account found"

```bash
# Configura tus credenciales de Apple
eas credentials

# O configura el API key de App Store Connect
# 1. Crea una API key en App Store Connect
# 2. Descarga el .p8 file
# 3. Configura en eas.json:
#    "ios": { "ascApikey": { "keyId": "...", "issuerId": "..." } }
```

### Error: "Keystore not found" (Android)

```bash
# EAS genera automáticamente el keystore
# Si necesitas un keystore específico:
eas build:android --keystore-path /ruta/a/tu/keystore.jks
```

### Error: "Build failed" en EAS

```bash
# Revisa los logs
eas build:list

# Intenta con más verbose
eas build --platform android --profile production --non-interactive --no-wait
```

### El juego no se ve bien en portrait

La orientación está configurada como `portrait` en `app.json`. Si necesitas landscape:
```json
"orientation": "default"
```

---

## 📊 Checklist antes de publicar

### General
- [ ] Versión en `app.json`: 1.3.0 ✅
- [ ] Versión en `package.json`: 1.3.0 ✅
- [ ] Icono 1024x1024 ✅
- [ ] Privacy Policy URL configurada
- [ ] Screenshots en las dimensiones correctas
- [ ] Descripción de la tienda escrita

### Android
- [ ] Cuenta Google Play Developer ($25)
- [ ] Build exitoso: `eas build --platform android --profile production`
- [ ] `.aab` subido a Internal Testing
- [ ] Testing en al menos 1 dispositivo real
- [ ] Clasificación de contenido completada

### iOS
- [ ] Apple Developer Account ($99/año)
- [ ] Certificados configurados en EAS
- [ ] Build exitoso: `eas build --platform ios --profile production`
- [ ] `.ipa` subido a App Store Connect
- [ ] Testing en al menos 1 dispositivo real
- [ ] Clasificación de contenido completada

---

## 💰 Costos resumidos

| Item | Costo |
|------|-------|
| Google Play Developer | $25 (único) |
| Apple Developer | $99/año |
| EAS Build (gratuito) | 25 builds/mes gratis |
| EAS Build (pago) | $0.07/minuto de build |
| **Total mínimo** | **$124** (primer año) |

---

## 🎯 Recomendación de lanzamiento

1. **Semana 1:** Publica en Google Play primero (más rápido, $25 único)
2. **Semana 2:** Publica en App Store (requiere más configuración, $99/año)
3. **Semana 3:** Comparte los links de las tiendas en Reddit, Twitter, WhatsApp
4. **Semana 4:** Revisa feedback y bugs, prepara actualización

**¿Por qué Google Play primero?**
- El proceso de revisión es más rápido (horas vs días)
- El costo es único ($25 vs $99/año)
- Puedes hacer Internal Testing gratis para validar antes de publicar
