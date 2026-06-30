# 🌿 AgroControl - Animal Production Dashboard

> [**English**](#english) | [**Español**](#español)

---

<a id="english"></a>

# 🇺🇸 English

![Dashboard Preview](public/images/dashboard-home.svg)

## What is AgroControl?

**AgroControl** is a web dashboard designed to manage a diversified animal production farm in **Bajo Cauca, Antioquia, Colombia**.

It allows you to register, monitor, and analyze production of:
- 🐟 **Fish** (Tilapia, Cachama)
- 🐔 **Laying Hens**
- 🦆 **Ducks**
- 🐰 **Rabbits** (Cuniculture)
- 💰 **Finances** (Income & expenses)
- 📦 **Inventory** of supplies

## Why Colombia?

Colombia is one of the most biodiverse countries in the world, with extraordinary potential for diversified agriculture. From the tropical lowlands of Bajo Cauca to the Andean highlands, our land offers unique conditions for raising fish, poultry, rabbits, and more.

### Colombia's Agricultural Strengths

| Strength | Description |
|----------|-------------|
| **Biodiversity** | 50,000+ plant species, ideal climate for year-round production |
| **Water Resources** | 1,849 rivers, abundant rainfall, perfect for aquaculture |
| **Strategic Location** | Access to North American, European, and Asian markets |
| **Young Population** | 30M+ people under 30, eager for innovation |
| **Government Support** | Agro Ingreso Seguro, Mi Agro, and fintech programs |
| **Growing Tech Hub** | Medellín named most innovative city in South America |

### Why Agricultural Tech Matters

Technology in agriculture isn't just about convenience — it's about **food security** for 50 million Colombians. By 2030, Colombia needs to increase food production by 30% to meet growing demand. Applications like AgroControl help small and medium farmers:

- **Reduce waste** by tracking production in real time
- **Increase income** through data-driven decisions
- **Scale operations** without hiring expensive consultants
- **Compete globally** with professional-grade tools
- **Preserve tradition** while embracing innovation

> *"La tecnología no reemplaza al campesino; lo potencia."*  
> *(Technology doesn't replace the farmer; it empowers them.)*

---

## Live Demo

🔗 **[https://agrocontrol-cyan.vercel.app](https://agrocontrol-cyan.vercel.app)**

---

## Screenshots

<table>
  <tr>
    <td align="center"><strong>Dashboard</strong></td>
    <td align="center"><strong>Fish Module</strong></td>
    <td align="center"><strong>Chickens Module</strong></td>
  </tr>
  <tr>
    <td><img src="public/images/dashboard-home.svg" width="400" alt="Dashboard Home"></td>
    <td><img src="public/images/modulo-peces.svg" width="400" alt="Fish Module"></td>
    <td><img src="public/images/modulo-gallinas.svg" width="400" alt="Chickens Module"></td>
  </tr>
  <tr>
    <td align="center"><em>KPIs, income vs expenses chart, alerts</em></td>
    <td align="center"><em>Ponds, species, stock & weight tracking</em></td>
    <td align="center"><em>Daily egg production & batch control</em></td>
  </tr>
</table>

<table>
  <tr>
    <td align="center"><strong>Finance Module</strong></td>
    <td align="center"><strong>Reports Module</strong></td>
  </tr>
  <tr>
    <td><img src="public/images/modulo-finanzas.svg" width="400" alt="Finance Module"></td>
    <td><img src="public/images/dashboard-home.svg" width="400" alt="Reports Overview"></td>
  </tr>
  <tr>
    <td align="center"><em>Income, expenses & net profit tracking</em></td>
    <td align="center"><em>Printable reports with real data</em></td>
  </tr>
</table>

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Smart Dashboard** | Real-time KPIs, interactive charts & automatic alerts |
| **Quick Registration** | Intuitive forms for daily production logging |
| **Financial Analysis** | Income vs expenses by product and category |
| **Inventory Control** | Minimum stock, suppliers & restocking alerts |
| **Reports** | Generate production, finance & inventory reports (Print/PDF) |
| **Multi-User Auth** | Supabase authentication with session cookies |
| **Responsive** | Works on desktop, tablet and mobile |
| **Dark Theme** | Modern interface with glassmorphism effects |

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.x | Fullstack React framework |
| **React** | 19.x | UI Library |
| **Tailwind CSS** | 4.x | Utility-first CSS |
| **Recharts** | 3.x | Interactive charts |
| **Lucide React** | 1.x | SVG icons |

### Backend / Database
| Technology | Purpose |
|------------|---------|
| **Supabase** | PostgreSQL managed + Auth + API |
| **Vercel** | Hosting & deployment |

### Dev Tools
| Tool | Purpose |
|------|---------|
| **TypeScript** | Static typing |
| **ESLint** | Code linting |
| **Zod** | Input validation |
| **Vercel CLI** | Automated deployment |

---

## Project Structure

```
agrocontrol/
├── src/
│   ├── app/
│   │   ├── (app)/              # Authenticated pages
│   │   │   ├── page.tsx        # Dashboard Home
│   │   │   ├── peces/page.tsx  # Fish Module
│   │   │   ├── gallinas/page.tsx # Chickens Module
│   │   │   ├── patos/page.tsx  # Ducks Module
│   │   │   ├── conejos/page.tsx # Rabbits Module
│   │   │   ├── finanzas/page.tsx # Finance Module
│   │   │   ├── inventario/page.tsx # Inventory Module
│   │   │   └── reportes/page.tsx # Reports Module
│   │   ├── auth/               # Auth pages
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   ├── forgot-password/page.tsx
│   │   │   └── callback/page.tsx
│   │   └── api/                # API Routes
│   │       ├── peces/route.ts
│   │       ├── gallinas/route.ts
│   │       ├── patos/route.ts
│   │       ├── conejos/route.ts
│   │       ├── finanzas/route.ts
│   │       └── inventario/route.ts
│   ├── components/
│   │   ├── auth/AuthGuard.tsx
│   │   ├── layout/Sidebar.tsx, Header.tsx
│   │   └── dashboard/ChartIngresos.tsx, Alertas.tsx
│   ├── contexts/AuthContext.tsx
│   ├── lib/
│   │   ├── supabase/client.ts, server.ts
│   │   ├── validation.ts
│   │   └── security.ts
│   └── middleware.ts
├── supabase-schema.sql
├── vercel.json
└── package.json
```

---

## Database Schema (Supabase)

### Tables

| Table | Fields | Description |
|-------|--------|-------------|
| `users` | id, email, full_name, role | User profiles (auto-created on signup) |
| `peces` | estanque, especie, stock, peso, alimento | Fish pond records |
| `gallinas` | huevos_hoy/semana/mes, mortalidad, lote | Chicken production |
| `patos` | huevos_hoy/mes, mortalidad, alimento | Duck production |
| `conejos` | reproductores, camadas, nacidos, peso | Rabbit production |
| `transacciones` | tipo, categoria, producto, total | Financial transactions |
| `inventario` | producto, cantidad, proveedor, precio | Supply inventory |

All tables include `user_id` for multi-user data isolation.

---

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/peces` | List fish records |
| `POST` | `/api/peces` | Create fish record |
| `DELETE` | `/api/peces?id=X` | Delete fish record |
| `GET` | `/api/gallinas` | List chicken records |
| `POST` | `/api/gallinas` | Create chicken record |
| `DELETE` | `/api/gallinas?id=X` | Delete chicken record |
| `GET` | `/api/patos` | List duck records |
| `POST` | `/api/patos` | Create duck record |
| `DELETE` | `/api/patos?id=X` | Delete duck record |
| `GET` | `/api/conejos` | List rabbit records |
| `POST` | `/api/conejos` | Create rabbit record |
| `DELETE` | `/api/conejos?id=X` | Delete rabbit record |
| `GET` | `/api/finanzas` | List transactions |
| `POST` | `/api/finanzas` | Create transaction |
| `DELETE` | `/api/finanzas?id=X` | Delete transaction |
| `GET` | `/api/inventario` | List inventory items |
| `POST` | `/api/inventario` | Create inventory item |
| `DELETE` | `/api/inventario?id=X` | Delete inventory item |

---

## How to Run

### Prerequisites
- Node.js 18+ installed
- [Supabase](https://supabase.com) account
- [Vercel](https://vercel.com) account (optional, for deployment)

### Local Installation

```bash
# 1. Clone the repository
git clone https://github.com/alucart2005/agrocontrol.git
cd agrocontrol

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 4. Run in development mode
npm run dev

# 5. Open in browser
# http://localhost:3000
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Database Setup

1. Go to your Supabase project → **SQL Editor**
2. Copy the contents of `supabase-schema.sql`
3. Paste and click **Run**

### Production Deploy

```bash
npm install -g vercel
vercel login
vercel --prod --yes
```

---

## Design

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Agro Green | `#22c55e` | Primary accents, success |
| Gold | `#f59e0b` | Warnings, alerts |
| Red | `#ef4444` | Errors, expenses |
| Blue | `#3b82f6` | Info, fish |
| Purple | `#8b5cf6` | Rabbits |
| Slate 900 | `#0f172a` | Main background |

### Visual Effects
- **Glassmorphism**: Frosted glass card effects
- **Gradients**: Smooth background gradients
- **Shadows**: Blurred shadows for depth
- **Transitions**: Smooth interaction animations

---

## Roadmap

- [x] Dashboard with KPIs
- [x] Fish Module
- [x] Chickens Module
- [x] Ducks Module
- [x] Rabbits Module
- [x] Finance Control
- [x] Inventory
- [x] Reports (Print/PDF)
- [x] Multi-user Authentication
- [ ] Historical trend charts
- [ ] Export data to Excel/CSV
- [ ] WhatsApp notifications
- [ ] IoT monitoring with sensors
- [ ] Mobile app (React Native)

---

## Contributing

Contributions are welcome. For major changes, please open an issue first.

```bash
git checkout -b feature/new-feature
git commit -m 'Add new feature'
git push origin feature/new-feature
# Open a Pull Request
```

---

## License

Private project for farm use in Bajo Cauca, Antioquia, Colombia.

---

## Author

**Developed for:** Farm in Bajo Cauca, Antioquia, Colombia  
**Main stack:** Next.js 16 + Supabase + Tailwind CSS + Vercel  
**GitHub:** [alucart2005](https://github.com/alucart2005)

---

## Support

If you have issues or questions:

1. Check [Next.js docs](https://nextjs.org/docs)
2. Check [Supabase docs](https://supabase.com/docs)
3. Open an issue on the repository

---

**Made with 💚 for Colombian agriculture**

---

<a id="español"></a>

# 🇪🇸 Español

![Vista Previa del Dashboard](public/images/dashboard-home.svg)

## ¿Qué es AgroControl?

**AgroControl** es un panel de control web diseñado para administrar una finca de producción animal diversificada en el **Bajo Cauca, Antioquia, Colombia**.

Permite registrar, monitorear y analizar la producción de:
- 🐟 **Peces** (Tilapia, Cachama)
- 🐔 **Gallinas** ponedoras
- 🦆 **Patos**
- 🐰 **Conejos** (Cunicultura)
- 💰 **Finanzas** (Ingresos y gastos)
- 📦 **Inventario** de insumos

## ¿Por Qué Colombia?

Colombia es uno de los países más biodiversos del mundo, con un potencial extraordinario para la agricultura diversificada. Desde las tierras bajas del Bajo Cauca hasta las alturas andinas, nuestra tierra ofrece condiciones únicas para criar peces, aves, conejos y más.

### Fortalezas Agrícolas de Colombia

| Fortaleza | Descripción |
|-----------|-------------|
| **Biodiversidad** | 50,000+ especies de plantas, clima ideal para producción todo el año |
| **Recursos Hídricos** | 1,849 ríos, lluvias abundantes, perfecto para acuicultura |
| **Ubicación Estratégica** | Acceso a mercados de Norteamérica, Europa y Asia |
| **Población Joven** | 30M+ personas menores de 30, ansiosas por innovar |
| **Apoyo Gubernamental** | Agro Ingreso Seguro, Mi Agro y programas fintech |
| **Hub Tecnológico** | Medellín nombrada ciudad más innovadora de Sudamérica |

### Por Qué Importa la Tecnología Agrícola

La tecnología en agricultura no es solo conveniencia — es **seguridad alimentaria** para 50 millones de colombianos. Para 2030, Colombia necesita aumentar la producción de alimentos en un 30% para satisfacer la demanda creciente. Aplicaciones como AgroControl ayudan a agricultores pequeños y medianos a:

- **Reducir desperdicio** al registrar producción en tiempo real
- **Aumentar ingresos** con decisiones basadas en datos
- **Escalar operaciones** sin contratar consultores costosos
- **Competir globalmente** con herramientas profesionales
- **Preservar la tradición** mientras abrazamos la innovación

> *"La tecnología no reemplaza al campesino; lo potencia."*

---

## Demo en Vivo

🔗 **[https://agrocontrol-cyan.vercel.app](https://agrocontrol-cyan.vercel.app)**

---

## Capturas de Pantalla

<table>
  <tr>
    <td align="center"><strong>Dashboard</strong></td>
    <td align="center"><strong>Módulo de Peces</strong></td>
    <td align="center"><strong>Módulo de Gallinas</strong></td>
  </tr>
  <tr>
    <td><img src="public/images/dashboard-home.svg" width="400" alt="Dashboard Principal"></td>
    <td><img src="public/images/modulo-peces.svg" width="400" alt="Módulo Peces"></td>
    <td><img src="public/images/modulo-gallinas.svg" width="400" alt="Módulo Gallinas"></td>
  </tr>
  <tr>
    <td align="center"><em>KPIs, gráfica de ingresos vs gastos y alertas</em></td>
    <td align="center"><em>Estanques, especie, stock y peso promedio</em></td>
    <td align="center"><em>Producción diaria de huevos y control de lotes</em></td>
  </tr>
</table>

<table>
  <tr>
    <td align="center"><strong>Módulo de Finanzas</strong></td>
    <td align="center"><strong>Módulo de Reportes</strong></td>
  </tr>
  <tr>
    <td><img src="public/images/modulo-finanzas.svg" width="400" alt="Módulo Finanzas"></td>
    <td><img src="public/images/dashboard-home.svg" width="400" alt="Vista General Reportes"></td>
  </tr>
  <tr>
    <td align="center"><em>Control de ingresos, gastos y utilidad neta</em></td>
    <td align="center"><em>Reportes imprimibles con datos reales</em></td>
  </tr>
</table>

---

## Características Principales

| Característica | Descripción |
|----------------|-------------|
| **Dashboard Inteligente** | KPIs en tiempo real, gráficas interactivas y alertas automáticas |
| **Registro Rápido** | Formularios intuitivos para registrar producción diaria |
| **Análisis Financiero** | Ingresos vs gastos por producto y categoría |
| **Control de Inventario** | Stock mínimo, proveedores y alertas de reposición |
| **Reportes** | Genera reportes de producción, finanzas e inventario (Imprimir/PDF) |
| **Multi-usuario** | Autenticación con Supabase y cookies de sesión |
| **Responsive** | Funciona en computador, tablet y celular |
| **Tema Oscuro** | Interfaz moderna con efectos glassmorphism |

---

## Stack Tecnológico

### Frontend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Next.js** | 16.x | Framework React fullstack |
| **React** | 19.x | UI Library |
| **Tailwind CSS** | 4.x | Estilos utility-first |
| **Recharts** | 3.x | Gráficas interactivas |
| **Lucide React** | 1.x | Iconos SVG |

### Backend / Base de Datos
| Tecnología | Propósito |
|------------|-----------|
| **Supabase** | PostgreSQL managed + Auth + API |
| **Vercel** | Hosting y deployment |

### Herramientas de Desarrollo
| Herramienta | Propósito |
|-------------|-----------|
| **TypeScript** | Tipado estático |
| **ESLint** | Linting de código |
| **Zod** | Validación de inputs |
| **Vercel CLI** | Deployment automatizado |

---

## Estructura del Proyecto

```
agrocontrol/
├── src/
│   ├── app/
│   │   ├── (app)/              # Páginas autenticadas
│   │   │   ├── page.tsx        # Dashboard Home
│   │   │   ├── peces/page.tsx  # Módulo Peces
│   │   │   ├── gallinas/page.tsx # Módulo Gallinas
│   │   │   ├── patos/page.tsx  # Módulo Patos
│   │   │   ├── conejos/page.tsx # Módulo Conejos
│   │   │   ├── finanzas/page.tsx # Módulo Finanzas
│   │   │   ├── inventario/page.tsx # Módulo Inventario
│   │   │   └── reportes/page.tsx # Módulo Reportes
│   │   ├── auth/               # Páginas de autenticación
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   ├── forgot-password/page.tsx
│   │   │   └── callback/page.tsx
│   │   └── api/                # Rutas API
│   │       ├── peces/route.ts
│   │       ├── gallinas/route.ts
│   │       ├── patos/route.ts
│   │       ├── conejos/route.ts
│   │       ├── finanzas/route.ts
│   │       └── inventario/route.ts
│   ├── components/
│   │   ├── auth/AuthGuard.tsx
│   │   ├── layout/Sidebar.tsx, Header.tsx
│   │   └── dashboard/ChartIngresos.tsx, Alertas.tsx
│   ├── contexts/AuthContext.tsx
│   ├── lib/
│   │   ├── supabase/client.ts, server.ts
│   │   ├── validation.ts
│   │   └── security.ts
│   └── middleware.ts
├── supabase-schema.sql
├── vercel.json
└── package.json
```

---

## Esquema de Base de Datos (Supabase)

### Tablas

| Tabla | Campos | Descripción |
|-------|--------|-------------|
| `users` | id, email, full_name, role | Perfiles de usuario (auto-creados al registrarse) |
| `peces` | estanque, especie, stock, peso, alimento | Registros de estanques |
| `gallinas` | huevos_hoy/semana/mes, mortalidad, lote | Producción avícola |
| `patos` | huevos_hoy/mes, mortalidad, alimento | Producción de patos |
| `conejos` | reproductores, camadas, nacidos, peso | Producción cunícola |
| `transacciones` | tipo, categoria, producto, total | Transacciones financieras |
| `inventario` | producto, cantidad, proveedor, precio | Inventario de insumos |

Todas las tablas incluyen `user_id` para aislamiento de datos multi-usuario.

---

## Endpoints de API

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/peces` | Listar registros de peces |
| `POST` | `/api/peces` | Crear registro de peces |
| `DELETE` | `/api/peces?id=X` | Eliminar registro de peces |
| `GET` | `/api/gallinas` | Listar registros de gallinas |
| `POST` | `/api/gallinas` | Crear registro de gallinas |
| `DELETE` | `/api/gallinas?id=X` | Eliminar registro de gallinas |
| `GET` | `/api/patos` | Listar registros de patos |
| `POST` | `/api/patos` | Crear registro de patos |
| `DELETE` | `/api/patos?id=X` | Eliminar registro de patos |
| `GET` | `/api/conejos` | Listar registros de conejos |
| `POST` | `/api/conejos` | Crear registro de conejos |
| `DELETE` | `/api/conejos?id=X` | Eliminar registro de conejos |
| `GET` | `/api/finanzas` | Listar transacciones |
| `POST` | `/api/finanzas` | Crear transacción |
| `DELETE` | `/api/finanzas?id=X` | Eliminar transacción |
| `GET` | `/api/inventario` | Listar items de inventario |
| `POST` | `/api/inventario` | Crear item de inventario |
| `DELETE` | `/api/inventario?id=X` | Eliminar item de inventario |

---

## Cómo Ejecutar

### Requisitos Previos
- Node.js 18+ instalado
- Cuenta en [Supabase](https://supabase.com)
- Cuenta en [Vercel](https://vercel.com) (opcional, para deploy)

### Instalación Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/alucart2005/agrocontrol.git
cd agrocontrol

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales de Supabase

# 4. Ejecutar en modo desarrollo
npm run dev

# 5. Abrir en el navegador
# http://localhost:3000
```

### Variables de Entorno

Crear archivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### Configurar Base de Datos

1. Ir a tu proyecto en Supabase → **SQL Editor**
2. Copiar el contenido de `supabase-schema.sql`
3. Pegar y ejecutar **Run**

### Deploy a Producción

```bash
npm install -g vercel
vercel login
vercel --prod --yes
```

---

## Diseño

### Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Verde Agro | `#22c55e` | Acentos principales, éxito |
| Dorado | `#f59e0b` | Advertencias, alertas |
| Rojo | `#ef4444` | Errores, gastos |
| Azul | `#3b82f6` | Información, peces |
| Púrpura | `#8b5cf6` | Conejos |
| Slate 900 | `#0f172a` | Fondo principal |

### Efectos Visuales
- **Glassmorphism**: Cards con efecto de vidrio esmerilado
- **Gradientes**: Fondos degradados suaves
- **Sombras**: Sombras difuminadas para profundidad
- **Transiciones**: Animaciones suaves en interacciones

---

## Roadmap

- [x] Dashboard con KPIs
- [x] Módulo de Peces
- [x] Módulo de Gallinas
- [x] Módulo de Patos
- [x] Módulo de Conejos
- [x] Control Financiero
- [x] Inventario
- [x] Reportes (Imprimir/PDF)
- [x] Autenticación Multi-usuario
- [ ] Gráficas de tendencias históricas
- [ ] Exportar datos a Excel/CSV
- [ ] Notificaciones por WhatsApp
- [ ] Monitoreo IoT con sensores
- [ ] App móvil (React Native)

---

## Contribuir

Las contribuciones son bienvenidas. Para cambios grandes, abre un issue primero.

```bash
git checkout -b feature/nueva-funcionalidad
git commit -m 'Add nueva funcionalidad'
git push origin feature/nueva-funcionalidad
# Abre un Pull Request
```

---

## Licencia

Proyecto privado para uso en finca en Bajo Cauca, Antioquia, Colombia.

---

## Autor

**Desarrollado para:** Finca en Bajo Cauca, Antioquia, Colombia  
**Stack principal:** Next.js 16 + Supabase + Tailwind CSS + Vercel  
**GitHub:** [alucart2005](https://github.com/alucart2005)

---

## Soporte

Si tienes problemas o preguntas:

1. Revisa la documentación de [Next.js](https://nextjs.org/docs)
2. Consulta la documentación de [Supabase](https://supabase.com/docs)
3. Abre un issue en el repositorio

---

**Hecho con 💚 para la agricultura colombiana**
