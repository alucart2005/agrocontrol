-- ============================================
-- AgroControl - Supabase Database Schema
-- Multi-user support with Supabase Auth
-- ============================================

-- ============================================
-- Enable Supabase Auth
-- ============================================

-- The auth.users table is managed by Supabase
-- We create a public.users table to store additional profile data

-- Tabla: users (perfiles de usuario)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user', 'viewer')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- Tablas con user_id para aislamiento de datos
-- ============================================

-- Tabla: peces
CREATE TABLE IF NOT EXISTS peces (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  estanque TEXT NOT NULL,
  fecha_registro TIMESTAMPTZ DEFAULT NOW(),
  especie TEXT NOT NULL,
  stock_inicial INTEGER NOT NULL,
  stock_actual INTEGER NOT NULL,
  peso_promedio DECIMAL(10,2) NOT NULL,
  alimento_kg DECIMAL(10,2) NOT NULL,
  notas TEXT
);

-- Tabla: gallinas
CREATE TABLE IF NOT EXISTS gallinas (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  fecha_registro TIMESTAMPTZ DEFAULT NOW(),
  huevos_hoy INTEGER NOT NULL,
  huevos_semana INTEGER NOT NULL,
  huevos_mes INTEGER NOT NULL,
  mortalidad INTEGER NOT NULL DEFAULT 0,
  alimento_kg DECIMAL(10,2) NOT NULL,
  lote TEXT NOT NULL,
  notas TEXT
);

-- Tabla: patos
CREATE TABLE IF NOT EXISTS patos (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  fecha_registro TIMESTAMPTZ DEFAULT NOW(),
  huevos_hoy INTEGER NOT NULL,
  huevos_mes INTEGER NOT NULL,
  mortalidad INTEGER NOT NULL DEFAULT 0,
  alimento_kg DECIMAL(10,2) NOT NULL,
  notas TEXT
);

-- Tabla: conejos
CREATE TABLE IF NOT EXISTS conejos (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  fecha_registro TIMESTAMPTZ DEFAULT NOW(),
  reproductores INTEGER NOT NULL,
  camadas_mes INTEGER NOT NULL,
  nacidos_mes INTEGER NOT NULL,
  destetados_mes INTEGER NOT NULL,
  peso_promedio DECIMAL(10,2) NOT NULL,
  mortalidad INTEGER NOT NULL DEFAULT 0,
  alimento_kg DECIMAL(10,2) NOT NULL,
  notas TEXT
);

-- Tabla: transacciones
CREATE TABLE IF NOT EXISTS transacciones (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  fecha TIMESTAMPTZ DEFAULT NOW(),
  tipo TEXT NOT NULL CHECK (tipo IN ('ingreso', 'gasto')),
  categoria TEXT NOT NULL,
  producto TEXT NOT NULL,
  cantidad DECIMAL(10,2) NOT NULL,
  precio_unitario DECIMAL(12,2) NOT NULL,
  total DECIMAL(12,2) NOT NULL,
  descripcion TEXT
);

-- Tabla: inventario
CREATE TABLE IF NOT EXISTS inventario (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  producto TEXT NOT NULL,
  cantidad_kg DECIMAL(10,2) NOT NULL,
  proveedor TEXT NOT NULL,
  precio_unitario DECIMAL(12,2) NOT NULL,
  fecha_compra TIMESTAMPTZ DEFAULT NOW(),
  stock_minimo DECIMAL(10,2) NOT NULL
);

-- ============================================
-- Índices para búsquedas frecuentes
-- ============================================

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_peces_user_id ON peces(user_id);
CREATE INDEX IF NOT EXISTS idx_peces_estanque ON peces(estanque);
CREATE INDEX IF NOT EXISTS idx_peces_fecha ON peces(fecha_registro);
CREATE INDEX IF NOT EXISTS idx_gallinas_user_id ON gallinas(user_id);
CREATE INDEX IF NOT EXISTS idx_gallinas_fecha ON gallinas(fecha_registro);
CREATE INDEX IF NOT EXISTS idx_gallinas_lote ON gallinas(lote);
CREATE INDEX IF NOT EXISTS idx_patos_user_id ON patos(user_id);
CREATE INDEX IF NOT EXISTS idx_patos_fecha ON patos(fecha_registro);
CREATE INDEX IF NOT EXISTS idx_conejos_user_id ON conejos(user_id);
CREATE INDEX IF NOT EXISTS idx_conejos_fecha ON conejos(fecha_registro);
CREATE INDEX IF NOT EXISTS idx_transacciones_user_id ON transacciones(user_id);
CREATE INDEX IF NOT EXISTS idx_transacciones_tipo ON transacciones(tipo);
CREATE INDEX IF NOT EXISTS idx_transacciones_fecha ON transacciones(fecha);
CREATE INDEX IF NOT EXISTS idx_transacciones_producto ON transacciones(producto);
CREATE INDEX IF NOT EXISTS idx_inventario_user_id ON inventario(user_id);
CREATE INDEX IF NOT EXISTS idx_inventario_producto ON inventario(producto);

-- ============================================
-- Habilitar RLS (Row Level Security)
-- ============================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE peces ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallinas ENABLE ROW LEVEL SECURITY;
ALTER TABLE patos ENABLE ROW LEVEL SECURITY;
ALTER TABLE conejos ENABLE ROW LEVEL SECURITY;
ALTER TABLE transacciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventario ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Políticas RLS para multi-usuario
-- Cada usuario solo puede ver/editar sus propios datos
-- ============================================

-- Políticas para users
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Políticas para peces
CREATE POLICY "Users can view own peces" ON peces
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own peces" ON peces
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own peces" ON peces
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own peces" ON peces
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas para gallinas
CREATE POLICY "Users can view own gallinas" ON gallinas
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own gallinas" ON gallinas
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own gallinas" ON gallinas
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own gallinas" ON gallinas
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas para patos
CREATE POLICY "Users can view own patos" ON patos
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own patos" ON patos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own patos" ON patos
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own patos" ON patos
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas para conejos
CREATE POLICY "Users can view own conejos" ON conejos
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own conejos" ON conejos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own conejos" ON conejos
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own conejos" ON conejos
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas para transacciones
CREATE POLICY "Users can view own transacciones" ON transacciones
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transacciones" ON transacciones
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own transacciones" ON transacciones
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own transacciones" ON transacciones
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas para inventario
CREATE POLICY "Users can view own inventario" ON inventario
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own inventario" ON inventario
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own inventario" ON inventario
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own inventario" ON inventario
  FOR DELETE USING (auth.uid() = user_id);
