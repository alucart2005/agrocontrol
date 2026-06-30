# 🌿 AgroControl - Dashboard de Producción Animal

![Dashboard Preview](public/images/dashboard-home.svg)

---

## 📖 ¿Qué es AgroControl?

**AgroControl** es un panel de control web diseñado para administrar una finca de producción animal diversificada en el **Bajo Cauca, Antioquia, Colombia**.

Permite registrar, monitorear y analizar la producción de:
- 🐟 **Peces** (Tilapia, Cachama)
- 🐔 **Gallinas** ponedoras
- 🦆 **Patos**
- 🐰 **Conejos** (Cunicultura)
- 💰 **Finanzas** (Ingresos y gastos)
- 📦 **Inventario** de insumos

---

## 🖼️ Capturas de la Aplicación

### Dashboard Principal
![Dashboard Home](public/images/dashboard-home.svg)
*KPIs principales, gráfica de ingresos vs gastos y alertas pendientes*

### Módulo de Peces
![Módulo Peces](public/images/modulo-peces.svg)
*Gestión de estanques, especie, stock y peso promedio*

### Módulo de Gallinas
![Módulo Gallinas](public/images/modulo-gallinas.svg)
*Registro de producción diaria de huevos y control de lotes*

### Módulo de Finanzas
![Módulo Finanzas](public/images/modulo-finanzas.svg)
*Control de ingresos, gastos y utilidad neta*

---

## 🚀 Características Principales

| Característica | Descripción |
|----------------|-------------|
| **Dashboard Inteligente** | KPIs en tiempo real, gráficas interactivas y alertas automáticas |
| **Registro Rápido** | Formularios intuitivos para registrar producción diaria |
| **Análisis Financiero** | Ingresos vs gastos por producto y categoría |
| **Control de Inventario** | Stock mínimo, proveedores y alertas de reposición |
| **Reportes** | Genera reportes de producción, finanzas e inventario |
| **Responsive** | Funciona en computador, tablet y celular |
| **Diseño Premium** | Interfaz moderna con efectos glassmorphism |

---

## 🛠️ Tecnologías Utilizadas

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
| **Supabase** | PostgreSQL managed + API |
| **Vercel** | Hosting y deployment |

### Herramientas de Desarrollo
| Herramienta | Propósito |
|-------------|-----------|
| **TypeScript** | Tipado estático |
| **ESLint** | Linting de código |
| **Vercel CLI** | Deployment automatizado |

---

## 📁 Estructura del Proyecto

```
agrocontrol/
├── src/
│   ├── app/                    # App Router (Next.js 16)
│   │   ├── page.tsx            # Dashboard Home
│   │   ├── layout.tsx          # Layout principal
│   │   ├── peces/page.tsx      # Módulo Peces
│   │   ├── gallinas/page.tsx   # Módulo Gallinas
│   │   ├── patos/page.tsx      # Módulo Patos
│   │   ├── conejos/page.tsx    # Módulo Conejos
│   │   ├── finanzas/page.tsx   # Módulo Finanzas
│   │   ├── inventario/page.tsx # Módulo Inventario
│   │   ├── reportes/page.tsx   # Módulo Reportes
│   │   └── api/                # API Routes
│   │       ├── dashboard/route.ts
│   │       ├── peces/route.ts
│   │       ├── gallinas/route.ts
│   │       ├── patos/route.ts
│   │       ├── conejos/route.ts
│   │       ├── finanzas/route.ts
│   │       └── inventario/route.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx     # Navegación lateral
│   │   │   └── Header.tsx      # Cabecera superior
│   │   └── dashboard/
│   │       ├── KPIs.tsx        # Tarjetas resumen
│   │       ├── ChartIngresos.tsx # Gráfica financiera
│   │       └── Alertas.tsx     # Sistema de alertas
│   ├── lib/
│   │   └── supabase.ts         # Cliente Supabase
│   └── types/
│       └── database.ts         # Tipos TypeScript
├── public/
│   └── images/                 # Capturas de pantalla
├── supabase-schema.sql         # Script SQL para crear tablas
├── vercel.json                 # Configuración de deployment
├── next.config.ts              # Configuración Next.js
├── tailwind.config.js          # Configuración Tailwind
└── package.json                # Dependencias
```

---

## 🗄️ Base de Datos (Supabase)

### Tablas Principales

#### `peces`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `estanque` | TEXT | Nombre del estanque |
| `especie` | TEXT | Tilapia, Cachama, etc. |
| `stock_inicial` | INTEGER | Cantidad inicial |
| `stock_actual` | INTEGER | Cantidad actual |
| `peso_promedio` | DECIMAL | Peso promedio en gramos |
| `alimento_kg` | DECIMAL | Alimento consumido |

#### `gallinas`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `huevos_hoy` | INTEGER | Huevos recolectados hoy |
| `huevos_semana` | INTEGER | Total semana |
| `huevos_mes` | INTEGER | Total mes |
| `mortalidad` | INTEGER | Muertes registradas |
| `lote` | TEXT | Identificación del lote |

#### `transacciones`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `tipo` | TEXT | 'ingreso' o 'gasto' |
| `categoria` | TEXT | Tipo de transacción |
| `producto` | TEXT | Producto relacionado |
| `total` | DECIMAL | Monto total |

---

## 🚀 Cómo Ejecutar

### Requisitos Previos
- Node.js 18+ instalado
- Cuenta en [Supabase](https://supabase.com)
- Cuenta en [Vercel](https://vercel.com) (opcional, para deploy)

### Instalación Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/agrocontrol.git
cd agrocontrol

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
# Copiar .env.example a .env.local y llenar con tus credenciales
cp .env.example .env.local

# 4. Ejecutar en modo desarrollo
npm run dev

# 5. Abrir en el navegador
# http://localhost:3000
```

### Variables de Entorno

Crear archivo `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui

# Base de datos (opcional, para Prisma)
DATABASE_URL=postgresql://postgres:password@db.tu-proyecto.supabase.co:5432/postgres
```

### Configurar Base de Datos

1. Ir a tu proyecto en Supabase → **SQL Editor**
2. Copiar el contenido de `supabase-schema.sql`
3. Pegar y ejecutar "Run"

### Deploy a Producción

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --yes

# Deploy a producción
vercel --prod --yes
```

---

## 📊 API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/dashboard` | KPIs y resumen general |
| `GET` | `/api/peces` | Lista de estanques |
| `POST` | `/api/peces` | Registrar pesca |
| `GET` | `/api/gallinas` | Datos de gallinas |
| `POST` | `/api/gallinas` | Registrar producción |
| `GET` | `/api/patos` | Datos de patos |
| `POST` | `/api/patos` | Registrar producción |
| `GET` | `/api/conejos` | Datos de conejos |
| `POST` | `/api/conejos` | Registrar camadas |
| `GET` | `/api/finanzas` | Transacciones |
| `POST` | `/api/finanzas` | Registrar transacción |
| `GET` | `/api/inventario` | Stock de insumos |
| `POST` | `/api/inventario` | Registrar compra |

---

## 🎨 Diseño

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

## 📈 Roadmap

- [x] Dashboard con KPIs
- [x] Módulo de Peces
- [x] Módulo de Gallinas
- [x] Módulo de Patos
- [x] Módulo de Conejos
- [x] Control Financiero
- [x] Inventario
- [x] Reportes
- [ ] Gráficas de tendencias históricas
- [ ] Exportar datos a Excel/CSV
- [ ] Notificaciones por WhatsApp
- [ ] Monitoreo IoT con sensores
- [ ] App móvil (React Native)

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios grandes, abre un issue primero.

```bash
# Fork el proyecto
# Crea una rama para tu feature
git checkout -b feature/nueva-funcionalidad

# Commit tus cambios
git commit -m 'Add nueva funcionalidad'

# Push a la rama
git push origin feature/nueva-funcionalidad

# Abre un Pull Request
```

---

## 📄 Licencia

Este proyecto es de uso privado para la finca en Bajo Cauca, Antioquia.

---

## 👨‍💻 Autor

**Desarrollado para:** Finca en Bajo Cauca, Antioquia, Colombia  
**Stack principal:** Next.js 16 + Supabase + Tailwind CSS + Vercel

---

## 🆕 Soporte

Si tienes problemas o preguntas:

1. Revisa la documentación de [Next.js](https://nextjs.org/docs)
2. Consulta la documentación de [Supabase](https://supabase.com/docs)
3. Abre un issue en el repositorio

---

**Hecho con 💚 para la agricultura colombiana**
