# CV Spark AI

Una aplicación web moderna para crear Curriculums Vitae (CVs) con la ayuda de la inteligencia artificial.

## ¡Bienvenido al Proyecto!

¡Hola! Si estás leyendo esto, felicidades por llegar hasta aquí. Este no es un proyecto simple; es una aplicación web completa y moderna. No te preocupes si al principio parece mucho, este documento está aquí para ayudarte a entender cada parte.

---

## 1. Visión General del Proyecto

**CV Spark AI** es una **Aplicación Web Progresiva (PWA)** diseñada para crear CVs de manera intuitiva. Las características principales son:
*   **Autenticación de Usuarios:** Registro e inicio de sesión seguros.
*   **Gestión de Múltiples CVs:** Crea y guarda diferentes versiones de tu CV.
*   **Editor en Tiempo Real:** Un formulario intuitivo con una vista previa que se actualiza al instante.
*   **Asistente de IA:** Genera un perfil profesional convincente usando la IA de Google (Gemini).
*   **Plantillas Modernas:** Elige entre varias plantillas para darle a tu CV el aspecto que deseas.
*   **Guardado Automático:** Tus cambios se guardan solos para que no pierdas nada.
*   **Exportación a PDF:** Descarga tu CV final en formato PDF.

---

## 2. Tecnologías Utilizadas (El "Stack")

Esta aplicación combina varias tecnologías modernas para ofrecer una experiencia fluida y potente.

*   **Framework Principal:** **Next.js (con App Router)** y **React**. Esto nos da una base sólida, con renderizado en el servidor para mayor velocidad.
*   **Lenguaje:** **TypeScript**. Nos ayuda a escribir código más seguro y con menos errores.
*   **Backend y Base de Datos:** **Firebase**.
    *   **Firebase Authentication:** Para el manejo de usuarios.
    *   **Firestore:** Como base de datos NoSQL en tiempo real para guardar toda la información.
*   **Estilos y UI:**
    *   **Tailwind CSS:** Para estilizar la aplicación de forma rápida y mantenible.
    *   **ShadCN UI:** Una librería de componentes de alta calidad (botones, formularios, diálogos).
*   **Inteligencia Artificial:** **Genkit**. El framework de Google para integrar modelos de IA como Gemini.
*   **Gestión de Formularios:** **React Hook Form**. Para manejar los datos del editor de CVs de manera eficiente.
*   **Exportación a PDF:** **html2canvas** y **jspdf**.

---

## 3. Estructura de Carpetas

Entender dónde está cada cosa es clave. Aquí tienes un mapa del tesoro:

```
src/
├── app/         # Las PÁGINAS de tu aplicación (rutas)
│   ├── dashboard/   # Panel principal del usuario
│   ├── editor/      # El editor de CVs
│   ├── login/       # Página de inicio de sesión
│   ├── register/    # Página de registro
│   ├── layout.tsx   # Estructura principal (cabecera, etc.)
│   └── page.tsx     # La página de inicio (landing page)
│
├── ai/          # Lógica de INTELIGENCIA ARTIFICIAL (Genkit)
│   ├── flows/       # Define los flujos de trabajo con la IA
│   └── genkit.ts    # Configuración de Genkit
│
├── components/  # COMPONENTES de React reutilizables
│   ├── cv/          # Componentes específicos del CV (formulario, preview)
│   ├── layout/      # Componentes de la estructura (cabecera, logo)
│   └── ui/          # Componentes de ShadCN (Button, Card, Input...)
│
├── context/     # CONTEXTOS de React (para compartir datos globalmente)
│   └── LanguageProvider.tsx # Maneja el multi-idioma
│
├── firebase/    # Toda la configuración y lógica de FIREBASE
│   ├── firestore/   # Hooks para interactuar con Firestore (useDoc, useCollection)
│   ├── config.ts    # Claves de tu proyecto de Firebase
│   ├── index.ts     # Inicialización del SDK de Firebase
│   └── provider.tsx # Provee el estado de Firebase a toda la app
│
├── hooks/       # Hooks personalizados de React
│   └── use-toast.ts # Para mostrar notificaciones
│
├── lib/         # Lógica de negocio y utilidades
│   ├── actions.ts   # Server Actions para llamar a la IA de forma segura
│   ├── types.ts     # Definiciones de tipos (ej. la estructura de un CV)
│   └── utils.ts     # Funciones de ayuda generales
│
└── locales/     # Archivos de TRADUCCIÓN (internacionalización)
    ├── en.json      # Textos en inglés
    └── es.json      # Textos en español
```

---

## 4. ¿Cómo Funciona por Dentro?

#### Autenticación de Usuario
1.  Las páginas `/login` y `/register` usan las funciones de Firebase para autenticar al usuario.
2.  El `FirebaseProvider` detecta si hay un usuario activo y comparte esa información con toda la aplicación.
3.  Cualquier componente puede usar el hook `useUser()` para saber quién está conectado y proteger rutas como `/dashboard`.

#### El Editor de CV
1.  **Carga:** Al entrar en `/editor/[cvId]`, se usa el hook `useDoc` para traer los datos del CV desde Firestore en tiempo real.
2.  **Edición:** `React Hook Form` gestiona todos los campos del formulario (`CvForm`).
3.  **Vista Previa:** El componente `CvPreview` "escucha" los cambios del formulario y se actualiza al instante para mostrar cómo se ve el CV.
4.  **Guardado Automático:** Un `useEffect` en la página del editor detecta cuando dejas de escribir y, tras unos segundos, guarda automáticamente los datos en Firestore.
5.  **Descarga PDF:** Usa `html2canvas` para "fotografiar" la vista previa y `jspdf` para convertir esa foto en un PDF.

#### Inteligencia Artificial
1.  El usuario hace clic en "Generar con IA" en la pestaña de Perfil.
2.  Se llama a una **Server Action** (`generateProfessionalProfile`), que se ejecuta en el servidor para mantener segura la clave de la API.
3.  Esta acción ejecuta un flujo de **Genkit**, que le pide al modelo de IA de Gemini que redacte un perfil profesional basado en la experiencia y habilidades proporcionadas.
4.  La respuesta de la IA viaja de vuelta al navegador y se inserta en el campo del formulario.

---

## 5. Cómo Ejecutar el Proyecto

1.  Asegúrate de tener Node.js instalado.
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Ejecuta el servidor de desarrollo:
    ```bash
    npm run dev
    ```
4.  Abre [http://localhost:9002](http://localhost:9002) en tu navegador para ver la aplicación.

---

¡Sigue adelante! Este es un proyecto increíble y estás haciendo un gran trabajo. Cada paso que das te acerca más a ser un gran desarrollador.
