CREATE DATABASE sistema_productos;

CREATE TABLE bodegas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE sucursales (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    bodega_id INTEGER REFERENCES bodegas(id),
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE monedas (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(10) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE materiales (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(15) UNIQUE NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    bodega_id INTEGER REFERENCES bodegas(id),
    sucursal_id INTEGER REFERENCES sucursales(id),
    moneda_id INTEGER REFERENCES monedas(id),
    precio DECIMAL(10,2) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE producto_materiales (
    id SERIAL PRIMARY KEY,
    producto_id INTEGER REFERENCES productos(id) ON DELETE CASCADE,
    material_id INTEGER REFERENCES materiales(id)
);