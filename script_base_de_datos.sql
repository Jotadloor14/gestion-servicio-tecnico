-- 1. CREACIÓN DE LA BASE DE DATOS E INICIALIZACIÓN
CREATE DATABASE IF NOT EXISTS taller_tecnico_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE taller_tecnico_db;

-- 2. CREAR TABLA DE USUARIOS (Técnico, Administrador)
CREATE TABLE USUARIOS(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE, 
    password_hash VARCHAR(255) NOT NULL, 
    rol ENUM ('tecnico', 'administrador') NOT NULL,
    last_login TIMESTAMP NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. CREAR TABLA CLIENTES
CREATE TABLE CLIENTES (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    telefono VARCHAR (20) NOT NULL,
    email VARCHAR(100) NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. CREAR TABLA ACCESORIOS 
CREATE TABLE ACCESORIOS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    categoria ENUM ('Cargadores', 'Estuches', 'Micas', 'Repuestos', 'Otros') NOT NULL,
    precio DECIMAL (10, 2) NOT NULL, 
    stock INT NOT NULL,
    imagen_url VARCHAR(255) NULL 
); 

-- 5. CREAR TABLA ÓRDENES DE SERVICIO (Con mitigación OWASP A06 y UUID)
CREATE TABLE ORDENES_SERVICIO (
    id VARCHAR(36) PRIMARY KEY, 
    tecnico_id INT NOT NULL, 
    cliente_id INT NOT NULL,
    equipo_modelo VARCHAR(150) NOT NULL,
    falla_reportada TEXT NOT NULL,
    costo_total DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    abono_economico DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    estado ENUM('Recibido', 'En Reparación', 'Listo', 'Entregado') NOT NULL DEFAULT 'Recibido', 
    fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_salida TIMESTAMP NULL,
    
    CONSTRAINT FK_orden_tecnico FOREIGN KEY (tecnico_id) 
        REFERENCES USUARIOS(id) ON DELETE RESTRICT,
    CONSTRAINT FK_orden_cliente FOREIGN KEY (cliente_id) 
        REFERENCES CLIENTES(id) ON DELETE RESTRICT,
    CONSTRAINT CHK_costo_positivo CHECK (costo_total >= 0.00),
    CONSTRAINT CHK_abono_positivo CHECK (abono_economico >= 0.00)
);
        
-- 6. CREAR TABLA INTERMEDIA ORDEN_ACCESORIOS (Repuestos asignados)
CREATE TABLE ORDEN_ACCESORIOS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orden_id VARCHAR (36) NOT NULL,
    accesorio_id INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    precio_unitario DECIMAL (10, 2) NOT NULL,
    
    CONSTRAINT FK_intermedia_orden FOREIGN KEY (orden_id) 
        REFERENCES ORDENES_SERVICIO(id) ON DELETE CASCADE,
    CONSTRAINT FK_intermedia_accesorio FOREIGN KEY (accesorio_id) 
        REFERENCES ACCESORIOS(id) ON DELETE RESTRICT
);
