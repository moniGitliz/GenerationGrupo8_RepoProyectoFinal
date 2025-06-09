-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 27-05-2025 a las 04:20:21
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `arteria`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nombre_categoria` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nombre_categoria`) VALUES
(1, 'Pintura'),
(2, 'Escultura'),
(3, 'Fotografía'),
(4, 'Ilustración'),
(5, 'Artesanías'),
(6, 'Arte Textil');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra`
--

CREATE TABLE `compra` (
  `id_compra` int(11) NOT NULL,
  `FK_id_usuario` int(11) NOT NULL,
  `fecha_compra` datetime NOT NULL DEFAULT current_timestamp(),
  `valor_total_compra` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `compra`
--

INSERT INTO `compra` (`id_compra`, `FK_id_usuario`, `fecha_compra`, `valor_total_compra`) VALUES
(1, 3, '2025-05-15 10:30:00', 1370000.00),
(2, 1, '2025-05-16 09:00:00', 250000.00),
(3, 2, '2025-05-16 09:30:00', 319500.00),
(4, 3, '2025-05-16 10:00:00', 120000.00),
(5, 1, '2025-05-16 10:30:00', 100000.00),
(6, 2, '2025-05-16 11:00:00', 154000.00),
(7, 4, '2025-05-17 09:00:00', 150000.00),
(8, 5, '2025-05-17 10:00:00', 80000.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_compra`
--

CREATE TABLE `detalle_compra` (
  `id_detalle_compra` int(11) NOT NULL,
  `FK_id_compra` int(11) NOT NULL,
  `FK_id_obra` int(11) NOT NULL,
  `precio_unitario_obra` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `detalle_compra`
--

INSERT INTO `detalle_compra` (`id_detalle_compra`, `FK_id_compra`, `FK_id_obra`, `precio_unitario_obra`) VALUES
(1, 1, 2, 220000.00),
(2, 1, 5, 1150000.00),
(3, 2, 6, 250000.00),
(4, 3, 7, 319500.00),
(5, 4, 8, 120000.00),
(6, 5, 9, 100000.00),
(7, 6, 10, 154000.00),
(8, 7, 1, 150000.00),
(9, 8, 4, 80000.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `id_imagen` int(11) NOT NULL,
  `imagen_principal_url` varchar(255) NOT NULL,
  `miniatura_1_url` varchar(255) DEFAULT NULL,
  `miniatura_2_url` varchar(255) DEFAULT NULL,
  `miniatura_3_url` varchar(255) DEFAULT NULL,
  `FK_id_obra` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`id_imagen`, `imagen_principal_url`, `miniatura_1_url`, `miniatura_2_url`, `miniatura_3_url`, `FK_id_obra`) VALUES
(1, 'https://res.cloudinary.com/dmkgdtntx/image/upload/f_auto,q_auto/v1746556654/ceramica-rostro-azul_mdtiij.jpg', 'https://res.cloudinary.com/dmkgdtntx/image/upload/v1746556654/ceramica-rostro-azul-2_iloyip.png', 'https://res.cloudinary.com/dmkgdtntx/image/upload/v1746556655/ceramica-rostro-azul-3_l1np0o.png', 'https://res.cloudinary.com/dmkgdtntx/image/upload/v1746557378/ceramica-rostro-azul-4_jfc0e6.png', 1),
(2, 'https://res.cloudinary.com/dmkgdtntx/image/upload/f_auto,q_auto/v1746568965/pintura-oleo-colores_uzuohr.jpg', 'https://res.cloudinary.com/dmkgdtntx/image/upload/v1746568965/pintura-oleo-colores-2_shhwwj.png', 'https://res.cloudinary.com/dmkgdtntx/image/upload/v1746568964/pintura-oleo-colores-3_fzggvc.png', 'https://res.cloudinary.com/dmkgdtntx/image/upload/v1746568964/pintura-oleo-colores-4_g5jgyi.png', 2),
(3, 'https://res.cloudinary.com/dmkgdtntx/image/upload/f_auto,q_auto/v1746556293/bordado-hilo-amigas_aibiid.jpg', 'https://res.cloudinary.com/dmkgdtntx/image/upload/v1746556655/bordado-hilo-amigas-2_biz7qb.png', 'https://res.cloudinary.com/dmkgdtntx/image/upload/v1746556655/bordado-hilo-amigas-3_wiem20.png', 'https://res.cloudinary.com/dmkgdtntx/image/upload/v1746556656/bordado-hilo-amigas-4_z9vzlu.png', 3),
(4, 'https://res.cloudinary.com/dmkgdtntx/image/upload/f_auto,q_auto/v1746630056/pintura-oleo-cafe_fknoii.jpg', 'https://res.cloudinary.com/dmkgdtntx/image/upload/v1746630055/pintura-oleo-cafe-2_af77k1.jpg', 'https://res.cloudinary.com/dmkgdtntx/image/upload/v1746630056/pintura-oleo-cafe-3_ofdrof.jpg', 'https://res.cloudinary.com/dmkgdtntx/image/upload/v1746630059/pintura-oleo-cafe-4_z6tfr5.jpg', 4),
(5, 'https://res.cloudinary.com/dmkgdtntx/image/upload/f_auto,q_auto/v1746628010/pintura-oleo-rojoYNaranja_i10nxg.jpg', 'https://res.cloudinary.com/dmkgdtntx/image/upload/v1746628010/pintura-oleo-rojoYNaranja-2_wusrxg.jpg', 'https://res.cloudinary.com/dmkgdtntx/image/upload/v1746628010/pintura-oleo-rojoYNaranja-3_kgtw4q.jpg', 'https://res.cloudinary.com/dmkgdtntx/image/upload/v1746628010/pintura-oleo-rojoYNaranja-4_mqglyo.jpg', 5),
(6, 'https://res.cloudinary.com/dmkgdtntx/image/upload/f_auto,q_auto/v1746556655/ceramica-jarron-flores_j2iamf.jpg', 'https://res.cloudinary.com/dmkgdtntx/image/upload/v1746556656/ceramica-jarron-flores-3_rfxeno.png', 'https://res.cloudinary.com/dmkgdtntx/image/upload/v1746556656/ceramica-jarron-flores-4_q7hguq.png', NULL, 6),
(7, 'https://res.cloudinary.com/dmkgdtntx/image/upload/f_auto,q_auto/v1746568187/ceramica-matera_wvwshk.jpg', 'https://res.cloudinary.com/dmkgdtntx/image/upload/v1746568187/ceramica-matera-2_n1aznq.png', 'https://res.cloudinary.com/dmkgdtntx/image/upload/v1746568188/ceramica-matera-3_mmgbuz.png', NULL, 7),
(8, 'https://res.cloudinary.com/dmkgdtntx/image/upload/f_auto,q_auto/v1746557084/ceramica-pocillo-azul_zokqpw.jpg', 'https://res.cloudinary.com/dmkgdtntx/image/upload/v1746572135/ceramica-pocillo-azul-2_vyukyc.png', 'https://res.cloudinary.com/dmkgdtntx/image/upload/v1746572136/ceramica-pocillo-azul-3_fnggfe.png', NULL, 8),
(9, 'https://res.cloudinary.com/dmkgdtntx/image/upload/f_auto,q_auto/v1746630066/bordado-medias_nl2x6d.jpg', 'https://res.cloudinary.com/dmkgdtntx/image/upload/v1746630055/bordado-medias-2_mg3o9s.jpg', 'https://res.cloudinary.com/dmkgdtntx/image/upload/v1746630055/bordado-medias-3_vs8zgw.jpg', NULL, 9),
(10, 'https://res.cloudinary.com/dmkgdtntx/image/upload/f_auto,q_auto/v1746630066/tejido-blanco-pared_mlptbs.jpg', 'https://res.cloudinary.com/dmkgdtntx/image/upload/v1746630060/tejido-blanco-pared-2_ogcbsy.jpg', 'https://res.cloudinary.com/dmkgdtntx/image/upload/v1746630060/tejido-blanco-pared-3_ms9ite.jpg', NULL, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obra`
--

CREATE TABLE `obra` (
  `id_obra` int(11) NOT NULL,
  `FK_id_categoria` int(11) NOT NULL,
  `nombre_obra` varchar(100) NOT NULL,
  `descripcion_obra` text NOT NULL,
  `precio_obra` decimal(10,2) NOT NULL,
  `estado_obra` tinyint(1) NOT NULL DEFAULT 1,
  `nombre_artista` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `obra`
--

INSERT INTO `obra` (`id_obra`, `FK_id_categoria`, `nombre_obra`, `descripcion_obra`, `precio_obra`, `estado_obra`, `nombre_artista`) VALUES
(1, 5, 'Adonis', 'Obra artesanal de cerámica rostro azul.', 150000.00, 1, 'Luisa Ovalle'),
(2, 4, 'Sentipensar', 'Ilustración en óleo con juego de colores vibrantes.', 220000.00, 1, 'Julian Ramirez'),
(3, 6, 'Las tres Marías', 'Bordado textil con retrato de amistad.', 50000.00, 1, 'Rosa Aguilar'),
(4, 1, 'Atardecer café', 'Pintura en óleo inspirada en atardeceres cafeteros.', 80000.00, 1, 'Carlos Rodríguez'),
(5, 3, 'Pasión', 'Composición visual con tonos rojos y anaranjados.', 1150000.00, 1, 'Laura Dominguez'),
(6, 5, 'Flores Siendo', 'Jarrón cerámico intervenido con textura floral.', 250000.00, 1, 'Camila López'),
(7, 2, 'Floreciendo', 'Escultura matera hecha a mano con técnica de modelado.', 319500.00, 1, 'Camila López'),
(8, 5, 'Té', 'Pocillo cerámico de tono azul profundo.', 120000.00, 1, 'Ramiro Alvarado'),
(9, 6, 'Luisa + Julieta', 'Bordado textil representando la conexión emocional.', 100000.00, 1, 'Luz Torres'),
(10, 6, 'Macramé blanco', 'Decoración tejida en macramé para interiores.', 154000.00, 1, 'Mónica Lizeth');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `apellido_usuario` varchar(50) NOT NULL,
  `telefono_usuario` varchar(20) NOT NULL,
  `correo_usuario` varchar(100) NOT NULL,
  `contrasenia_usuario` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre_usuario`, `apellido_usuario`, `telefono_usuario`, `correo_usuario`, `contrasenia_usuario`) VALUES
(1, 'Sofía', 'Ramírez', '3001234567', 'sofia.ramirez@example.com', 'clave123'),
(2, 'Andrés', 'Martínez', '3019876543', 'andres.martinez@example.com', 'clave456'),
(3, 'Lucía', 'Torres', '3024567890', 'lucia.torres@example.com', 'clave789'),
(4, 'Daniela', 'Guzmán', '3049871234', 'daniela.guzman@example.com', 'clave321'),
(5, 'Sebastián', 'Ríos', '3056547890', 'sebastian.rios@example.com', 'clave654');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`id_compra`),
  ADD KEY `FK_id_usuario` (`FK_id_usuario`);

--
-- Indices de la tabla `detalle_compra`
--
ALTER TABLE `detalle_compra`
  ADD PRIMARY KEY (`id_detalle_compra`),
  ADD UNIQUE KEY `FK_id_obra` (`FK_id_obra`),
  ADD KEY `FK_id_compra` (`FK_id_compra`);

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`id_imagen`),
  ADD KEY `FK_id_obra` (`FK_id_obra`);

--
-- Indices de la tabla `obra`
--
ALTER TABLE `obra`
  ADD PRIMARY KEY (`id_obra`),
  ADD KEY `FK_id_categoria` (`FK_id_categoria`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `correo_usuario` (`correo_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `compra`
--
ALTER TABLE `compra`
  MODIFY `id_compra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `detalle_compra`
--
ALTER TABLE `detalle_compra`
  MODIFY `id_detalle_compra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `id_imagen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `obra`
--
ALTER TABLE `obra`
  MODIFY `id_obra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compra`
--
ALTER TABLE `compra`
  ADD CONSTRAINT `compra_ibfk_1` FOREIGN KEY (`FK_id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `detalle_compra`
--
ALTER TABLE `detalle_compra`
  ADD CONSTRAINT `detalle_compra_ibfk_1` FOREIGN KEY (`FK_id_compra`) REFERENCES `compra` (`id_compra`),
  ADD CONSTRAINT `detalle_compra_ibfk_2` FOREIGN KEY (`FK_id_obra`) REFERENCES `obra` (`id_obra`);

--
-- Filtros para la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD CONSTRAINT `imagenes_ibfk_1` FOREIGN KEY (`FK_id_obra`) REFERENCES `obra` (`id_obra`);

--
-- Filtros para la tabla `obra`
--
ALTER TABLE `obra`
  ADD CONSTRAINT `obra_ibfk_1` FOREIGN KEY (`FK_id_categoria`) REFERENCES `categoria` (`id_categoria`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
