-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 25, 2020 at 09:47 AM
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
  `status` enum('seen','deleted','new') NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `type_id`, `type`, `status`, `user_id`, `date`) VALUES
(29, 150, 'comment', 'deleted', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-19 15:42:06'),
(30, 149, 'comment', 'seen', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-19 15:42:06'),
(31, 147, 'comment', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-19 15:42:06'),
(32, 156, 'comment', 'deleted', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-19 15:42:06'),
(33, 144, 'comment', 'deleted', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-19 15:42:06'),
(34, 143, 'comment', 'seen', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-19 15:42:06'),
(35, 142, 'comment', 'deleted', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-19 15:42:06'),
(36, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-19 15:42:06'),
(37, 459, 'news', 'deleted', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-19 15:42:06'),
(38, 461, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-19 15:42:06'),
(39, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-19 15:53:47'),
(40, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-19 15:54:17'),
(41, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-19 15:55:18'),
(42, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-19 16:05:22'),
(43, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-19 17:34:55'),
(44, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-19 17:36:22'),
(45, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-19 17:38:52'),
(46, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-19 17:40:13'),
(47, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-19 17:41:42'),
(48, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-19 17:41:57'),
(49, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-19 17:43:11'),
(50, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-19 17:45:03'),
(51, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-19 18:05:41'),
(52, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-19 18:20:04'),
(53, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-21 08:38:11'),
(54, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-24 14:43:41'),
(55, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-24 14:44:43'),
(56, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-24 14:46:44'),
(57, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-24 14:51:22'),
(58, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-24 15:00:53'),
(59, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-24 15:01:57'),
(60, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-24 15:03:45'),
(61, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-24 15:06:18'),
(62, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-24 15:07:29'),
(63, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-24 15:08:59'),
(64, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-24 15:10:07'),
(65, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-24 15:10:39'),
(66, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-24 15:11:36'),
(67, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-24 15:13:40'),
(68, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-24 15:14:40'),
(69, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-24 15:15:49'),
(70, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-24 15:17:05'),
(71, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-24 15:18:42'),
(72, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-24 15:19:21'),
(73, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-25 07:20:17'),
(74, 458, 'news', 'new', 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7', '2020-02-25 07:23:53');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
