-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 16, 2020 at 08:45 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `notifydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `status` enum('seen','deleted') NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `type_id`, `type`, `status`, `user_id`, `date`) VALUES
(11, 140, 'comment', 'seen', '8d411dc4-e76f-4d0e-a027-056a0bc43be5', '2020-02-16 19:03:08'),
(12, 160, 'comment', 'seen', '8d411dc4-e76f-4d0e-a027-056a0bc43be5', '2020-02-16 19:03:08'),
(13, 161, 'comment', 'seen', '8d411dc4-e76f-4d0e-a027-056a0bc43be5', '2020-02-16 19:03:08'),
(14, 458, 'news', 'seen', '8d411dc4-e76f-4d0e-a027-056a0bc43be5', '2020-02-16 19:03:08'),
(15, 474, 'news', 'seen', '8d411dc4-e76f-4d0e-a027-056a0bc43be5', '2020-02-16 19:03:08'),
(16, 457, 'event', 'seen', '8d411dc4-e76f-4d0e-a027-056a0bc43be5', '2020-02-16 19:32:21'),
(17, 473, 'event', 'seen', '8d411dc4-e76f-4d0e-a027-056a0bc43be5', '2020-02-16 19:33:36'),
(18, 456, 'event', 'seen', '8d411dc4-e76f-4d0e-a027-056a0bc43be5', '2020-02-16 19:44:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
