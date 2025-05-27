-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-05-2025 a las 04:37:19
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Lìnea que se debe de usar en computadores de la universidad para poder usar NPM Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope CurrentUser 


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `eventos_ocaso`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservaciones`
--

CREATE TABLE `reservaciones` (
  `idEvento` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `tipoEvento` varchar(50) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `fechaEvento` date NOT NULL,
  `horaEvento` time NOT NULL,
  `cantInvitados` int(11) NOT NULL,
  `codigoVestimenta` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservaciones`
--

INSERT INTO `reservaciones` (`idEvento`, `idUsuario`, `tipoEvento`, `direccion`, `fechaEvento`, `horaEvento`, `cantInvitados`, `codigoVestimenta`) VALUES
(2, 10, 'cumpleaños', 'Carrera 38 con calle 49', '2025-05-22', '21:28:00', 15, 'babydoll'),
(3, 11, 'cumpleaños', 'divercity', '2025-05-24', '10:00:00', 15, 'casual');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(5, 'samuel ', 'sam@gmail.com', '$2b$10$QU1WrnfgEOGiPoLHad2NP.ha1Poxh3RvRTxz/ovyi90KKgtc6JhpO'),
(6, 'samuel ', 'samu@gmail.com', '$2b$10$sSAGY5J2XpMutrRYoplym.IoWuOKLkYWwrpkI2SObXQxmafXXxdrW'),
(7, 'sam', 'saaaa@gmail.com', '$2b$10$CqfbHbk6W4a8doib.xzRfORyyajhugV9KsMen65Uzv7mrLOPlMhe2'),
(8, 'kevin ', 'kevin@gmail.com', '$2b$10$cdQBPOdrWGTLqHO4G57XW.pWqm3yL9V.3htuPwFV83VUn3l2T/Gh.'),
(9, 'Ye', 'ye@gmail.com', '$2b$10$pX7L7QaMrsmTQoq16CgbreINcMj84nODsXGtMZ4jccucUGO3VII1K'),
(10, 'Yesid Maldonado', 'ye123@algo.algo', '$2b$10$oY13EWug6HrrropXVJQXnOsO0cZnZufT3fJpJqWF16gaJvrjUqJg.'),
(11, 'Camilo Zapata', 'c.zc2002@rmcf.es', '$2b$10$kA/Tfq9fhtVaEaZ0jc4m6eTw4tBuMFyYQ4QnReGGV4aJIvM6pbZL6');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `reservaciones`
--
ALTER TABLE `reservaciones`
  ADD PRIMARY KEY (`idEvento`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `reservaciones`
--
ALTER TABLE `reservaciones`
  MODIFY `idEvento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `reservaciones`
--
ALTER TABLE `reservaciones`
  ADD CONSTRAINT `reservaciones_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
