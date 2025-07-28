-- Insertar datos de prueba
INSERT INTO bodegas (nombre) VALUES 
('Bodega 1'),
('Bodega 2'),
('Bodega 3');

INSERT INTO sucursales (nombre, bodega_id) VALUES 
('Sucursal 1', 1),
('Sucursal 2', 1),
('Sucursal 3', 2),
('Sucursal 4', 2),
('Sucursal 5', 3),
('Sucursal 6', 3);

INSERT INTO monedas (codigo, nombre) VALUES 
('CLP', 'Peso Chileno'),
('USD', 'Dólar Americano'),
('EUR', 'Euro');

INSERT INTO materiales (nombre) VALUES 
('Plástico'),
('Metal'),
('Madera'),
('Vidrio'),
('Textil');