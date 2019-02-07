-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: Feb 06, 2019 at 10:04 AM
-- Server version: 10.1.22-MariaDB
-- PHP Version: 7.0.33

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_kretzscd`
--

-- --------------------------------------------------------

--
-- Table structure for table `Character`
--

DROP TABLE IF EXISTS `Character`;
CREATE TABLE `Character` (
  `character_id` int(11) NOT NULL,
  `character_name` varchar(100) NOT NULL,
  `real_first_name` varchar(100) DEFAULT NULL,
  `real_last_name` varchar(100) DEFAULT NULL,
  `city` int(11) DEFAULT NULL,
  `role` tinyint(1) NOT NULL,
  `mentor_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Character`
--

INSERT INTO `Character` (`character_id`, `character_name`, `real_first_name`, `real_last_name`, `city`, `role`, `mentor_id`) VALUES
(1, 'Batman', 'Bruce', 'Wayne', 1, 1, NULL),
(2, 'Robin', 'Dick', 'Grayson', 1, 1, 1),
(3, 'Green Arrow', 'Oliver', 'Queen', 5, 1, NULL),
(4, 'Brick', 'Daniel', 'Brickwell', 5, 0, NULL),
(5, 'Loki', NULL, NULL, NULL, 0, NULL),
(6, 'Thor', NULL, NULL, NULL, 1, NULL),
(7, 'Wonder Woman', 'Diana', 'Prince', NULL, 1, NULL),
(8, 'Lex Luthor', NULL, NULL, 2, 0, NULL),
(9, 'Superman', 'Clark', 'Kent', 1, 1, NULL),
(10, 'The Joker', 'Jack', 'Napier', 1, 0, NULL),
(11, 'Bob the Goon', NULL, NULL, 1, 0, 10);

-- --------------------------------------------------------

--
-- Table structure for table `character_powers`
--

DROP TABLE IF EXISTS `character_powers`;
CREATE TABLE `character_powers` (
  `id` int(11) NOT NULL,
  `power_id` int(11) NOT NULL,
  `character_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `character_powers`
--

INSERT INTO `character_powers` (`id`, `power_id`, `character_id`) VALUES
(1, 1, 9),
(2, 3, 9),
(3, 2, 7),
(4, 4, 9),
(5, 5, 8);

-- --------------------------------------------------------

--
-- Table structure for table `character_weaknesses`
--

DROP TABLE IF EXISTS `character_weaknesses`;
CREATE TABLE `character_weaknesses` (
  `id` int(11) NOT NULL,
  `weakness_id` int(11) NOT NULL,
  `character_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `character_weaknesses`
--

INSERT INTO `character_weaknesses` (`id`, `weakness_id`, `character_id`) VALUES
(1, 1, 9),
(2, 2, 7),
(3, 3, 6);

-- --------------------------------------------------------

--
-- Table structure for table `City`
--

DROP TABLE IF EXISTS `City`;
CREATE TABLE `City` (
  `city_id` int(11) NOT NULL,
  `city_name` varchar(100) NOT NULL,
  `real_city` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `City`
--

INSERT INTO `City` (`city_id`, `city_name`, `real_city`) VALUES
(1, 'Gotham City', 0),
(2, 'Metropolis', 0),
(3, 'New York', 1),
(4, 'Argo City', 0),
(5, 'Star City', 0);

-- --------------------------------------------------------

--
-- Table structure for table `Equipment`
--

DROP TABLE IF EXISTS `Equipment`;
CREATE TABLE `Equipment` (
  `equipment_id` int(11) NOT NULL,
  `equipment_name` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `material` varchar(100) DEFAULT NULL,
  `character_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Equipment`
--

INSERT INTO `Equipment` (`equipment_id`, `equipment_name`, `description`, `material`, `character_id`) VALUES
(1, 'Batmobile', 'Batman\'s heavily armored and weaponized car', 'steel', 1),
(2, 'Truth Lasso', 'Lasso makes people tell the truth', NULL, 7);

-- --------------------------------------------------------

--
-- Table structure for table `friend_relationship`
--

DROP TABLE IF EXISTS `friend_relationship`;
CREATE TABLE `friend_relationship` (
  `id` int(11) NOT NULL,
  `friend1_id` int(11) NOT NULL,
  `friend2_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `friend_relationship`
--

INSERT INTO `friend_relationship` (`id`, `friend1_id`, `friend2_id`) VALUES
(1, 6, 7),
(2, 1, 9),
(3, 10, 11);

-- --------------------------------------------------------

--
-- Table structure for table `Power`
--

DROP TABLE IF EXISTS `Power`;
CREATE TABLE `Power` (
  `power_id` int(11) NOT NULL,
  `power_type` varchar(100) NOT NULL,
  `power_magnitude` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Power`
--

INSERT INTO `Power` (`power_id`, `power_type`, `power_magnitude`) VALUES
(1, 'x-ray vision', 10),
(2, 'super strength', 5),
(3, 'super strength', 10),
(4, 'flight', 5),
(5, 'genius-level intellect', 10);

-- --------------------------------------------------------

--
-- Table structure for table `rival_relationship`
--

DROP TABLE IF EXISTS `rival_relationship`;
CREATE TABLE `rival_relationship` (
  `id` int(11) NOT NULL,
  `rival1_id` int(11) NOT NULL,
  `rival2_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rival_relationship`
--

INSERT INTO `rival_relationship` (`id`, `rival1_id`, `rival2_id`) VALUES
(1, 5, 6),
(2, 8, 9),
(3, 1, 10);

-- --------------------------------------------------------

--
-- Table structure for table `Weakness`
--

DROP TABLE IF EXISTS `Weakness`;
CREATE TABLE `Weakness` (
  `weakness_id` int(11) NOT NULL,
  `weakness_type` varchar(100) NOT NULL,
  `weakness_magnitude` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Weakness`
--

INSERT INTO `Weakness` (`weakness_id`, `weakness_type`, `weakness_magnitude`) VALUES
(1, 'kryptonite', 10),
(2, 'Wonder Woman\'s Lasso', 10),
(3, 'Thor letting go of Hammer', 8);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Character`
--
ALTER TABLE `Character`
  ADD PRIMARY KEY (`character_id`),
  ADD KEY `fk_Character_City` (`city`),
  ADD KEY `fk_Character_Character` (`mentor_id`);

--
-- Indexes for table `character_powers`
--
ALTER TABLE `character_powers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_character_powers_Power` (`power_id`),
  ADD KEY `fk_character_powers_Character` (`character_id`);

--
-- Indexes for table `character_weaknesses`
--
ALTER TABLE `character_weaknesses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_character_weaknesses_Weakness` (`weakness_id`),
  ADD KEY `fk_character_weaknesses_Character` (`character_id`);

--
-- Indexes for table `City`
--
ALTER TABLE `City`
  ADD PRIMARY KEY (`city_id`);

--
-- Indexes for table `Equipment`
--
ALTER TABLE `Equipment`
  ADD PRIMARY KEY (`equipment_id`),
  ADD KEY `fk_Equipment_Character` (`character_id`);

--
-- Indexes for table `friend_relationship`
--
ALTER TABLE `friend_relationship`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_friend_relationship_Character` (`friend1_id`),
  ADD KEY `fk_friend_relationship1_Character` (`friend2_id`);

--
-- Indexes for table `Power`
--
ALTER TABLE `Power`
  ADD PRIMARY KEY (`power_id`);

--
-- Indexes for table `rival_relationship`
--
ALTER TABLE `rival_relationship`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_rival_relationship_Character` (`rival1_id`),
  ADD KEY `fk_rival_relationship1_Character` (`rival2_id`);

--
-- Indexes for table `Weakness`
--
ALTER TABLE `Weakness`
  ADD PRIMARY KEY (`weakness_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Character`
--
ALTER TABLE `Character`
  MODIFY `character_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `character_powers`
--
ALTER TABLE `character_powers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `character_weaknesses`
--
ALTER TABLE `character_weaknesses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `City`
--
ALTER TABLE `City`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Equipment`
--
ALTER TABLE `Equipment`
  MODIFY `equipment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `friend_relationship`
--
ALTER TABLE `friend_relationship`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Power`
--
ALTER TABLE `Power`
  MODIFY `power_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Character`
--
ALTER TABLE `Character`
  ADD CONSTRAINT `fk_Character_Character` FOREIGN KEY (`mentor_id`) REFERENCES `Character` (`character_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Character_City` FOREIGN KEY (`city`) REFERENCES `City` (`city_id`) ON DELETE SET NULL ON UPDATE CASCADE;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

