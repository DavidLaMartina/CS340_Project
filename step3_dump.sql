-- MySQL dump 10.16  Distrib 10.1.36-MariaDB, for Linux (x86_64)
--
-- Host: classmysql.engr.oregonstate.edu    Database: cs340_lamartid
-- ------------------------------------------------------
-- Server version	10.1.22-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Character`
--

DROP TABLE IF EXISTS `Character`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Character` (
  `character_id` int(11) NOT NULL AUTO_INCREMENT,
  `character_name` varchar(100) NOT NULL,
  `real_first_name` varchar(100) DEFAULT NULL,
  `real_last_name` varchar(100) DEFAULT NULL,
  `city` int(11) DEFAULT NULL,
  `role` tinyint(1) NOT NULL,
  `mentor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`character_id`),
  KEY `fk_Character_City` (`city`),
  KEY `fk_Character_Character` (`mentor_id`),
  CONSTRAINT `fk_Character_Character` FOREIGN KEY (`mentor_id`) REFERENCES `Character` (`character_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_Character_City` FOREIGN KEY (`city`) REFERENCES `City` (`city_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Character`
--

LOCK TABLES `Character` WRITE;
/*!40000 ALTER TABLE `Character` DISABLE KEYS */;
INSERT INTO `Character` VALUES (1,'Batman','Bruce','Wayne',1,1,NULL),(2,'Robin','Dick','Grayson',1,1,1),(3,'Green Arrow','Oliver','Queen',5,1,NULL),(4,'Brick','Daniel','Brickwell',5,0,NULL),(5,'Loki',NULL,NULL,NULL,0,NULL),(6,'Thor',NULL,NULL,NULL,1,NULL),(7,'Wonder Woman','Diana','Prince',NULL,1,NULL),(8,'Lex Luthor',NULL,NULL,2,0,NULL),(9,'Superman','Clark','Kent',1,1,NULL),(10,'The Joker','Jack','Napier',1,0,NULL),(11,'Bob the Goon',NULL,NULL,1,0,10),(12,'Wolferine','James','Howlett',NULL,1,NULL),(13,'Dare Devil','Matt','Murdock',3,1,NULL);
/*!40000 ALTER TABLE `Character` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `City`
--

DROP TABLE IF EXISTS `City`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `City` (
  `city_id` int(11) NOT NULL AUTO_INCREMENT,
  `city_name` varchar(100) NOT NULL,
  `real_city` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `City`
--

LOCK TABLES `City` WRITE;
/*!40000 ALTER TABLE `City` DISABLE KEYS */;
INSERT INTO `City` VALUES (1,'Gotham City',0),(2,'Metropolis',0),(3,'New York City',1),(4,'Argo City',0),(5,'Star City',0),(6,'Central City',0);
/*!40000 ALTER TABLE `City` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Equipment`
--

DROP TABLE IF EXISTS `Equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Equipment` (
  `equipment_id` int(11) NOT NULL AUTO_INCREMENT,
  `equipment_name` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `material` varchar(100) DEFAULT NULL,
  `character_id` int(11) NOT NULL,
  PRIMARY KEY (`equipment_id`),
  KEY `fk_Equipment_Character` (`character_id`),
  CONSTRAINT `fk_Equipment_Character` FOREIGN KEY (`character_id`) REFERENCES `Character` (`character_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Equipment`
--

LOCK TABLES `Equipment` WRITE;
/*!40000 ALTER TABLE `Equipment` DISABLE KEYS */;
INSERT INTO `Equipment` VALUES (1,'Batmobile','Batman\'s heavily armored and weaponized car','steel',1),(2,'Truth Lasso','Lasso makes people tell the truth','Gold',7),(3,'Thor\'s Hammer','Hammer','Iron',6),(4,'Wolverine\'s Skeleton','Endoskeleton','Adamantium',12);
/*!40000 ALTER TABLE `Equipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Power`
--

DROP TABLE IF EXISTS `Power`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Power` (
  `power_id` int(11) NOT NULL AUTO_INCREMENT,
  `power_type` varchar(100) NOT NULL,
  `power_magnitude` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`power_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Power`
--

LOCK TABLES `Power` WRITE;
/*!40000 ALTER TABLE `Power` DISABLE KEYS */;
INSERT INTO `Power` VALUES (1,'x-ray vision',10),(2,'super strength',5),(3,'super strength',10),(4,'flight',5),(5,'genius-level intellect',10);
/*!40000 ALTER TABLE `Power` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Weakness`
--

DROP TABLE IF EXISTS `Weakness`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Weakness` (
  `weakness_id` int(11) NOT NULL AUTO_INCREMENT,
  `weakness_type` varchar(100) NOT NULL,
  `weakness_magnitude` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`weakness_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Weakness`
--

LOCK TABLES `Weakness` WRITE;
/*!40000 ALTER TABLE `Weakness` DISABLE KEYS */;
INSERT INTO `Weakness` VALUES (1,'Kryptonite',10),(2,'Wonder Woman\'s Lasso',10),(3,'Thor letting go of Hammer',8),(4,'Muramasa Blade',10),(5,'Noise Pollution',8);
/*!40000 ALTER TABLE `Weakness` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_powers`
--

DROP TABLE IF EXISTS `character_powers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_powers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `power_id` int(11) NOT NULL,
  `character_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_character_powers_Power` (`power_id`),
  KEY `fk_character_powers_Character` (`character_id`),
  CONSTRAINT `fk_character_powers_Character` FOREIGN KEY (`character_id`) REFERENCES `Character` (`character_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_character_powers_Power` FOREIGN KEY (`power_id`) REFERENCES `Power` (`power_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_powers`
--

LOCK TABLES `character_powers` WRITE;
/*!40000 ALTER TABLE `character_powers` DISABLE KEYS */;
INSERT INTO `character_powers` VALUES (1,1,9),(2,3,9),(3,2,7),(4,4,9),(5,5,8);
/*!40000 ALTER TABLE `character_powers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_weaknesses`
--

DROP TABLE IF EXISTS `character_weaknesses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_weaknesses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weakness_id` int(11) NOT NULL,
  `character_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_character_weaknesses_Weakness` (`weakness_id`),
  KEY `fk_character_weaknesses_Character` (`character_id`),
  CONSTRAINT `fk_character_weaknesses_Character` FOREIGN KEY (`character_id`) REFERENCES `Character` (`character_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_character_weaknesses_Weakness` FOREIGN KEY (`weakness_id`) REFERENCES `Weakness` (`weakness_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_weaknesses`
--

LOCK TABLES `character_weaknesses` WRITE;
/*!40000 ALTER TABLE `character_weaknesses` DISABLE KEYS */;
INSERT INTO `character_weaknesses` VALUES (1,1,9),(2,2,7),(3,3,6),(4,5,13);
/*!40000 ALTER TABLE `character_weaknesses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend_relationship`
--

DROP TABLE IF EXISTS `friend_relationship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `friend_relationship` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `friend1_id` int(11) NOT NULL,
  `friend2_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_friend_relationship_Character` (`friend1_id`),
  KEY `fk_friend_relationship1_Character` (`friend2_id`),
  CONSTRAINT `fk_friend_relationship1_Character` FOREIGN KEY (`friend2_id`) REFERENCES `Character` (`character_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_friend_relationship_Character` FOREIGN KEY (`friend1_id`) REFERENCES `Character` (`character_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend_relationship`
--

LOCK TABLES `friend_relationship` WRITE;
/*!40000 ALTER TABLE `friend_relationship` DISABLE KEYS */;
INSERT INTO `friend_relationship` VALUES (1,6,7),(2,1,9),(3,10,11);
/*!40000 ALTER TABLE `friend_relationship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rival_relationship`
--

DROP TABLE IF EXISTS `rival_relationship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rival_relationship` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rival1_id` int(11) NOT NULL,
  `rival2_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_rival_relationship_Character` (`rival1_id`),
  KEY `fk_rival_relationship1_Character` (`rival2_id`),
  CONSTRAINT `fk_rival_relationship1_Character` FOREIGN KEY (`rival2_id`) REFERENCES `Character` (`character_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_rival_relationship_Character` FOREIGN KEY (`rival1_id`) REFERENCES `Character` (`character_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rival_relationship`
--

LOCK TABLES `rival_relationship` WRITE;
/*!40000 ALTER TABLE `rival_relationship` DISABLE KEYS */;
INSERT INTO `rival_relationship` VALUES (1,5,6),(2,8,9),(3,1,10);
/*!40000 ALTER TABLE `rival_relationship` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-13 17:57:07
