/*basic and test*/
PRAGMA foreign_key=ON;
CREATE TABLE IF NOT EXISTS "User" (
  "Id" INTEGER PRIMARY KEY,
  "UserName" TEXT UNIQUE,
  "Password" TEXT,
  "Active" BOOLEAN
);

/*empresa*/
CREATE TABLE IF NOT EXISTS "Localidad"
(
  "Id" INTEGER PRIMARY KEY,
  "Codigo" TEXT UNIQUE,
  "Nombre" TEXT,
  "Poblacion" INTEGER,
  "Altitud" DECIMAL,
  "Temperatura" DECIMAL
);

CREATE TABLE IF NOT EXISTS "Producto"
(
  "Id" INTEGER PRIMARY KEY,
  "Codigo" TEXT UNIQUE,
  "Nombre" TEXT
);

CREATE TABLE IF NOT EXISTS "Proveedor"
(
  "Id" INTEGER PRIMARY KEY,
  "Codigo" TEXT UNIQUE,
  "Nombre" TEXT,
  "Origen" TEXT
);

CREATE TABLE IF NOT EXISTS "Oferta"
(
  "Id" INTEGER PRIMARY KEY,
  "ProveedorId" INTEGER DEFAULT NULL REFERENCES "Proveedor" ("Id") ON UPDATE CASCADE ON DELETE SET DEFAULT,
  "ProductoId" INTEGER DEFAULT NULL REFERENCES "Producto" ("Id") ON UPDATE CASCADE ON DELETE SET DEFAULT,
  "Cantidad" DECIMAL,
  "Embalaje" DECIMAL,
  "Precio" DECIMAL,
  "Fecha" DATE,
  UNIQUE(ProveedorId, ProductoId, Fecha)
);

CREATE TABLE IF NOT EXISTS "Demanda"
(
  "Id" INTEGER PRIMARY KEY,
  "LocalidadId" INTEGER DEFAULT NULL REFERENCES "Localidad" ("Id") ON UPDATE CASCADE ON DELETE SET DEFAULT,
  "ProductoId" INTEGER DEFAULT NULL REFERENCES "Producto" ("Id") ON UPDATE CASCADE ON DELETE SET DEFAULT,
  "ConsumoPromedio" DECIMAL,
  "Fecha" DATE,
  UNIQUE(LocalidadId, ProductoId, Fecha)
);
