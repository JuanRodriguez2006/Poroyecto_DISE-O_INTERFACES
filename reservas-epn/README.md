# Reservas EPN - React

Migración del proyecto original en HTML/CSS/JS a React (Vite + React Router).

## Cómo correrlo

1. Instala dependencias:
   ```
   npm install
   ```
2. Corre el servidor de desarrollo:
   ```
   npm run dev
   ```
3. Abre el link que te da la terminal (normalmente http://localhost:5173)

## Falta hacer (importante)

1. **Imágenes**: copia tu carpeta `imagenes/` completa dentro de `public/imagenes/`
   (el logo EPN, fotos de canchas, iconos de redes sociales, fotos de galería, etc.)
   React busca esas imágenes en `/imagenes/...` así que deben ir en `public/imagenes/`.

2. **Configurar Firebase** (obligatorio, si no el login no va a funcionar):

   a. Ve a [console.firebase.google.com](https://console.firebase.google.com) y crea un proyecto (o usa uno que ya tengas).

   b. Dentro del proyecto: **Authentication** (menú izquierdo) → pestaña **Sign-in method** →
      habilita el proveedor **Correo electrónico/contraseña** (Email/Password).

   c. En la página principal del proyecto, click en el ícono `</>` (Agregar app web).
      Ponle un nombre (ej. "reservas-epn") y registra la app.

   d. Firebase te va a mostrar un bloque de código con `firebaseConfig = { apiKey: ..., ... }`.
      Copia esos valores y pégalos en `src/firebase.js`, reemplazando los `'TU_...'`.

   e. Guarda y corre `npm run dev` de nuevo.

   Con esto, `CrearCuenta` y `Login` ya usan Firebase Authentication real
   (antes usaban `localStorage`, que no es seguro ni persiste entre navegadores).

## Estructura

```
src/
  components/
    Header.jsx   -> menú de navegación (se repite en todas las páginas)
    Footer.jsx   -> redes sociales (se repite en todas las páginas)
  pages/
    Index.jsx         -> index.html
    Nosotros.jsx       -> nosotros.html
    Servicios.jsx      -> servicios.html
    Galeria.jsx        -> galeria.html
    Contacto.jsx       -> contacto.html
    Reservar.jsx       -> reservar.html
    Horarios.jsx       -> horarios.html
    PerfilUsuario.jsx  -> perfil-usuario.html
    Login.jsx          -> login.html
    CrearCuenta.jsx    -> crearCuenta.html
    NotFound.jsx       -> página 404 (nueva, útil para rutas que no existen)
  App.jsx      -> aquí se conectan todas las rutas
  main.jsx     -> punto de entrada
  index.css    -> tu estilos.css completo, sin cambios
```

## Qué cambió respecto al HTML original

- Los `<a href="pagina.html">` se volvieron `<Link to="/ruta">` de React Router
  (así la página no se recarga completa al navegar, como en una app real).
- El JavaScript que usaba `document.getElementById` ahora usa `useState` /
  formularios controlados de React, pero sigue guardando todo en
  `localStorage` exactamente igual que antes (usuarios, sesión, reservas).
- Cada `<header>` y `<footer>` que estaba copiado y pegado en cada HTML ahora
  es un solo componente (`Header.jsx`, `Footer.jsx`) que se reutiliza.
- Se quitó la página "Menu" (repetía lo que ya está en el nav).
- El nav ahora cambia según si hay sesión iniciada: si no estás logueado
  solo ves "Login"; si ya iniciaste sesión ves "Reservar", "Horarios",
  "Perfil" y "Cerrar sesión" en su lugar.
- **Login y Crear Cuenta ahora usan Firebase Authentication** en vez de
  `localStorage`. Las reservas se siguen guardando en `localStorage` (el
  "código único" del usuario también, ligado a su `uid` de Firebase, porque
  Firebase Authentication no guarda campos personalizados por sí solo).
