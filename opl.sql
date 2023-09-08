-- phpMyAdmin SQL Dump
-- version 6.0.0-dev+20230711.6a6929c361
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 08, 2023 at 04:25 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `opl`
--

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `client_id` int(11) NOT NULL,
  `name` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`client_id`, `name`) VALUES
(1, 'TATA'),
(2, 'Ashok Leyland');

-- --------------------------------------------------------

--
-- Table structure for table `current`
--

CREATE TABLE `current` (
  `current_id` int(11) NOT NULL,
  `current_img` varchar(255) NOT NULL,
  `current_product` varchar(65) NOT NULL,
  `current_shift` varchar(55) NOT NULL,
  `current_screen` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `current`
--

INSERT INTO `current` (`current_id`, `current_img`, `current_product`, `current_shift`, `current_screen`) VALUES
(1, '1689667032816-1instruction.png', '10', '1', '1'),
(2, '1689666518048-1OPL-Oil-Room-Setup.jpg', '10', '1', '3'),
(3, '1689666518048-1OPL-Oil-Room-Setup.jpg', '10', '1', '2');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `feedback_id` int(11) NOT NULL,
  `name` varchar(55) NOT NULL,
  `image` varchar(255) NOT NULL,
  `screens` varchar(150) NOT NULL,
  `duration` varchar(55) NOT NULL,
  `time_gap` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `instructions`
--

CREATE TABLE `instructions` (
  `instruction_id` int(11) NOT NULL,
  `instruction_img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `instructions`
--

INSERT INTO `instructions` (`instruction_id`, `instruction_img`) VALUES
(102, '1689666504692-2OPL-Grease-Cartridge-Replacement-681x1024.jpg'),
(103, '1689666518048-1OPL-Oil-Room-Setup.jpg'),
(104, '1689666518052-2One-Point-Lesson-Template-Boxed-Portrait-Lean-Manufacturing.jpg'),
(105, '1689667032816-1instruction.png'),
(106, '1689667309274-1temp.png'),
(107, '1689667563657-3download.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `productline`
--

CREATE TABLE `productline` (
  `productline_id` int(11) NOT NULL,
  `productline_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `productline`
--

INSERT INTO `productline` (`productline_id`, `productline_name`) VALUES
(1, 'P1'),
(15, 'P3');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `client_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `name`, `client_id`) VALUES
(9, 'Engine', 2),
(10, 'Brake', 1),
(11, 'Engine', 1),
(12, 'MOTOR', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_rel`
--

CREATE TABLE `product_rel` (
  `product_rel_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `shift_id` int(11) NOT NULL,
  `subproduct_id` int(11) NOT NULL,
  `screen_id` int(11) NOT NULL,
  `productline_id` int(11) NOT NULL,
  `instruction_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_rel`
--

INSERT INTO `product_rel` (`product_rel_id`, `client_id`, `product_id`, `shift_id`, `subproduct_id`, `screen_id`, `productline_id`, `instruction_id`) VALUES
(46, 2, 9, 2, 26, 2, 1, 103),
(47, 1, 10, 1, 23, 1, 1, 105),
(48, 1, 10, 1, 24, 2, 1, 103),
(49, 1, 11, 2, 28, 1, 1, 103),
(54, 1, 10, 1, 29, 3, 1, 103);

-- --------------------------------------------------------

--
-- Table structure for table `screens`
--

CREATE TABLE `screens` (
  `screen_id` int(11) NOT NULL,
  `screen_ip` varchar(26) NOT NULL,
  `screen_name` varchar(65) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `screens`
--

INSERT INTO `screens` (`screen_id`, `screen_ip`, `screen_name`) VALUES
(1, '1', 'Manufacturing Screen'),
(2, '2', 'Molting Screen'),
(3, '3', 'Screen 3');

-- --------------------------------------------------------

--
-- Table structure for table `shifts`
--

CREATE TABLE `shifts` (
  `shift_id` int(11) NOT NULL,
  `shift_name` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shifts`
--

INSERT INTO `shifts` (`shift_id`, `shift_name`) VALUES
(1, 'Morning Shift'),
(2, 'Evening Shift');

-- --------------------------------------------------------

--
-- Table structure for table `subproduct`
--

CREATE TABLE `subproduct` (
  `subproduct_id` int(11) NOT NULL,
  `parts_name` varchar(155) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subproduct`
--

INSERT INTO `subproduct` (`subproduct_id`, `parts_name`, `product_id`) VALUES
(23, 'Nut', 10),
(24, 'Tire', 10),
(25, 'Cooling Compartment', 11),
(26, 'AC', 9),
(27, 'Tire2', 12),
(28, 'DRUM', 11),
(29, 'Tube', 10);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` int(11) NOT NULL,
  `fullname` varchar(55) NOT NULL,
  `phone` varchar(14) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `fullname`, `phone`) VALUES
(1, 'admin', 123456, 'Mrinmoy Ghosh', '8240491818');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`client_id`);

--
-- Indexes for table `current`
--
ALTER TABLE `current`
  ADD PRIMARY KEY (`current_id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedback_id`);

--
-- Indexes for table `instructions`
--
ALTER TABLE `instructions`
  ADD PRIMARY KEY (`instruction_id`);

--
-- Indexes for table `productline`
--
ALTER TABLE `productline`
  ADD PRIMARY KEY (`productline_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `product_rel`
--
ALTER TABLE `product_rel`
  ADD PRIMARY KEY (`product_rel_id`),
  ADD KEY `product_rel_ibfk_1` (`productline_id`),
  ADD KEY `product_rel_ibfk_2` (`product_id`),
  ADD KEY `product_rel_ibfk_3` (`screen_id`),
  ADD KEY `product_rel_ibfk_4` (`instruction_id`),
  ADD KEY `product_rel_ibfk_5` (`subproduct_id`),
  ADD KEY `shift_id` (`shift_id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `screens`
--
ALTER TABLE `screens`
  ADD PRIMARY KEY (`screen_id`);

--
-- Indexes for table `shifts`
--
ALTER TABLE `shifts`
  ADD PRIMARY KEY (`shift_id`);

--
-- Indexes for table `subproduct`
--
ALTER TABLE `subproduct`
  ADD PRIMARY KEY (`subproduct_id`),
  ADD KEY `test` (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `current`
--
ALTER TABLE `current`
  MODIFY `current_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `feedback_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `instructions`
--
ALTER TABLE `instructions`
  MODIFY `instruction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT for table `productline`
--
ALTER TABLE `productline`
  MODIFY `productline_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `product_rel`
--
ALTER TABLE `product_rel`
  MODIFY `product_rel_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `screens`
--
ALTER TABLE `screens`
  MODIFY `screen_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `shifts`
--
ALTER TABLE `shifts`
  MODIFY `shift_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `subproduct`
--
ALTER TABLE `subproduct`
  MODIFY `subproduct_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`);

--
-- Constraints for table `product_rel`
--
ALTER TABLE `product_rel`
  ADD CONSTRAINT `product_rel_ibfk_1` FOREIGN KEY (`productline_id`) REFERENCES `productline` (`productline_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `product_rel_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `product_rel_ibfk_3` FOREIGN KEY (`screen_id`) REFERENCES `screens` (`screen_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `product_rel_ibfk_4` FOREIGN KEY (`instruction_id`) REFERENCES `instructions` (`instruction_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `product_rel_ibfk_5` FOREIGN KEY (`subproduct_id`) REFERENCES `subproduct` (`subproduct_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `product_rel_ibfk_7` FOREIGN KEY (`shift_id`) REFERENCES `shifts` (`shift_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `product_rel_ibfk_8` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `subproduct`
--
ALTER TABLE `subproduct`
  ADD CONSTRAINT `test` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
