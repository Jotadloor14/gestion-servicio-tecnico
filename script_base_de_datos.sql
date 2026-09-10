-- crear base de datos
CREATE DATABASE taller_tecnico_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE taller_tecnico_db;

-- crear tabla de usuarios (técnico, administrador)
CREATE TABLE USUARIOS(
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(100) NOT NULL UNIQUE, 
password_hash VARCHAR(255) NOT NULL, 
rol ENUM ('tecnico', 'administrador')NOT NULL,
fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

-- crear tabla clientes
CREATE TABLE CLIENTES (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(150) NOT NULL,
 telefono VARCHAR (20) NOT NULL,
 email VARCHAR(100) NULL,
 fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

 --  crear tabla accesorios 
CREATE TABLE ACCESORIOS (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(150) NOT NULL,
categoria ENUM ('Cargadores', 'Estuches', 'Micas', 'Repuestos', 'Otros')NOT NULL,
precio DECIMAL (10, 2)NOT NULL, 
stock INT NOT NULL,
imagen_url VARCHAR(255)NULL ); 

-- crear tabla ordenes de servicio   con código UUID
CREATE TABLE ORDENES_SERVICIO (
 id VARCHAR(36) PRIMARY KEY, 
 tecnico_id INT NOT NULL, 
 cliente_id INT NOT NULL,
 equipo_modelo VARCHAR(150) NOT NULL,
 falla_reportada TEXT NOT NULL,
 costo_total DECIMAL(10, 2)NOT NULL DEFAULT 0.00,
 estado ENUM('Recibido', 'En Reparación', 'Listo', 'Entregado')NOT NULL DEFAULT 'Recibido', 
 fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 fecha_salida TIMESTAMP NULL,
 
 CONSTRAINT FK_orden_tecnico FOREIGN KEY (tecnico_id) 
        REFERENCES USUARIOS(id) ON DELETE RESTRICT,
    CONSTRAINT FK_orden_cliente FOREIGN KEY (cliente_id) 
        REFERENCES CLIENTES(id) ON DELETE RESTRICT);
        
-- crear tabla intermedia orden_accesorios(repuestos asignados a cada cliente)
CREATE TABLE ORDEN_ACCESORIOS (
id INT AUTO_INCREMENT PRIMARY KEY,
orden_id VARCHAR (36)NOT NULL,
accesorio_id INT NOT NULL,
cantidad INT  NOT NULL DEFAULT 1,
precio_unitario DECIMAL (10, 2)NOT NULL,
	CONSTRAINT FK_intermedia_orden FOREIGN KEY (orden_id) 
        REFERENCES ORDENES_SERVICIO(id) ON DELETE CASCADE,
    CONSTRAINT FK_intermedia_accesorio FOREIGN KEY (accesorio_id) 
        REFERENCES ACCESORIOS(id) ON DELETE RESTRICT);
        
