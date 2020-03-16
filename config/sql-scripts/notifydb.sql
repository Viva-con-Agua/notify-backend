-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 16. Mrz 2020 um 16:21
-- Server-Version: 10.1.32-MariaDB
-- PHP-Version: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `notifydb`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `status` enum('seen','deleted') NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `notifications`
--

INSERT INTO `notifications` (`id`, `type_id`, `type`, `status`, `user_id`, `date`) VALUES
(724, 458, 'news', 'deleted', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-03-05 17:53:53'),
(725, 474, 'news', 'deleted', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-03-05 17:53:53'),
(726, 140, 'comment', 'deleted', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-03-05 17:53:53'),
(727, 160, 'comment', 'deleted', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-03-05 17:53:53'),
(728, 161, 'comment', 'deleted', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-03-05 17:53:53'),
(729, 68, 'application', 'deleted', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-03-05 17:53:58'),
(730, 470, 'event', 'deleted', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-03-05 17:54:02'),
(731, 474, 'event', 'deleted', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-03-05 17:54:02'),
(732, 459, 'event', 'deleted', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-03-05 17:54:02'),
(733, 444, 'event', 'deleted', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-03-05 17:54:03'),
(734, 458, 'event', 'deleted', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-03-05 17:54:03'),
(735, 457, 'event', 'deleted', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-03-05 17:54:04'),
(736, 456, 'event', 'deleted', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-03-05 17:54:04');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=737;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
