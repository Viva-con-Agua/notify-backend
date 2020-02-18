-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 18, 2020 at 04:51 PM
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
-- Database: `wavesdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE `applications` (
  `id` int(11) NOT NULL,
  `user_id` varchar(128) NOT NULL,
  `text` text DEFAULT NULL,
  `state` enum('WAITING','ACCEPTED','REJECTED') NOT NULL DEFAULT 'WAITING',
  `poolevent_id` int(11) NOT NULL,
  `edited_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`id`, `user_id`, `text`, `state`, `poolevent_id`, `edited_at`, `created_at`) VALUES
(65, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui.', 'ACCEPTED', 457, '2020-01-11 23:06:49', '2020-01-11 23:05:39'),
(66, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'Adressbeschreibung: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada.\n\n', 'REJECTED', 458, '2020-01-15 08:58:33', '2020-01-11 23:12:30'),
(67, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada.', 'ACCEPTED', 459, '2020-01-17 18:29:54', '2020-01-12 16:58:33'),
(68, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada.', 'ACCEPTED', 458, '2020-01-14 20:36:53', '2020-01-12 22:03:23'),
(69, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada. Sed eget libero et arcu tempor tincidunt in ac lectus. Maecenas vitae felis enim. In in tellus consequat, condimentum eros vitae, lacinia risus. Sed vehicula sem sed risus volutpat elementum.\n\nNunc accumsan tempus nunc ac aliquet. Integer non ullamcorper eros, in rutrum velit. Proin cursus orci sit amet lobortis iaculis. Praesent cond', 'WAITING', 463, '2020-01-13 19:47:50', '2020-01-13 19:47:50'),
(70, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui.', 'ACCEPTED', 461, '2020-01-24 09:59:22', '2020-01-23 20:13:14');

-- --------------------------------------------------------

--
-- Table structure for table `badges`
--

CREATE TABLE `badges` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `desc` text DEFAULT NULL,
  `type` enum('comments','poolevents','votes','connections','profiles','info','applications') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `edited_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `img_url` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `badges`
--

INSERT INTO `badges` (`id`, `name`, `desc`, `type`, `created_at`, `edited_at`, `img_url`) VALUES
(374, 'informed', 'read the information site', 'info', '2020-01-12 08:27:11', '2020-01-12 08:27:11', '//b.thumbs.redditmedia.com/xdKEqKiFPEtQPTvc0Qh_MoR-8y4IYkHnMajh27qhGjE.png'),
(375, 'profile completed', 'complete your profile', 'profiles', '2020-01-12 08:27:11', '2020-01-12 08:27:11', '//b.thumbs.redditmedia.com/xdKEqKiFPEtQPTvc0Qh_MoR-8y4IYkHnMajh27qhGjE.png'),
(376, 'First Event', 'Create your first Event', 'poolevents', '2020-01-12 08:27:11', '2020-01-12 08:27:11', '//b.thumbs.redditmedia.com/loJzR3eUrPNvKw6g9RktAletCoQjMityx8emC5w83sw.png'),
(377, 'Five Events', 'Create 5 Event', 'poolevents', '2020-01-12 08:27:11', '2020-01-12 08:27:11', '//b.thumbs.redditmedia.com/loJzR3eUrPNvKw6g9RktAletCoQjMityx8emC5w83sw.png'),
(378, 'Ten Events', 'Create 10 Event', 'poolevents', '2020-01-12 08:27:11', '2020-01-12 08:27:11', '//b.thumbs.redditmedia.com/loJzR3eUrPNvKw6g9RktAletCoQjMityx8emC5w83sw.png'),
(379, 'first comment', 'write your first comment', 'comments', '2020-01-12 08:27:11', '2020-01-12 08:27:11', '//b.thumbs.redditmedia.com/TnRIsjez67SOHX-F7iW56rSNpbORu-0V6zsR92TV6Qc.png'),
(380, 'Five comments', 'write 5 comments', 'comments', '2020-01-12 08:27:11', '2020-01-12 08:27:11', '//b.thumbs.redditmedia.com/TnRIsjez67SOHX-F7iW56rSNpbORu-0V6zsR92TV6Qc.png'),
(381, 'Ten comments', 'write ten comments', 'comments', '2020-01-12 08:27:11', '2020-01-12 08:27:11', '//b.thumbs.redditmedia.com/TnRIsjez67SOHX-F7iW56rSNpbORu-0V6zsR92TV6Qc.png'),
(382, 'First Votes', 'Vote for the first time', 'votes', '2020-01-12 08:27:11', '2020-01-12 08:27:11', '//a.thumbs.redditmedia.com/uag6mXIzTCfMDaLAGr8IQ6PdPnVerANcJDIgPZDeDx0.png'),
(383, 'Five Votes', 'Vote five times', 'votes', '2020-01-12 08:27:11', '2020-01-12 08:27:11', '//a.thumbs.redditmedia.com/uag6mXIzTCfMDaLAGr8IQ6PdPnVerANcJDIgPZDeDx0.png'),
(384, 'First application', 'Apply for the first time', 'applications', '2020-01-12 08:27:11', '2020-01-12 08:27:11', '//b.thumbs.redditmedia.com/xdKEqKiFPEtQPTvc0Qh_MoR-8y4IYkHnMajh27qhGjE.png'),
(385, '5 applications', 'apply for the fifth time', 'applications', '2020-01-12 08:27:11', '2020-01-12 08:27:11', '//b.thumbs.redditmedia.com/xdKEqKiFPEtQPTvc0Qh_MoR-8y4IYkHnMajh27qhGjE.png'),
(386, '10 applications', 'apply for the tenth time', 'applications', '2020-01-12 08:27:11', '2020-01-12 08:27:11', '//b.thumbs.redditmedia.com/xdKEqKiFPEtQPTvc0Qh_MoR-8y4IYkHnMajh27qhGjE.png');

-- --------------------------------------------------------

--
-- Table structure for table `badge_progress`
--

CREATE TABLE `badge_progress` (
  `id` int(11) NOT NULL,
  `user_id` varchar(128) NOT NULL,
  `badge_id` int(11) NOT NULL,
  `progress` int(11) NOT NULL DEFAULT 0,
  `completed` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `edited_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `type` enum('comments','connections','votes','poolevents','profiles','info','applications') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `badge_progress`
--

INSERT INTO `badge_progress` (`id`, `user_id`, `badge_id`, `progress`, `completed`, `created_at`, `edited_at`, `type`) VALUES
(762, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 374, 0, 1, '2020-01-12 08:27:11', '2020-01-22 07:50:55', 'info'),
(763, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 374, 0, 1, '2020-01-12 08:27:11', '2020-01-16 08:29:36', 'info'),
(764, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 375, 8, 0, '2020-01-12 08:27:11', '2020-01-12 11:33:14', 'profiles'),
(765, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 375, 8, 0, '2020-01-12 08:27:11', '2020-01-12 11:02:35', 'profiles'),
(766, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 376, 17, 0, '2020-01-12 08:27:11', '2020-01-18 11:50:29', 'poolevents'),
(767, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 376, 0, 0, '2020-01-12 08:27:11', '2020-01-12 08:27:11', 'poolevents'),
(768, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 377, 17, 0, '2020-01-12 08:27:11', '2020-01-18 11:50:29', 'poolevents'),
(769, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 377, 0, 0, '2020-01-12 08:27:11', '2020-01-12 08:27:11', 'poolevents'),
(770, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 378, 10, 1, '2020-01-12 08:27:11', '2020-01-12 09:26:48', 'poolevents'),
(771, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 378, 0, 0, '2020-01-12 08:27:11', '2020-01-12 08:27:11', 'poolevents'),
(772, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 379, 1, 1, '2020-01-12 08:27:11', '2020-01-16 13:50:53', 'comments'),
(773, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 379, 1, 1, '2020-01-12 08:27:11', '2020-01-12 11:06:11', 'comments'),
(774, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 380, 5, 1, '2020-01-12 08:27:11', '2020-01-22 08:18:59', 'comments'),
(775, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 380, 1, 0, '2020-01-12 08:27:11', '2020-01-12 11:06:11', 'comments'),
(776, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 381, 10, 1, '2020-01-12 08:27:11', '2020-01-23 20:19:57', 'comments'),
(777, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 381, 1, 0, '2020-01-12 08:27:11', '2020-01-12 11:06:11', 'comments'),
(778, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 382, 1, 1, '2020-01-12 08:27:11', '2020-01-13 17:44:27', 'votes'),
(779, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 382, 1, 1, '2020-01-12 08:27:11', '2020-01-12 11:06:28', 'votes'),
(780, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 383, 3, 0, '2020-01-12 08:27:11', '2020-01-23 20:20:08', 'votes'),
(781, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 383, 1, 0, '2020-01-12 08:27:11', '2020-01-12 11:06:28', 'votes'),
(782, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 384, 5, 0, '2020-01-12 08:27:11', '2020-01-23 20:13:14', 'applications'),
(783, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 384, 1, 1, '2020-01-12 08:27:11', '2020-01-12 22:03:23', 'applications'),
(784, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 385, 5, 1, '2020-01-12 08:27:11', '2020-01-23 20:13:14', 'applications'),
(785, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 385, 1, 0, '2020-01-12 08:27:11', '2020-01-12 22:03:23', 'applications'),
(786, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 386, 5, 0, '2020-01-12 08:27:11', '2020-01-23 20:13:14', 'applications'),
(787, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 386, 1, 0, '2020-01-12 08:27:11', '2020-01-12 22:03:23', 'applications');

-- --------------------------------------------------------

--
-- Table structure for table `challenges`
--

CREATE TABLE `challenges` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `desc` text DEFAULT NULL,
  `badge_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `type` enum('comments','poolevents','votes','connections','profiles','info','applications') NOT NULL,
  `points` int(11) NOT NULL DEFAULT 0,
  `edited_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `challenges`
--

INSERT INTO `challenges` (`id`, `name`, `desc`, `badge_id`, `created_at`, `type`, `points`, `edited_at`) VALUES
(363, 'informed', 'read the information site', 374, '2020-01-12 08:27:11', 'info', 1, '2020-01-12 08:27:11'),
(364, 'profile completed', 'complete your profile', 375, '2020-01-12 08:27:11', 'profiles', 9, '2020-01-12 08:27:11'),
(365, 'First Event', 'Create your first Event', 376, '2020-01-12 08:27:11', 'poolevents', 1, '2020-01-12 08:27:11'),
(366, 'Five Events', 'Create 5 Event', 377, '2020-01-12 08:27:11', 'poolevents', 5, '2020-01-12 08:27:11'),
(367, 'Ten Events', 'Create 10 Event', 378, '2020-01-12 08:27:11', 'poolevents', 10, '2020-01-12 08:27:11'),
(368, 'first comment', 'write your first comment', 379, '2020-01-12 08:27:11', 'comments', 1, '2020-01-12 08:27:11'),
(369, 'Five comments', 'write 5 comments', 380, '2020-01-12 08:27:11', 'comments', 5, '2020-01-12 08:27:11'),
(370, 'Ten comments', 'write ten comments', 381, '2020-01-12 08:27:11', 'comments', 10, '2020-01-12 08:27:11'),
(371, 'First Votes', 'Vote for the first time', 382, '2020-01-12 08:27:11', 'votes', 1, '2020-01-12 08:27:11'),
(372, 'Five Votes', 'Vote five times', 383, '2020-01-12 08:27:11', 'votes', 5, '2020-01-12 08:27:11'),
(373, 'First application', 'Apply for the first time', 384, '2020-01-12 08:27:11', 'applications', 1, '2020-01-12 08:27:11'),
(374, '5 applications', 'apply for the fifth time', 385, '2020-01-12 08:27:11', 'applications', 5, '2020-01-12 08:27:11'),
(375, '10 applications', 'apply for the tenth time', 386, '2020-01-12 08:27:11', 'applications', 10, '2020-01-12 08:27:11');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `text` text NOT NULL,
  `user_id` varchar(128) NOT NULL,
  `poolevent_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `edited_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `comment_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `text`, `user_id`, `poolevent_id`, `created_at`, `edited_at`, `comment_id`) VALUES
(140, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada. Sed eget libero et arcu tempor tincidunt in ac lectus. Maecenas vitae felis enim. In in tellus consequat, condimentum eros vitae, lacinia risus. Sed vehicula sem sed risus volutpat elementum.\n\nNunc accumsan tempus nunc ac aliquet. Integer non ullamcorper eros, in rutrum velit. Proin cursus orci sit amet lobortis iaculis. Praesent cond', '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 458, '2020-01-12 11:06:11', '2020-01-12 11:06:11', NULL),
(141, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget.', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 458, '2020-01-16 13:50:53', '2020-02-15 20:00:42', 140),
(142, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada.', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 459, '2020-01-21 21:17:51', '2020-01-21 21:17:51', NULL),
(143, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada. Sed eget libero et arcu tempor tincidunt in ac lectus. Maecenas vitae felis enim. In in tellus consequat, condimentum eros vitae, lacinia risus. Sed vehicula sem sed risus volutpat elementum.\n\nNunc accumsan tempus nunc ac aliquet. Integer non ullamcorper eros, in rutrum velit. Proin cursus orci sit amet lobortis iaculis. Praesent cond', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 461, '2020-01-22 08:12:18', '2020-01-22 08:12:18', NULL),
(144, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui.', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 461, '2020-01-22 08:16:54', '2020-02-15 20:00:51', 143),
(145, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada. Sed eget libero et arcu tempor tincidunt in ac lectus. Maecenas vitae felis enim. In in tellus consequat, condimentum eros vitae, lacinia risus. Sed vehicula sem sed risus volutpat elementum.\n\nNunc accumsan tempus nunc ac aliquet. Integer non ullamcorper eros, in rutrum velit. Proin cursus orci sit amet lobortis iaculis. Praesent cond', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 461, '2020-01-22 08:18:59', '2020-01-22 08:18:59', NULL),
(146, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada. Sed eget libero et arcu tempor tincidunt in ac lectus. Maecenas vitae felis enim. In in tellus consequat, condimentum eros vitae, lacinia risus. Sed vehicula sem sed risus volutpat elementum.\n\nNunc accumsan tempus nunc ac aliquet. Integer non ullamcorper eros, in rutrum velit. Proin cursus orci sit amet lobortis iaculis. Praesent cond', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 461, '2020-01-22 08:19:15', '2020-02-15 20:00:55', 144),
(147, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada.', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 459, '2020-01-23 20:19:50', '2020-01-23 20:19:50', NULL),
(148, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada.', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 459, '2020-01-23 20:19:56', '2020-01-23 20:19:56', NULL),
(149, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada.', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 459, '2020-01-23 20:19:56', '2020-02-15 20:01:02', 147),
(150, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada.', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 459, '2020-01-23 20:19:57', '2020-01-23 20:19:57', NULL),
(151, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada.', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 459, '2020-01-23 20:19:57', '2020-01-23 20:19:57', NULL),
(152, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada.', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 459, '2020-01-23 20:19:57', '2020-01-23 20:19:57', NULL),
(153, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada.', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 459, '2020-01-23 20:19:57', '2020-02-15 20:01:09', 149),
(154, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada.', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 459, '2020-01-23 20:19:57', '2020-01-23 20:19:57', NULL),
(155, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada.', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 459, '2020-01-23 20:19:57', '2020-01-23 20:19:57', NULL),
(156, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada. Sed eget libero et arcu tempor tincidunt in ac lectus. Maecenas vitae felis enim. In in tellus consequat, condimentum eros vitae, lacinia risus. Sed vehicula sem sed risus volutpat elementum.\r\n\r\nNunc accumsan tempus nunc ac aliquet. Integer non ullamcorper eros, in rutrum velit. Proin cursus orci sit amet lobortis iaculis. Praesent cond', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 474, '2020-01-22 08:18:59', '2020-01-22 08:18:59', NULL),
(157, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada.', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 473, '2020-01-21 21:17:51', '2020-01-21 21:17:51', NULL),
(158, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada.', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 474, '2020-01-23 20:19:50', '2020-02-15 20:01:19', 156),
(159, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada. Sed eget libero et arcu tempor tincidunt in ac lectus. Maecenas vitae felis enim. In in tellus consequat, condimentum eros vitae, lacinia risus. Sed vehicula sem sed risus volutpat elementum.\r\n\r\nNunc accumsan tempus nunc ac aliquet. Integer non ullamcorper eros, in rutrum velit. Proin cursus orci sit amet lobortis iaculis. Praesent cond', '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 468, '2020-01-12 11:06:11', '2020-01-12 11:06:11', NULL),
(160, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada. Sed eget libero et arcu tempor tincidunt in ac lectus. Maecenas vitae felis enim. In in tellus consequat, condimentum eros vitae, lacinia risus. Sed vehicula sem sed risus volutpat elementum.\r\n\r\nNunc accumsan tempus nunc ac aliquet. Integer non ullamcorper eros, in rutrum velit. Proin cursus orci sit amet lobortis iaculis. Praesent cond', '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 474, '2020-01-12 11:06:11', '2020-01-12 11:06:11', NULL),
(161, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada. Sed eget libero et arcu tempor tincidunt in ac lectus. Maecenas vitae felis enim. In in tellus consequat, condimentum eros vitae, lacinia risus. Sed vehicula sem sed risus volutpat elementum.\r\n\r\nNunc accumsan tempus nunc ac aliquet. Integer non ullamcorper eros, in rutrum velit. Proin cursus orci sit amet lobortis iaculis. Praesent cond', '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 472, '2020-01-12 11:06:11', '2020-01-12 11:06:11', NULL),
(162, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada. Sed eget libero et arcu tempor tincidunt in ac lectus. Maecenas vitae felis enim. In in tellus consequat, condimentum eros vitae, lacinia risus. Sed vehicula sem sed risus volutpat elementum.\r\n\r\nNunc accumsan tempus nunc ac aliquet. Integer non ullamcorper eros, in rutrum velit. Proin cursus orci sit amet lobortis iaculis. Praesent cond', '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 470, '2020-01-12 11:06:11', '2020-01-12 11:06:11', NULL),
(163, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada. Sed eget libero et arcu tempor tincidunt in ac lectus. Maecenas vitae felis enim. In in tellus consequat, condimentum eros vitae, lacinia risus. Sed vehicula sem sed risus volutpat elementum.\r\n\r\nNunc accumsan tempus nunc ac aliquet. Integer non ullamcorper eros, in rutrum velit. Proin cursus orci sit amet lobortis iaculis. Praesent cond', '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 470, '2020-01-12 11:06:11', '2020-02-15 20:12:44', 161);

-- --------------------------------------------------------

--
-- Table structure for table `connections`
--

CREATE TABLE `connections` (
  `id` int(11) NOT NULL,
  `username` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `descriptions`
--

CREATE TABLE `descriptions` (
  `id` int(11) NOT NULL,
  `text` text NOT NULL,
  `html` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `edited_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `poolevent_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `descriptions`
--

INSERT INTO `descriptions` (`id`, `text`, `html`, `created_at`, `edited_at`, `poolevent_id`) VALUES
(361, '', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada.</p>', '2020-01-11 19:19:21', '2020-01-11 20:11:22', 456),
(362, '', '<p>Lorem ipsum dolor.</p>', '2020-01-11 19:19:38', '2020-01-11 19:19:38', 457),
(363, '', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada.</p>', '2020-01-11 19:19:39', '2020-01-16 16:09:23', 458),
(364, '', '<p>Lorem ipsum dolor.</p>', '2020-01-11 19:19:40', '2020-01-11 19:19:40', 459),
(365, '', '<p>Lorem ipsum dolor.</p>', '2020-01-11 19:19:41', '2020-01-11 19:19:41', 460),
(366, '', '<p>Lorem ipsum dolor.</p>', '2020-01-11 19:19:41', '2020-01-11 19:19:41', 461),
(367, '', '<p>loremLorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui.</p>', '2020-01-12 09:02:49', '2020-01-12 09:02:49', 462),
(368, '', '<p>loremLorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui.</p>', '2020-01-12 09:02:57', '2020-01-12 09:02:57', 463),
(369, '', '<p>lorem</p>', '2020-01-12 09:25:20', '2020-01-12 09:25:20', 464),
(370, '', '<p>lorem</p>', '2020-01-12 09:26:48', '2020-01-12 09:26:48', 465),
(371, '', '<p>scoop</p>', '2020-01-13 19:31:22', '2020-01-13 19:31:22', 466),
(372, '', '<p>scoop</p>', '2020-01-13 19:31:28', '2020-01-13 19:31:28', 467),
(373, '', '<p>scoop</p>', '2020-01-13 19:31:37', '2020-01-13 19:31:37', 468),
(374, '', '<p>scoop</p>', '2020-01-13 19:33:21', '2020-01-13 19:33:21', 469),
(375, '', '<p>hidden</p>', '2020-01-13 20:26:01', '2020-01-13 20:26:01', 470),
(376, '', '', '2020-01-17 19:07:37', '2020-01-17 19:07:37', 471),
(377, '', '', '2020-01-18 11:50:29', '2020-01-18 11:50:29', 472),
(378, '', '', '2020-01-17 19:07:37', '2020-01-17 19:07:37', 473),
(379, '', '<p>scoop</p>', '2020-01-13 19:31:22', '2020-01-13 19:31:22', 474),
(380, '', '<p>scoop</p>', '2020-01-13 19:31:37', '2020-01-13 19:31:37', 475);

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `poolevent_id` int(11) NOT NULL,
  `user_id` varchar(128) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`id`, `poolevent_id`, `user_id`, `created_at`) VALUES
(44, 381, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2019-12-26 21:55:35'),
(45, 382, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2019-12-26 21:55:36'),
(46, 380, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2019-12-26 21:55:53'),
(47, 473, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', '2019-12-27 15:23:31'),
(48, 383, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', '2019-12-27 15:23:35'),
(49, 385, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', '2019-12-27 18:49:12'),
(50, 394, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', '2019-12-29 23:12:15'),
(51, 474, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', '2019-12-30 19:11:06'),
(52, 406, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2020-01-02 08:43:32'),
(54, 420, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2020-01-07 19:04:25'),
(55, 420, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', '2020-01-07 20:32:15'),
(56, 447, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', '2020-01-07 20:58:03'),
(58, 451, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', '2020-01-10 13:35:38'),
(60, 450, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', '2020-01-10 13:43:47'),
(62, 471, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2020-01-11 19:40:08'),
(63, 459, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2020-01-11 19:40:09'),
(64, 460, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2020-01-11 19:40:11');

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `poolevent_id` int(11) NOT NULL,
  `route` varchar(45) NOT NULL,
  `street_number` varchar(45) NOT NULL,
  `full_address` varchar(45) DEFAULT NULL,
  `longitude` varchar(45) NOT NULL,
  `latitude` varchar(45) NOT NULL,
  `locality` varchar(45) NOT NULL,
  `country` varchar(45) DEFAULT NULL,
  `postal_code` varchar(45) DEFAULT NULL,
  `desc` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `poolevent_id`, `route`, `street_number`, `full_address`, `longitude`, `latitude`, `locality`, `country`, `postal_code`, `desc`) VALUES
(384, 456, 'Schönefelder Chaussee', '2', 'Schönefelder Chaussee 2, 12524 Berlin', '13.53542', '52.41835', 'Berlin', '', '12524', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada.'),
(385, 457, 'Schönefelder Chaussee', '2', 'Schönefelder Chaussee 2, 12524 Berlin', '13.53542', '52.41835', 'Berlin', '', '12524', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada.'),
(386, 458, 'Schönefelder Chaussee', '2', 'Schönefelder Chaussee 2, 12524 Berlin', '13.53542', '52.41835', 'Berlin', '', '12524', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada.'),
(387, 459, 'Schönefelder Chaussee', '2', 'Schönefelder Chaussee 2, 12524 Berlin', '13.53542', '52.41835', 'Berlin', '', '12524', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada.'),
(388, 460, 'Schönefelder Chaussee', '2', 'Schönefelder Chaussee 2, 12524 Berlin', '13.53542', '52.41835', 'Berlin', '', '12524', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada.'),
(389, 461, 'Schönefelder Chaussee', '2', 'Schönefelder Chaussee 2, 12524 Berlin', '13.53542', '52.41835', 'Berlin', '', '12524', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada.'),
(390, 462, 'Schönhauser Allee', '2', 'Schönhauser Allee 2, 10119 Berlin', '13.41067', '52.52889', 'Berlin', '', '10119', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui.'),
(391, 463, 'Schönhauser Allee', '2', 'Schönhauser Allee 2, 10119 Berlin', '13.41067', '52.52889', 'Berlin', '', '10119', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui.'),
(392, 464, 'Radler Straße', '2', 'Radler Straße 2, 87600 Kaufbeuren', '10.6349513', '47.9052502', 'Kaufbeuren', '', '87600', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum.'),
(393, 465, 'Radler Straße', '2', 'Radler Straße 2, 87600 Kaufbeuren', '10.6349513', '47.9052502', 'Kaufbeuren', '', '87600', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum.'),
(394, 466, 'Wall Street', '2', 'Wall Street 2, 10005 New York', '-74.0113063', '40.7077394', 'New York', '', '10005', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada. Sed eget libero et arcu tempor tincidunt in ac lectus. Maecenas vitae felis enim. In in tellus consequat, condimentum eros vitae, lacinia risus. Sed vehicula sem sed risus volutpat elementum.\n\nNunc accumsan tempus nunc ac aliquet. Integer non ullamcorper eros, in rutrum velit. Proin cursus orci sit amet lobortis iaculis. Praesent cond'),
(395, 467, 'Wall Street', '2', 'Wall Street 2, 10005 New York', '-74.0113063', '40.7077394', 'New York', '', '10005', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada. Sed eget libero et arcu tempor tincidunt in ac lectus. Maecenas vitae felis enim. In in tellus consequat, condimentum eros vitae, lacinia risus. Sed vehicula sem sed risus volutpat elementum.\n\nNunc accumsan tempus nunc ac aliquet. Integer non ullamcorper eros, in rutrum velit. Proin cursus orci sit amet lobortis iaculis. Praesent cond'),
(396, 468, 'Wall Street', '2', 'Wall Street 2, 10005 New York', '-74.0113063', '40.7077394', 'New York', '', '10005', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada. Sed eget libero et arcu tempor tincidunt in ac lectus. Maecenas vitae felis enim. In in tellus consequat, condimentum eros vitae, lacinia risus. Sed vehicula sem sed risus volutpat elementum.\n\nNunc accumsan tempus nunc ac aliquet. Integer non ullamcorper eros, in rutrum velit. Proin cursus orci sit amet lobortis iaculis. Praesent cond'),
(397, 469, 'Wall Street', '2', 'Wall Street 2, 10005 New York', '-74.0113063', '40.7077394', 'New York', '', '10005', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada. Sed eget libero et arcu tempor tincidunt in ac lectus. Maecenas vitae felis enim. In in tellus consequat, condimentum eros vitae, lacinia risus. Sed vehicula sem sed risus volutpat elementum.\n\nNunc accumsan tempus nunc ac aliquet. Integer non ullamcorper eros, in rutrum velit. Proin cursus orci sit amet lobortis iaculis. Praesent cond'),
(398, 470, 'Lorettostraße', '2', 'Lorettostraße 2, 40219 Düsseldorf', '6.7673341', '51.2149774', 'Düsseldorf', '', '40219', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui.'),
(399, 474, 'Sacramento Street', '2', 'Sacramento Street 2, 94111 San Francisco', '-122.3981838', '37.7945759', 'San Francisco', '', '94111', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum.'),
(400, 472, 'Warschauer Straße', '12', 'Warschauer Straße 12, 10243 Berlin', '13.4525667', '52.5132387', 'Berlin', '', '10243', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui.'),
(401, 471, 'Schönefelder Chaussee', '2', 'Schönefelder Chaussee 2, 12524 Berlin', '13.53542', '52.41835', 'Berlin', '', '12524', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada.'),
(402, 473, 'Sacramento Street', '2', 'Sacramento Street 2, 94111 San Francisco', '-122.3981838', '37.7945759', 'San Francisco', '', '94111', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum.'),
(403, 475, 'Wall Street', '2', 'Wall Street 2, 10005 New York', '-74.0113063', '40.7077394', 'New York', '', '10005', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et fermentum dui. Ut orci quam, ornare sed lorem sed, hendrerit auctor dolor. Nulla viverra, nibh quis ultrices malesuada, ligula ipsum vulputate diam, aliquam egestas nibh ante vel dui. Sed in tellus interdum eros vulputate placerat sed non enim. Pellentesque eget justo porttitor urna dictum fermentum sit amet sed mauris. Praesent molestie vestibulum erat ac rhoncus. Aenean nunc risus, accumsan nec ipsum et, convallis sollicitudin dui. Proin dictum quam a semper malesuada. Etiam porta sit amet risus quis porta. Nulla facilisi. Cras at interdum ante. Ut gravida pharetra ligula vitae malesuada. Sed eget libero et arcu tempor tincidunt in ac lectus. Maecenas vitae felis enim. In in tellus consequat, condimentum eros vitae, lacinia risus. Sed vehicula sem sed risus volutpat elementum.\r\n\r\nNunc accumsan tempus nunc ac aliquet. Integer non ullamcorper eros, in rutrum velit. Proin cursus orci sit amet lobortis iaculis. Praesent cond');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` varchar(128) NOT NULL,
  `type` enum('poolevents','comments','votes','badges') NOT NULL COMMENT 'ENUM(''PE_NEW'', \\\\\\\\n''PE_RELEASED'',\\\\\\\\n ''PE_CANCELLED'', \\\\\\\\n''NEW_COMMENT'', \\\\\\\\n''NEW_VOTE'', \\\\\\\\n''APPLICATION_REJECTED'',\\\\\\\\n ''APPLICATION_ACCEPETED’,\\\\\\\\n)',
  `desc` text DEFAULT NULL,
  `source_id` int(11) NOT NULL,
  `dirty` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `trigger_id` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `type`, `desc`, `source_id`, `dirty`, `created_at`, `trigger_id`) VALUES
(708, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'poolevents', NULL, 0, 1, '2020-01-11 19:19:21', NULL),
(709, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'poolevents', NULL, 0, 1, '2020-01-11 19:19:38', NULL),
(710, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'poolevents', NULL, 0, 1, '2020-01-11 19:19:39', NULL),
(711, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'poolevents', NULL, 0, 1, '2020-01-11 19:19:40', NULL),
(712, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'poolevents', NULL, 0, 1, '2020-01-11 19:19:41', NULL),
(713, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'poolevents', NULL, 0, 1, '2020-01-11 19:19:41', NULL),
(714, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'poolevents', NULL, 0, 1, '2020-01-12 09:02:49', NULL),
(715, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 'poolevents', NULL, 0, 1, '2020-01-12 09:02:49', NULL),
(716, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'poolevents', NULL, 0, 1, '2020-01-12 09:02:57', NULL),
(717, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 'poolevents', NULL, 0, 1, '2020-01-12 09:02:57', NULL),
(718, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'poolevents', NULL, 0, 1, '2020-01-12 09:25:20', NULL),
(719, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 'poolevents', NULL, 0, 1, '2020-01-12 09:25:20', NULL),
(720, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'poolevents', NULL, 0, 1, '2020-01-12 09:26:48', NULL),
(721, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 'poolevents', NULL, 0, 1, '2020-01-12 09:26:48', NULL),
(722, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'badges', '', 378, 1, '2020-01-12 09:26:48', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f'),
(723, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 'badges', '', 379, 1, '2020-01-12 11:06:11', '8d411dc4-e76f-4d0e-a027-056a0bc43be5'),
(724, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 'badges', '', 382, 1, '2020-01-12 11:06:28', '8d411dc4-e76f-4d0e-a027-056a0bc43be5'),
(725, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 'badges', '', 384, 1, '2020-01-12 22:03:23', '8d411dc4-e76f-4d0e-a027-056a0bc43be5'),
(726, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'badges', '', 382, 1, '2020-01-13 17:44:27', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f'),
(727, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'poolevents', NULL, 0, 1, '2020-01-13 19:31:22', NULL),
(728, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 'poolevents', NULL, 0, 1, '2020-01-13 19:31:22', NULL),
(729, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'poolevents', NULL, 0, 1, '2020-01-13 19:31:28', NULL),
(730, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 'poolevents', NULL, 0, 1, '2020-01-13 19:31:28', NULL),
(731, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'poolevents', NULL, 0, 1, '2020-01-13 19:31:37', NULL),
(732, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 'poolevents', NULL, 0, 1, '2020-01-13 19:31:37', NULL),
(733, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'poolevents', NULL, 0, 1, '2020-01-13 19:33:21', NULL),
(734, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 'poolevents', NULL, 0, 1, '2020-01-13 19:33:21', NULL),
(735, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'poolevents', NULL, 0, 1, '2020-01-13 20:26:01', NULL),
(736, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 'poolevents', NULL, 0, 1, '2020-01-13 20:26:01', NULL),
(737, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'badges', '', 379, 1, '2020-01-16 13:50:53', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f'),
(738, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'poolevents', NULL, 0, 1, '2020-01-17 19:07:37', NULL),
(739, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 'poolevents', NULL, 0, 1, '2020-01-17 19:07:37', NULL),
(740, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'poolevents', NULL, 0, 1, '2020-01-18 11:50:29', NULL),
(741, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', 'poolevents', NULL, 0, 1, '2020-01-18 11:50:29', NULL),
(742, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'badges', '', 380, 1, '2020-01-22 08:18:59', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f'),
(743, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'badges', '', 385, 1, '2020-01-23 20:13:14', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f'),
(744, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'badges', '', 381, 1, '2020-01-23 20:19:57', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f');

-- --------------------------------------------------------

--
-- Table structure for table `notification_badges`
--

CREATE TABLE `notification_badges` (
  `id` int(11) NOT NULL,
  `notification_type` enum('NEW') DEFAULT NULL,
  `source_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notification_badges`
--

INSERT INTO `notification_badges` (`id`, `notification_type`, `source_id`) VALUES
(722, 'NEW', 378),
(723, 'NEW', 379),
(724, 'NEW', 382),
(725, 'NEW', 384),
(726, 'NEW', 382),
(737, 'NEW', 379),
(742, 'NEW', 380),
(743, 'NEW', 385),
(744, 'NEW', 381);

-- --------------------------------------------------------

--
-- Table structure for table `notification_poolevents`
--

CREATE TABLE `notification_poolevents` (
  `id` int(11) NOT NULL,
  `notification_type` enum('NEW') DEFAULT NULL,
  `source_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notification_poolevents`
--

INSERT INTO `notification_poolevents` (`id`, `notification_type`, `source_id`) VALUES
(708, 'NEW', 456),
(709, 'NEW', 457),
(710, 'NEW', 458),
(711, 'NEW', 459),
(712, 'NEW', 460),
(713, 'NEW', 461),
(714, 'NEW', 462),
(715, 'NEW', 462),
(716, 'NEW', 463),
(717, 'NEW', 463),
(718, 'NEW', 464),
(719, 'NEW', 464),
(720, 'NEW', 465),
(721, 'NEW', 465),
(727, 'NEW', 466),
(728, 'NEW', 466),
(729, 'NEW', 467),
(730, 'NEW', 467),
(731, 'NEW', 468),
(732, 'NEW', 468),
(733, 'NEW', 469),
(734, 'NEW', 469),
(735, 'NEW', 470),
(736, 'NEW', 470),
(738, 'NEW', 471),
(739, 'NEW', 471),
(740, 'NEW', 472),
(741, 'NEW', 472);

-- --------------------------------------------------------

--
-- Table structure for table `poolevents`
--

CREATE TABLE `poolevents` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `event_start` timestamp NULL DEFAULT NULL,
  `event_end` timestamp NULL DEFAULT NULL,
  `application_start` timestamp NULL DEFAULT NULL,
  `application_end` timestamp NULL DEFAULT NULL,
  `asp_event_id` varchar(128) DEFAULT NULL,
  `website` text DEFAULT NULL,
  `supporter_lim` int(11) DEFAULT 0,
  `active_user_only` tinyint(1) DEFAULT 0,
  `user_id` varchar(128) NOT NULL,
  `edited_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `state` enum('UNRELEASED','RELEASED','REJECTED','DRAFT','CANCELED') NOT NULL DEFAULT 'UNRELEASED',
  `idevent_type` int(11) NOT NULL,
  `fave_count` int(11) NOT NULL DEFAULT 0,
  `is_deleted` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `poolevents`
--

INSERT INTO `poolevents` (`id`, `name`, `created_at`, `event_start`, `event_end`, `application_start`, `application_end`, `asp_event_id`, `website`, `supporter_lim`, `active_user_only`, `user_id`, `edited_at`, `state`, `idevent_type`, `fave_count`, `is_deleted`) VALUES
(456, 'Lorem ipsum dolor.', '2020-01-11 19:19:21', '2020-03-11 17:18:47', '2020-03-11 17:18:48', '2020-12-11 17:19:17', '2020-02-25 17:19:18', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'Lorem ipsum dolor.', 4, 0, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2020-02-15 12:20:45', 'RELEASED', 0, 0, b'0'),
(457, 'Lorem ipsum dolor.', '2020-01-11 19:19:38', '2020-03-11 18:18:47', '2020-03-11 18:18:48', '2020-02-11 18:19:17', '2020-02-16 18:19:18', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'Lorem ipsum dolor.', 6, 0, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2020-02-15 12:20:42', 'RELEASED', 1, 0, b'0'),
(458, 'Scoop :>', '2020-01-11 19:19:39', '2020-03-11 17:18:47', '2020-03-11 17:18:48', '2020-02-11 17:19:17', '2020-02-25 17:19:18', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'Lorem ipsum dolor.', 3, 0, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2020-02-16 19:35:43', 'RELEASED', 0, 1, b'0'),
(459, 'Lorem ipsum dolor.', '2020-01-11 19:19:40', '2020-03-11 18:18:47', '2020-03-11 18:18:48', '2020-02-11 18:19:17', '2020-02-17 18:19:18', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'Lorem ipsum dolor.', 3, 0, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2020-02-15 12:23:34', 'RELEASED', 1, 1, b'0'),
(460, 'Lorem ipsum dolor.', '2020-01-11 19:19:41', '2020-01-11 18:18:47', '2020-01-11 18:18:48', '2020-01-11 18:19:17', '2020-01-11 18:19:18', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'Lorem ipsum dolor.', 3, 0, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2020-01-12 13:57:24', 'REJECTED', 1, 1, b'0'),
(461, 'Lorem ipsum dolor.', '2020-01-11 19:19:41', '2020-01-11 18:18:47', '2020-01-11 18:18:48', '2020-01-11 18:19:17', '2020-01-11 18:19:18', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'Lorem ipsum dolor.', 3, 0, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2020-01-23 12:30:46', 'RELEASED', 1, 0, b'0'),
(462, 'Lorem ipsum dolor.', '2020-01-12 09:02:49', '2020-01-12 08:00:18', '2020-01-12 08:00:19', '2020-01-12 08:00:55', '2020-01-12 08:00:54', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'lorem', 5, 0, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2020-01-23 12:16:18', 'RELEASED', 6, 0, b'0'),
(463, 'Lorem ipsum dolor.', '2020-01-12 09:02:57', '2020-03-12 08:00:18', '2020-03-12 08:00:19', '2020-02-12 08:00:55', '2020-02-15 23:00:00', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'lorem', 5, 0, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2020-02-15 12:16:45', 'CANCELED', 6, 0, b'0'),
(464, 'Radiohead', '2020-01-12 09:25:20', '2020-01-12 08:24:48', '2020-01-12 08:24:50', '2020-01-12 08:25:16', '2020-01-12 08:25:17', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '', 4, 0, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2020-02-15 12:10:50', 'CANCELED', 2, 0, b'0'),
(465, 'Radiohead', '2020-01-12 09:26:48', '2020-01-12 08:24:48', '2020-01-12 08:24:50', '2020-01-12 08:25:16', '2020-01-12 08:25:17', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'lorem', 4, 0, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2020-01-13 19:49:28', 'RELEASED', 2, 0, b'0'),
(466, 'Lorem ipsum dolor.', '2020-01-13 19:31:22', '2020-01-13 18:24:17', '2020-01-13 18:24:18', '2020-01-13 18:24:42', '2020-01-13 18:24:42', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'lorem', 3, 0, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2020-01-13 19:50:36', 'RELEASED', 3, 0, b'0'),
(467, 'Lorem ipsum dolor.', '2020-01-13 19:31:28', '2020-01-13 18:24:17', '2020-01-13 18:24:18', '2020-01-13 18:24:42', '2020-01-13 18:24:42', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'lorem', 3, 0, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2020-01-13 20:57:08', 'RELEASED', 3, 0, b'0'),
(468, 'Lorem ipsum dolor.', '2020-01-13 19:31:37', '2020-01-13 18:24:17', '2020-01-13 18:24:18', '2020-01-13 18:24:42', '2020-01-13 18:24:42', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'lorem', 3, 0, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2020-01-23 12:13:13', 'RELEASED', 3, 0, b'0'),
(469, 'Lorem ipsum dolor.', '2020-01-13 19:33:21', '2020-01-13 18:24:17', '2020-01-13 18:24:18', '2020-01-13 18:24:42', '2020-01-13 18:24:42', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'www.lol.com', 3, 0, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2020-01-13 19:33:21', 'UNRELEASED', 3, 0, b'0'),
(470, 'tocotronic', '2020-01-13 20:26:01', '2020-04-08 20:00:00', '2025-01-09 22:02:00', '2020-01-13 19:25:22', '2020-03-16 19:25:23', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'www.lorem12.com', 5, 0, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2020-02-15 12:20:38', 'RELEASED', 2, 0, b'0'),
(471, 'Viva con agua', '2020-01-17 19:07:37', '2020-01-17 18:06:49', '2020-01-17 18:06:51', '2020-01-17 18:07:31', '2020-01-17 18:07:32', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'www.scoop.com', 6, 0, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2020-01-17 19:08:46', 'RELEASED', 5, 0, b'0'),
(472, 'Test 1', '2020-01-18 11:50:29', '2020-01-18 10:49:45', '2020-01-18 10:49:46', '2020-01-18 10:50:20', '2020-01-18 10:50:21', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'www.scoop-com.com', 2, 0, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2020-01-18 11:50:29', 'UNRELEASED', 3, 0, b'0'),
(473, 'new', '2020-01-12 09:02:57', '2020-03-12 08:00:18', '2020-03-12 08:00:19', '2020-02-12 08:00:55', '2020-02-15 23:00:00', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'lorem', 5, 0, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2020-02-15 12:16:45', 'RELEASED', 6, 0, b'0'),
(474, 'MYEVENT', '2020-01-13 20:26:01', '2020-04-08 20:00:00', '2025-01-09 22:02:00', '2020-01-13 19:25:22', '2020-03-16 19:25:23', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'www.lorem12.com', 5, 0, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2020-02-15 12:20:38', 'RELEASED', 2, 0, b'0'),
(475, 'Lets Party', '2020-01-11 19:19:40', '2020-03-11 18:18:47', '2020-03-11 18:18:48', '2020-02-11 18:19:17', '2020-02-25 18:19:18', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'Lorem ipsum dolor.', 3, 0, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2020-02-15 12:16:38', 'RELEASED', 1, 1, b'0');

-- --------------------------------------------------------

--
-- Table structure for table `poolevent_trophies`
--

CREATE TABLE `poolevent_trophies` (
  `idpoolevent_trophie` int(10) UNSIGNED NOT NULL,
  `poolevent_id` int(11) NOT NULL,
  `trophie` enum('GOLD','SILVER','BRONZE') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `poolevent_types`
--

CREATE TABLE `poolevent_types` (
  `idevent_type` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `poolevent_types`
--

INSERT INTO `poolevent_types` (`idevent_type`, `name`, `created_at`) VALUES
(1, 'Netzwerk Treffen', '2020-01-10 11:57:29'),
(2, 'concert', '2020-01-10 11:57:29'),
(3, 'festival', '2020-01-10 11:57:29'),
(4, 'goldeimer festival', '2020-01-10 11:57:29'),
(5, 'run4wash', '2020-01-10 11:57:29'),
(6, 'test', '2020-01-10 11:57:29');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `idroles` int(11) NOT NULL,
  `role` varchar(45) NOT NULL,
  `user_id` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`idroles`, `role`, `user_id`) VALUES
(12, 'supporter', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f'),
(13, 'admin', '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f'),
(14, 'supporter', '8d411dc4-e76f-4d0e-a027-056a0bc43be5');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(128) NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `edited_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `email_address` varchar(50) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `access_token` text DEFAULT NULL,
  `full_name` varchar(45) DEFAULT NULL,
  `verfied` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `created_at`, `edited_at`, `email_address`, `age`, `access_token`, `full_name`, `verfied`) VALUES
('4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', 'Doe', 'John', '2020-01-11 13:46:16', '2020-01-16 13:50:20', NULL, NULL, '7af98a2fdaea1a23cbbf5907', 'John Doe', 1),
('8d411dc4-e76f-4d0e-a027-056a0bc43be5', 'waves', 'dev', '2020-01-11 21:27:23', '2020-02-15 15:45:26', NULL, NULL, '1e1c63c00c9f988da85c57db', 'dev waves', 1);

-- --------------------------------------------------------

--
-- Table structure for table `votes`
--

CREATE TABLE `votes` (
  `id` int(11) NOT NULL,
  `user_id` varchar(128) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `comment_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `votes`
--

INSERT INTO `votes` (`id`, `user_id`, `created_at`, `comment_id`) VALUES
(127, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', '2020-01-12 11:06:28', 140),
(128, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2020-01-13 17:44:27', 140),
(129, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2020-01-21 21:17:58', 142),
(130, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2020-01-23 20:20:08', 150),
(131, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2020-01-13 17:44:27', 160),
(133, '4a74141e-c2c0-46a0-9c0c-84bef8be7d0f', '2020-01-23 20:20:08', 161),
(135, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', '2020-01-12 11:06:28', 161),
(136, '8d411dc4-e76f-4d0e-a027-056a0bc43be5', '2020-01-12 11:06:28', 160);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_uid_peid` (`user_id`,`poolevent_id`),
  ADD KEY `fk_poolevent_idx` (`poolevent_id`),
  ADD KEY `fk_user_idx` (`user_id`);

--
-- Indexes for table `badges`
--
ALTER TABLE `badges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `badge_progress`
--
ALTER TABLE `badge_progress`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_badge_progress` (`user_id`,`badge_id`);

--
-- Indexes for table `challenges`
--
ALTER TABLE `challenges`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_challenges` (`badge_id`,`points`,`type`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `fk_poolevent_idx` (`poolevent_id`);

--
-- Indexes for table `connections`
--
ALTER TABLE `connections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `descriptions`
--
ALTER TABLE `descriptions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `userfave_idx` (`user_id`),
  ADD KEY `poolevent_fave_idx` (`poolevent_id`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notification_badges`
--
ALTER TABLE `notification_badges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notification_poolevents`
--
ALTER TABLE `notification_poolevents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `poolevents`
--
ALTER TABLE `poolevents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `poolevent_trophies`
--
ALTER TABLE `poolevent_trophies`
  ADD PRIMARY KEY (`idpoolevent_trophie`);

--
-- Indexes for table `poolevent_types`
--
ALTER TABLE `poolevent_types`
  ADD PRIMARY KEY (`idevent_type`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`idroles`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_user_id_comment_id` (`user_id`,`comment_id`),
  ADD KEY `fk_uservote_id_idx` (`user_id`),
  ADD KEY `fk_votecomment_id_idx` (`comment_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applications`
--
ALTER TABLE `applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `badges`
--
ALTER TABLE `badges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=387;

--
-- AUTO_INCREMENT for table `badge_progress`
--
ALTER TABLE `badge_progress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=788;

--
-- AUTO_INCREMENT for table `challenges`
--
ALTER TABLE `challenges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=376;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=164;

--
-- AUTO_INCREMENT for table `descriptions`
--
ALTER TABLE `descriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=381;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=404;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=745;

--
-- AUTO_INCREMENT for table `poolevents`
--
ALTER TABLE `poolevents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=476;

--
-- AUTO_INCREMENT for table `poolevent_trophies`
--
ALTER TABLE `poolevent_trophies`
  MODIFY `idpoolevent_trophie` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=485;

--
-- AUTO_INCREMENT for table `poolevent_types`
--
ALTER TABLE `poolevent_types`
  MODIFY `idevent_type` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `idroles` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `votes`
--
ALTER TABLE `votes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_poolevent` FOREIGN KEY (`poolevent_id`) REFERENCES `poolevents` (`id`);

--
-- Constraints for table `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `fk_votecomment_id` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
