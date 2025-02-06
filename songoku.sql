-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 25, 2025 at 03:30 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `songoku`
--

-- --------------------------------------------------------

--
-- Table structure for table `discount`
--

CREATE TABLE `discount` (
  `id` int(11) NOT NULL,
  `discount` varchar(255) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `percent` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `discount`
--

INSERT INTO `discount` (`id`, `discount`, `count`, `percent`) VALUES
(1, 'ringdz', 1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `link_download` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tools`
--

CREATE TABLE `tools` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lifetime` int(11) NOT NULL,
  `onetime` int(11) NOT NULL,
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `count` int(11) NOT NULL,
  `link_tutorial` varchar(255) DEFAULT NULL,
  `link_download` varchar(255) DEFAULT NULL,
  `tags` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tools`
--

INSERT INTO `tools` (`id`, `name`, `lifetime`, `onetime`, `description`, `count`, `link_tutorial`, `link_download`, `tags`) VALUES
(1, 'Tool ngọc rồng', 1000, 500, '[\"Chức năng: hardware\",\"Check Out, Lag, Not Responding\",\"Options: repair\",\"Tự mặc đồ cho Đệ\",\"Tự out khi đệ đạt sức mạnh để mở Skill\",\"Hỗ trợ siêu nhẹ treo đc VPS\"]', 1232, 'https://www.youtube.com/embed/vTJdVE_gjI0?list=RDvTJdVE_gjI0', 'https://www.youtube.com/embed/vTJdVE_gjI0?list=RDvTJdVE_gjI0', 'tool-ngoc-rong'),
(2, 'Tool up SKH', 100000, 50000, '[\"hardware\", \"repair\"]', 1232, 'https://www.youtube.com/embed/vTJdVE_gjI0?list=RDvTJdVE_gjI0', 'https://www.youtube.com/embed/vTJdVE_gjI0?list=RDvTJdVE_gjI0', 'tool-ngoc-rong1'),
(3, 'Tool win DTDN', 100000, 50000, '[\"hardware\", \"repair\"]', 1232, 'https://www.youtube.com/embed/vTJdVE_gjI0?list=RDvTJdVE_gjI0', 'https://www.youtube.com/embed/vTJdVE_gjI0?list=RDvTJdVE_gjI0', 'tool-ngoc-rong2'),
(4, 'Tool up Sức mạnh', 100000, 50000, '[\"hardware\", \"repair\"]', 1232, 'https://www.youtube.com/embed/vTJdVE_gjI0?list=RDvTJdVE_gjI0', 'https://www.youtube.com/embed/vTJdVE_gjI0?list=RDvTJdVE_gjI0', 'tool-ngoc-rong3'),
(5, 'Tool giảm sức mạnh', 100000, 50000, '[\"hardware\", \"repair\"]', 1232, 'https://www.youtube.com/embed/vTJdVE_gjI0?list=RDvTJdVE_gjI0', 'https://www.youtube.com/embed/vTJdVE_gjI0?list=RDvTJdVE_gjI0', 'tool-ngoc-rong4'),
(7, 'Tool gì đó', 100000, 50000, '[\"hardware\", \"repair\"]', 123, 'https://www.youtube.com/embed/vTJdVE_gjI0?list=RDvTJdVE_gjI0', 'https://www.youtube.com/embed/vTJdVE_gjI0?list=RDvTJdVE_gjI0', 'tool-ngoc-rong5'),
(8, 'Mod Pro', 100000, 50000, '[\"hardware\", \"repair\"]', 1231, 'https://www.youtube.com/embed/vTJdVE_gjI0?list=RDvTJdVE_gjI0', 'https://www.youtube.com/embed/vTJdVE_gjI0?list=RDvTJdVE_gjI0', 'tool-ngoc-rong6'),
(9, 'MODE ', 100000, 50000, '[\"hardware\", \"repair\"]', 123, 'https://www.youtube.com/embed/vTJdVE_gjI0?list=RDvTJdVE_gjI0', 'https://www.youtube.com/embed/vTJdVE_gjI0?list=RDvTJdVE_gjI0', 'tool-ngoc-rong7');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `account` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `balance` int(11) NOT NULL,
  `public_key` varchar(255) NOT NULL,
  `nonce` double DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_key`
--

CREATE TABLE `user_key` (
  `id` int(11) NOT NULL,
  `history_id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `key_value` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `expired_at` datetime DEFAULT NULL,
  `status` enum('active','inactive','ban') DEFAULT 'inactive',
  `change` int(11) NOT NULL DEFAULT 3
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `discount`
--
ALTER TABLE `discount`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tools`
--
ALTER TABLE `tools`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `public_key` (`public_key`);

--
-- Indexes for table `user_key`
--
ALTER TABLE `user_key`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tools`
--
ALTER TABLE `tools`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_key`
--
ALTER TABLE `user_key`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
