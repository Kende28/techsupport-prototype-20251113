-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Nov 13. 10:03
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `techsupport`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `pc_components`
--

CREATE TABLE `pc_components` (
  `id` int(32) NOT NULL,
  `component_name` varchar(17) NOT NULL,
  `component_desc` varchar(255) NOT NULL,
  `component_available` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `pc_components`
--

INSERT INTO `pc_components` (`id`, `component_name`, `component_desc`, `component_available`) VALUES
(1, 'Intel i5 CPU', 'Középkategóriás processzor, 4 maggal és jó teljesítménnyel általános felhasználásra.', 1),
(2, '8GB DDR4 RAM', 'Gyors DDR4 típusú memória, ideális irodai és otthoni használatra.', 1),
(3, '256GB SSD', 'Gyors adatátviteli sebességű SSD meghajtó, megbízható tárhely megoldás.', 1),
(4, 'Ryzen 7 CPU', 'Nagy teljesítményű, többmagos AMD processzor játékhoz és munkaállomásokhoz.', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szamitogep_tabla`
--

CREATE TABLE `szamitogep_tabla` (
  `id` int(32) NOT NULL,
  `pc_name` varchar(17) NOT NULL,
  `pc_desc` varchar(255) NOT NULL,
  `component_id` int(32) NOT NULL,
  `component_name` varchar(17) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `szamitogep_tabla`
--

INSERT INTO `szamitogep_tabla` (`id`, `pc_name`, `pc_desc`, `component_id`, `component_name`) VALUES
(1, 'Office-PC', 'Irodai felhasználásra optimalizált számítógép', 1, 'Intel i5 CPU'),
(2, 'Office-PC', 'Irodai felhasználásra optimalizált számítógép', 2, '8GB DDR4 RAM'),
(3, 'Office-PC', 'Irodai felhasználásra optimalizált számítógép', 3, '256GB SSD'),
(4, 'Gaming-Rig', 'Nagy teljesítményű gamer PC RGB világítással', 4, 'Ryzen 7 CPU'),
(5, 'Gaming-Rig', 'Nagy teljesítményű gamer PC RGB világítással', 2, '8GB DDR4 RAM'),
(6, 'Gaming-Rig', 'Nagy teljesítményű gamer PC RGB világítással', 3, '256GB SSD'),
(7, 'Server-01', 'Fájlszerver és virtualizációs gép', 4, 'Ryzen 7 CPU'),
(8, 'Server-01', 'Fájlszerver és virtualizációs gép', 2, '8GB DDR4 RAM'),
(9, 'Server-01', 'Fájlszerver és virtualizációs gép', 3, '256GB SSD'),
(10, 'Mini-PC', 'Kompakt, energiatakarékos rendszer médiaközpontnak', 1, 'Intel i5 CPU'),
(11, 'Mini-PC', 'Kompakt, energiatakarékos rendszer médiaközpontnak', 2, '8GB DDR4 RAM'),
(12, 'Mini-PC', 'Kompakt, energiatakarékos rendszer médiaközpontnak', 3, '256GB SSD');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `pc_components`
--
ALTER TABLE `pc_components`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `szamitogep_tabla`
--
ALTER TABLE `szamitogep_tabla`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `pc_components`
--
ALTER TABLE `pc_components`
  MODIFY `id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `szamitogep_tabla`
--
ALTER TABLE `szamitogep_tabla`
  MODIFY `id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
