-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 06, 2025 at 04:50 PM
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
-- Database: `webthanh`
--

-- --------------------------------------------------------

--
-- Table structure for table `active_key`
--

CREATE TABLE `active_key` (
  `id` int(11) NOT NULL,
  `history_id` int(11) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `key_value` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'inactive',
  `change_count` int(11) DEFAULT 3,
  `expired_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `active_key`
--

INSERT INTO `active_key` (`id`, `history_id`, `user_id`, `key_value`, `status`, `change_count`, `expired_at`) VALUES
(1, 6, 'g360f8c56ae14cb6bf0045bfa33358ed', '2312', 'inactive', 3, NULL),
(2, 7, 'g360f8c56ae14cb6bf0045bfa33358ed', '1212213', 'inactive', 3, NULL),
(3, 12, 'g360f8c56ae14cb6bf0045bfa33358ed', 'qưeư1233122132', 'inactive', 3, NULL),
(4, 15, 'g360f8c56ae14cb6bf0045bfa33358ed', '232331232123213ring', 'inactive', 3, NULL),
(5, 16, 'g360f8c56ae14cb6bf0045bfa33358ed', '321312323213321', 'inactive', 2, NULL),
(6, 18, 'g360f8c56ae14cb6bf0045bfa33358ed', NULL, 'inactive', 3, NULL),
(7, 27, 'g360f8c56ae14cb6bf0045bfa33358ed', '2312332', 'inactive', 2, '0000-00-00 00:00:00'),
(8, 28, 'g360f8c56ae14cb6bf0045bfa33358ed', '312321', 'active', 2, '2025-03-08 15:32:48');

-- --------------------------------------------------------

--
-- Table structure for table `captcha_order`
--

CREATE TABLE `captcha_order` (
  `id` int(11) NOT NULL,
  `history_id` int(11) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `expired_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `captcha_order`
--

INSERT INTO `captcha_order` (`id`, `history_id`, `user_id`, `status`, `expired_at`) VALUES
(1, 10, 'g360f8c56ae14cb6bf0045bfa33358ed', NULL, '2025-02-05 13:59:21'),
(2, 11, 'g360f8c56ae14cb6bf0045bfa33358ed', NULL, '2025-02-05 13:59:28');

-- --------------------------------------------------------

--
-- Table structure for table `categoryproducts`
--

CREATE TABLE `categoryproducts` (
  `ID` int(11) NOT NULL,
  `Title` varchar(255) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `Category` varchar(255) NOT NULL,
  `Enable` tinyint(1) DEFAULT 1,
  `MonthlyPrice` int(11) DEFAULT 0,
  `LifetimePrice` int(11) DEFAULT 0,
  `MonthlyPriceCTV` int(11) DEFAULT 0,
  `TotalSales` int(11) DEFAULT 0,
  `Serial` varchar(255) DEFAULT NULL,
  `DiscountPercent` int(11) DEFAULT 0,
  `DiscountEndDate` datetime DEFAULT NULL,
  `DownloadLink` text DEFAULT NULL,
  `Description` varchar(255) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `categoryproducts`
--

INSERT INTO `categoryproducts` (`ID`, `Title`, `Category`, `Enable`, `MonthlyPrice`, `LifetimePrice`, `MonthlyPriceCTV`, `TotalSales`, `Serial`, `DiscountPercent`, `DiscountEndDate`, `DownloadLink`, `Description`) VALUES
(1, 'Tool up set kích hoạt', 'TOOL', 1, 45000, 180000, 40000, 8, 'TOOL_COLLECT_ACTIVATE_SET', 10, '2025-02-11 18:22:33', 'bla bla', '[\"hardware\", \"repair\"]'),
(2, 'VPS 1 - 1', 'VPS', 1, 0, 0, 0, 0, 'may_chu_vps11', 0, NULL, NULL, '[\"hardware\", \"repair\"]'),
(3, 'Captcha', 'CAP', 1, 0, 0, 0, 0, 'captcha_theo_thang', 0, NULL, NULL, '[\"hardware\", \"repair\"]'),
(4, 'lol', 'TOOL', 1, 0, 0, 0, 0, 'TOOL_COLLECT_ACTIVATE_SET2', 0, NULL, NULL, '[\"hardware\", \"repair\"]'),
(5, 'Mode', 'TOOL', 1, 0, 0, 0, 0, 'TOOL_COLLECT_ACTIVATE_SET3', 0, NULL, NULL, '[\"hardware\", \"repair\"]'),
(6, 'iLoveYou', 'TOOL', 1, 0, 0, 0, 0, 'TOOL_COLLECT_ACTIVATE_SET4', 0, NULL, NULL, '[\"hardware\", \"repair\"]'),
(7, 'VPS 1 - 12', 'VPS', 1, 0, 0, 0, 0, 'may_chu_vps112', 0, NULL, NULL, '[\"hardware\", \"repair\"]'),
(8, 'VPS 1 - 13', 'VPS', 1, 0, 0, 0, 0, 'may_chu_vps113', 0, NULL, NULL, '[\"hardware\", \"repair\"]'),
(9, 'VPS 1 - 14', 'VPS', 1, 0, 0, 0, 0, 'may_chu_vps114', 0, NULL, NULL, '[\"hardware\", \"repair\"]'),
(10, 'Captcha1', 'CAP', 1, 0, 0, 0, 0, 'captcha_theo_thang1', 0, NULL, NULL, '[\"hardware\", \"repair\"]'),
(11, 'Captcha2', 'CAP', 1, 0, 0, 0, 0, 'captcha_theo_thang2', 0, NULL, NULL, '[\"hardware\", \"repair\"]'),
(12, 'Captcha3', 'CAP', 1, 0, 0, 0, 0, 'captcha_theo_thang3', 0, NULL, NULL, '[\"hardware\", \"repair\"]');

-- --------------------------------------------------------

--
-- Table structure for table `history_trade`
--

CREATE TABLE `history_trade` (
  `ID` int(11) NOT NULL,
  `User_id` varchar(255) NOT NULL,
  `MoneyPurchased` int(11) DEFAULT 0,
  `Product_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `PurchasedDate` datetime DEFAULT current_timestamp(),
  `Product_download_link` text DEFAULT NULL,
  `Category` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `history_trade`
--

INSERT INTO `history_trade` (`ID`, `User_id`, `MoneyPurchased`, `Product_title`, `PurchasedDate`, `Product_download_link`, `Category`) VALUES
(1, 'g360f8c56ae14cb6bf0045bfa33358ed', 0, 'Tool up set kích hoạt', '2025-02-05 20:46:41', 'bla bla', 'TOOL'),
(2, 'g360f8c56ae14cb6bf0045bfa33358ed', 0, 'Tool up set kích hoạt', '2025-02-05 20:47:35', 'bla bla', 'TOOL'),
(3, 'g360f8c56ae14cb6bf0045bfa33358ed', 0, 'Tool up set kích hoạt', '2025-02-05 20:50:14', 'bla bla', 'TOOL'),
(4, 'g360f8c56ae14cb6bf0045bfa33358ed', 0, 'Tool up set kích hoạt', '2025-02-05 20:50:38', 'bla bla', 'TOOL'),
(5, 'g360f8c56ae14cb6bf0045bfa33358ed', 0, 'Tool up set kích hoạt', '2025-02-05 20:51:02', 'bla bla', 'TOOL'),
(6, 'g360f8c56ae14cb6bf0045bfa33358ed', 0, 'Tool up set kích hoạt', '2025-02-05 20:57:28', 'bla bla', 'TOOL'),
(7, 'g360f8c56ae14cb6bf0045bfa33358ed', 0, 'Tool up set kích hoạt', '2025-02-05 20:57:36', 'bla bla', 'TOOL'),
(8, 'g360f8c56ae14cb6bf0045bfa33358ed', 0, 'VPS 1 - 1', '2025-02-05 20:57:52', NULL, 'VPS'),
(10, 'g360f8c56ae14cb6bf0045bfa33358ed', 0, 'Captcha', '2025-02-05 20:59:21', NULL, 'CAP'),
(11, 'g360f8c56ae14cb6bf0045bfa33358ed', 0, 'Captcha3', '2025-02-05 20:59:28', NULL, 'CAP'),
(12, 'g360f8c56ae14cb6bf0045bfa33358ed', 0, 'Tool up set kích hoạt', '2025-02-05 21:32:57', 'bla bla', 'TOOL'),
(13, 'g360f8c56ae14cb6bf0045bfa33358ed', 0, 'VPS 1 - 14', '2025-02-05 21:33:06', NULL, 'VPS'),
(14, 'g360f8c56ae14cb6bf0045bfa33358ed', 0, 'VPS 1 - 12', '2025-02-05 21:47:22', NULL, 'VPS'),
(15, 'g360f8c56ae14cb6bf0045bfa33358ed', 0, 'Mode', '2025-02-05 21:47:28', NULL, 'TOOL'),
(16, 'g360f8c56ae14cb6bf0045bfa33358ed', 0, 'Tool up set kích hoạt', '2025-02-05 21:47:36', 'bla bla', 'TOOL'),
(17, 'g360f8c56ae14cb6bf0045bfa33358ed', 0, 'VPS 1 - 13', '2025-02-05 21:47:46', NULL, 'VPS'),
(18, 'g360f8c56ae14cb6bf0045bfa33358ed', 0, 'Tool up set kích hoạt', '2025-02-06 22:22:55', 'bla bla', 'TOOL'),
(27, 'g360f8c56ae14cb6bf0045bfa33358ed', 0, 'Tool up set kích hoạt', '2025-02-06 22:27:07', 'bla bla', 'TOOL'),
(28, 'g360f8c56ae14cb6bf0045bfa33358ed', 0, 'Tool up set kích hoạt', '2025-02-06 22:32:48', 'bla bla', 'TOOL');

-- --------------------------------------------------------

--
-- Table structure for table `moneychangelog`
--

CREATE TABLE `moneychangelog` (
  `ID` int(11) NOT NULL,
  `Username` varchar(255) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `MoneyBeforeChanged` int(11) NOT NULL,
  `MoneyChange` int(11) NOT NULL,
  `MoneyAfterChanged` int(11) NOT NULL,
  `Content` varchar(255) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `CreateDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Token` varchar(255) DEFAULT NULL,
  `Balance` int(11) DEFAULT 0,
  `Role` int(11) DEFAULT 0,
  `Nonce` double DEFAULT NULL,
  `AccountStatus` int(11) DEFAULT 0,
  `CreateDate` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `Username`, `Password`, `Email`, `Token`, `Balance`, `Role`, `Nonce`, `AccountStatus`, `CreateDate`) VALUES
(1, 'lechithanh', '$2b$10$3SLtpvwxS1Vwjy6Sc5.xZ.IfGcP6ZRyOQrWceipFlOR1Lp2roLWt2', 'fantasys3142@gmail.com', 's3d5e6a28034445092d22fca71457375', 9820000, 0, NULL, 0, '2025-02-01 12:40:32'),
(2, 'admin123', '$2b$10$pluwKAOV5CDezOhfrxsZd.pi.rcXXBJcFl0bl1sW1stCsdPlX7E7K', 'rinhdz1111@gmail.com', 'g360f8c56ae14cb6bf0045bfa33358ed', 7300000, 0, NULL, 0, '2025-02-04 22:11:56');

-- --------------------------------------------------------

--
-- Table structure for table `vps_order`
--

CREATE TABLE `vps_order` (
  `id` int(11) NOT NULL,
  `history_id` int(11) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `expired_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vps_order`
--

INSERT INTO `vps_order` (`id`, `history_id`, `user_id`, `ip`, `password`, `status`, `expired_at`) VALUES
(1, 8, 'g360f8c56ae14cb6bf0045bfa33358ed', '123', '12412', NULL, '2025-02-05 13:57:52'),
(2, 13, 'g360f8c56ae14cb6bf0045bfa33358ed', NULL, NULL, NULL, '2025-02-05 14:33:06'),
(3, 14, 'g360f8c56ae14cb6bf0045bfa33358ed', NULL, NULL, NULL, '2025-02-05 14:47:22'),
(4, 17, 'g360f8c56ae14cb6bf0045bfa33358ed', NULL, NULL, NULL, '2025-02-05 14:47:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `active_key`
--
ALTER TABLE `active_key`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `captcha_order`
--
ALTER TABLE `captcha_order`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categoryproducts`
--
ALTER TABLE `categoryproducts`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `history_trade`
--
ALTER TABLE `history_trade`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `moneychangelog`
--
ALTER TABLE `moneychangelog`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Username` (`Username`);

--
-- Indexes for table `vps_order`
--
ALTER TABLE `vps_order`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `active_key`
--
ALTER TABLE `active_key`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `captcha_order`
--
ALTER TABLE `captcha_order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `categoryproducts`
--
ALTER TABLE `categoryproducts`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `history_trade`
--
ALTER TABLE `history_trade`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `moneychangelog`
--
ALTER TABLE `moneychangelog`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `vps_order`
--
ALTER TABLE `vps_order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
