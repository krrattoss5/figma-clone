<div align="center">
  <br />
    <a href="/con chats de cursor.png" target="_blank">
      <img src="./public/con chats de cursor.png" alt="Project Banner">
    </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  </div>

  <h3 align="center">Real Time Figma Clone</h3>

</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduccion](#introduccion)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🔗 [Deploy](#deploy)

## <a name="introduccion">🤖 Introduccion</a>

Un clon minimalista de Figma para mostrar cómo agregar funciones del mundo real como colaboración en vivo con chat de cursor, comentarios, reacciones y diseños de dibujo (formas, carga de imágenes) en el lienzo usando fabric.js.

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- TypeScript
- Liveblocks
- Fabric.js
- Shadcn
- Tailwind CSS

## <a name="features">🔋 Features</a>

👉 **Multi Cursors, Cursor Chat, y Reacciones**: Permite que varios usuarios colaboren simultáneamente mostrando cursores individuales, permitiendo chat en tiempo real y reacciones para comunicación interactiva.

👉 **Usuarios activos**: muestra una lista de los usuarios actualmente activos en el entorno colaborativo, lo que brinda visibilidad sobre quién está actualmente involucrado.

👉 **Burbujas de comentarios**: permite a los usuarios adjuntar comentarios a elementos específicos en el lienzo, fomentando la comunicación y la retroalimentación sobre los componentes del diseño.

👉 **Creación de diferentes formas**: proporciona herramientas para que los usuarios generen una variedad de formas en el lienzo, lo que permite diversos elementos de diseño.

👉 **Cargar imágenes**: Importe imágenes al lienzo, ampliando la gama de contenido visual en el diseño.

👉 **Personalización**: permite a los usuarios ajustar las propiedades de los elementos de diseño, ofreciendo flexibilidad para personalizar y ajustar los componentes visuales.

👉 **Dibujo de forma libre**: permite a los usuarios dibujar libremente en el lienzo, promoviendo la expresión artística y el diseño creativo.

👉 **Deshacer/Rehacer**: proporciona la capacidad de revertir (deshacer) o restaurar (rehacer) acciones anteriores, ofreciendo flexibilidad en la toma de decisiones de diseño.

👉 **Acciones de teclado**: permite a los usuarios utilizar atajos de teclado para diversas acciones, incluidas copiar, pegar, eliminar y activar atajos para funciones como abrir chat con cursor, reacciones y más, mejorando la eficiencia y la accesibilidad.

👉 **Historial**: revisa el historial cronológico de acciones y cambios realizados en el lienzo, ayudando en la gestión de proyectos y el control de versiones.

👉 **Eliminar, escalar, mover, borrar y exportar lienzo**: ofrece una variedad de funciones para administrar elementos de diseño, que incluyen eliminar, escalar, mover, borrar el lienzo y exportar el diseño final para uso externo.

y mucho más, incluida la arquitectura del código, los enlaces de reacción avanzados y la reutilización

## <a name="quick-start">🤸 Quick Start</a>

Siga estos pasos para configurar el proyecto localmente en su máquina.

**Requisitos previos**

Asegúrese de tener lo siguiente instalado en su máquina:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Administrador de paquetes de nodos)

**Clonando el repositorio**

```bash
clon de git https://github.com/krrattoss5/figma-clone
cd figma-ts
```

**Instalación**

Instale las dependencias del proyecto usando npm:

```bash
npm install
```

**Configurar variables de entorno**

Cree un nuevo archivo llamado `.env.local` en la raíz de su proyecto y agregue el siguiente contenido:

```env
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=
```

Reemplace los valores del marcador de posición con sus credenciales reales de Liveblocks. Puede obtener estas credenciales registrándose en el [sitio oficial de Liveblocks](https://liveblocks.io).

**Ejecutando el proyecto**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) en tu navegador para ver el proyecto.

## <a name="deploy">🔗 Deploy</a>

- [Figma Clone](https://figma-clone-lgrpmbr88-krrattoss5s-projects.vercel.app/)
